// import BookTable from '../component/bookTable/BookTable';
import { Col, Container, Row } from 'react-bootstrap'
import NewBook from '../addNewBook/NewBook';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBaar from '../searchBaar/SearchBaar';
import EditBook from '../editBook/EditBook';
import BookTable from '../bookTable/BookTable';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Wrapper() {

  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [searchKey, setSearchKey] = useState("")
  const [toggle, setToggle] = useState(false)
  const [editItem, setEditItem] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  // fatch the data 
  const fetchData = () => {
    let tokan = localStorage.getItem("tokan")
    axios.get('http://localhost:4000/api/v1/book/', {
      headers: {
        "Content-Type": "text/html",
        authorization: `bearr,${tokan}`
      }
    }).then((res) => {
      setData(res.data.books)
    }).catch((err) => {
      console.log(err);
      if (err.response.status == 402) {
        toast.warning(err.response.data.message)
        navigate('/')
      }
    })
  }

  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    if (data) {
      const searchItems = data.filter((item) => {
        if (item.author?.toLowerCase().includes(searchKey.toLowerCase()) || item.publication_year?.toLowerCase().includes(searchKey.toLowerCase())) {
          return true;
        }
        return false;
      });
      setSearchData(searchItems);
    }
  }, [searchKey, data]);


  return (
    <Container className='bg-light' fluid style={{ minHeight: "100vh" }}>
      <Container className='pt-5 '>
        <Row className='mx-0  '>
          <SearchBaar setSearchKey={setSearchKey} />
        </Row>
        <Row className='mx-0 flex-wrap-reverse'>
          <Col lg={3} className='mb-lg-0 mb-4'>{
            toggle ? <EditBook fetchData={fetchData} setToggle={setToggle} editItem={editItem} /> : <NewBook fetchData={fetchData} />
          }
          </Col>
          <Col>
            <BookTable book={searchData} fetchData={fetchData} setToggle={setToggle} setEditItem={setEditItem} />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Wrapper;
