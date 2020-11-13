/* eslint-disable no-console */
const request = require('request');
const cheerio = require('cheerio');

const user = 'async-devil';
const url = `https://github.com/users/${user}/contributions`;
let contributions:string[]|string;
const contributionsFiltered:Object[] = [];
type Data = {
  color: string,
  contributions: string,
  date: string,
}

const filter = (array:string) => {
  const colorMatch = (string:string) => {
    switch (string) {
      case '--color-calendar-graph-day-L1-bg':
        return '#9be9a8';
      case '--color-calendar-graph-day-L2-bg':
        return '#40c463';
      case '--color-calendar-graph-day-L3-bg':
        return '#30a14e';
      case '--color-calendar-graph-day-L4-bg':
        return '#216e39';
      default:
        return '#ebedf0'; 
    }
  };
  console.log(array);
  const buffer = array
    .replace(/<.*?var\(/gm, '')
    .replace(/(")/gm, '')
    .replace(/(\))/gm, '')
    .replace(/data.*?=/gm, '')
    // eslint-disable-next-line comma-dangle
    .replace(/(>)/, '')
    .split(' ');

  const filtered:Data = {
    color: colorMatch(buffer[0]),
    contributions: buffer[1],
    date: buffer[2],
  };

  return filtered;
};

request(url, (error:any, response:any, body:any) => {
  if (!error) {
    const $ = cheerio.load(body);

    contributions = $('g').find('rect').toString().split('</rect>');

    for (let i = 0; i < contributions.length; i += 1) {
      contributionsFiltered.push(filter(contributions[i]));
    }

    console.log(contributionsFiltered);
  } else {
    throw new Error(error);
  }
});
