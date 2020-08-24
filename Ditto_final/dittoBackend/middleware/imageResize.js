const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const config = require("config");

const outputFolder = "public/assets";
const baseUrl = config.get("assetsBaseUrl");

module.exports = async (req, res, next) => {
  console.log("did you?", req);
  const images = new Array(req.files.length);

  const resizePromises = req.files.map(async (file) => {
    await sharp(file.path)
      .resize(2000)
      .jpeg({ quality: 50 })
      .toFile(path.resolve(outputFolder, file.filename + "_full.jpg"));

    let fileContent = fs.readFileSync(file.path);
    array.push(fileContent);

    fs.unlinkSync(file.path);

    images[parseInt(file.originalname.substring(5))] = file.filename;
  });

  await Promise.all([...resizePromises]);

  console.log("this is an images", images);

  req.body.backgroundImage = `${baseUrl}${images[1]}_full.jpg`;
  req.body.mainImage = `${baseUrl}${images[0]}_full.jpg`; //not sure with the order

  let menuImages = [];
  for (var i = 2; i < images.length; i++) {
    menuImages.push(`${baseUrl}${images[i]}_full.jpg`);
  }

  let menuArray = [];
  const menuNames = JSON.parse(req.body.menuNames);
  const menuPrices = JSON.parse(req.body.menuPrices);
  for (var i = 2; i < images.length; i++) {
    menuArray.push({
      name: menuNames[i - 2],
      price: menuPrices[i - 2],
      image: menuImages[i - 2],
    });
  }

  req.body.menus = menuArray;

  next();
};
