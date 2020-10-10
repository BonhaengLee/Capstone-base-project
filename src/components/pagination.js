import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Paginator from "react-hooks-paginator";
import { fetchData } from "./data-fetcher";

function Pagination() {
  const pageLimit = 10;

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    fetchData().then((data) => setData(data));
  }, []);

  useEffect(() => {
    setCurrentData(data.slice(offset, offset + pageLimit));
  }, [offset, data]);

  return (
    <div>
      <ul>
        {currentData.map((data) => (
          <li>{data}</li>
        ))}
      </ul>
      <Paginator
        totalRecords={data.length}
        pageLimit={pageLimit}
        pageNeighbours={2}
        setOffset={setOffset}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Pagination;
