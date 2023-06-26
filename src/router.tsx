import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';

import Home from './pages/home/Home';
import Test from './pages/test/Test';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router