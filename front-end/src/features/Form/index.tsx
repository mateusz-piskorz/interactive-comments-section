import { FC, useEffect, useRef, useState } from "react";
import c from "./Form.module.scss";
import { addComment, editComment } from "../../services/comments";
import { useAsyncFn } from "../../hooks/useAsync";
import { useUser } from "../../context/user";
import { useComment } from "../../context/comment";
import { Dialog } from "../Dialog";
import { socket } from "../../socket";

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
  const { addComment: addCommentToContext } = useComment();
  const { execute: add, error, setError, resData } = useAsyncFn(addComment);
  const { execute: edit, resData: resDataEdit } = useAsyncFn(editComment);
  const input = useRef<HTMLSpanElement>(null);
  const className = `${c.Form}${` ${positionAbsolute ? c.Form___fixed : ""}`}`;

  const submitHandler = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const content = input.current!.innerText;
    if (content === "") return;
    if (operation === "add") {
      add({ content, userId, parentId });
    } else if (parentId) {
      edit({ commentId: parentId, content });
    }
  };

  useEffect(() => {
    if (!input.current) return;

    if (initialContent) {
      input.current!.innerText = initialContent;
    }

    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.code === "Enter" && !event.shiftKey) {
        event.preventDefault();
        submitHandler();
      }
    };

    input.current.addEventListener("keydown", keyDownHandler);
    return () => {
      input.current!.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  useEffect(
    function onSuccess() {
      if (resData || resDataEdit) {
        if (operation === "add") {
          addCommentToContext({ ...resData, yourComment: true });
          socket.emit("comment-added", resData);
        }
        input.current!.innerText = "";
        onSubmit && onSubmit();
      }
    },
    [resData, resDataEdit]
  );

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
        {/* <input
          required
          autoFocus
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={c.Form_input}
          placeholder="Add a comment..."
        /> */}
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
