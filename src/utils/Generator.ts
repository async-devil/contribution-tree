interface Info {
    multiplySymbol:string,
    //* All X info
    startXfrom:number,
    endXon:number,
    //* All Y info
    startYfrom:number,
    endYon:number,
    //* All width and height parametrs
    insideWidth:number,
    insideHeight:number,
    outsideWidth:number,
    outsideHeight:number,
}

const data:Info = { //TODO: make finally REST API
    multiplySymbol: "_",
    startXfrom: 0,
    endXon: 210,
    startYfrom: 10,
    endYon: 110,
    insideWidth: 200,
    insideHeight: 100,
    outsideWidth: 10,
    outsideHeight: 10,
}

const globalStart = function (value:string):string {
        return `<g class="grid ${value}-grid">`
};
const line = function (x1:number, y1:number, x2:number, y2:number, symb:string):string {
    return `<line x1="{{${symb} ${x1}}}" y1="{{${symb} ${y1}}}" x2="{{${symb} ${x2}}}" y2="{{${symb} ${y2}}}"/>`
};
const globalEnd:string = `</g>`;

const xLines = function (num:number):string {
    let buffer:string[] = []
    for (let i = 0; i <= num; i++) {
        let y:number
        y = data.insideHeight/num*i
        if (i === 0) {
            y = 0
        }
        buffer.push(line(data.startXfrom, y, data.endXon, y, data.multiplySymbol))
    }
    return buffer.join("\n")
}

export {xLines as default};