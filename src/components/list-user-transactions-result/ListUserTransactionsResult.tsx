import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { labelBackground, redColor, white } from "../../utils/colors";
import "./ListUserTransactionsResult.css"
import ButtonBorder from "../button-border/ButtonBorder";

export interface ITransactionResultSection {
  transactions: ITransactionResult[],
  places: IPlace[],
}

export interface ITransactionResult {
  final_date: string
  id_client: number
  id_place: number
  //id_advisor: number
  initial_date: string
  //transaction_state: string
}

export interface IPlace {
  id: number,
  name: string,
  price: number,
  location: string,
  capacity: number,
  description: string
  terms_of_use: string
}

const ListUserTransactionsResult = (props: ITransactionResultSection) => {
  let navigate = useNavigate();

  const handleCancel = useCallback(() => {
    navigate('/')
  }, [navigate]);
  
  const renderResult = useCallback((item: ITransactionResult, place:IPlace) => {
    return (
      <div style={{ margin: '20px' }}>
        <div className="transaction-item" >
          <img className="result-image-transaction" src="assets/4.webp" alt="Result 1"/>
          <div className="result-content-transaction">
            <div className="first-info-transaction" style={{ color: white }}>
              <p className="title-transaction" style={{height:"40px"}}>
                {place.name}
              </p>
            </div>
            <p className="location-transaction" style={{ color: labelBackground }}>Location</p>
            <div className="info-container-transaction" style={{color:labelBackground, fontSize:"20px" }}>
              <p> <strong> Price: </strong> R$ {place.price}</p>
            </div>
            <div className="info-container-transaction" style={{color:labelBackground, fontSize:"20px", marginTop:"10px"}}>
              <p> <strong> Data inicial: </strong> {new Date(item.initial_date).toLocaleDateString('pt-BR')}</p>
            </div>
            <div className="info-container-transaction" style={{color:labelBackground, fontSize:"20px", marginTop:"10px"}}>
              <p> <strong> Data Final: </strong> {new Date(item.final_date).toLocaleDateString('pt-BR')}</p>
            </div>
          </div>
          <span >
              <ButtonBorder
                disabled={/*item.transaction_state !== 'Started'*/false}
                onClick={handleCancel}
                text="Cancel "
                width="300px"
                backgroundColor="rgba(0,0,0,0.15)"
                color={redColor}
                fontSize='20px'
                marginTop='10px'
              />
            </span>
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
            renderResult(props.transactions[i], props.places[i])
          )
        }
        return component;
      })()}
    </div>
  )
}

export default ListUserTransactionsResult