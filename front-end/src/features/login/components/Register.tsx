import { FC, useEffect, useState, useId, FormEvent } from "react";
import { useAsyncFn } from "../../../hooks/useAsync";
import { register } from "../services/login";
import { OnLogin } from "../index";
import { RadioInputList } from "./RadioInputList";
import { styled, css } from "styled-components";
import { localStorageKey } from "../constants";
import { Dialog } from "../../../components/Dialog";

type RegisterProps = {
  onLogin: OnLogin;
};

export const Register: FC<RegisterProps> = ({ onLogin }) => {
  const { loading, error, value, execute } = useAsyncFn(register);
  const nameId = useId();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [color, setColor] = useState("");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (name !== "" && avatar !== "" && color !== "") {
      return execute({ name, avatar, color });
    }
  };
  useEffect(
    function onSuccessRegister() {
      if (value) {
        localStorage.setItem(localStorageKey, value._id);
        onLogin(value._id);
      }
    },
    [value]
  );
  return (
    <Dialog>
      <RegisterForm>
        <form onSubmit={submitHandler}>
          {error && (
            <strong className="error">register error: {error.code}</strong>
          )}
          <div className="name-wrapper">
            <label htmlFor={nameId}>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
              placeholder="name"
              id={nameId}
            />
          </div>
          <RadioInputList
            selected={avatar}
            setSelected={setAvatar}
            choiceCase="avatar"
            list={[
              "avatar1",
              "avatar6",
              "avatar4",
              "avatar3",
              "avatar5",
              "avatar2",
            ]}
          />
          <RadioInputList
            selected={color}
            setSelected={setColor}
            choiceCase="color"
            list={[
              "orange",
              "teal",
              "violet",
              "seagreen",
              "burlywood",
              "tomato",
            ]}
          />
          <button disabled={loading} type="submit">
            Submit
          </button>
        </form>
      </RegisterForm>
    </Dialog>
  );
};

const RegisterForm = styled.div(({ theme }) => {
  return css`
    z-index: 5;
    border-radius: 15px;
    background-color: white;
    padding: 40px;

    > form {
      display: flex;
      flex-direction: column;
      gap: 25px;

      > .error {
        color: red;
      }

      > button {
        padding: 15px;
        border: none;
        margin: auto;
        width: 120px;
        font-size: 1rem;
        font-weight: bold;
        background-color: ${theme.grayishBlue};
        border-radius: 7px;
        color: white;
      }
      > .name-wrapper {
        display: flex;
        flex-direction: column;
        gap: 10px;
        > label {
          color: ${theme.grayishBlue};
        }
        > input {
          padding: 10px;
          border: 2px solid rgba(0, 0, 0, 0.2);
          border-radius: 5px;
        }
      }
    }
  `;
});
