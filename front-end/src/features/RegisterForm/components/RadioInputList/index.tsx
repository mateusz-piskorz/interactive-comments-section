import { FC } from "react";
import { firstLetterUpperCase } from "../../../../utils";
import { availableAvatars } from "../../../ProfileAvatar";
import c from "./RadioInputList.module.scss";
import { RadioInput } from "../RadioInput";

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
