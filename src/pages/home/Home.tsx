import FilterSection from '../../components/filter-section/FilterSection';
import Menu from '../../components/menu/Menu';
import ResultsSection from '../../components/results-section/ResultsSection';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <Menu />
      <div className='content-wrapper'>
        <FilterSection />
        <ResultsSection />
      </div>
    </div>
  );
}

export default Home;
