const SIMPLE_NAME_REGEX = /^[a-zA-Z0-9-]+$/i;

const validateId = (value) => {
  const minLength = 2;
  const maxLength = 32;

  return (
    (SIMPLE_NAME_REGEX.test(value) &&
      value.length >= minLength &&
      value.length <= maxLength) ||
    `This field is not valid, format: ${minLength} to ${maxLength} chars matching ${SIMPLE_NAME_REGEX}`
  );
};

export { validateId };
