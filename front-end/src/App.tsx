import { FC, useState } from "react";
import "./App.css";
import { useAuth, RegisterForm } from "./features/Auth";

const App: FC = () => {
  const { user } = useAuth();

  return user ? (
    <h1>Hello World and Welcome {user.username}</h1>
  ) : (
    <RegisterForm />
  );
};

export default App;
