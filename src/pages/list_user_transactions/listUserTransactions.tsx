import React, { useCallback, useContext, useEffect, useState } from 'react';
import UserContext from '../../context/UserContext';
import Header from '../../components/header/header';
import axios from 'axios';
import './listUserTransactions.css'
import { toast } from 'react-hot-toast';
import ListUserTransactionsResult, { ITransactionResult } from '../../components/list-user-transactions-result/ListUserTransactionsResult';
import { white } from '../../utils/colors';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';

const ListUserTransactions = () => {
  const [transactions, setTransactions] = useState<ITransactionResult[]>([]);
  let user = useContext(UserContext);
  let navigate = useNavigate();

  const handleTransactionsReceived = useCallback(() => {
    navigate('/userTransactionReceived')
  }, [navigate]);

  useEffect(() => {
    
    if (!user.state.isLoggedIn) {
      toast.error("You need to be logged in to perform this action!");
      return;
    }
  
    axios.get('http://127.0.0.1:8000/festou-api/v1/getTransactionsMade/' + user.state.id)
      .then(function (response) {
        setTransactions(response.data);
      })
      .catch(function (error) {
        toast.error(error.response.data.description);
      });
  }, [user.state.id, user.state.isLoggedIn]);
  
  // Only access page when logged in
  useEffect(() => {
    if (!user.state.isLoggedIn) navigate("/");
  }, [navigate, user.state.isLoggedIn])

  return (
    <div style={{marginTop:"100px"}}>
      <Header/>
      <div className='content-wrapper-user-transactions'>
        <div className='title-user-transactions'>
          Your transactions made:
        </div>
        <Button
          disabled={false}
          onClick={handleTransactionsReceived}
          text="Show Received Transactions"
          width="500px"
          backgroundColor="rgba(0,0,0,0.15)"
          color={white}
          fontSize='20px'
          marginTop='10px'
        />
        
        <ListUserTransactionsResult transactions={transactions}/> 
      </div>
    </div>
  )
}

export default ListUserTransactions;
