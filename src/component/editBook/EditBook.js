

import axios from 'axios'
import React, { useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function EditBook({ fetchData, editItem, setToggle }) {

    const navigate = useNavigate()
    const [bookData, setBookData] = useState({
        book_title: editItem?.book_title,
        author: editItem?.author,
        publication_year: editItem?.publication_year
    })

    const hendleBookDetails = () => {
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
            let id = editItem._id
            axios.put(`http://localhost:4000/api/v1/book/${id}`, bookData, {
                headers : {
                    "Content-Type": "application/json",
                    authorization : `bearr,${tokan}`
                  }
            }).then((res) => {
                setBookData("")
                fetchData()
                setToggle(false)
                toast.success("Updated sucssefult")
            }).catch((err) => {
                if (err.response.status === 401) {
                    toast.warning(err.response.data.message)
                }

                if (err.response.status === 402) {
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
            <p className='fs-4 fw-bold' style={{ fontStyle: 'italic' }}> Edit Book Detail</p>
            <Form>
                <Form.Group>
                    <Form.Label className='fw-semibold ' style={{ fontStyle: 'italic' }}>Book Name</Form.Label>
                    <Form.Control
                        type='text'
                        className='py-2'
                        placeholder='Book Name'
                        defaultValue={bookData.book_title}
                        onChange={(e) => setBookData((prev) => ({ ...prev, book_title: e.target.value }))}
                    />
                </Form.Group>

                <Form.Group className='my-3'>
                    <Form.Label className='fw-semibold ' style={{ fontStyle: 'italic' }}>Author Name</Form.Label>
                    <Form.Control
                        type='text'
                        className='py-2'
                        placeholder='Author Name'
                        defaultValue={bookData.author}
                        onChange={(e) => setBookData((prev) => ({ ...prev, author: e.target.value }))}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label className='fw-semibold ' style={{ fontStyle: 'italic' }}>Publication Year</Form.Label>
                    <Form.Control
                        type='text'
                        className='py-2'
                        placeholder='Publication Year'
                        defaultValue={bookData.publication_year}
                        onChange={(e) => setBookData((prev) => ({ ...prev, publication_year: e.target.value }))}
                    />
                </Form.Group>

                <Form.Group >
                    <Button className='btn btn-dark w-100 mt-4 mb-3' type='button' onClick={hendleBookDetails} >Add Book</Button>
                    <Button className='btn btn-dark w-100 ' type='button' onClick={() => setToggle(false)} >Cancle</Button>
                </Form.Group>
            </Form>
        </Col>
    )
}
