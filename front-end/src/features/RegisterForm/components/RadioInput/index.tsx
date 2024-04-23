import { FC, useId } from "react";
import c from "./RadioInput.module.scss";
import { ProfileAvatar } from "../../../ProfileAvatar";
type RadioInputProps = {
  isSelected: boolean;
  name: "avatar" | "color";
  value: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

export const RadioInput: FC<RadioInputProps> = ({
  isSelected,
  name,
  value,
  setSelected,
}) => {
  const id = useId();
  const className = `${c.RadioInput}${` ${
    isSelected ? c.RadioInput___selected : ""
  }`}`;
  return (
    <div className={className}>
      <input
        className={c.RadioInput_input}
        type="radio"
        name={name}
        required
        id={id}
        value={value}
        onChange={() => setSelected(value)}
        checked={isSelected}
      />
      {name === "avatar" ? (
        <label className={c.RadioInput_label} htmlFor={id}>
          <ProfileAvatar imgName={value as any} />
        </label>
      ) : (
        <label className={c.RadioInput_label} htmlFor={id}>
          <div
            style={{ backgroundColor: value }}
            className={c.RadioInput_colorCircle}
          ></div>
        </label>
      )}
    </div>
  );
};
