const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const config = require("config");

const outputFolder = "public/assets";
const baseUrl = config.get("assetsBaseUrl");

module.exports = async (req, res, next) => {
  const images = new Array(req.files.length);

  const resizePromises = req.files.map(async (file) => {
    await sharp(file.path)
      .resize(2000)
      .jpeg({ quality: 50 })
      .toFile(path.resolve(outputFolder, file.filename + "_full.jpg"));

    fs.unlinkSync(file.path);

    images[parseInt(file.originalname.substring(5))] = file.filename;
  });

  await Promise.all([...resizePromises]);

  req.body.profileImage = `${baseUrl}${images[0]}_full.jpg`;

  next();
};
