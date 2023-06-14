

import './App.css';
import Add from './Components/Add';
import { useState, useEffect } from 'react';
import Data, { DataProps } from './Components/Data';
import Loading from './Components/Loading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (page: number) => {
    try {
      const api = await fetch(`${import.meta.env.VITE_APP_API_URL}/todo?page=${page}`);
      const fetchData = await api.json();
      setData(fetchData.data);
      setTotalPages(fetchData.totalPages);
      setCurrentPage(fetchData.currentPage);
    } catch (e) {
      console.log("Error Message", e);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const paginationItems = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationItems.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination_button ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }
    return paginationItems;
  };


  return (
    <div className='app'>
      <div className='app_data'>
        {data.length === 0 && <Loading />}
        {data && data.map((el: DataProps['data'], i) => <Data data={el} key={i} fetchData={fetchData} />)}
      </div>
      <div className='pagination'>{renderPagination()}</div>

        <Add fetchData={fetchData} />
        
      <ToastContainer />
    </div>
  );
}

export default App;


