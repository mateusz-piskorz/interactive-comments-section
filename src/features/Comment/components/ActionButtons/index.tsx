import { FC } from "react";
import iconDelete from "../../assets/icon-delete.svg";
import iconEdit from "../../assets/icon-edit.svg";
import iconReply from "../../assets/icon-reply.svg";
import c from "./ActionButtons.module.scss";

type ActionButtonsProps = {
  isYourComment: boolean;
  onEdit?: () => void;
  onReply?: () => void;
  onDelete?: () => void;
};

export const ActionButtons: FC<ActionButtonsProps> = ({
  isYourComment,
  onDelete,
  onEdit,
  onReply,
}) => {
  const dangerBtn = `${c.ActionButtons_button} ${c.ActionButtons_button__danger}`;
  return (
    <div className={c.ActionButtons}>
      {isYourComment ? (
        <>
          <button className={dangerBtn} onClick={onDelete}>
            <img src={iconDelete} alt="delete icon" />
            Delete
          </button>
          <button className={c.ActionButtons_button} onClick={onEdit}>
            <img src={iconEdit} alt="edit icon" />
            Edit
          </button>
        </>
      ) : (
        <button className={c.ActionButtons_button} onClick={onReply}>
          <img src={iconReply} alt="reply icon" />
          Reply
        </button>
      )}
    </div>
  );
};
