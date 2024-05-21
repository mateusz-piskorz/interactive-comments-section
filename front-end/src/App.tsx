import { FC, useState } from "react";
import "./App.css";
import { Auth } from "./features/Auth";

const App: FC = () => {
  const [isUserLogged, setIsUserLogged] = useState(false);
  return isUserLogged ? (
    <h1>Welcome</h1>
  ) : (
    <Auth onUserLogged={() => setIsUserLogged(true)} />
  );
};

export default App;
