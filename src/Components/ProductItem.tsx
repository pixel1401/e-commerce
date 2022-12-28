import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { IProduct } from "../Models/IProduct"



type ProductItemProps = {
    products : IProduct[]
}

export function ProductItem ({products} : ProductItemProps) {
    return (
            <Row  sm={2}  lg={3} xl={4} >
                {(products.length < 1) ? (
                    <>
                    </>
                ) :
                    products.map((item) => {
                        return (
                            <Col key={item.id}>  
                                <Card  style={{ minWidth: '250px' , height:'100%' }}>
                                    <Card.Img height={300} variant="top" src={item.url} />
                                    <Card.Body style={{display:'flex' , flexDirection: 'column'}}>
                                        <Row >
                                            <Col>
                                                <Card.Title>{item.title}</Card.Title>
                                            </Col>
                                            <Col xs='auto'>
                                                <Card.Title>₸{ new Intl.NumberFormat('ru-RU').format(item.price)}</Card.Title>
                                            </Col>
                                        </Row>
                                        <Card.Text style={{flex:'1 0 auto'}}>{item.description}</Card.Text>
                                        <Button variant="primary">Add Basket</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
    )
}