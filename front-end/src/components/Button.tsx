import { FC, ReactNode } from "react";
import { styled, css } from "styled-components";

type Bg = "gray" | "red" | "blue" | "gold";

type ButtonProps = {
  background: Bg;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  linkBtn?: string;
};

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  background,
  disabled,
  linkBtn,
}) => {
  return (
    <>
      {linkBtn ? (
        <a href={linkBtn} target="_blank">
          <Btn disabled={disabled} $background={background} onClick={onClick}>
            {children}
          </Btn>
        </a>
      ) : (
        <Btn disabled={disabled} $background={background} onClick={onClick}>
          {children}
        </Btn>
      )}
    </>
  );
};

const Btn = styled.button<{ $background: Bg }>(
  ({ theme: { grayishBlue, softRed, moderateBlue }, $background }) => {
    return css`
      --gray: ${grayishBlue};
      --red: ${softRed};
      --blue: ${moderateBlue};
      --gold: rgb(243, 193, 27);

      border: none;
      color: ${$background === "gold" ? "black" : "white"};
      font-size: 0.9rem;
      font-weight: 700;
      letter-spacing: 0.5px;
      border-radius: 10px;
      padding: 15px 25px;
      background-color: ${`var(--${$background})`};
      cursor: pointer;
      &:hover {
        opacity: 0.7;
        &:disabled {
          opacity: 0.5;
        }
      }
      &:disabled {
        opacity: 0.5;
        cursor: default;
      }
    `;
  }
);
