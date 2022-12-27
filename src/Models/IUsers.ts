


export class IUsers {
    fullName? : string;
    email? : string;
    password? : string

    constructor(  fullName:string , email : string , password : string ) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
    }

    toJson() {
        return {
            'fullName' : this.fullName ,
            'email' : this.email ,
            'password' : this.password ,
        }
    }
}