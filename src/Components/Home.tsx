import { NavBar } from "./Navbar";
import { Products } from "./Products";
import Container from 'react-bootstrap/Container';
import Col from "react-bootstrap/esm/Col";

export function Home () {
    return (
        <>
            <NavBar/>
            <Products/>
        </>
    )
}