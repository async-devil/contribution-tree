/*------------------------------------*/
const path = require("path");
import contributionsData from './utils/main';
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
      color: contributionsData[i].color,
      contributions: contributionsData[i].contributions,
      date: contributionsData[i].date
    });
});
/*------------------------------------*/

app.listen(port, () => {
  console.log(`Server is on port ${port}`);
});