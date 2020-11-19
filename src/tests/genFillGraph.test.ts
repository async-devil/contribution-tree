const xLines = require('../utils/Generator') 

test('Generating 4x4 graph',() => { //TODO: fix the test
    expect(xLines(4)).toBe(`<line x1="{{_ 0}}" y1="{{_ 0}}" x2="{{_ 210}}" y2="{{_ 0}}"/>
<line x1="{{_ 0}}" y1="{{_ 25}}" x2="{{_ 210}}" y2="{{_ 25}}"/>
<line x1="{{_ 0}}" y1="{{_ 50}}" x2="{{_ 210}}" y2="{{_ 50}}"/>
<line x1="{{_ 0}}" y1="{{_ 75}}" x2="{{_ 210}}" y2="{{_ 75}}"/>
<line x1="{{_ 0}}" y1="{{_ 100}}" x2="{{_ 210}}" y2="{{_ 100}}"/>`)
})