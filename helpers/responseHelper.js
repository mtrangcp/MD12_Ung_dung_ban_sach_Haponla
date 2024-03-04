exports.respondError = (res, error) => {
  res.json({ error: error.message });
};

exports.respondSuccess = (res, statusCode, data) => {
  let message = "";
  switch (statusCode) {
    case 200:
      message = "Success: OK";
      break;
    case 201:
      message = "Success: Created";
      break;
    case 202:
      message = "Success: Accepted";
      break;
    case 203:
      message = "Success: Non-Authoritative Information";
      break;
    case 204:
      message = "Success: No Content";
      break;
    default:
      message = "Success";
  }

  res.status(statusCode).json({ data, statusCode, message });
};
