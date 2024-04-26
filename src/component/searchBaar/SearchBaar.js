
import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function SearchBaar({ setSearchKey }) {
    const navigate = useNavigate()
    
    const hendleLogOut = () => {
        localStorage.removeItem("tokan")
        navigate('/')
    }
    return (
        <Col>
            <Row className='mx-0'>
                <Col className='col-12 mb-lg-0 mb-4' lg={3}>
                    <p className='fs-3 my-0 fw-semibold' style={{ fontStyle: "italic" }}> Book Management</p>
                </Col>

                <Col className='ps-0 '>
                    <Form>
                        <Form.Control
                            className='mb-3 w-50 py-2 w-100'
                            placeholder='Author Name Or Publication Year'
                            onChange={(e) => setSearchKey(e.target.value)}
                        />
                    </Form>
                </Col>
                <Col  md={2} className='text-end'>
                    <Button onClick={hendleLogOut} >Log Out</Button>
                </Col>
            </Row>
        </Col>
    )
}
