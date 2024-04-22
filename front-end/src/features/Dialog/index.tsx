import { createPortal } from "react-dom";
import { FC } from "react";
import { removeComment } from "../../services/comments";
import { useAsyncFn } from "../../hooks/useAsync";
import { Overlay, zIndex } from "../Overlay";
import c from "./Dialog.module.scss";
import Countdown from "react-countdown";

type InfoProps = {
  type: "info";
  onCancel: () => void;
  description: string;
  elapsedTime?: number;
};

type RemoveProps = {
  commentId: string;
  userId: string;
  type: "remove";
  onCancel: () => void;
};

export const Dialog: FC<InfoProps | RemoveProps> = (props) => {
  const { execute } = useAsyncFn(removeComment);
  const { onCancel, type } = props;
  const isRemove = type === "remove";
  const description = isRemove
    ? "Are you sure you want to delete this comment? This will remove the comment and can't be undone."
    : props.description;
  const { title, btnContent } = text[props.type];

  const removeHandler = () => {
    if (isRemove) {
      execute({ commentId: props.commentId, userId: props.userId });
    }
  };

  return createPortal(
    <>
      <Overlay onClick={onCancel} />
      <div style={{ zIndex: zIndex + 1 }} className={c.Dialog}>
        <h2 className={c.Dialog_title}>{title}</h2>
        <p className={c.Dialog_description}>{description}</p>
        <p>
          {!isRemove && props.elapsedTime && (
            <Countdown date={Date.now() + (60000 - props.elapsedTime)} />
          )}
        </p>
        <button className={c.Dialog_button} onClick={onCancel}>
          {btnContent}
        </button>
        {isRemove && (
          <button
            onClick={removeHandler}
            className={`${c.Dialog_button} ${c.Dialog_button__danger}`}
          >
            YES, DELETE
          </button>
        )}
      </div>
    </>,
    document.body
  );
};

const text = {
  remove: {
    title: "Delete comment",
    btnContent: "NO, CANCEL",
  },
  info: {
    title: "Info",
    btnContent: "OK, I understand",
  },
};
