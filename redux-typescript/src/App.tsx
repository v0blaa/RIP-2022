import React, {useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage } from './MainPage/MainPage/MainPage';
import { Header } from './Header/Header';
import { MedicinePage } from './MedicinePage/MedicinePage';
import { Login } from './Login/Login';
import { Registration } from './Registration/Registration';
import { UserPage } from './UserPage/UserPage';
import { Cart } from './Cart/Cart/Cart';
import { OrderPage } from './OrderPage/OrderPage/OrderPage';
import { useAppDispatch, useAppSelector } from './store';
import { statusesFetchingSuccess } from './store/reducers/statusSlice';
import { EditPage } from './EditPage/EditPage';
import { getCookies, refreshToken } from './store/actions/getUserInfo';
import axios from 'axios';
import Cookies from 'universal-cookie';

function App() {

  const dispatch = useAppDispatch()
  const cookies = new Cookies()

  useEffect(() => {
    if (cookies.get('access-token'))
    {
      dispatch(getCookies({token: {access: cookies.get('access-token'), refresh: cookies.get('refresh-token')}, username: cookies.get('username')}))
      dispatch(refreshToken(cookies.get('refresh-token')))
    }
    axios.get('/statuses/')
    .then((response) => dispatch(statusesFetchingSuccess(response.data)))
  })

  return (
    <div>
      <BrowserRouter basename='/'>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/medicine/:id" element={<MedicinePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userpage" element={<UserPage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orderpage" element={<OrderPage />} />
          <Route path="/editpage/:id" element={<EditPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
