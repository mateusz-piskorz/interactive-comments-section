import "@testing-library/jest-dom";
import { user } from "./constants";

jest.mock("../src/context/user", () => ({
  useUser: jest.fn(() => ({
    user,
  })),
}));
