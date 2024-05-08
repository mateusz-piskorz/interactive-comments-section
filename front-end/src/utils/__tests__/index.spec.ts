import { firstLetterUpperCase } from "../index";

it("firstLetterUpperCase returns string with first capital first letter", () => {
  expect(firstLetterUpperCase("text")).toBe("Text");
});
