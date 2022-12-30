import { useEffect, useState } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { auth, firebaseCollectionName, fs } from "../config/Config";
import { ICart } from "../Models/ICart";
import { IProduct } from "../Models/IProduct";
import { IUsers } from "../Models/IUsers";




export async function GetCurrentUser(user : any)  {
            return await fs.collection(firebaseCollectionName.users).doc(user.uid).get()
                .then((snapshot) => {
                    return snapshot!.data() as IUsers;
                }).catch(err  => {
                    return undefined ; 
                }  )
}




export async function getProducts  ()  : Promise<IProduct[] | undefined> {
    const productsArray: IProduct[] = [];
    try {
        const products = await fs.collection(firebaseCollectionName.products).get();

        for (let snap of products.docs) {
            let data: IProduct = snap.data() as IProduct;
            data.id = snap.id;
            productsArray.push(data)
            if (productsArray.length == products.docs.length) {
                return productsArray;
            }
        }
    } catch (error) {
        console.log(error + '  ERROR GET PRODUCTS');
        return [];
    }
}




export async function getCartUser(user : any , callback : (carts : ICart[]) => void )  {
    fs.collection(firebaseCollectionName.cart + user.uid).onSnapshot( snapshot => {
        const newCartProducts: ICart[] =  snapshot.docs.map((doc) => {
            let itemCart = (doc.data() as ICart);
            itemCart.id = doc.id;
            return itemCart;
        });
        return callback(newCartProducts);
    })
} 






