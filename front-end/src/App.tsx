import { FC } from "react";
import { CommentsSystem } from "./features/commentsSystem/index";
import { Login } from "./features/login";

const App: FC = () => {
  return (
    <>
      <Login />
      {/* <CommentsSystem /> */}
    </>
  );
};

export default App;
