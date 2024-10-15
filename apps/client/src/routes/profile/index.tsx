import { getAuth } from '@/utils/auth';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { beforeLoadAuthGuard } from '@/utils/beforeLoadAuthGuard';

export const Route = createFileRoute('/profile/')({
  component: ProfilePage,
  beforeLoad: beforeLoadAuthGuard,
});

function ProfilePage() {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ['getAuth'],
    queryFn: getAuth,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-2">
      <h3>Welcome {data?.username}</h3>
      <button onClick={() => setOpen(true)}>Show dialog</button>
    </div>
  );
}
