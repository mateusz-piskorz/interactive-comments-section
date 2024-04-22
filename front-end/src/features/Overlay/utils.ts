export const toggleBodyOverflow = (overflow: "hidden" | "visible") => {
  const className = "overflow-y-hidden";
  if (overflow === "hidden") {
    document.body.classList.add(className);
  } else {
    document.body.classList.remove(className);
  }
};
