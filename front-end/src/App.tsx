import { FC, useState } from "react";
import "./App.css";
import { Auth } from "./features/Auth";

const App: FC = () => {
  const [isUserLogged, setIsUserLogged] = useState(false);

  return (
    <>
      <Auth onUserLogged={() => setIsUserLogged(true)} />
      {isUserLogged && <h1>Hello World and Welcomm</h1>}
    </>
  );
};

export default App;
