const checkWin = (fieldArr) => {
  const checkedField = fieldArr.flat();
  if (checkedField.pop() === 0) {
    const sortCheckedField = [...checkedField].sort((a, b) => a - b);
    if (checkedField.join('') === sortCheckedField.join('')) {
      document.dispatchEvent(new CustomEvent('win'));
    }
  }
};

export default checkWin;
