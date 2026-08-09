const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

interface FetchOptions extends RequestInit {
  timeoutMs?: number;
}

/**
 * Enhanced fetch with timeout support via AbortController
 */
async function fetchWithTimeout(url: string, options: FetchOptions = {}) {
  const { timeoutMs = 45000, ...fetchOptions } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  
  const method = fetchOptions.method || 'GET';
  console.log(`[API Request] ${method} ${url}`);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      credentials: 'include',
      signal: controller.signal,
    });
    
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    
    const clonedResponse = response.clone();
    try {
      console.log(`[API Response] ${method} ${url}:`, await clonedResponse.json());
    } catch (e) {
      console.log(`[API Response] ${method} ${url}: (Could not parse JSON)`, e);
    }
    
    return await response.json();
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error(`Request timed out after ${timeoutMs}ms`);
    }
    throw error;
  } finally {
    clearTimeout(id);
  }
}

export const chatApi = {
  /**
   * Create a new chat session
   */
  createSession: async (sourceChannel = "website_widget") => {
    return fetchWithTimeout(`${BASE_URL}/chat/sessions/new/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ source_channel: sourceChannel }),
    });
  },

  /**
   * Send a message in an existing session
   */
  sendMessage: async (
    sessionId: string | null,
    sessionToken: string | null,
    message: string,
    metadata?: Record<string, any>
  ) => {
    const payload: any = { message };
    if (sessionId) payload.session_id = sessionId;
    if (sessionToken) payload.session_token = sessionToken;
    if (metadata) payload.metadata = metadata;

    return fetchWithTimeout(`${BASE_URL}/chat/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  },

  /**
   * Fetch conversation history
   */
  getHistory: async (sessionId: string, sessionToken: string) => {
    return fetchWithTimeout(`${BASE_URL}/chat/sessions/${sessionId}/messages/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
      },
    });
  },

  /**
   * Send feedback for a specific message
   */
  sendFeedback: async (
    sessionId: string,
    sessionToken: string,
    messageId: string,
    isPositive: boolean,
    comments?: string
  ) => {
    return fetchWithTimeout(`${BASE_URL}/chat/feedback/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId,
        session_token: sessionToken,
        message_id: messageId,
        is_positive: isPositive,
        comments,
      }),
    });
  },

  /**
   * Get all user chat sessions
   */
  getSessions: async (search?: string) => {
    const query = search ? `?search=${encodeURIComponent(search)}` : "";
    return fetchWithTimeout(`${BASE_URL}/chat/sessions/${query}`, {
      method: 'GET',
    });
  },

  /**
   * Delete a chat session
   */
  deleteSession: async (sessionId: string) => {
    return fetchWithTimeout(`${BASE_URL}/chat/sessions/${sessionId}/`, {
      method: 'DELETE',
    });
  },

  /**
   * Perform an action on a session (pin, archive)
   */
  actionSession: async (sessionId: string, action: 'pin' | 'unpin' | 'archive' | 'unarchive') => {
    return fetchWithTimeout(`${BASE_URL}/chat/sessions/${sessionId}/${action}/`, {
      method: 'POST',
    });
  },

  /**
   * Clear all history
   */
  clearHistory: async () => {
    return fetchWithTimeout(`${BASE_URL}/chat/clear/`, {
      method: 'POST',
    });
  },
};
