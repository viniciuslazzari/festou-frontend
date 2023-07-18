import { useEffect, useState } from 'react';
import FilterSection from '../../components/filter-section/FilterSection';
import Menu from '../../components/menu/Menu';
import ResultsSection from '../../components/results-section/ResultsSection';
import './Home.css';
import axios from 'axios';
import toast from 'react-hot-toast';

interface IFilters {
  name: string,
  initialDate: string,
  finalDate: string,
  initialPrice: number,
  finalPrice: number,
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
  descrpition: string
}

const DEFAULT_FILTERS: IFilters = {
  name: "",
  initialDate: "2012-04-23T18:25:43.511Z",
  finalDate: "2012-04-23T18:25:43.511Z",
  initialPrice: 0,
  finalPrice: 5000,
  location: "",
  capacity: 0,
  score: 0
}

const Home = () => {
  const [nameFilter, setNameFilter] = useState<string>("");
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [filters, setFilters] = useState<IFilters>(DEFAULT_FILTERS);
  const [results, setResults] = useState<IResult[]>([]);

  useEffect(() => {
    setFilters(prevState => {
      return({
        ...prevState,
        name: nameFilter || "",
        location: locationFilter || ""
      });
    });
  }, [locationFilter, nameFilter])

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
        <FilterSection locationFunction={setLocationFilter}/>
        <ResultsSection results={results}/>
      </div>
    </div>
  );
}

export default Home;
