import { FormEvent, useRef, useState } from "react";
import { Alert, Button, Col, Container, Form, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth } from "../config/Config";
import { RouterPath } from "../const";

export function LoginPage () {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);


    const [errorMsg , setErrorMsg] = useState('');
    const [successMsg , setSuccessMsg] = useState('');

    const handleSubmit = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = emailRef.current!.value ;
        const password = passwordRef.current!.value ;

        auth.signInWithEmailAndPassword(email , password).then((credential) => {
            setErrorMsg('');
            setSuccessMsg('You Success');
        }).catch(err=> {
            setSuccessMsg('');
            setErrorMsg('Wrong email or password');
        });

    }


    

    return (
        <Container style={{marginTop:'50px'}}>
            <h1>Log in</h1>
            <br />
            {errorMsg && 
                (
                    <Alert variant="danger">{errorMsg}</Alert>
                )
            }
            {successMsg && 
                (
                    <Alert variant="success">You successful</Alert>
                )
            }
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control ref={emailRef} required type="email"/>
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label >Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required/>
                </Form.Group>
                <br />
                <Stack direction="horizontal" style={{alignItems:'center' , justifyContent:'space-between' , marginTop:'30px'}}>
                    <Col xs={6}>
                        <Alert style={{margin:'0'}}>Already have an account Login <Link to={RouterPath.signUp}>here</Link> </Alert>
                    </Col>
                    <Col xs={'auto'}>
                        <Button  type="submit" variant="primary">Submit</Button>       
                    </Col>
                </Stack>
            </Form>
            

        </Container>
    )
}