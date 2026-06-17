'use client';

import { EmptyState } from '@/components/empty-state';

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <EmptyState
      type="error"
      title="Something went wrong"
      description="An unexpected error occurred. Please try again."
      actionLabel="Try Again"
      actionHref="/"
    />
  );
}
