
import React, { useState } from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import './style.css';
import axios from 'axios';


function Login() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const hendleSubmit = () => {
        if (user.email === "" || user.password == "") {
            toast.warning("file the all input")
        } else {
            axios.post('http://localhost:4000/api/v1/login', user).then((res) => {
                navigate('/book')
                localStorage.setItem("tokan", res.data.token)
                toast.success("login successfully")
            }).catch((err) => {
                if (err.response.status == 401) {
                    toast.warning(err.response.data.message)
                }
            })
        }
    }
    return (
        <Container fluid className='d-flex align-items-center overflow-hidden mx-0 px-0 w-100' style={{ height: "100vh" }}>
            <Row className='w-100 mx-0 px-2 px-sm-0'>
                <Col lg={7} md={6} className='d-none d-md-block ps-0'>
                    <Image src='https://img.freepik.com/free-vector/flat-design-world-book-day-concept_23-2148472682.jpg?t=st=1714118633~exp=1714122233~hmac=38cbdde7741f625c21f945b0845956c3777cd16b41e2f9b51a1cc8e4099cfb77&w=740' className='h-100' />
                </Col>
                <Col lg={5} md={6} className='d-flex flex-column justify-content-center p-xl-5'>
                    <Row>
                        <Col className='px-sm-5 px-3  mb-3'>
                            <h2 className='mx-0 px-0'>Log in to Exclusive</h2>
                            <p>Enter your details below</p>
                        </Col>
                        <Form className='d-flex flex-column px-sm-4 px-3 gap-4 gap-md-5'>

                            <Form.Group>
                                <Form.Control placeholder='Email or Phone Number' className='py-2' onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control placeholder='Password' type='password' className='py-2 mb-4' onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))} />
                            </Form.Group>

                            <Form.Group >
                                <Button className='mb-4 mt-4 mt-md-0 col-12 py-2' onClick={hendleSubmit}>Log In</Button> <br />
                            </Form.Group>

                            <Row>
                                <Col className='text-center'>
                                    <p className='m-0'>Already have account? <Link to='/ragister'>Ragister </Link></p>
                                </Col>
                            </Row>
                        </Form>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
