exports.errorHelper = (error) => {
  let  message = "";

  if (error.errors) {
    message = Object.values(error.errors).join('\n');
  } else {
    message = error.message;
  }

  console.log(message);

  return message;
};
