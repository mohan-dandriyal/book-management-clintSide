

import axios from 'axios'
import React, { useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function BookTable({ book, fetchData, setToggle, setEditItem }) {
    const navigate = useNavigate()
    const [next, setNext] = useState(1)

    const deleteBook = (id) => {
        let tokan = localStorage.getItem("tokan")
        axios.delete(`http://localhost:4000/api/v1/book/${id}`, {
            headers : {
                "Content-Type" : "text/html",
                authorization : `bearr,${tokan}`
              }
        }).then((res) => {
            fetchData()
        }).catch((err) => {
            if (err.response.status === 401) {
                toast.warning(err.response.data.message)
            }

            if (err.response.status === 402) {
                toast.warning(err.response.data.message)
                navigate('/')
            }
        })
    }
    return (
        <Col className='mb-4 mb-lg-0'>
            <Table className='text-center'>
                <thead className='bg-primary'>
                    <tr className="table-primary py-2">
                        <th>SNO</th>
                        <th>BOOK NAME</th>
                        <th>AUTHOR</th>
                        <th>PUBLIC YEAR</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        book?.slice((next - 1) * 6, next * 6).map((item, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.book_title}</td>
                                <td>{item.author}</td>
                                <td>{item.publication_year}</td>
                                <td>
                                    <Button className='me-2 btn btn-sm btn-bg-none ' onClick={()=> {setEditItem(item); setToggle(true)}}><MdEdit className='fs-4 fs-4 text-dark' /></Button>
                                    <Button className='btn-sm btn-bg-none' onClick={() => deleteBook(item._id)}><MdDelete className='fs-4 text-dark' /> </Button>
                                </td>
                            </tr>)
                    }
                </tbody>
            </Table>

            <Row>
                    <Col className='text-center'>
                        <Button className='me-2 btn btn-sm' disabled={next === 1 && true}  onClick={() => setNext(next - 1)}>Prev</Button>
                        <Button className='btn btn-sm' disabled={next * 6 < book.length  ? false : true} onClick={() => setNext(next + 1)}>Next</Button>
                    </Col>
            </Row>
        </Col>
    )
}
