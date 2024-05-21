import { FC, useEffect, useId, useState } from "react";
import { RadioInputList } from "./components/RadioInputList";
import c from "./RegisterForm.module.scss";
import { Overlay, zIndex } from "../../../Overlay";
import { UserDetails, register } from "../../../../services/user";
import { useAsyncFn } from "../../../../hooks/useAsync";
import { LS_PASSWORD, LS_USERNAME } from "../../../../constants";

type RegisterFormProps = {
  onSubmit: (data: UserDetails) => void;
};

export const RegisterForm: FC<RegisterFormProps> = ({ onSubmit }) => {
  const { execute, resData } = useAsyncFn(register);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("avatar1");
  const [color, setColor] = useState("orange");
  const id = useId();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    execute({ avatar, color, name });
  };

  useEffect(
    function onSuccess() {
      if (resData) {
        localStorage.setItem(LS_USERNAME, resData.username);
        localStorage.setItem(LS_PASSWORD, resData.password);
        onSubmit(resData);
      }
    },
    [resData]
  );

  return (
    <>
      <form
        onSubmit={submitHandler}
        style={{ zIndex: zIndex + 1 }}
        className={c.Form}
      >
        <div>
          <label className={c.Form_label} htmlFor={id}>
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={c.Form_input}
            type="text"
            name="name"
            id={id}
          />
        </div>
        <RadioInputList
          list={[
            "avatar1",
            "avatar6",
            "avatar4",
            "avatar3",
            "avatar5",
            "avatar2",
          ]}
          name="avatar"
          selected={avatar}
          setSelected={setAvatar}
        />
        <RadioInputList
          list={["orange", "teal", "violet", "seagreen", "burlywood", "tomato"]}
          name="color"
          selected={color}
          setSelected={setColor}
        />
        <button className={c.Form_button}>Create Account</button>
      </form>
      <Overlay />
    </>
  );
};
