import { FC, useEffect } from "react";
import { removeComment } from "../services/comments";
import { useAsyncFn } from "../../../hooks/useAsync";
import { Dialog } from "../../../components/Dialog";
import { useComment } from "../context/CommentsContext";
import { Button } from "../../../components/Button";
import { styled, css } from "styled-components";

type Props = {
  commentId: string;
  onClose: () => void;
};

export const RemoveCommentDialog: FC<Props> = ({ commentId, onClose }) => {
  const { execute, loading, error, value } = useAsyncFn(removeComment);
  const { userDetails } = useComment();

  const removeHandler = () => {
    execute({ commentId, userId: userDetails._id });
  };

  useEffect(
    function onRemove() {
      if (value) {
        onClose();
      }
    },
    [value]
  );

  return (
    <Dialog wider={true}>
      <Wrapper>
        <h2 className="title">Delete comment</h2>
        <p className={error ? "description error" : "description"}>
          {error
            ? error.response.data
            : loading
            ? "loading..."
            : "Are you sure you want to delete this comment? This will remove the comment and can't be undone."}
        </p>
        <div className="btn-container">
          <Button background="gray" onClick={onClose}>
            NO, CANCEL
          </Button>
          <Button background="red" onClick={removeHandler}>
            YES, DELETE
          </Button>
        </div>
      </Wrapper>
    </Dialog>
  );
};

const Wrapper = styled.div`
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  > .btn-container {
    display: flex;
    gap: 15px;
  }
`;
