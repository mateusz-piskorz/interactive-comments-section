import { FC } from "react";
import ReactLoading from "react-loading";
import { Dialog } from "./Dialog";
import { styled } from "styled-components";

type LoadingProps = {
  topRightCorner?: boolean;
};

export const Loading: FC<LoadingProps> = ({ topRightCorner }) => {
  const size = topRightCorner ? 50 : 200;
  const reactLoading = (
    <ReactLoading
      color="rgba(0, 0, 0, 0.5)"
      type={"spin"}
      height={size}
      width={size}
    />
  );
  return (
    <>
      {topRightCorner ? (
        <Wrapper>{reactLoading}</Wrapper>
      ) : (
        <Dialog>{reactLoading}</Dialog>
      )}
    </>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 30px;
  right: 30px;
  z-index: 5;
`;
