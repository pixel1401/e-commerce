import React from "react"
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { fs } from "../../config/Config"
import useProviderState from "../../context/StateContext"
import { ICart } from "../../Models/ICart"
import { IProduct } from "../../Models/IProduct"



type ProductItemProps = {
    products: IProduct
}

export function ProductItem({ products }: ProductItemProps) {

    const { user, uid } = useProviderState();

    const handleAddCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (user) {
            const cartProduct = new ICart(1, products.price, products).toJson()
            fs.collection('Cart ' + uid).doc(products.id).set(cartProduct);
        }
    }



    return (
        < >
            <Col style={{ marginTop: '20px' }}>
                <Card style={{ minWidth: '250px', height: '100%' }}>
                    <Card.Img height={300} variant="top" src={products.url} />
                    <Card.Body style={{ display: 'flex', flexDirection: 'column' }}>
                        <Row >
                            <Col>
                                <Card.Title>{products.title}</Card.Title>
                            </Col>
                            <Col xs='auto'>
                                <Card.Title>₸{new Intl.NumberFormat('ru-RU').format(products.price)}</Card.Title>
                            </Col>
                        </Row>
                        <Card.Text style={{ flex: '1 0 auto' }}>{products.description}</Card.Text>
                        <Button onClick={(e) => handleAddCart(e)} variant="primary">Add Basket</Button>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}