
import React, { useState } from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import './style.css';
import axios from 'axios';


function Ragister() {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        name: "",
        contact_no: "",
        email: "",
        password: ""
    })

    const hendleSubmit = () => {
        axios.post('http://localhost:4000/api/v1/user', user).then((res) => {
            navigate('/login')
        }).catch((err) => {
            if (err.response.status == 402) {
                toast.warning(err.response.data.message)
            }
        })
    }

    return (
        <Container fluid className='d-flex align-items-center overflow-hidden mx-0 px-0' style={{ height: "100vh" }}>
            <Row className='w-100'>
                <Col lg={7} md={6} className='d-none d-md-block'>
                    <Image src='https://img.freepik.com/free-vector/flat-design-world-book-day-concept_23-2148472682.jpg?t=st=1714118633~exp=1714122233~hmac=38cbdde7741f625c21f945b0845956c3777cd16b41e2f9b51a1cc8e4099cfb77&w=740' className='h-100' />
                </Col>
                <Col lg={5} md={6} className='d-flex flex-column justify-content-center p-xl-5'>
                    <Row>
                        <Col className='px-sm-5 px-3  mb-3'>
                            <h2>Create an account</h2>
                            <p>Enter your details below</p>
                        </Col>
                        <Form className='d-flex flex-column px-sm-5 px-3 gap-4 gap-md-5'>
                            <Form.Group>
                                <Form.Control placeholder='Name' className='py-2' onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control placeholder='Enter Phone Number' className='py-2' onChange={(e) => setUser((prev) => ({ ...prev, contact_no: e.target.value }))} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control type="email" placeholder='email' className='py-2' onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control placeholder='password' type='password' className='py-2' onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))} />
                            </Form.Group>

                            <Form.Group >
                                <Button className='mb-4 mt-4 mt-md-1 col-12 py-2' onClick={hendleSubmit}>Create Account</Button> <br />
                            </Form.Group>

                            <Row>
                                <Col className='text-center'>
                                    <p className='m-0'>Already have account? <Link to="/login">Log in</Link></p>
                                </Col>
                            </Row>
                        </Form>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Ragister