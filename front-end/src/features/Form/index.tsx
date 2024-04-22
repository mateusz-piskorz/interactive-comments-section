import { FC, useEffect, useState } from "react";
import c from "./Form.module.scss";
import { addComment, editComment } from "../../services/comments";
import { useAsyncFn } from "../../hooks/useAsync";
import { useComment } from "../../context";
import { Dialog } from "../Dialog";

type FormProps = {
  operation: "edit" | "add";
  positionAbsolute?: boolean;
  parentId?: string;
  onSubmit?: () => void;
  initialContent?: string;
};

export const Form: FC<FormProps> = ({
  positionAbsolute,
  parentId,
  onSubmit,
  operation,
  initialContent,
}) => {
  const { userDetails } = useComment();
  const { execute: add, error, setError, resData } = useAsyncFn(addComment);
  const { execute: edit, resData: resDataEdit } = useAsyncFn(editComment);
  const [content, setContent] = useState(initialContent ? initialContent : "");
  const className = `${c.Form}${` ${positionAbsolute ? c.Form___fixed : ""}`}`;

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (operation === "add") {
      add({ content, userId: userDetails._id, parentId });
    } else if (parentId) {
      edit({ commentId: parentId, content });
    }
  };

  useEffect(
    function onSuccess() {
      if (resData || resDataEdit) {
        onSubmit && onSubmit();
      }
    },
    [resData, resDataEdit]
  );

  return (
    <>
      {error && (
        <Dialog
          elapsedTime={error.response.data.elapsedTime}
          description={error.response.data.message}
          onCancel={() => {
            setError(false);
          }}
          type="info"
        />
      )}

      <form className={className} onSubmit={submitHandler}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          autoFocus
          maxLength={500}
          className={c.Form_textarea}
          placeholder="Add a comment..."
        ></textarea>
        <button type="submit" className={c.Form_button}>
          Send
        </button>
      </form>
    </>
  );
};
