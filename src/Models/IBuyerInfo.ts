import { IUsers } from './IUsers';



export class IBuyerInfo extends IUsers {
    CartPrice : string;
    CartQty : string;
    Address: string;
    Tell : string

    constructor(CartPrice: string, CartQty: string, Address: string , Tell :string , data ? : IUsers) {
        super(data?.fullName ?? '' , data?.email ?? '' , data?.password ?? '');
        this.CartPrice = CartPrice;
        this.CartQty = CartQty;
        this.Address = Address;
        this.Tell = Tell;
    }


    


    toJson() {
        return {
            ...super.toJson(),
            'CartPrice': this.CartPrice,
            'CartQty': this.CartQty , 
            'Address': this.Address , 
            'Tell' : this.Tell
        }
    }
}