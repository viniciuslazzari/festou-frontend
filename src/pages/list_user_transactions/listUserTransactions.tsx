import { useCallback, useContext, useEffect, useState } from 'react';
import UserContext from '../../context/UserContext';
import Header from '../../components/header/header';
import axios from 'axios';
import './listUserTransactions.css'
import { toast } from 'react-hot-toast';
import ListUserTransactionsResult, { ITransactionResult } from '../../components/list-user-transactions-result/ListUserTransactionsResult';
import { primaryGrey, white } from '../../utils/colors';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';

const ListUserTransactions = () => {
  const [transactions, setTransactions] = useState<ITransactionResult[]>([]);
  const [url, setUrl] = useState<string>("http://127.0.0.1:8000/festou-api/v1/getTransactionsMade/");

  let user = useContext(UserContext);
  let navigate = useNavigate();

  const handleTransactionsReceived = useCallback(() => {
    if (url === "http://127.0.0.1:8000/festou-api/v1/getTransactionsMade/"){
      setUrl("http://127.0.0.1:8000/festou-api/v1/getTransactionsReceived/")
      return;
    }

    setUrl("http://127.0.0.1:8000/festou-api/v1/getTransactionsMade/")
  }, [url]);

  useEffect(() => {
    axios.get(url + user.state.id)
      .then(function (response) {
        setTransactions(response.data);
      })
      .catch(function (error) {
        toast.error(error.response.data.description);
      });
  }, [url, user.state.id, user.state.isLoggedIn]);
  
  // Only access page when logged in
  useEffect(() => {
    if (!user.state.isLoggedIn) navigate("/");
  }, [navigate, user.state.isLoggedIn])

  return (
    <div style={{ marginTop: "100px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Header/>
      <div className='content-wrapper-user-transactions'>
        <div className='title-user-transactions' style={{ color: white }}> Your transactions </div>
        <Button
          onClick={handleTransactionsReceived}
          text="Show Received Transactions"
          width="500px"
          backgroundColor={primaryGrey}
          color={white}
          fontSize='20px'
          marginTop='20px'
        />
        
        <ListUserTransactionsResult transactions={transactions}/>
      </div>
    </div>
  )
}

export default ListUserTransactions;
