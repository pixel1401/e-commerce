import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { Interface } from "readline";
import { GetCurrentUser } from "../api/isSignIn";
import { auth, firebaseCollectionName, fs } from "../config/Config";
import { IProduct } from "../Models/IProduct";
import { IUsers } from "../Models/IUsers";



export type GlobalState = {
    user? : IUsers  ,
    uid : string , 
    products? : IProduct[] ,
    isSignIn? : boolean , 
    loading? : boolean 
    error? : any ,
    getSignIn : () => void   
}



const StateContext = createContext<GlobalState>({isSignIn : false ,} as GlobalState);






export function StateProvider ({children} : {children: ReactNode;}) {

    const [user , setUser] = useState<IUsers | undefined>();
    const [error ,setError] = useState();
    const [loading , setLoading] = useState<boolean>(false);
    const [isSignIn , setIsSignIn] = useState<boolean>(false);

    const [uid , setUid] = useState('');



    // useEffect(  () => {
        
    // } , [])



    async function getSignIn () {
        
        if(user) return;
        setLoading(true);
        auth.onAuthStateChanged(async user => {
            if (user) { 
                await fs.collection(firebaseCollectionName.users).doc(user.uid).get()
                    .then((snapshot) => {
                        setUser(snapshot!.data() as IUsers);
                        setIsSignIn(true);
                        setUid(user.uid);
                        
                    }).catch(err => {
                        setUser(undefined);
                        setUid('');
                        setError(err);
                        setIsSignIn(false);
                    })
            } else {
                setUser(undefined);
                
            }
        })
        setLoading(false);
    }


    const memoedValue = useMemo(
        () => ({
          user,
          loading,
          error,
          isSignIn,
          getSignIn ,
          uid
        }),
        [user, loading, error]
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