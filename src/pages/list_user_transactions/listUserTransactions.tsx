import { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/UserContext';
import Header from '../../components/header/header';
import axios from 'axios';
import './listUserTransactions.css'
import { toast } from 'react-hot-toast';
import ListUserTransactionsResult, { ITransactionResult } from '../../components/list-user-transactions-result/ListUserTransactionsResult';
import { primaryGrey, white } from '../../utils/colors';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';

enum ITransactions {
  Created,
  Received
}

const ListUserTransactions = () => {
  const [transactions, setTransactions] = useState<ITransactionResult[]>([]);
  const [current, setCurrent] = useState<ITransactions>(ITransactions.Created);
  const [url, setUrl] = useState<string>("http://127.0.0.1:8000/festou-api/v1/getTransactionsMade/");

  let user = useContext(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (current === ITransactions.Received){
      setUrl("http://127.0.0.1:8000/festou-api/v1/getTransactionsReceived/")
      return;
    }

    setUrl("http://127.0.0.1:8000/festou-api/v1/getTransactionsMade/")
  }, [current]);

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
  console.log(current)
  return (
    <div style={{ marginTop: "100px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Header/>
      <div className='content-wrapper-user-transactions'>
        <div className='title-user-transactions' style={{ color: white }}> Your transactions {((current === ITransactions.Received) ? "Received" : "Created")}</div>
        <Button
          onClick={() => current === ITransactions.Created ? setCurrent(ITransactions.Received) : setCurrent(ITransactions.Created)}
          text={"Show Transactions " + ((current === ITransactions.Received) ?  "Created" : "Received" )}
          width="500px"
          backgroundColor={primaryGrey}
          color={white}
          fontSize='20px'
          marginTop='20px'
        />
        
        <ListUserTransactionsResult transactions={transactions} transaction_type={current}/>
      </div>
    </div>
  )
}

export default ListUserTransactions;
