import { FC, ReactNode } from "react";
import { styled, css } from "styled-components";
import { Dialog } from "../../../components/Dialog";
import { Button } from "../../../components/Button";

type Props = {
  onClose: () => void;
  countDown: ReactNode;
};

export const HoldYourHorses: FC<Props> = ({ onClose, countDown }) => {
  return (
    <Dialog deleteCommentCase={true}>
      <Wrapper>
        <h4 className="title">Hold Your Horses!</h4>
        <p className="description">
          slow down, you're going too fast, you can only add one comment per 1
          minute
        </p>
        {countDown}
        {/* <strong className="time-left">4min 52sec</strong> */}
        <div className="btn-wrapper">
          <Button background="gray" onClick={onClose}>
            OK
          </Button>
          <Button
            background="gold"
            linkBtn="https://www.amazon.com/s?k=racing+horse"
          >
            Buy Another Horse
          </Button>
        </div>
      </Wrapper>
    </Dialog>
  );
};

const Wrapper = styled.div(({ theme }) => {
  return css`
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 15px;

    > .title {
      font-size: 1.3rem;
      color: ${theme.darkBlue};
    }

    > .description {
      font-size: 1rem;
      line-height: 1.1rem;
      color: ${theme.grayishBlue};
    }

    > .btn-wrapper {
      display: flex;
      gap: 25px;
    }
  `;
});
