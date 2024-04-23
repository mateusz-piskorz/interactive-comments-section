import { FC } from "react";
import iconMinus from "../../assets/icon-minus.svg";
import iconPlus from "../../assets/icon-plus.svg";
import { useAsyncFn } from "../../../../hooks/useAsync";
import { addLike } from "../../../../services/comments";
import { useUser } from "../../../../context/user";
import c from "./LikesButton.module.scss";
import { Dialog } from "../../../Dialog";

type LikesBtnProps = {
  commentId: string;
  likesCount: number;
};

export const LikesButton: FC<LikesBtnProps> = ({ commentId, likesCount }) => {
  const { user } = useUser();
  const { execute, error, setError } = useAsyncFn(addLike);

  const onBtnClick = (likeType: "like" | "dislike") => {
    execute({ commentId, likeType, userId: user._id });
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
