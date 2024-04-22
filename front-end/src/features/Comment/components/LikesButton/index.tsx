import { FC } from "react";
import iconMinus from "../../assets/icon-minus.svg";
import iconPlus from "../../assets/icon-plus.svg";
import { useAsyncFn } from "../../../../hooks/useAsync";
import { addLike } from "../../../../services/comments";
import { useComment } from "../../../../context";
import c from "./LikesButton.module.scss";
import { Dialog } from "../../../Dialog";

type LikesBtnProps = {
  commentId: string;
  likesCount: number;
};

export const LikesButton: FC<LikesBtnProps> = ({ commentId, likesCount }) => {
  const { userDetails } = useComment();
  const { execute, error, setError } = useAsyncFn(addLike);

  const onBtnClick = (likeType: "like" | "dislike") => {
    execute({ commentId, likeType, userId: userDetails._id });
  };

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
      <div className={c.LikesButton}>
        <button
          className={c.LikesButton_button}
          onClick={() => onBtnClick("like")}
        >
          <img src={iconPlus} alt="plus icon" />
        </button>
        <strong className={c.LikesButton_count}>{likesCount}</strong>
        <button
          className={c.LikesButton_button}
          onClick={() => onBtnClick("dislike")}
        >
          <img src={iconMinus} alt="minus icon" />
        </button>
      </div>
    </>
  );
};
