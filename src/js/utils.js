export const createHTMLElement = (tag, ...classes) => {
  const elem = document.createElement(tag);
  classes.forEach((className) => {
    elem.classList.add(className);
  });
  return elem;
};

export const createButton = (innerText) => {
  const button = document.createElement('button');
  button.innerText = innerText;
  return button;
};
