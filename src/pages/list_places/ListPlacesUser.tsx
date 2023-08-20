import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/UserContext';
import Header from '../../components/header/header';
import axios from 'axios';
import './ListPlacesUser.css'
import { toast } from 'react-hot-toast';
import ListPlace from '../../components/list-places-user/ListPlaceUser';

export interface IResult {
  id: number,
  name: string,
  price: number,
  location: string,
  capacity: number,
  description: string
  terms_of_use: string
}

const ListPlaceUser = () => {
  const [results, setResults] = useState<IResult[]>([]);

  let user = useContext(UserContext);

  useEffect(() => {
    if (!user.state.isLoggedIn) toast.error("You need to be logged in to perform this action!")

    axios.get('http://127.0.0.1:8000/festou-api/v1/userPlaces/' + user.state.id)
      .then(function (response) {
        setResults(response.data);
      })
      .catch(function (error) {
        toast.error(error.response.data.description)
      });
  }, [user.state.id, user.state.isLoggedIn]);

  return (
    <div>
      <Header/>
      <div className='content-wrapper-places-user'>
        <div className='title-places-user'> Your places </div>
        <ListPlace results={results} /> 
      </div>
    </div>
  );
}

export default ListPlaceUser;
