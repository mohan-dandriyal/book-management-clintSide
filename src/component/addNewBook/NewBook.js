

import axios from 'axios'
import React, { useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function NewBook({ fetchData }) {

    const navigate = useNavigate()
    const [bookData, setBookData] = useState({
        book_title: "",
        author: "",
        publication_year: ""
    })

    const hendleBookDetails = () => {

        bookData.publication_year = bookData.publication_year?.toString()

        let tokan = localStorage.getItem("tokan")

        if (bookData.book_title === '') {
            toast.warning("Enter Book Name")
        }
        else if (bookData.author === '') {
            console.log("");
            toast.warning(" Enter Author Name")
        }
        else if (bookData.publication_year === '') {
            toast.warning("Enter Publication_year")
        }
        else if (bookData.publication_year.length > 3 && bookData.publication_year.length < 5) {
            axios.post('http://localhost:4000/api/v1/add_new_book/', bookData, {
                headers : {
                    "Content-Type": "application/json",
                    authorization : `bearr,${tokan}`
                  }
            }).then((res) => {
                // setBookData("")
                bookData.book_title = "";
                bookData.author = "";
                bookData.publication_year = ""
                fetchData()
                toast.success("New Book is Added")
            }).catch((err) => {

                if (err.response.status === 401) {
                    toast.warning(err.response.data.message)
                }

                if (err.response.status == 402) {
                    toast.warning(err.response.data.message)
                    navigate('/')
                  }

            })
        } else {
            toast.warning("Enter valid publication_year")
        }
    }


    return (
        <Col className='p-4 left' style={{ backgroundColor: "#ffff" }}>
            <p className='fs-4 fw-bold' style={{ fontStyle: 'italic' }}>Add New Books</p>
            <Form>
                <Form.Group>
                    <Form.Label className='fw-semibold ' style={{ fontStyle: 'italic' }}>Book Name</Form.Label>
                    <Form.Control
                        type='text'
                        className='py-2'
                        placeholder='Book Name'
                        value={bookData.book_title}
                        onChange={(e) => setBookData((prev) => ({ ...prev, book_title: e.target.value }))}
                    />
                </Form.Group>

                <Form.Group className='my-3'>
                    <Form.Label className='fw-semibold ' style={{ fontStyle: 'italic' }}>Author Name</Form.Label>
                    <Form.Control
                        type='text'
                        className='py-2'
                        placeholder='Author Name'
                        value={bookData.author}
                        onChange={(e) => setBookData((prev) => ({ ...prev, author: e.target.value }))}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label className='fw-semibold ' style={{ fontStyle: 'italic' }}>Publication Year</Form.Label>
                    <Form.Control
                        type='number'
                        className='py-2'
                        placeholder='Publication Year'
                        value={bookData.publication_year}
                        onChange={(e) => setBookData((prev) => ({ ...prev, publication_year: e.target.value }))}
                    />
                </Form.Group>

                <Form.Group >
                    <Button className='btn btn-dark w-100 my-4' type='button' onClick={hendleBookDetails} >Add Book</Button>
                </Form.Group>
            </Form>
        </Col>
    )
}
