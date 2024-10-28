import { createFileRoute } from '@tanstack/react-router';
// import { CommentsProvider, useComment } from '@/context/comment';
// import { Form } from '@/components/home/Form';
// import { CommentList } from '@/components/home/CommentList';
import { beforeLoadAuthGuard } from '@/global/utils/beforeLoadAuthGuard';

export const Route = createFileRoute('/')({
  // errorComponent
  // loader
  component: HomePage,
  beforeLoad: beforeLoadAuthGuard,
});

function HomePage() {
  return (
    <div>Home</div>
    // <CommentsProvider>
    //   <CommentsSystem />
    // </CommentsProvider>
  );
}

// const CommentsSystem = () => {
//   const { childComments } = useComment();
//   return (
//     <>
//       <CommentList comments={childComments} nestingLevel={0}></CommentList>
//       <Form operation="add" parentId="root" fixedPosition />
//     </>
//   );
// };
