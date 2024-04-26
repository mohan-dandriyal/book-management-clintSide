import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wrapper from './component/wrapper/Wrapper';
import Login from './user/Login';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Ragister from './user/Ragister';
import { Fragment, useEffect } from 'react';



function App() {


  const location = useLocation();
  const navigate = useNavigate();
  


  useEffect(() => {
    const tokan = localStorage.getItem('tokan')
    if (location.pathname === "" || location.pathname === "/") {
      navigate('/login');
    }

    if(tokan) {
      navigate('/book')
    }
  }, [location]);

  const findUser = () => {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/ragister" element={<Ragister />} />
      </Routes>
    );
  };

  return (
    <Fragment>
      {
        location.pathname === "" ||
        location.pathname === "*" ||
          location.pathname === "/login" ||
          location.pathname === "/ragister" ? (findUser()) : (
          <>
            <Routes>
              <Route path='/book' element={<Wrapper />} />
              <Route path="*" element={<Login />} />
            </Routes>
          </>
        )}
        <ToastContainer />
    </Fragment>
  );
}

export default App;
