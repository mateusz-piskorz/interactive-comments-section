import { FC, useEffect, useRef } from "react";
import c from "./Form.module.scss";
import { addCommentService, editCommentService } from "../../services/comments";
import { useAsyncFn } from "../../hooks/useAsync";
import { useComment } from "../../context/comment";
import { Dialog } from "../Dialog";
import { socket } from "../../socket";
import arrowRight from "../../assets/arrow-right.svg";

type FormProps = {
  parentId: string;
  operation: "edit" | "add";
  fixedPosition?: boolean;
  onSubmit?: () => void;
  initialContent?: string;
};

export const Form: FC<FormProps> = ({
  parentId,
  operation,
  fixedPosition,
  onSubmit,
  initialContent,
}) => {
  const input = useRef<HTMLSpanElement>(null);
  const FormClassName = `${c.Form}${` ${fixedPosition ? c.Form___fixed : ""}`}`;
  const userId = "";
  // const { addComment } = useComment();
  const { execute, error, setError, loading } = useAsyncFn(
    operation === "add" ? addCommentService : editCommentService,
    {
      onSuccess: (comment) => {
        if (operation === "add") {
          // addComment({ ...comment, yourComment: true });
          socket.emit("comment-added", comment);
          input.current!.innerText = "";
        }
        onSubmit && onSubmit();
      },
    }
  );

  const submitHandler = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const content = input.current!.innerText?.replace(
      /(\r\n|\n|\r){2,}/gm,
      "\n\n"
    );
    if (!content || content === "") return;
    if (operation === "add") {
      execute({ content, userId, parentId });
    } else {
      execute({ commentId: parentId, content });
    }
  };

  useEffect(() => {
    if (!input.current) return;
    const inputRef = input.current;
    inputRef.textContent = initialContent || "";

    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.code === "Enter" && !event.shiftKey) {
        event.preventDefault();
        submitHandler();
      }
    };

    inputRef.addEventListener("keydown", keyDownHandler);
    return () => {
      inputRef.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <>
      <form className={FormClassName} onSubmit={submitHandler}>
        <span
          autoFocus
          ref={input}
          className={c.Form_input}
          role="textbox"
          contentEditable
        />
        <button type="submit" className={c.Form_button} disabled={loading}>
          <img src={arrowRight} alt="send icon" />
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
