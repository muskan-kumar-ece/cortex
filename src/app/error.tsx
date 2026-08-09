"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-3xl font-heading font-bold mb-4">Something went wrong!</h2>
      <p className="text-on-surface-muted mb-8 max-w-md">
        An unexpected error occurred. Our engineering team has been notified.
      </p>
      <Button
        onClick={() => reset()}
        variant="default"
        className="bg-primary hover:bg-primary-hover text-white"
      >
        Try again
      </Button>
    </div>
  );
}
