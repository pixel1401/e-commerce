

export class IProduct {
    id? :string
    title: string;
    description: string;
    price : number;
    url : string;

    constructor(title :string , description : string , price : number ,url : string , id? : string) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.url = url;
        if(id != undefined) {
            this.id = id
        }
    }

    toJson () {
        return {
            'title':this.title,
            'description' : this.description,
            'price' : this.price,
            'url' : this.url,
        }
    }
}