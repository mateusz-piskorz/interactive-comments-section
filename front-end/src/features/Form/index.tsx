import { FC, useEffect, useRef, useState } from "react";
import c from "./Form.module.scss";
import { addComment, editComment } from "../../services/comments";
import { useAsyncFn } from "../../hooks/useAsync";
import { useUser } from "../../context/user";
import { useComment } from "../../context/comment";
import { Dialog } from "../Dialog";
import { socket } from "../../socket";
import arrowRight from "../../assets/arrow-right.svg";

type FormProps = {
  operation: "edit" | "add";
  positionAbsolute?: boolean;
  parentId: string;
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
  const {
    user: { _id: userId },
  } = useUser();
  const { addComment: addCommentToContext, editComment: editCommentInContext } =
    useComment();
  const { execute, error, setError, loading } = useAsyncFn(
    operation === "add" ? addComment : editComment,
    {
      onSuccess: (comment) => {
        if (operation === "add") {
          addCommentToContext({ ...comment, yourComment: true });
          socket.emit("comment-added", comment);
          input.current!.innerText = "";
        } else {
          editCommentInContext(comment.id, { ...comment, yourComment: true });
          socket.emit("comment-edited", comment);
        }
        onSubmit && onSubmit();
      },
    }
  );

  const input = useRef<HTMLSpanElement>(null);
  const className = `${c.Form}${` ${positionAbsolute ? c.Form___fixed : ""}`}`;

  const submitHandler = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const content = input.current!.innerText;
    if (content === "") return;
    if (operation === "add") {
      execute({ content, userId, parentId });
    } else {
      execute({ commentId: parentId, content });
    }
  };

  useEffect(() => {
    if (!input.current) return;

    const inputRef = input.current;
    if (initialContent) {
      inputRef.innerText = initialContent;
    }

    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.code === "Enter" && !event.shiftKey) {
        event.preventDefault();
        submitHandler();
      }
    };

    inputRef.addEventListener("keydown", keyDownHandler);

    return () => {
      inputRef!.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <>
      <form className={className} onSubmit={submitHandler}>
        <span
          autoFocus
          ref={input}
          className={c.Form_input}
          role="textbox"
          contentEditable
        />
        <button type="submit" className={c.Form_button} disabled={loading}>
          <img src={arrowRight} alt="arrow right icon" />
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
