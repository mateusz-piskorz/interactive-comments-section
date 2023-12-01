import { FC, useState } from "react";
import { styled, css } from "styled-components";
import { useComment } from "../context/CommentsContext";
import { CommentList } from "./CommentList";
import { AddCommentForm } from "./AddCommentForm";
import { LikesBtn } from "./LikesBtn";
import { ProfileAvatar } from "../../../components/ProfileAvatar";
import { CommentCTABtns } from "./CommentCTABtns";

type CommentProps = {
  _id: string;
  content: string;
  nestingLevel: number;
};

export const Comment: FC<CommentProps> = ({ _id, content, nestingLevel }) => {
  nestingLevel += 1;
  const [isAddReplyVisible, setIsAddReplyVisible] = useState(false);
  const { getReplies } = useComment();
  const childComments = getReplies(_id);
  return (
    <>
      <StyledComment>
        <LikesBtn numberOfLikes={nestingLevel} />
        <div className="main-container">
          <div className="profile-container">
            <ProfileAvatar imgName="avatar1" />
            <strong className="name">amyrobson</strong>
            <p className="time-ago">1 month ago</p>
          </div>
          <p className="description">{content}</p>
        </div>

        {nestingLevel < 4 && (
          <CommentCTABtns
            isYourComment={false}
            // onDelete={() => {}}
            // onEdit={() => setIsAddReplyVisible((prev) => !prev)}
            onReply={() => setIsAddReplyVisible((prev) => !prev)}
          />
        )}
      </StyledComment>

      {(isAddReplyVisible || childComments?.length > 0) && (
        <>
          {isAddReplyVisible && (
            <AddCommentForm
              nestedClass={true}
              onSubmit={() => setIsAddReplyVisible(false)}
              parentId={_id}
            />
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

const StyledComment = styled.div(({ theme }) => {
  return css`
    --paddingValue: 15px;

    position: relative;
    border-radius: 7px;
    background-color: white;
    display: flex;
    align-items: flex-start;
    flex-direction: column-reverse;
    gap: 15px;
    padding: var(--paddingValue);

    > .main-container {
      display: flex;
      flex-direction: column;
      gap: 15px;
      > .profile-container {
        display: flex;
        align-items: center;
        gap: 15px;

        > strong {
          font-size: 0.9rem;
        }
        > p {
          font-size: 0.9rem;
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
