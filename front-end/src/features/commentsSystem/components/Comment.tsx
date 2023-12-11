import { FC, useState } from "react";
import { styled, css } from "styled-components";
import { useComment } from "../context/CommentsContext";
import { CommentList } from "./CommentList";
import { AddCommentForm } from "./AddCommentForm";
import { LikesBtn } from "./LikesBtn";
import { ProfileAvatar } from "../../../components/ProfileAvatar";
import { CommentCTABtns } from "./CommentCTABtns";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { RemoveCommentDialog } from "./RemoveCommentDialog";
import { Comment as CommentApi } from "../context/CommentsContext/types";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

type CommentProps = CommentApi & {
  nestingLevel: number;
};

export const Comment: FC<CommentProps> = ({
  _id,
  content,
  nestingLevel,
  color,
  authorAvatar,
  authorName,
  yourComment,
  likes,
  createdAt,
  parentId,
}) => {
  nestingLevel += 1;
  const [isAddCommentFormVisible, setIsAddCommentFormVisible] = useState<
    string | boolean
  >(false);
  const { getReplies } = useComment();
  const childComments = getReplies(_id);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      {isDialogOpen && (
        <RemoveCommentDialog
          commentId={_id}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
      <StyledComment $color={color}>
        <div className="circle"></div>
        <LikesBtn commentLikes={likes} commentId={_id} />
        <div className="main-container">
          <div className="profile-container">
            <ProfileAvatar imgName={authorAvatar} />
            <strong className="name">{authorName}</strong>
            {yourComment && <strong className="your-name">you</strong>}
            <p className="time-ago">
              {timeAgo.format(
                +new Date() - (+new Date() - +new Date(createdAt))
              )}
            </p>
          </div>
          <p className="description">{content}</p>
        </div>

        {yourComment ? (
          <CommentCTABtns
            isYourComment={true}
            onDelete={() => setIsDialogOpen(true)}
            onEdit={() =>
              setIsAddCommentFormVisible((prev) =>
                typeof prev === "string" ? false : "edit"
              )
            }
          />
        ) : (
          <CommentCTABtns
            isYourComment={false}
            onReply={() =>
              setIsAddCommentFormVisible((prev) =>
                typeof prev === "string" ? false : "add"
              )
            }
          />
        )}
      </StyledComment>

      {(isAddCommentFormVisible || childComments?.length > 0) && (
        <>
          {isAddCommentFormVisible === "add" ? (
            <AddCommentForm
              action="add"
              nestedClass={true}
              onSubmit={() => setIsAddCommentFormVisible(false)}
              parentId={nestingLevel >= 4 ? parentId : _id}
            />
          ) : (
            isAddCommentFormVisible === "edit" && (
              <AddCommentForm
                action="edit"
                onSubmit={() => setIsAddCommentFormVisible(false)}
                commentId={_id}
                content={content}
              />
            )
          )}
          {childComments?.length > 0 && (
            <CommentList
              comments={childComments}
              nestedClass={true}
              nestingLevel={nestingLevel}
            />
          )}
        </>
      )}
    </>
  );
};

const StyledComment = styled.div<{ $color: string }>(({ theme, $color }) => {
  return css`
    --paddingValue: 15px;
    filter: blur(5px);
    animation: example 1s forwards;
    @keyframes example {
      to {
        filter: blur(0px);
      }
    }
    position: relative;
    border-radius: 7px;
    background-color: white;
    display: flex;
    align-items: flex-start;
    flex-direction: column-reverse;
    gap: 15px;
    padding: var(--paddingValue);
    overflow: hidden;

    > .circle {
      border-radius: 50%;
      width: 100px;
      height: 100px;
      background-color: ${$color};
      position: absolute;
      left: 0;
      top: 0%;
      z-index: -1;
      transform: translate(-40%, -40%);
    }
    > .main-container {
      display: flex;
      flex-direction: column;
      gap: 15px;
      > .profile-container {
        display: flex;
        align-items: center;
        gap: 15px;

        > .your-name {
          color: white;
          font-size: 0.8rem;
          background-color: ${theme.moderateBlue};
          padding: 3px 5px 3px 5px;
        }
        > .name {
          font-size: 0.9rem;
        }
        > .time-ago {
          font-size: 0.9rem;
          color: ${theme.grayishBlue};
        }
      }
      > p {
        font-size: 0.9rem;
        color: ${theme.grayishBlue};
        line-height: 1.3rem;
      }
    }

    @media screen and (min-width: 768px) {
      flex-direction: row;
      gap: 25px;
      --paddingValue: 25px;

      > .main-container {
        display: flex;
        flex-direction: column;
        gap: 20px;

        > p {
          line-height: 1.4rem;
        }
      }
    }
  `;
});
