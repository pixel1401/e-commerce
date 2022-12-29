import { useEffect, useState } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { auth, firebaseCollectionName, fs } from "../config/Config";
import { IUsers } from "../Models/IUsers";




export async function GetCurrentUser()  {
    return auth.onAuthStateChanged(async user => {
        if (user) { 
            await fs.collection(firebaseCollectionName.users).doc(user.uid).get()
                .then((snapshot) => {
                    return snapshot!.data() as IUsers;
                }).catch(err => err)
        } else {
            return undefined;
        }
    })
}



