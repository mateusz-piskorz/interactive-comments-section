import { FC, useEffect, useRef } from "react";
import c from "./Form.module.scss";
import { addComment, editComment } from "./services";
import { Dialog } from "../Dialog";
import arrowRight from "../../assets/arrow-right.svg";
import { useMutation } from "@tanstack/react-query";
import { useEvent } from "@owcaofficial/web-analytics";

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
  const sendEvent = useEvent();
  const input = useRef<HTMLSpanElement>(null);
  const FormClassName = `${c.Form}${` ${fixedPosition ? c.Form___fixed : ""}`}`;
  const addMutation = useMutation({
    onSuccess: () => {
      input.current!.innerText = "";
      onSubmit && onSubmit();
    },
    mutationFn: addComment,
    mutationKey: ["addComment"],
  });
  const editMutation = useMutation({
    onSuccess: onSubmit,
    mutationFn: editComment,
    mutationKey: ["editComment"],
  });

  const { status, reset, error } =
    operation === "add" ? addMutation : editMutation;

  const submitHandler = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const content = input.current!.innerText?.replace(
      /(\r\n|\n|\r){2,}/gm,
      "\n\n"
    );
    if (!content || content === "") return;
    if (operation === "add") {
      addMutation.mutate({ content, parentId });
    } else {
      editMutation.mutate({ commentId: parentId, content });
    }

    sendEvent(
      "add_comment_form_action",
      fixedPosition ? "add_comment" : initialContent ? "edit_comment" : "reply"
    );
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
        <button
          type="submit"
          className={c.Form_button}
          disabled={status === "pending"}
        >
          <img src={arrowRight} alt="send icon" />
        </button>
      </form>

      {status === "error" && (
        <Dialog
          //@ts-ignore
          remainingTime={error.remainingTime}
          description={error.message}
          onCancel={reset}
        />
      )}
    </>
  );
};
