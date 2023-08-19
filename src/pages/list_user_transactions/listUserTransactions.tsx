import React, { useCallback, useContext, useEffect, useState } from 'react';
import UserContext from '../../context/UserContext';
import Header from '../../components/header/header';
import axios from 'axios';
import './listUserTransactions.css'
import { toast } from 'react-hot-toast';
import ListPlace from '../../components/list-places-user/ListPlaceUser';
import { labelBackground, white } from '../../utils/colors';

export interface ITransactionResult {
  id_client: number,
  id_place: number,
  initial_date: string,
  final_date: string,
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

const mock=[
  {
    id_client: 38,
    id_place: 27,
    initial_date: "2023-08-24",
    final_date: "2023-08-21",
  },
  {
    id_client: 38,
    id_place: 27,
    initial_date: "2023-08-24",
    final_date: "2023-08-21",
  },
  {
    id_client: 38,
    id_place: 27,
    initial_date: "2023-08-24",
    final_date: "2023-08-21",
  }
]
const mock_place={
  id: 27,
  name: 'Cucko',
  price: 500,
  location: 'Cucko',
  capacity: 100,
  description: 'string',
  terms_of_use: 'string'
}

const ListUserTransactions = () => {
  const [results, setResults] = useState<ITransactionResult[]>(mock);
  const [place, setPlace] = useState<IPlace>();

  let user = useContext(UserContext);

  const renderResult = useCallback((item: ITransactionResult) => {
    return (
      <div>
        <Header/> 
          <div className="transaction-results" >
            <div className="transaction-item" >
              <img className="result-image-transaction" src="assets/4.webp" alt="Result 1"/>
              <div className="result-content-transaction">
              <div className="first-info-transaction" style={{ color: white }}>
                <p className="title-transaction" style={{height:"40px"}}>
                  {mock_place.name}
                </p>
              </div>
              <p className="location-lpu" style={{ color: labelBackground }}>Location</p>
              <div className="info-container-lpu" style={{color:labelBackground, fontSize:"20px" }}>
                <p> <strong> Price: </strong> R$ {mock_place.price}</p>
              </div>
              <div className="info-container-lpu" style={{color:labelBackground, fontSize:"20px", marginTop:"10px"}}>
                <p> <strong> Data inicial: </strong> {new Date(item.initial_date).toLocaleDateString('pt-BR')}</p>
              </div>
              <div className="info-container-lpu" style={{color:labelBackground, fontSize:"20px", marginTop:"10px"}}>
                <p> <strong> Data Final: </strong> {new Date(item.final_date).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }, [])

  return (
    <div className="results">
      {(() => {
        const component = [];

        for (let i = 0; i < mock.length; i += 1) {
          component.push(
            renderResult(mock[i])
          )
        }

        return component;
      })()}
    </div>
  )
}

export default ListUserTransactions;
