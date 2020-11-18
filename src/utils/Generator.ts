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
    //* Use default values
    useDefaultClasses:boolean,
    customXClass?:string,
    customYClass?:string,
}

class Generator {
    data: Info;

    constructor(value: Info) {
        this.data = value;
    }
}