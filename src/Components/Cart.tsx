import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
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
import { log } from "console";



export function CartPage() {

    const { user, uid, cartState } = useProviderState();

    const cartProducts = cartState;

    const [totalPrice, setTotalPrice] = useState(0);


    const changeCountCart = (cart: ICart) => {
        getAllPrice();
        fs.collection(firebaseCollectionName.cart + uid).doc(cart.id).update(cart).then(() => {
            console.log('WORK');
        })
    }



    const deleteCart = (cart: ICart) => {
        fs.collection(firebaseCollectionName.cart + uid).doc(cart.id).delete().then(() => {
            console.log('delete');
        })
        getAllPrice();
    }



    const getAllPrice = () => {
        console.log('awdawdawda');

        let price = 0;
        for (let a of cartProducts) {
            price += a.totalProductPrice;
        }
        setTotalPrice(price);
    }



    useEffect(() => {
        getAllPrice();
    }, [])


    return (
        <>
            <NavBar />
            <section className="h-100" style={{ backgroundColor: "#eee" }}>
                <MDBContainer className="py-5 ">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol md="10">
                                <MDBRow style={{alignItems : 'center' , marginBottom : '20px'}}>
                                    <MDBCol  >
                                        <MDBTypography tag="h3" className="fw-normal mb-0 text-black">Shopping Cart</MDBTypography>
                                    </MDBCol>
                                    <MDBCol style={{textAlign:'right'}} >
                                        {cartProducts.length > 0 && <div>Total Price: {totalPrice}</div>}
                                    </MDBCol>
                                </MDBRow>


                            {cartProducts.length > 0
                                && cartProducts.map((item) => {
                                    return (
                                        <>
                                            <CartItem key={item.id} changeCountCart={changeCountCart} deleteCart={deleteCart} cart={item} />

                                        </>
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