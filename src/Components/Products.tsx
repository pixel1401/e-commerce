import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { firebaseCollectionName, fs } from "../config/Config";
import useProviderState from "../context/StateContext";
import { IProduct } from "../Models/IProduct";
import { ProductItem } from "./ProductItem";


export function Products() {
    const { products } = useProviderState();



    return (
        <Container style={{ marginTop: '30px' }}>
            <h3 className="text-center">Products</h3>
            <hr />
            <br />
            {(products != undefined && products.length > 0) &&
                (
                    <Row sm={2} lg={3} xl={4}>
                        {
                            products.map((item) => {
                                return (
                                    <ProductItem products={item} key={item.id} />
                                )
                            })
                        }
                    </Row>
                )
            }

        </Container>
    )
}