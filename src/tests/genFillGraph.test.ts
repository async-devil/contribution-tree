import graph from '../utils/generator';

test('Generating 5x5 graph', () => {
  const info = {
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
  expect(graph(info)).toBe(`<svg width="{{_ 210}}" height="{{_ 110}}">
<g class="grid x-grid">
<line x1="{{_ 0}}" y1="{{_ 0}}" x2="{{_ 210}}" y2="{{_ 0}}"/>
<line x1="{{_ 0}}" y1="{{_ 25}}" x2="{{_ 210}}" y2="{{_ 25}}"/>
<line x1="{{_ 0}}" y1="{{_ 50}}" x2="{{_ 210}}" y2="{{_ 50}}"/>
<line x1="{{_ 0}}" y1="{{_ 75}}" x2="{{_ 210}}" y2="{{_ 75}}"/>
<line x1="{{_ 0}}" y1="{{_ 100}}" x2="{{_ 210}}" y2="{{_ 100}}"/>
</g>
<g class="grid y-grid">
<line x1="{{_ 10}}" y1="{{_ 0}}" x2="{{_ 10}}" y2="{{_ 110}}"/>
<line x1="{{_ 60}}" y1="{{_ 0}}" x2="{{_ 60}}" y2="{{_ 110}}"/>
<line x1="{{_ 110}}" y1="{{_ 0}}" x2="{{_ 110}}" y2="{{_ 110}}"/>
<line x1="{{_ 160}}" y1="{{_ 0}}" x2="{{_ 160}}" y2="{{_ 110}}"/>
<line x1="{{_ 210}}" y1="{{_ 0}}" x2="{{_ 210}}" y2="{{_ 110}}"/>
</g>
</svg>`);
});

test('Generating 5x5 graph with start points(20;20)', () => {
  const info = {
    rows: 5,
    columns: 5,
    multiplySymbol: '_',
    startPoints: {
      x: 20,
      y: 20,
    },
    insideWidth: 200,
    insideHeight: 100,
    outsideWidth: 10,
    outsideHeight: 10,
  };
  expect(graph(info)).toBe(`<svg width="{{_ 230}}" height="{{_ 130}}">
<g class="grid x-grid">
<line x1="{{_ 20}}" y1="{{_ 20}}" x2="{{_ 230}}" y2="{{_ 20}}"/>
<line x1="{{_ 20}}" y1="{{_ 45}}" x2="{{_ 230}}" y2="{{_ 45}}"/>
<line x1="{{_ 20}}" y1="{{_ 70}}" x2="{{_ 230}}" y2="{{_ 70}}"/>
<line x1="{{_ 20}}" y1="{{_ 95}}" x2="{{_ 230}}" y2="{{_ 95}}"/>
<line x1="{{_ 20}}" y1="{{_ 120}}" x2="{{_ 230}}" y2="{{_ 120}}"/>
</g>
<g class="grid y-grid">
<line x1="{{_ 30}}" y1="{{_ 20}}" x2="{{_ 30}}" y2="{{_ 130}}"/>
<line x1="{{_ 80}}" y1="{{_ 20}}" x2="{{_ 80}}" y2="{{_ 130}}"/>
<line x1="{{_ 130}}" y1="{{_ 20}}" x2="{{_ 130}}" y2="{{_ 130}}"/>
<line x1="{{_ 180}}" y1="{{_ 20}}" x2="{{_ 180}}" y2="{{_ 130}}"/>
<line x1="{{_ 230}}" y1="{{_ 20}}" x2="{{_ 230}}" y2="{{_ 130}}"/>
</g>
</svg>`);
});
