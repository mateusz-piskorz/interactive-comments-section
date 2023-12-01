import { FC, useState } from "react";
import { CommentsSystem } from "./features/commentsSystem/index";
import { Login } from "./features/login";

const App: FC = () => {
  const [isLogged, setIsLogged] = useState("");

  const loginHandler = (userId: string) => {
    setIsLogged(userId);
  };

  return (
    <>
      {isLogged !== "" ? (
        <CommentsSystem userId={isLogged} />
      ) : (
        <Login onLogin={loginHandler} />
      )}
    </>
  );
};

export default App;
