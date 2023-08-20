import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/UserContext';
import Header from '../../components/header/header';
import axios from 'axios';
import './listUserTransactions.css'
import { toast } from 'react-hot-toast';
import ListUserTransactionsResult, { IPlace, ITransactionResult } from '../../components/list-user-transactions-result/ListUserTransactionsResult';

/*

const mock_transactions=[
  {
    id_client: 38,
    id_place: 27,
    initial_date: "2023-08-24",
    final_date: "2023-08-21",
    transaction_state: "Started",
  },
  {
    id_client: 38,
    id_place: 27,
    initial_date: "2023-08-24",
    final_date: "2023-08-21",
    transaction_state: "Started",
  },
  {
    id_client: 38,
    id_place: 27,
    initial_date: "2023-08-24",
    final_date: "2023-08-21",
    transaction_state: "Started",
  }
]
const mock_places=[
  {
    id: 31,
    name: 'Cucko',
    price: 500,
    location: 'Cucko',
    capacity: 100,
    description: 'string',
    terms_of_use: 'string'
  },
  {
    id: 32,
    name: 'Gloria',
    price: 500,
    location: 'Gloria',
    capacity: 100,
    description: 'string',
    terms_of_use: 'string'
  },
  {
    id: 32,
    name: 'Gloria',
    price: 500,
    location: 'Gloria',
    capacity: 100,
    description: 'string',
    terms_of_use: 'string'
  }
]
*/
const ListUserTransactions = () => {
  const [transactions, setTransactions] = useState<ITransactionResult[]>([]);
  const [places, setPlaces] = useState<IPlace[]>([]);

  let user = useContext(UserContext);

  useEffect(() => {
    if (!user.state.isLoggedIn) toast.error("You need to be logged in to perform this action!")

    axios.get('http://127.0.0.1:8000/festou-api/v1/userTransactions/' + user.state.id)
      .then(function (response) {
        setTransactions(response.data);
      })
      .catch(function (error) {
        toast.error(error.response.data.description)
      });

      console.log(transactions)
      let id_transactions = [];
      for (let i = 0; i < transactions.length; i += 1) {
        id_transactions.push(transactions[i].id_place)
      }
      const query = {
        'id_list': id_transactions
      }
      axios.post('http://127.0.0.1:8000/festou-api/v1/IdListPlaces', query)
      .then(function (response) {
        setPlaces(response.data);

      })
      .catch(function (error) {
        toast.error(error.response.data.description)
      });
  }, [transactions, user.state.id, user.state.isLoggedIn]);

  return (
    <div style={{marginTop:"100px"}}>
      <Header/>
      <div className='content-wrapper-user-transactions'>
        <div className='title-user-transactions'>
          Your transactions:
        </div>
        
        <ListUserTransactionsResult transactions={transactions} places={places}/> 
      </div>
    </div>
  )
}

export default ListUserTransactions;
