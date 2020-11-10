const request = require('request');
const cheerio = require('cheerio');

const user = 'async-devil';
const url = `https://github.com/users/${user}/contributions`;
let contributions;

request(url, (error, response, body) => {
  if (!error) {
    const $ = cheerio.load(body);
    contributions = $('g').find('rect').toString();
    console.log(contributions);
  } else {
    throw new Error(error);
  }
});
