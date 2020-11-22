/*------------------------------------*/
const path = require('path');
import data from './utils/main';
import graph from './utils/generator';
const express = require('express');
const hbs = require('hbs');

const viewsDirPath = path.join(__dirname, './templates/views');
const publicDirPath = path.join(__dirname, './public');
const partialsDirPath = path.join(__dirname, './templates/partials');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', viewsDirPath);
hbs.registerPartials(partialsDirPath);
let factor: number = 1;

hbs.registerHelper('_', function (a: number) {
  return a * factor;
});

app.use(express.static(publicDirPath));
/*------------------------------------*/

/*------------------------------------*/
app.get('', (req: any, res: any) => {
  let i: number = 280;
  const info: any = {
    multiplySymbol: '_',
    startPoints: {
      x: 0,
      y: 0,
    },
    insideWidth: 200,
    insideHeight: 100,
    outsideWidth: 10,
    outsideHeight: 10,
    rows: 5,
    columns: 5,
  };

  let graphic: string = graph(info);
  res.render('index', {
    colorBg: data.selectedTheme.colorBg,
    colorL1: data.selectedTheme.colorL1,
    colorL2: data.selectedTheme.colorL2,
    colorL3: data.selectedTheme.colorL3,
    colorL4: data.selectedTheme.colorL4,

    color: data.contributionsData[i].color,
    contributions: data.contributionsData[i].contributions,
    date: data.contributionsData[i].date,
    graphic,
  });
});
/*------------------------------------*/

app.listen(port, () => {
  console.log(`Server is on port ${port}`);
});
