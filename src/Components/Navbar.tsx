import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { RouterPath } from '../const';
import Button from 'react-bootstrap/Button';
import { Stack } from 'react-bootstrap';
import { IUsers } from '../Models/IUsers';
import  {Icon} from 'react-icons-kit';
import { shoppingCart } from 'react-icons-kit/feather/shoppingCart';
import { auth } from '../config/Config';
import { useNavigate } from "react-router-dom";
import useProviderState from '../context/StateContext';


export function NavBar() {

    const {user} = useProviderState();


    const navigate = useNavigate();

    const HandleLogOut = () => {
        auth.signOut().then(()=> {
            navigate(RouterPath.login);
        })
    }
    
    return (
        <Stack style={{  padding: '20px 0', background: 'grey' }}>
            <Container>
                <Row style={{ alignItems: 'center' }}>
                    <Col className='mb-8'>
                        <Link to={'/'}>
                            <div className="main-logo">Logo</div>
                        </Link>
                    </Col>
                    {user === undefined ?
                        (
                            <Col xs={'auto'}>
                                <Row>
                                    <Col>
                                        <Link to={RouterPath.signUp}>
                                            <Button variant="primary" onClick={() => console.log("Primary")}>
                                                SignUp
                                            </Button>
                                        </Link>
                                    </Col>
                                    <Col >
                                        <Link to={RouterPath.login}>
                                            <Button variant="outline-dark" onClick={() => console.log("Danger")}>
                                                Login
                                            </Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </Col>
                        )  
                            : (
                                <Col xs='auto'>
                                    <Stack direction='horizontal'>
                                        <div className="user">{user.fullName}</div>
                                        <Link to={RouterPath.add} style={{margin:'0 15px'}}>Add product</Link>
                                        <Link style={{margin:'0 15px'}} to={RouterPath.cart}>
                                            <Icon icon={shoppingCart} size={20}/>
                                        </Link>
                                        <Button variant="primary" onClick={() => HandleLogOut()}>
                                                Log out
                                        </Button>
                                    </Stack>
                                </Col>
                            )

                    }
                    

                </Row>
            </Container>
        </Stack>
    );
}