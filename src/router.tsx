import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';

import Home from './home/Home';
import Test from './test/Test';

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