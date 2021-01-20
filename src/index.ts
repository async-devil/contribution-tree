/*------------------------------------*/
require('dotenv').config();
const express = require('express');
import { StandartGraph } from '../api/StandartGraph/StandartGraph';

const app = express();
const port = process.env.PORT || 3000;
/*------------------------------------*/

/*------------------------------------*/
app.get('', (req: any, res: any) => {
  res.setHeader('Cache-Control', `public, max-age=300`);
  res.setHeader('Content-Type', 'image/svg+xml');
  const SG = new StandartGraph(
    {
      startPoints: {
        x: 3,
        y: 3,
      },
      insideWidth: 200,
      insideHeight: 100,
      outsideWidth: 10,
      outsideHeight: 10,
      rows: 10,
      columns: 10,
      factor: 5,
    },
    'blueGradient',
    [0, 25, 30, 28, 44, 40, 42, 38, 20, 22, 10, 44].sort(),
  );
  res.send(`${SG.getGradient}`);
});
/*------------------------------------*/

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
