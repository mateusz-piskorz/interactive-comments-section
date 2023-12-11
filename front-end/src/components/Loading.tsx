import { FC } from "react";
import ReactLoading from "react-loading";
import { Dialog } from "./Dialog";

export const Loading: FC = () => {
  return (
    <Dialog>
      <ReactLoading
        color="rgba(0, 0, 0, 0.5)"
        type={"spin"}
        height={200}
        width={200}
      />
    </Dialog>
  );
};
