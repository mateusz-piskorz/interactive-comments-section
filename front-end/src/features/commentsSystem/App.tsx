import { FC } from "react";
import { CommentList } from "./components/CommentList";
import { useComment } from "./context/CommentsContext";
import { AddCommentForm } from "./components/AddCommentForm";
import { styled } from "styled-components";

export const App: FC = () => {
  const { rootComments } = useComment();

  return (
    <Wrapper>
      <CommentsWrapper>
        <CommentList comments={rootComments} nestingLevel={0} />
      </CommentsWrapper>
      <AddCommentForm action="add" />
    </Wrapper>
  );
};

const CommentsWrapper = styled.div`
  width: 90%;
  margin: auto;
  max-height: calc(100vh - 205px);
  overflow-y: auto;
  padding-bottom: 15px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Wrapper = styled.div`
  position: relative;
  padding: 5px;
  width: 600px;
  max-width: 100%;
  height: 100vh;
  margin: auto;
  display: flex;
  gap: 15px;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    width: unset;
    max-width: 750px;
  }

  @media screen and (min-width: 1024px) {
    max-width: 900px;
  }
`;
