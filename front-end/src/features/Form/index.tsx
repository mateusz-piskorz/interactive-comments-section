import { FC, useEffect, useState } from "react";
import c from "./Form.module.scss";
import { addComment, editComment } from "../../services/comments";
import { useAsyncFn } from "../../hooks/useAsync";
import { useUser } from "../../context/user";
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
  const { user } = useUser();
  const { execute: add, error, setError, resData } = useAsyncFn(addComment);
  const { execute: edit, resData: resDataEdit } = useAsyncFn(editComment);
  const [content, setContent] = useState(initialContent ? initialContent : "");
  const className = `${c.Form}${` ${positionAbsolute ? c.Form___fixed : ""}`}`;

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (operation === "add") {
      add({ content, userId: user._id, parentId });
    } else if (parentId) {
      edit({ commentId: parentId, content });
    }
  };

  useEffect(
    function onSuccess() {
      if (resData || resDataEdit) {
        setContent("");
        onSubmit && onSubmit();
      }
    },
    [resData, resDataEdit]
  );

  return (
    <>
      <form className={className} onSubmit={submitHandler}>
        <textarea
          required
          autoFocus
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={500}
          className={c.Form_textarea}
          placeholder="Add a comment..."
        />
        <button type="submit" className={c.Form_button}>
          Send
        </button>
      </form>

      {error && (
        <Dialog
          elapsedTime={error.elapsedTime}
          description={error.message}
          onCancel={() => {
            setError(false);
          }}
        />
      )}
    </>
  );
};
