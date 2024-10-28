import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Comments } from '@/features/comments';

const Component2 = () => {
  const [data, setData] = useState<string>('');
  useEffect(() => {
    fetch(
      'http://localhost:3000/books/harry-potter-and-the-philosopher-s-stone/chapters/2'
    )
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.log(err));
  }, []);

  const dwa2 = data.split('\n');
  // const dwa22 = dwa2.join('\n\n');
  // console.log(dwa22);

  // alternative
  // return <span style={{ whiteSpace: 'pre-wrap' }}>{dwa22}</span>

  return (
    <div
      style={{
        maxWidth: '1400px',
        margin: 'auto',
        padding: '20px',
        marginTop: '70px',
      }}
    >
      {dwa2.map((e) => (
        <>
          <span>{e}</span>
          <br />
          <br />
        </>
      ))}

      <br />
      <br />
      <Comments bookId="2" />
    </div>
  );
};

export const Route = createFileRoute('/books/$bookId')({
  component: Component2,
});
