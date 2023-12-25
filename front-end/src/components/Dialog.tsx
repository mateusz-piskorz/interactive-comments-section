import { FC, ReactNode, useEffect, useState } from "react";
import ReactDom from "react-dom";
import { styled, css } from "styled-components";

type DialogProps = {
  children: ReactNode;
  wider?: boolean;
};

export const Dialog: FC<DialogProps> = ({ children, wider }) => {
  const [isDomReady, setIsDomReady] = useState<any>(false);

  useEffect(() => {
    setIsDomReady(document.getElementById("portal"));
  }, []);
  if (isDomReady) {
    return ReactDom.createPortal(
      <>
        <Modal $maxWidth={wider ? "350px" : "300px"}>{children}</Modal>
        <BackDrop />
      </>,
      isDomReady
    );
  } else {
    return null;
  }
};

const Modal = styled.div<{ $maxWidth: string }>(({ $maxWidth }) => {
  return css`
    background-color: white;
    border-radius: 15px;
    position: fixed;
    left: 50%;
    top: 20%;
    transform: translateX(-50%);
    z-index: 3;
    width: 90%;
    max-width: ${$maxWidth};
  `;
});

const BackDrop = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  backdrop-filter: blur(3px);
`;
