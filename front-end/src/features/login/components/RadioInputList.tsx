import { FC, useState } from "react";
import { styled, css } from "styled-components";
import { firstLetterUpperCase } from "../../../utils";
import {
  ProfileAvatar,
  availableAvatars,
} from "../../../components/ProfileAvatar";

type RadioInputListPropsAvatar = {
  list: (typeof availableAvatars)[number][];
  choiceCase: "avatar";
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

type RadioInputListPropsColor = {
  list: any[];
  choiceCase: "color";
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

export const RadioInputList: FC<
  RadioInputListPropsAvatar | RadioInputListPropsColor
> = ({ choiceCase, list, selected, setSelected }) => {
  return (
    <Wrapper>
      <p>{firstLetterUpperCase(choiceCase)}</p>
      <div className="children-wrapper">
        {list.map((item) => {
          const isSelected = selected === item;
          return (
            <ChoiceWrapper $isSelected={isSelected} key={item} $color={item}>
              <input
                type="radio"
                name={choiceCase}
                required
                id={item}
                value={item}
                onChange={() => setSelected(item)}
                checked={isSelected}
              />
              {choiceCase === "avatar" ? (
                <label htmlFor={item}>
                  <ProfileAvatar imgName={item} />
                </label>
              ) : (
                <label htmlFor={item}>
                  <div className="color-div"></div>
                </label>
              )}
            </ChoiceWrapper>
          );
        })}
      </div>
    </Wrapper>
  );
};

const ChoiceWrapper = styled.div<{ $isSelected: boolean; $color: string }>(
  ({ $isSelected, $color, theme }) => {
    return css`
      width: 40px;
      height: 40px;

      > label {
        > img {
          cursor: pointer;
          opacity: ${$isSelected ? "1" : ".5"};
          ${$isSelected && "transform: scale(1.1)"};
          width: 40px;
          height: 40px;
        }
        > .color-div {
          cursor: pointer;
          opacity: ${$isSelected ? "1" : ".5"};
          ${$isSelected && "transform: scale(1.1)"};
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: ${$color};
        }
      }

      > input[type="radio"] {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
      }
    `;
  }
);

const Wrapper = styled.div(({ theme }) => {
  return css`
    > p {
      color: ${theme.grayishBlue};
      margin-bottom: 10px;
    }
    > .children-wrapper {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
    }
  `;
});
