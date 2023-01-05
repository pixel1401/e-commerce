import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import { ChangeEvent, useState } from "react";
import { ICart } from "../../Models/ICart";
import { trash } from 'react-icons-kit/feather/trash';
import Icon from "react-icons-kit";
import React from "react";


type CartItemProps = {
    cart: ICart,
    changeCountCart: (cart: ICart) => void,
    deleteCart: (cart: ICart) => void
}


export function CartItem({ cart, changeCountCart, deleteCart }: CartItemProps) {

    const [totalPrice, setTotalPrice] = useState(cart.totalProductPrice);

    const handleChangeCount = (e: ChangeEvent<HTMLInputElement>) => {
        let countCart: number = Number(e.target.value);
        cart.count = countCart;
        cart.totalProductPrice = cart.price * countCart;
        setTotalPrice(cart.totalProductPrice);
        changeCountCart(cart);
    }



    return (
        <>
            <MDBCard className="rounded-3 mb-4">
                <MDBCardBody className="p-4">
                    <MDBRow className="justify-content-between align-items-center">
                        <MDBCol md="2" lg="2" xl="2">
                            <MDBCardImage className="rounded-3" fluid
                                src={cart.url}
                                alt="Cotton T-shirt" />
                        </MDBCol>
                        <MDBCol md="3" lg="3" xl="3">
                            <p className="lead fw-normal mb-2">{cart.title}</p>
                        </MDBCol>
                        <MDBCol md="3" lg="3" xl="2"
                            className="d-flex align-items-center justify-content-around">
                            <MDBBtn color="link" className="px-2">
                                <MDBIcon fas icon="minus" />
                            </MDBBtn>

                            <MDBInput onChange={(e) => handleChangeCount(e)} min={1} defaultValue={cart.count} type="number" size="sm" />

                            <MDBBtn color="link" className="px-2">
                                <MDBIcon fas icon="plus" />
                            </MDBBtn>
                        </MDBCol>
                        <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                            <MDBTypography tag="h5" className="mb-0">
                                T{totalPrice}
                            </MDBTypography>
                        </MDBCol>
                        <MDBCol onClick={() => deleteCart(cart)} md="1" lg="1" xl="1" className="text-end">
                            <Icon icon={trash} size={20} />
                        </MDBCol>

                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        </>
    )
}