import { getAuth } from '@/features/auth';
import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { beforeLoadAuthGuard } from '@/global/utils/beforeLoadAuthGuard';
import { tsr } from '@/global/utils/ts-client';

export const Route = createFileRoute('/profile/')({
  component: ProfilePage,
  beforeLoad: beforeLoadAuthGuard,
});

function ProfilePage() {
  const [, setOpen] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ['getAuth'],
    queryFn: getAuth,
  });

  const { data: books } = tsr.books.getBooks.useQuery({
    queryKey: ['books'],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // console.log('books2');
  // console.log(books2);

  return (
    <div className="p-2">
      <h3>Welcome {data?.username}</h3>
      <button onClick={() => setOpen(true)}>Show dialog</button>
    </div>
  );
}
