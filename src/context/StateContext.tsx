import React from 'react';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { Interface } from "readline";
import { getCartUser, GetCurrentUser, getProducts } from "../api/api";
import { auth, firebaseCollectionName, fs } from "../config/Config";
import { IBuyerInfo } from "../Models/IBuyerInfo";
import { ICart } from "../Models/ICart";
import { IProduct } from "../Models/IProduct";
import { IUsers } from "../Models/IUsers";



export type GlobalState = {
    user?: IUsers,
    uid: string,
    products?: IProduct[],
    isSignIn?: boolean,
    loading?: boolean
    error?: any,
    cartState: ICart[]
}



const StateContext = createContext<GlobalState>({ isSignIn: false, } as GlobalState);






export function StateProvider({ children }: { children: ReactNode; }) {

    const [user, setUser] = useState<IUsers | undefined>();
    const [products, setProducts] = useState<IProduct[]>([])
    const [cartState, setCartState] = useState<ICart[]>([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState<boolean>(false);
    const [isSignIn, setIsSignIn] = useState<boolean>(false);
    const [uid, setUid] = useState('');





    const getAllData = async () => {
        setLoading(true);

        auth.onAuthStateChanged(async user => {
            if (user) {
                let currentUser = await GetCurrentUser(user.uid);
                setUser(currentUser);
                setIsSignIn(true);
                setUid(user.uid);

                await getCartUser(user, async (carts) => {
                    console.log(carts);
                    setCartState(carts);
                })
            }
        })

        await getProducts().then((products) => {
            if (products != undefined) {
                console.log(products);

                setProducts(products);
            }
        })
        setLoading(false);
    }




    useEffect(() => {
        getAllData()
    }, [])




    const setOrderCash = (buyerInfo: IBuyerInfo) => {
        if (!uid) return;


    }





    const memoedValue = useMemo(
        () => ({
            user,
            loading,
            error,
            isSignIn,
            cartState,
            uid,
            products
        }),
        [user, loading, error, cartState]
    );





    return (
        <StateContext.Provider value={memoedValue}>
            {children}
        </StateContext.Provider>
    )
}



export default function useProviderState() {
    return useContext(StateContext);
} 