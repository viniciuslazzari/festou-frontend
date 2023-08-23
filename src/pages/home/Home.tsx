import { useEffect, useState } from 'react';
import FilterSection from '../../components/filter-section/FilterSection';
import Menu from '../../components/menu/Menu';
import ResultsSection from '../../components/results-section/ResultsSection';
import './Home.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

interface IFilters {
  name: string,
  initial_date: string,
  final_date: string,
  initial_price: number,
  final_price: number,
  location: string,
  capacity: number,
  score: number
}

export interface IResult {
  id: number,
  name: string,
  price: number,
  location: string,
  capacity: number,
  score: number,
  description: string,
  image_1: string
}

const DEFAULT_FILTERS: IFilters = {
  name: "",
  initial_date: "",
  final_date: "",
  initial_price: 0,
  final_price: 0,
  location: "",
  capacity: 0,
  score: 0
}

const Home = () => {
  const [nameFilter, setNameFilter] = useState<string>("");
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [initialDateFilter, setInitialDateFilter] = useState<string>("");
  const [finalDateFilter, setFinalDateFilter] = useState<string>("");
  const [initialPriceFilter, setInitialPriceFilter] = useState<number>(0);
  const [finalPriceFilter, setFinalPriceFilter] = useState<number>(0);
  const [capacityFilter, setCapacityFilter] = useState<number>(0);
  const [scoreFilter, setScoreFilter] = useState<number>(0);
  const [filters, setFilters] = useState<IFilters>(DEFAULT_FILTERS);
  const [results, setResults] = useState<IResult[]>([]);

  const userToken = Cookies.get('userToken')
  const userId = Cookies.get('id')

  useEffect(() => {
    setFilters(prevState => {
      return({
        ...prevState,
        user: userToken ? userId : 0,
        name: nameFilter || "",
        location: locationFilter || "",
        initial_date: initialDateFilter && initialDateFilter.length === 10 ? initialDateFilter : "",
        final_date: finalDateFilter && finalDateFilter.length === 10 ? finalDateFilter : "", 
        capacity: capacityFilter || 0,
        initial_price: initialPriceFilter || 0,
        final_price: finalPriceFilter || 0,
        score: scoreFilter || 0
      });
    });
  }, [capacityFilter, finalDateFilter, finalPriceFilter, initialDateFilter, initialPriceFilter, locationFilter, nameFilter, scoreFilter, userId, userToken])

  useEffect(() => {
    axios.post('http://127.0.0.1:8000/festou-api/v1/search', filters)
      .then(function (response) {
        setResults(response.data)
      })
      .catch(function (error) {
        toast.error(error.response.data.description)
      });
  }, [filters])

  return (
    <div className="home">
      <Menu inputFunction={setNameFilter}/>
      <div className='content-wrapper'>
        <FilterSection 
          locationFunction={setLocationFilter}
          capacityFunction={setCapacityFilter}
          initialDateFunction={setInitialDateFilter}
          finalDateFunction={setFinalDateFilter}
          initialPriceFunction={setInitialPriceFilter}
          finalPriceFunction={setFinalPriceFilter}
          scoreFunction={setScoreFilter}
        />
        <ResultsSection results={results}/>
      </div>
    </div>
  );
}

export default Home;
