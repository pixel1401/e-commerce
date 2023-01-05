import { FormEvent, useEffect, useState } from "react";
import { auth, firebaseCollectionName, fs } from "../../config/Config";
import useProviderState from "../../context/StateContext";
import { ICart } from "../../Models/ICart";
import { NavBar } from "../Navbar";
import StripeCheckout from 'react-stripe-checkout';

import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import { CartItem } from "./CartItem";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { ModalCart } from "./ModalCart";
import React from "react";
import { buyCart } from "../../api/api";

export function CartPage() {

    const { uid, cartState } = useProviderState();

    const cartProducts = cartState;

    const [totalPrice, setTotalPrice] = useState(0);


    const [showModal, setShowModal] = useState(false);

    const handleModalClose = () => setShowModal(false);
    const handleModalShow = () => setShowModal(true);



    const changeCountCart = (cart: ICart) => {
        fs.collection(firebaseCollectionName.cart + uid).doc(cart.id).update(cart).then(() => {
        })
    }



    const deleteCart = (cart: ICart) => {
        fs.collection(firebaseCollectionName.cart + uid).doc(cart.id).delete().then(() => {
        })
    }



    const getAllPrice = () => {
        let price = 0;
        for (let a of cartProducts) {
            price += a.totalProductPrice;
        }
        setTotalPrice(price);
    }



    useEffect(() => {
        getAllPrice();
    }, [cartProducts])



    const handleToken = async (token: any) => {

        return await toast.promise(
            fetchPayMent(),
            {
                error: {
                    render({ data }) {
                        console.log(data + 'Error');
                        return 'Error';
                    }
                },
                pending: 'Promise is pending',
                success: {
                    render({ data }) {
                        console.log(data + 'sucsess');
                        if (data) {
                            return 'Error'
                        } else {
                            return 'Payment was successful';
                        }
                    }
                }
            }
        );

        async function fetchPayMent() {
            const cart = { name: 'All Products', totalPrice }
            const response = await axios.post('http://localhost:8080/checkout', {
                token,
                cart
            })

            // const response = await buyCart(cart , token);

            // console.log(response);
            let { status } = response.data;
            console.log(status);
            if (status === 'success') {
                // const uid = auth.currentUser.uid;
                const carts = await fs.collection('Cart ' + uid).get();
                for (var snap of carts.docs) {
                    fs.collection('Cart ' + uid).doc(snap.id).delete();
                }
            }
            else {
                // 
                return Error;
            }
        }

        //  console.log(token);

    }


    return (
        <>
            <NavBar />
            <section className="h-100" style={{ backgroundColor: "#eee" }}>
                <MDBContainer className="py-5 ">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol md="10">
                            <MDBRow style={{ alignItems: 'center', marginBottom: '20px' }}>
                                <MDBCol  >
                                    <MDBTypography tag="h3" className="fw-normal mb-0 text-black">Shopping Cart</MDBTypography>
                                </MDBCol>
                                <MDBCol style={{ textAlign: 'right' }} >
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

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <StripeCheckout
                        stripeKey='pk_test_51MLSDHC9LsKsi7Pz7Q9now9QuzbMZABY6Yv0XhGxV88CsM6Hl96be1Vg9pF4ErJ12KJ18e9MdQ9LTzO2FNpHlkv600pc49oLi5'
                        token={handleToken}
                        billingAddress
                        shippingAddress
                        name='All Products'
                        amount={totalPrice * 100}
                    ></StripeCheckout>
                    <br />
                    <Button variant="primary" onClick={handleModalShow}>
                        Cash on Delivery
                    </Button>
                </div>

            </section>

            <ModalCart uid={uid} showModal={showModal} handleModalClose={handleModalClose} cartProducts={cartProducts} totalPrice={totalPrice} />

            <ToastContainer />

        </>
    )
}

