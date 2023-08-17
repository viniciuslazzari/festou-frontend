import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';

import Home from './pages/home/Home';
import Space from './pages/space/Space';
import Signup from './pages/signup/Signup';
import Logout from './pages/logout/Logout';
import CreatePlace from './pages/create_place/CreatePlace';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/space' element={<Space />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/createplace' element={<CreatePlace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router