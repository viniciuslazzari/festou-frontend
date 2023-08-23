import { useCallback } from "react";
import { labelBackground, redColor, white } from "../../utils/colors";
import "./ListUserTransactionsResult.css"
import axios from "axios";
import { toast } from "react-hot-toast";
import Button from "../button/Button";

enum ITransactions {
  Created,
  Received
}

export interface ITransactionResultSection {
  transactions: ITransactionResult[]
  transaction_type: ITransactions
}

export interface ITransactionResult {
  id: number
  id_place: number
  initial_date: string
  final_date: string
  transaction_date: string
  transaction_state: string
  payment: number
  name: string
  location: string
  
}

const ListUserTransactionsResult = (props: ITransactionResultSection) => {
  const handleCancel = useCallback((id:number) => {
    
    axios.get('http://127.0.0.1:8000/festou-api/v1/chargeback/' + id)
      .then(function (response) {
        toast.success("Transaction canceled successfully")
      })
      .catch(function (error) {
        toast.error(error.response.data.message);
      });
  }, []);
  
  const handleReport = useCallback((id:number) => {
    axios.get('http://127.0.0.1:8000/festou-api/v1/reportUser/' + id)
      .then(function (response) {
        toast.success("Report done")
      })
      .catch(function (error) {
        toast.error(error.response.data.description);
      });
  }, [])

  const renderResult = useCallback((item: ITransactionResult, type : ITransactions) => {
    return (
      <div className="transaction-item" >
        <div className="result-content-transaction">
          <div className="first-info-transaction" style={{ color: white }}>
            <p className="title-transaction" style={{height:"40px"}}> {item.name} </p>
          </div>
          <p className="location-transaction" style={{ color: labelBackground }}>Location: {item.location}</p>
          <div className="info-container-transaction" style={{color:labelBackground, fontSize:"16px" }}>
            <p> <strong> Price: </strong> R$ {item.payment}</p>
          </div>
          <div className="info-container-transaction" style={{color:labelBackground, fontSize:"16px", marginTop:"5px"}}>
            <p> <strong> Initial date: </strong> {new Date(item.initial_date).toLocaleDateString("pt-BR")}</p>
          </div>
          <div className="info-container-transaction" style={{color:labelBackground, fontSize:"16px", marginTop:"5px"}}>
            <p> <strong> Final date: </strong> {new Date(item.final_date).toLocaleDateString("pt-BR")}</p>
          </div>
        </div>
        <div className="list-transactions-button">
          <Button
            disabled={!((item.transaction_state === 'Started' && type === ITransactions.Created) || type === ITransactions.Received)}
            onClick={(type === ITransactions.Created) ? () => handleCancel(item.id) : () => handleReport(item.id)}
            text={(type === ITransactions.Created) ? (item.transaction_state === 'Canceled'?"Canceled":"Cancel"):"Report"}
            width="150px"
            backgroundColor={(item.transaction_state === 'Canceled') ? redColor : white}
            color="black"
            fontSize='16px'
            marginTop='10px'
          />
        </div>
      </div>
    )
  }, [handleCancel, handleReport])

  return (
    <div className="results" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      {(() => {
        const component = [];
        for (let i = 0; i < props.transactions.length; i += 1) {
          component.push(
            renderResult(props.transactions[i], props.transaction_type)
          )
        }
        return component;
      })()}
    </div>
  )
}

export default ListUserTransactionsResult