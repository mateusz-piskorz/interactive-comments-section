import { FC, useState } from "react";
import "./App.css";
import { Auth, useAuth } from "./features/Auth";

const App: FC = () => {
  const { user } = useAuth();

  return (
    <>
      <Auth />
      {user && <h1>Hello World and Welcome {user.username}</h1>}
    </>
  );
};

export default App;
