import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';

import Home from './pages/home/Home';
import Space from './pages/space/Space';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/space' element={<Space />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router