import React, { useCallback, useContext, useEffect, useState } from 'react';
import UserContext from '../../context/UserContext';
import Header from '../../components/header/header';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ListUserTransactionsResult, { ITransactionResult } from '../../components/list-user-transactions-result/ListUserTransactionsResult';
import { useNavigate } from 'react-router-dom';
import ButtonBorder from '../../components/button-border/ButtonBorder';
import { white } from '../../utils/colors';

const ListUserTransactionsReceived = () => {
  const [transactions, setTransactions] = useState<ITransactionResult[]>([]);

  let user = useContext(UserContext);
  
  let navigate = useNavigate();

  const handleTransactionsMade = useCallback(() => {
    navigate('/userTransaction')
  }, [navigate]);

  useEffect(() => {
    if (!user.state.isLoggedIn) {
      toast.error("You need to be logged in to perform this action!");
      return;
    }
  
    axios.get('http://127.0.0.1:8000/festou-api/v1/getTransactionsReceived/' + user.state.id)
      .then(function (response) {
        setTransactions(response.data);
      })
      .catch(function (error) {
        toast.error(error.response.data.description);
      });
  }, [transactions, user.state.id, user.state.isLoggedIn]);
  

  return (
    <div style={{marginTop:"100px"}}>
      <Header/>
      <div className='content-wrapper-user-transactions'>
        <div className='title-user-transactions'>
          Your transactions received:
        </div>
        <div className='list-transactions-button'>

          <ButtonBorder
            disabled={false}
            onClick={handleTransactionsMade}
            text="Show Made Transactions"
            width="500px"
            backgroundColor="rgba(0,0,0,0.15)"
            color={white}
            fontSize='20px'
            marginTop='10px'
          />
        </div>
        <ListUserTransactionsResult transactions={transactions}/> 
      </div>
    </div>
  )
}

export default ListUserTransactionsReceived;
