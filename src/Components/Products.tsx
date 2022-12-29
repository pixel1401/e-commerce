import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { firebaseCollectionName, fs } from "../config/Config";
import { IProduct } from "../Models/IProduct";
import { ProductItem } from "./ProductItem";


export function Products() {

    const [products, setProducts] = useState<IProduct[]>([]);

    const getProducts = async () => {
        try {
            const products = await fs.collection(firebaseCollectionName.products).get();
            const productsArray: IProduct[] = [];

            for (let snap of products.docs) {
                let data: IProduct = snap.data() as IProduct;
                data.id = snap.id;
                productsArray.push(data)
                if (productsArray.length == products.docs.length) {
                    setProducts(productsArray);
                }
            }
        } catch (error) {
            console.log(error + '  ERROR GET PRODUCTS');
        }

    }


    useEffect(() => {
        getProducts();
    }, [])




    return (
        <Container style={{marginTop: '30px'}}>
            <h3 className="text-center">Products</h3>
            <hr />
            <br />
            <Row sm={2}  lg={3} xl={4}>
                {
                    products.length > 0 &&
                    products.map((item) => {
                        return (
                            <ProductItem products={item} key={item.id} />
                        )
                    })
                }
            </Row>
        </Container>
    )
}