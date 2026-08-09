/**
 * team.service.ts
 *
 * Maps backend TeamMember → frontend shapes used by the About page.
 */

import { cmsList } from "@/api/cms";

// ─── Backend shape ─────────────────────────────────────────────────────────

export interface BackendTeamMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  photo_url: string | null;
  bio: string;
  linkedin: string | null;
  github: string | null;
  email: string | null;
  skills: string[];
  display_order: number;
  is_featured: boolean;
  status: string;
}

// ─── Public functions ──────────────────────────────────────────────────────

export async function getAllTeamMembers(): Promise<BackendTeamMember[]> {
  const members = await cmsList<BackendTeamMember>("/public/content/team/");
  return members.sort((a, b) => a.display_order - b.display_order);
}

export async function getFeaturedTeamMembers(): Promise<BackendTeamMember[]> {
  const all = await getAllTeamMembers();
  const featured = all.filter((m) => m.is_featured);
  return featured.length > 0 ? featured : all;
}
