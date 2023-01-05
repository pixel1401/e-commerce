import { IBuyerInfo } from '../Models/IBuyerInfo';
import { useEffect, useState } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { auth, firebaseCollectionName, fs } from "../config/Config";
import { ICart } from "../Models/ICart";
import { IProduct } from "../Models/IProduct";
import { IUsers } from "../Models/IUsers";
import {v4 as uuidv4} from 'uuid';
import stripeDef from 'stripe';

const stripe = new stripeDef('sk_test_51MLSDHC9LsKsi7PzteGQ9R9fsU5KRJrDiC0sSeE30G4Sv7pZADJM4OAWhdM7hirH0mbdZDHkntujvU480ulx5jxz009rNB4iLd', {
    apiVersion: '2022-11-15',
});



// const stripe = require('stripe')('sk_test_51MLSDHC9LsKsi7PzteGQ9R9fsU5KRJrDiC0sSeE30G4Sv7pZADJM4OAWhdM7hirH0mbdZDHkntujvU480ulx5jxz009rNB4iLd');




export async function GetCurrentUser(uid: string) {
    return await fs.collection(firebaseCollectionName.users).doc(uid).get()
        .then((snapshot) => {
            return snapshot!.data() as IUsers;
        }).catch(err => {
            return undefined;
        })
}




export async function getProducts(): Promise<IProduct[] | undefined> {
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




export async function getCartUser(user: any, callback: (carts: ICart[]) => void) {
    fs.collection(firebaseCollectionName.cart + user.uid).onSnapshot(snapshot => {
        const newCartProducts: ICart[] = snapshot.docs.map((doc) => {
            let itemCart = (doc.data() as ICart);
            itemCart.id = doc.id;
            return itemCart;
        });
        return callback(newCartProducts);
    })
}







export async function setBuyerInfoAndCart(buyerInfo: IBuyerInfo, uid: string) {
    const infoUser: IUsers | undefined = await GetCurrentUser(uid);
    if (!infoUser) return;

    const buyerInfoUser = new IBuyerInfo(buyerInfo.CartPrice, buyerInfo.CartQty, buyerInfo.Address, buyerInfo.Tell, infoUser).toJson();

    await fs.collection(firebaseCollectionName.buyerInfo).add(buyerInfoUser);

    const cartData = await fs.collection(firebaseCollectionName.cart + uid).get();

    for (let snap of cartData.docs) {
        let data = snap.data();
        data.ID = snap.id;
        await fs.collection(firebaseCollectionName.buyerCart + uid).add(data);
        await fs.collection(firebaseCollectionName.cart + uid).doc(snap.id).delete();
    }
}




export async function buyCart (cart : any , token :any) {
    try {
        
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        const key = uuidv4();
        const charge = await stripe.charges.create({
            amount: cart.totalPrice * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: 'products descriptions here',
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip
                }
            }
        }, { idempotencyKey: key })


        console.log(charge);
        console.log(customer);
        

    }
    catch (error) {
        console.log(error);
        // status = "error"
    }
    // res.json({ status });
}

