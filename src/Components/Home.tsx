import { NavBar } from "./Navbar";
import { Products } from "./Products";
import Container from 'react-bootstrap/Container';
import Col from "react-bootstrap/esm/Col";
import { useEffect, useState } from "react";
import { auth, firebaseCollectionName, fs } from "../config/Config";
import { IUsers } from "../Models/IUsers";
import { IProduct } from "../Models/IProduct";

export function Home () {




    function GetCurrentUser  ()  {
        const [user, setUser] = useState<IUsers | null >(null);
        useEffect(()=> {
            auth.onAuthStateChanged(user=> {
                if(user) {
                    fs.collection(firebaseCollectionName.users).doc(user.uid).get()
                    .then((snapshot) => {
                        setUser(snapshot!.data() as IUsers);
                    })
                }else {
                    setUser(null);
                }
            })
        }, []);
        return user;
    }
    const user = GetCurrentUser();
    console.log(user);






    return (
        <>
            <NavBar user={user} />
            <Products/>
        </>
    )
}