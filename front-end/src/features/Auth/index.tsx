import { FC, useEffect } from "react";
import { signIn } from "../../services/user";

export const Auth: FC = () => {
  useEffect(() => {
    // signIn({})
  }, []);

  return <div>Auth</div>;
};

//use auth
// if jwtToken in localStorage = return isUserLogged=true
// else if userName and Password in localStorage = /users/signIn -> save JWT in localStorage
//
// return isUserLogged
