import Container from "react-bootstrap/esm/Container";
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { RouterPath } from "../const";
import {auth , fs , firebaseCollectionName} from '../config/Config';
import { IUsers } from "../Models/IUsers";

export function SignUpPage() {

    const fullNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);


    const [errorMsg , setErrorMsg] = useState('');
    const [successMsg , setSuccessMsg] = useState('');
    




    const handleSubmit = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const fullname = fullNameRef.current!.value 
        const email = emailRef.current!.value 
        const password = passwordRef.current!.value 

        const newUser: IUsers  = new IUsers(fullname, email , password);

        const newUserJson  = newUser.toJson();


        
        
        auth.createUserWithEmailAndPassword(email , password)
        .then((credentials) => {
            fs.collection(firebaseCollectionName.users).doc(credentials.user?.uid).set(newUserJson).then(() => {
                fullNameRef.current!.value = '';
                emailRef.current!.value = '';
                passwordRef.current!.value = '';
                setSuccessMsg('You Success');
                setErrorMsg('');     
            }).catch((err) => {
                setErrorMsg('Credentials Error');
                setSuccessMsg(''); 
            })
        })
        .catch((err)=> {
            setErrorMsg('Credentials Error');
            setSuccessMsg(''); 
            Error(err + "  " + 'Credentials Error');
        });


    }   

    return (
        <Container style={{marginTop:'50px'}}>
            <h1>Sign Up</h1>
            <br />
            {errorMsg && 
                (
                    <Alert variant="danger">Such a user exists!!! (Error)</Alert>
                )
            }
            {successMsg && 
                (
                    <Alert variant="success">You are registered!!! <Link to={RouterPath.login}>Log in</Link></Alert>
                )
            }
            <Form onSubmit={(e)=> handleSubmit(e)}>
                <Form.Group className="mb-40" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control ref={fullNameRef} required type="name"/>
                </Form.Group>
                <br />
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
                        <Alert style={{margin:'0'}}>Already have an account Login <Link to={RouterPath.login}>here</Link> </Alert>
                    </Col>
                    <Col xs={'auto'}>
                        <Button  type="submit" variant="primary">Submit</Button>       
                    </Col>
                </Stack>
            </Form>
        </Container>
    )
}

