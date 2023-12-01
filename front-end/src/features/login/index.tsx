import { FC, useId, useState, FormEvent } from "react";
import { styled, css } from "styled-components";
import { RadioInputList } from "./components/RadioInputList";

export const Login: FC = () => {
  const nameId = useId();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [color, setColor] = useState("");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(name);
    console.log(avatar);
    console.log(color);
  };
  return (
    <>
      <LoginForm>
        <form onSubmit={submitHandler}>
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
          <button type="submit">Submit</button>
        </form>
      </LoginForm>
      <BackDrop />
    </>
  );
};

const LoginForm = styled.div(({ theme }) => {
  return css`
    z-index: 5;
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translateX(-50%);
    max-width: 300px;
    border-radius: 15px;
    background-color: white;
    width: 90%;
    padding: 40px;

    > form {
      display: flex;
      flex-direction: column;
      gap: 25px;

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

const BackDrop = styled.div(() => {
  return css`
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
    backdrop-filter: blur(3px);
  `;
});
