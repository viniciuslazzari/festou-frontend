import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';

import Home from './pages/home/Home';
import Space from './pages/space/Space';
import Signup from './pages/signup/Signup';
import Logout from './pages/logout/Logout';
import CreatePlace from './pages/create_place/CreatePlace';
import ListPlaceUser from './pages/list_places/ListPlacesUser';
import Profile from './pages/profile/profile';
import EditPlace from './pages/edit_place/editPlace';
import ListUserTransactions from './pages/list_user_transactions/listUserTransactions';
import EditProfile from './pages/edit_profile/EditProfile';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/space' element={<Space />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/createplace' element={<CreatePlace />} />
        <Route path='/userPlaces' element={<ListPlaceUser />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/userTransaction' element={<ListUserTransactions />} />
        <Route path='/editPlace' element={<EditPlace />} />
        <Route path='/editProfile' element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router