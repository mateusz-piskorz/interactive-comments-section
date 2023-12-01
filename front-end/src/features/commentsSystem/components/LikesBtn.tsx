import { FC } from "react";
import { styled, css } from "styled-components";
import iconMinus from "../assets/icon-minus.svg";
import iconPlus from "../assets/icon-plus.svg";

type LikesBtnProps = {
  numberOfLikes: number;
};

export const LikesBtn: FC<LikesBtnProps> = ({ numberOfLikes }) => {
  return (
    <Wrapper className="like-container">
      <button>
        <img src={iconPlus} alt="plus icon" />
      </button>
      <strong>{numberOfLikes}</strong>
      <button>
        <img src={iconMinus} alt="minus icon" />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div(({ theme }) => {
  return css`
    display: inline-flex;
    background-color: ${theme.veryLightGray};
    padding: 8px 13px 8px 13px;
    border-radius: 10px;
    gap: 20px;

    > strong {
      color: ${theme.moderateBlue};
      font-size: 0.9rem;
    }

    > button {
      background-color: transparent;
      border: none;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      opacity: 0.3;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
    }

    @media screen and (min-width: 768px) {
      flex-direction: column;
      padding: 15px 10px 15px 10px;
      gap: 15px;

      > strong {
        font-size: 0.9rem;
      }
    }
  `;
});
