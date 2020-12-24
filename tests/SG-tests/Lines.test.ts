import { Constructor, Info } from '../../api/StandartGraph/SG-Constructor';

test('Generating 5x5 graph', () => {
  const info: Info = {
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
    factor: 1,
  };

  let graph = new Constructor(info);
  expect(graph.generate())
    .toBe(`<svg width=\"210\" height=\"110\" viewBox=\"0 0 210 110\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">
<g class=\"grid x-grid\">
<line x1=\"0\" y1=\"0\" x2=\"210\" y2=\"0\"/>
<line x1=\"0\" y1=\"25\" x2=\"210\" y2=\"25\"/>
<line x1=\"0\" y1=\"50\" x2=\"210\" y2=\"50\"/>
<line x1=\"0\" y1=\"75\" x2=\"210\" y2=\"75\"/>
<line x1=\"0\" y1=\"100\" x2=\"210\" y2=\"100\"/>
</g>
<g class=\"grid y-grid\">
<line x1=\"10\" y1=\"0\" x2=\"10\" y2=\"110\"/>
<line x1=\"60\" y1=\"0\" x2=\"60\" y2=\"110\"/>
<line x1=\"110\" y1=\"0\" x2=\"110\" y2=\"110\"/>
<line x1=\"160\" y1=\"0\" x2=\"160\" y2=\"110\"/>
<line x1=\"210\" y1=\"0\" x2=\"210\" y2=\"110\"/>
</g>
</svg>`);
});

test('Generating 5x5 graph with start points(20;20)', () => {
  const info: Info = {
    rows: 5,
    columns: 5,
    startPoints: {
      x: 20,
      y: 20,
    },
    insideWidth: 200,
    insideHeight: 100,
    outsideWidth: 10,
    outsideHeight: 10,
    factor: 1,
  };

  let graph = new Constructor(info);
  expect(graph.generate())
    .toBe(`<svg width=\"230\" height=\"130\" viewBox=\"0 0 230 130\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">
<g class=\"grid x-grid\">
<line x1=\"20\" y1=\"20\" x2=\"230\" y2=\"20\"/>
<line x1=\"20\" y1=\"45\" x2=\"230\" y2=\"45\"/>
<line x1=\"20\" y1=\"70\" x2=\"230\" y2=\"70\"/>
<line x1=\"20\" y1=\"95\" x2=\"230\" y2=\"95\"/>
<line x1=\"20\" y1=\"120\" x2=\"230\" y2=\"120\"/>
</g>
<g class=\"grid y-grid\">
<line x1=\"30\" y1=\"20\" x2=\"30\" y2=\"130\"/>
<line x1=\"80\" y1=\"20\" x2=\"80\" y2=\"130\"/>
<line x1=\"130\" y1=\"20\" x2=\"130\" y2=\"130\"/>
<line x1=\"180\" y1=\"20\" x2=\"180\" y2=\"130\"/>
<line x1=\"230\" y1=\"20\" x2=\"230\" y2=\"130\"/>
</g>
</svg>`);
});

test('Generating 5x5 graph with factor 2', () => {
  const info: Info = {
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
    factor: 2,
  };

  let graph = new Constructor(info);
  expect(graph.generate())
    .toBe(`<svg width=\"420\" height=\"220\" viewBox=\"0 0 420 220\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">
<g class=\"grid x-grid\">
<line x1=\"0\" y1=\"0\" x2=\"420\" y2=\"0\"/>
<line x1=\"0\" y1=\"50\" x2=\"420\" y2=\"50\"/>
<line x1=\"0\" y1=\"100\" x2=\"420\" y2=\"100\"/>
<line x1=\"0\" y1=\"150\" x2=\"420\" y2=\"150\"/>
<line x1=\"0\" y1=\"200\" x2=\"420\" y2=\"200\"/>
</g>
<g class=\"grid y-grid\">
<line x1=\"20\" y1=\"0\" x2=\"20\" y2=\"220\"/>
<line x1=\"120\" y1=\"0\" x2=\"120\" y2=\"220\"/>
<line x1=\"220\" y1=\"0\" x2=\"220\" y2=\"220\"/>
<line x1=\"320\" y1=\"0\" x2=\"320\" y2=\"220\"/>
<line x1=\"420\" y1=\"0\" x2=\"420\" y2=\"220\"/>
</g>
</svg>`);
});

test('Generating 5x5 graph with factor 2 and start points(20;20)', () => {
  const info: Info = {
    startPoints: {
      x: 20,
      y: 20,
    },
    insideWidth: 200,
    insideHeight: 100,
    outsideWidth: 10,
    outsideHeight: 10,
    rows: 5,
    columns: 5,
    factor: 2,
  };

  let graph = new Constructor(info);
  expect(graph.generate())
    .toBe(`<svg width=\"460\" height=\"260\" viewBox=\"0 0 460 260\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">
<g class=\"grid x-grid\">
<line x1=\"40\" y1=\"40\" x2=\"460\" y2=\"40\"/>
<line x1=\"40\" y1=\"90\" x2=\"460\" y2=\"90\"/>
<line x1=\"40\" y1=\"140\" x2=\"460\" y2=\"140\"/>
<line x1=\"40\" y1=\"190\" x2=\"460\" y2=\"190\"/>
<line x1=\"40\" y1=\"240\" x2=\"460\" y2=\"240\"/>
</g>
<g class=\"grid y-grid\">
<line x1=\"60\" y1=\"40\" x2=\"60\" y2=\"260\"/>
<line x1=\"160\" y1=\"40\" x2=\"160\" y2=\"260\"/>
<line x1=\"260\" y1=\"40\" x2=\"260\" y2=\"260\"/>
<line x1=\"360\" y1=\"40\" x2=\"360\" y2=\"260\"/>
<line x1=\"460\" y1=\"40\" x2=\"460\" y2=\"260\"/>
</g>
</svg>`);
});
