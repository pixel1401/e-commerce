import React from "react";
import { NavBar } from "./Navbar";
import { Products } from "./Products/Products";



export function Home() {
    return (
        <>
            <NavBar />
            <Products />
        </>
    )
}