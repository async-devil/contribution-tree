const request = require('request');
const cheerio = require('cheerio');
import schemes from './colorSchemes';

const importValues = {
  scheme: 'blue',
  user: 'async-devil', //TODO: Import it from RestAPI (GraphQL)
}

const {scheme, user} = importValues;
const url = `https://github.com/users/${user}/contributions`;
//* Grabbing theme from schemes
let selectedScheme = schemes[scheme];

//* Checking if scheme does exists
if (selectedScheme === undefined) {
  selectedScheme = schemes['default']
}

interface Data {
  color: string,
  contributions: string,
  date: string
}

const filter = (array:string) => {
  const colorMatch = (string:string) => {
    //* Searching for L{num} if not found, null
    let match:string[]|null = string.match(/L\d/gm);
    if (match === null) return selectedScheme.colorBg;
    switch (match[0]) {
        case 'L1':
            return selectedScheme.colorL1;
        case 'L2':
            return selectedScheme.colorL2;
        case 'L3':
            return selectedScheme.colorL3;
        case 'L4':
            return selectedScheme.colorL4;
        default:
            return selectedScheme.colorErr;
    }
  };

  //* Spliting data to array of css variable color, number of contributions and date
  const buffer = array
    .replace(/(<.*?var\()|(")|(\))|(data.*?=)|(>)/gm, '')
    .split(' ');

  const filtered:Data = {
    color: colorMatch(buffer[0]),
    contributions: buffer[1],
    date: buffer[2],
  };

  return filtered;
};

const contributionsFiltered:Data[] = [];

request(url, (error:any, response:any, body:any) => {
  if (!error) {
    const $ = cheerio.load(body);

    //* Spliting output to an array by </rect>
    let contributions:string[] = $('g').find('rect').toString().split('</rect>');

    for (let i = 0; i < contributions.length; i += 1) {
      contributionsFiltered.push(filter(contributions[i])); 
    }
  } else {
    throw new Error(error);
  }
});

const data = {
  contributionsData: contributionsFiltered,
  selectedTheme: selectedScheme,
}

export {data as default};