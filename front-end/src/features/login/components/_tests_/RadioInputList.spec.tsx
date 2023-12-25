import { useState } from "react";
import { RadioInputList } from "../RadioInputList";
import { screen, render } from "@testing-library/react";

test("should render a radio input", () => {
  const onClickHandler = jest.fn();
  render(
    <RadioInputList
      choiceCase="color"
      list={["hi"]}
      selected="hi"
      setSelected={onClickHandler}
    />
  );

  const radioInput = screen.getByRole("radio");
  expect(radioInput).toBeInTheDocument();
});
