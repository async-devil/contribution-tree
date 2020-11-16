/*------------------------------------*/
const path = require("path");
import data from './utils/main';
const express = require("express");
const hbs = require("hbs");

const viewsDirPath = path.join(__dirname, "./templates/views");
const publicDirPath = path.join(__dirname, "./public");
const partialsDirPath = path.join(__dirname, "./templates/partials");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", viewsDirPath);
hbs.registerPartials(partialsDirPath);

app.use(express.static(publicDirPath));
/*------------------------------------*/

/*------------------------------------*/
app.get("", (req:any, res:any) => {
  let i:number = 280;
  res.render("index", {
      colorBg: data.selectedTheme.colorBg,
      colorL1: data.selectedTheme.colorL1,
      colorL2: data.selectedTheme.colorL2,
      colorL3: data.selectedTheme.colorL3,
      colorL4: data.selectedTheme.colorL4,

      color: data.contributionsData[i].color,
      contributions: data.contributionsData[i].contributions,
      date: data.contributionsData[i].date
    });
});
/*------------------------------------*/

app.listen(port, () => {
  console.log(`Server is on port ${port}`);
});