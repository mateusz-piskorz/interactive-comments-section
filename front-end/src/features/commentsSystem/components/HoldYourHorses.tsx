import { FC, ReactNode } from "react";
import { styled } from "styled-components";
import { Dialog } from "../../../components/Dialog";
import { Button } from "../../../components/Button";

type Props = {
  onClose: () => void;
  countDown: ReactNode;
};

export const HoldYourHorses: FC<Props> = ({ onClose, countDown }) => {
  return (
    <Dialog wider={true}>
      <Wrapper>
        <h4 className="title">Hold Your Horses!</h4>
        <p className="description">
          slow down, you're going too fast, you can only add one comment per 1
          minute
        </p>
        {countDown}
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

const Wrapper = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  > .btn-wrapper {
    display: flex;
    gap: 25px;
  }
`;
