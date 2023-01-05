import React from "react";
import { FormEvent, useRef } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { toast } from "react-toastify";
import { setBuyerInfoAndCart } from "../../api/api";
import { IBuyerInfo } from "../../Models/IBuyerInfo";
import { ICart } from "../../Models/ICart";


type ModalEventProps = {
    showModal : boolean
    handleModalClose: () => void
    totalPrice : number 
    cartProducts : ICart[]
    uid : string
}


export function ModalCart({ showModal, handleModalClose, totalPrice, cartProducts  , uid}: ModalEventProps )  {


    const telRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);




    const handleDelivery = async (e: FormEvent) => {
        e.preventDefault();
        handleModalClose()

        const tel = telRef.current!.value;
        const address = addressRef.current!.value;


        const buyerInfo = new IBuyerInfo(totalPrice.toString() , cartProducts.length.toString() , address , tel ); 

        return await toast.promise(
            setBuyerInfoAndCart(buyerInfo , uid) ,
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
                        if (data) {
                            return 'Error'
                        } else {
                            return 'Order was successful';
                        }
                    }
                }
            }
        );
    }



    return (
        <>
            <Modal
                show={showModal}
                onHide={handleModalClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => handleDelivery(e)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Tell address</Form.Label>
                            <Form.Control
                                name="tel"
                                type="tel"
                                placeholder="name@example.com"
                                autoFocus
                                ref={telRef}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Your Address</Form.Label>
                            <Form.Control ref={addressRef} name="address" required type="address" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Total Quantity</Form.Label>
                            <Form.Control  placeholder={`${cartProducts.length}`} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Total Price</Form.Label>
                            <Form.Control placeholder={`${totalPrice}`} disabled />
                        </Form.Group>

                        <Stack style={{ justifyContent: 'space-between' }} direction="horizontal">
                            <Button variant="secondary" onClick={handleModalClose}>
                                Close
                            </Button>
                            <Button type="submit" variant="primary">Send</Button>
                        </Stack>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    )
}