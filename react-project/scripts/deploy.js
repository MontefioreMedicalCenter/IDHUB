const fs = require("fs-extra");
const source = `build`;
const target = `request-response/dummy-backend/build`; // Please add your build path , where you have to copy this.

async function copyBuild(src, dest) {
  try {
    await fs.copySync(src, dest);
    console.log("Build copied successfully!");
  } catch (err) {
    console.error(err);
  }
}
copyBuild(source, target);
