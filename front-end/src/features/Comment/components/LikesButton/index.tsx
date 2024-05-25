import { FC } from "react";
import iconMinus from "../../assets/icon-minus.svg";
import iconPlus from "../../assets/icon-plus.svg";
import { addLike } from "../../services";
import { useComment } from "../../../../context/comment";
import { Dialog } from "../../../Dialog";
import c from "./LikesButton.module.scss";
import { useAuth } from "../../../Auth";
import { useMutation } from "@tanstack/react-query";

type LikesBtnProps = {
  commentId: string;
};

export const LikesButton: FC<LikesBtnProps> = ({ commentId }) => {
  const { user } = useAuth();
  const { id: userId } = user!;
  const { comment } = useComment(commentId);
  const { likes, likesCount, dislikes } = comment!;
  const { mutate, status, reset, error } = useMutation({
    mutationFn: addLike,
    mutationKey: ["addLike"],
  });

  const clickHandler = (likeType: "like" | "dislike") => {
    mutate({ commentId, likeType });
  };

  return (
    <>
      <div className={c.LikesButton}>
        <button
          className={btnClassName(likes, userId)}
          onClick={() => clickHandler("like")}
        >
          <img src={iconPlus} alt="plus icon" />
        </button>
        <strong className={c.LikesButton_count}>{likesCount}</strong>
        <button
          className={btnClassName(dislikes, userId)}
          onClick={() => clickHandler("dislike")}
        >
          <img src={iconMinus} alt="minus icon" />
        </button>
      </div>

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

const btnClassName = (arr: string[], id: string) => {
  const isLikeAdded = arr.find((e) => e === id);

  return `${c.LikesButton_button}${` ${
    isLikeAdded ? c.LikesButton_button___disabled : ""
  }`}`;
};
