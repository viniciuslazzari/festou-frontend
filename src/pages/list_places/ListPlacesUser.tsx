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
  score: number,
  description: string
}

interface IResultSection {
  results: IResult[]
}
const mockPlace1 = {
  id: 1,
  name: 'Local Example',
  price: 50,
  location: 'Example City',
  capacity: 100,
  score: 4.5,
  description: 'Description for Local Example',
};
const mockPlace2 = {
  id: 1,
  name: 'Local Example',
  price: 50,
  location: 'Example City',
  capacity: 100,
  score: 4.5,
  description: 'Description for Local Example',
};

const ListPlaceUser = () => {
  const [results, setResults] = useState<IResultSection[]>([]);

  let user = useContext(UserContext);
  let id = user.state.id;

  axios.post('http://127.0.0.1:8000/festou-api/v1/userPlaces', {"id_owner":1})
    .then(function (response) {
      setResults(response.data);
      console.log(response.data);
    })
    .catch(function (error) {
      toast.error(error.response.data.description)
    });

  return (
    <div>
      <Header/>
      <div className='content-wrapper-places-user'>
        <div className='title-places-user'>
          Your places:
        </div>
        
        <ListPlace results={[mockPlace1, mockPlace2, mockPlace2]} /> 
        
      </div>
    </div>
  );
}

export default ListPlaceUser;