import { FC, useId, useState, FormEvent } from "react";
import { RadioInputList } from "../RadioInputList";
import c from "./RegisterForm.module.scss";
import { Overlay, zIndex } from "../../../Overlay";
import { register } from "../../../../services/user";
import { LS_PASSWORD, LS_USERNAME } from "../../../../constants";
import { useMutation } from "@tanstack/react-query";

type RegisterFormProps = {
  onSubmit: () => void;
};

export const RegisterForm: FC<RegisterFormProps> = ({ onSubmit }) => {
  const { mutate, status } = useMutation({
    onSuccess: ({ username, password }) => {
      localStorage.setItem(LS_USERNAME, username);
      localStorage.setItem(LS_PASSWORD, password);
      onSubmit();
    },
    mutationFn: register,
    mutationKey: ["register"],
  });
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("avatar1");
  const [color, setColor] = useState("orange");
  const id = useId();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ avatar, color, name });
  };

  if (status === "pending") {
    return <h1>Loading...</h1>;
  }

  if (status === "error") {
    return <h1>register failed, please try again</h1>;
  }

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
