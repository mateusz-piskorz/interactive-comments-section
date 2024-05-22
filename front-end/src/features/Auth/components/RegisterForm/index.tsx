import { FC, useId, useState, FormEvent } from "react";
import { RadioInputList } from "../RadioInputList";
import c from "./RegisterForm.module.scss";
import { Overlay, zIndex } from "../../../Overlay";
import { register } from "../../services";
import { LS_PASSWORD, LS_USERNAME } from "../../../../constants";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context";

export const RegisterForm: FC = () => {
  const { setUser } = useAuth();
  const { mutate, status } = useMutation({
    onSuccess: (user) => {
      localStorage.setItem(LS_USERNAME, user.username);
      localStorage.setItem(LS_PASSWORD, user.password);
      setUser(user);
    },
    mutationFn: register,
    mutationKey: ["register"],
  });
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("avatar1");
  const [color, setColor] = useState("orange");
  const id = useId();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ avatar, color, username });
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
