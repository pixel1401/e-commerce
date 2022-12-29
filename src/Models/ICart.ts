import { IProduct } from "./IProduct";


export class ICart extends IProduct {
    count : number;
    totalProductPrice : number;

    constructor(  count : number , totalProductPrice : number , data:  IProduct ) {
        super( data.title , data.description , data.price , data.url , data.id );
        this.count = count;
        this.totalProductPrice = totalProductPrice;
    }


    toJson() {
        return {
            ...super.toJson() ,
            'count' : this.count,
            'totalProductPrice' : this.totalProductPrice 
        }
    }
}
