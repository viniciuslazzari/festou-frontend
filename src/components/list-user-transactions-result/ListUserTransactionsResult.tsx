import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { labelBackground, redColor, white } from "../../utils/colors";
import "./ListUserTransactionsResult.css"
import axios from "axios";
import { toast } from "react-hot-toast";
import ButtonCancel from "../button-cancel/ButtonCancel";

export interface ITransactionResultSection {
  transactions: ITransactionResult[]
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
  let navigate = useNavigate();

  const handleCancel = useCallback((id:number) => {
    
    axios.get('http://127.0.0.1:8000/festou-api/v1/chargeback/' + id)
      .then(function (response) {
        toast.success("Transaction canceled successfully")
        navigate('/')
      })
      .catch(function (error) {
        toast.error(error.response.data.description);
      });
  }, [navigate]);
  
  const renderResult = useCallback((item: ITransactionResult) => {
    return (
      <div style={{ margin: '20px' }}>
        <div className="transaction-item" >
          <img className="result-image-transaction" src="assets/4.webp" alt="Result 1"/>
          <div className="result-content-transaction">
            <div className="first-info-transaction" style={{ color: white }}>
              <p className="title-transaction" style={{height:"40px"}}>
                {item.name}
              </p>
            </div>
            <p className="location-transaction" style={{ color: labelBackground }}>Location: {item.location}</p>
            <div className="info-container-transaction" style={{color:labelBackground, fontSize:"16px" }}>
              <p> <strong> Price: </strong> R$ {item.payment}</p>
            </div>
            <div className="info-container-transaction" style={{color:labelBackground, fontSize:"16px", marginTop:"10px"}}>
              <p> <strong> Data inicial: </strong> {new Date(item.initial_date).toLocaleDateString('pt-BR')}</p>
            </div>
            <div className="info-container-transaction" style={{color:labelBackground, fontSize:"16px", marginTop:"10px"}}>
              <p> <strong> Data Final: </strong> {new Date(item.final_date).toLocaleDateString('pt-BR')}</p>
            </div>
          </div>
          <div className="list-transactions-button">
            <ButtonCancel
              disabled={item.transaction_state !== 'Started'}
              onClick={() => handleCancel(item.id)}
              id={item.id}
              text="Cancel "
              width="150px"
              backgroundColor="rgba(0,0,0,0.15)"
              color={redColor}
              fontSize='16px'
              marginTop='10px'
            />
          </div>
        </div>
      </div>
    )
  }, [handleCancel])

  return (
    <div className="results">
      {(() => {
        const component = [];
        for (let i = 0; i < props.transactions.length; i += 1) {
          component.push(
            renderResult(props.transactions[i])
          )
        }
        return component;
      })()}
    </div>
  )
}

export default ListUserTransactionsResult