/*------------------------------------*/
require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
/*------------------------------------*/

/*------------------------------------*/
app.get('', (req: any, res: any) => {
  res.setHeader('Cache-Control', `public, max-age=300`);
  res.setHeader('Content-Type', 'image/svg+xml');
});
/*------------------------------------*/

app.listen(port, () => {
  console.log(`Server is on port ${port}`);
});
