const request = require('request');
const cheerio = require('cheerio');

const user = 'async-devil';
const url = `https://github.com/users/${user}/contributions`;
let contributions;

request(url, (error, response, body) => {
  if (!error) {
    const $ = cheerio.load(body);
    contributions = $('.js-calendar-graph-svg').html();
  } else {
    throw new Error(error);
  }
});

export { contributions as default };
