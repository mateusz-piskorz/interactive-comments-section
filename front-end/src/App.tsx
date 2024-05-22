import { FC } from "react";
import "./App.css";
import { useAuth, Auth } from "./features/Auth";

const App: FC = () => {
  const { user } = useAuth();

  return user ? <h1>Hello World and Welcome {user.username}</h1> : <Auth />;
};

export default App;
