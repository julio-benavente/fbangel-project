const imageLink = (hostname, file) => {
  const link = `${
    hostname === "localhost" ? "http://localhost:5000" : "https://" + hostname
  }/uploads/${file.filename.replace(" ", "_")}`;
  return link;
};

module.exports = { imageLink };
