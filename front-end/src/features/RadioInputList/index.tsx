import { FC, useId } from "react";
import { firstLetterUpperCase } from "../../utils";
import { ProfileAvatar, availableAvatars } from "../ProfileAvatar";
import c from "./RadioInputList.module.scss";

type StateType = {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

type RadioInputListPropsAvatar = StateType & {
  list: (typeof availableAvatars)[number][];
  name: "avatar";
};

type RadioInputListPropsColor = StateType & {
  list: string[];
  name: "color";
};

export const RadioInputList: FC<
  RadioInputListPropsAvatar | RadioInputListPropsColor
> = ({ name, list, selected, setSelected }) => {
  return (
    <div className={c.RadioInputList}>
      <p className={c.RadioInputList_paragraph}>{firstLetterUpperCase(name)}</p>
      <div className={c.RadioInputList_wrapper}>
        {list.map((value) => {
          const isSelected = selected === value;
          return (
            <RadioInput
              key={value}
              isSelected={isSelected}
              name={name}
              setSelected={setSelected}
              value={value}
            />
          );
        })}
      </div>
    </div>
  );
};

type RadioInputProps = {
  isSelected: boolean;
  name: "avatar" | "color";
  value: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const RadioInput: FC<RadioInputProps> = ({
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
