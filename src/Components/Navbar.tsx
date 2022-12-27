import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { RouterPath } from '../const';
import Button from 'react-bootstrap/Button';
import { Stack } from 'react-bootstrap';


export function NavBar() {
    return (
        <Stack  style={{ marginTop: '20px', padding : '20px 0' , background: 'grey' }}>
            <Container>
                <Row style={{alignItems: 'center'}}>
                    <Col className='mb-8'>
                        <div className="main-logo">Logo</div>
                    </Col>
                    <Col xs={'auto'}>
                        <Link to={RouterPath.signUp}>
                            <Button variant="primary" onClick={() => console.log("Primary")}>
                                SignUp
                            </Button>
                        </Link>
                    </Col>
                    <Col xs={'auto'}>
                        <Link to={RouterPath.login}>
                            <Button variant="outline-dark" onClick={() => console.log("Danger")}>
                                Login
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </Stack>
    );
}