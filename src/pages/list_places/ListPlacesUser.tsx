import { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import axios from 'axios';
import './ListPlacesUser.css'
import { toast } from 'react-hot-toast';
import ListPlace from '../../components/list-places-user/ListPlaceUser';
import { white } from '../../utils/colors';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export interface IResult {
  id: number,
  name: string,
  price: number,
  location: string,
  capacity: number,
  description: string,
  terms_of_use: string,
  image_1: string
}

const ListPlaceUser = () => {
  const [results, setResults] = useState<IResult[]>([]);

  const userToken = Cookies.get('userToken')
  const userId = Cookies.get('id')
  let navigate = useNavigate();

  // Only access page when logged in
  useEffect(() => {
    if (!userToken) navigate("/");
  }, [navigate, userToken])

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/festou-api/v1/userPlaces/' + userId)
      .then(function (response) {
        setResults(response.data);
      })
      .catch(function (error) {
        toast.error(error.response.data.description)
      });
  }, [userId, userToken]);

  return (
    <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
      <Header/>
      <div className='content-wrapper-places-user'>
        <div className='title-places-user' style={{ color: white }}> Your places </div>
        <ListPlace results={results} /> 
      </div>
    </div>
  );
}

export default ListPlaceUser;
