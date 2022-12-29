import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { firebaseCollectionName, fs } from "../config/Config";
import useProviderState from "../context/StateContext";
import { ICart } from "../Models/ICart";
import { NavBar } from "./Navbar";
import { ProductItem } from './ProductItem';

import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import { CartItem } from "./CartItem";



export function CartPage() {

    const { user, uid } = useProviderState();

    const [cartProducts, setCartProducts] = useState<ICart[]>([]);


    const getCartProducts = () => {
        if (uid) {
            fs.collection(firebaseCollectionName.cart + uid).onSnapshot(snapshot => {
                const newCartProducts: ICart[] = snapshot.docs.map((doc) => doc.data() as ICart);
                console.log(newCartProducts);
                setCartProducts(newCartProducts);
            })
        }
    }



    useEffect(() => {
        getCartProducts();
    }, [])







    return (
        <>
            <NavBar />
            <section className="h-100" style={{ backgroundColor: "#eee" }}>
                <MDBContainer className="py-5 ">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol md="10">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <MDBTypography tag="h3" className="fw-normal mb-0 text-black">
                                    Shopping Cart
                                </MDBTypography>

                            </div>

                            {cartProducts.length > 0
                                && cartProducts.map((item) => {
                                    return (
                                        <CartItem key={item.id} cart={item} />
                                    )
                                })
                            }

                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>






        </>
    )
}