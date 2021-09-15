import React, { useState, useEffect } from "react";
import { axios } from "../../axios";
import PublishersTable from "./publishersTable";
import PublishersContext from "../../contexts/publishersContext";
import SearchBox from "./../common/searchBox";
import { Link } from "react-router-dom";
import qs from "qs";
import Pagination from "./../common/pagination";
import LoadingSpinner from "../common/loadingSpinner";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";

function Publishers() {
  const [publishers, setPublishers] = useState([]);
  const [searchQuery, setsearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState();
  const { promiseInProgress } = usePromiseTracker();

  const getPublishers = async () => {
    let params = getRequestParams(searchQuery, pageSize, currentPage);

    const response = await axios
      .get(`/api/Publishers/paginate?${qs.stringify(params)}`)
      .catch((err) => console.log("Error:", err));

    if (response && response.data) {
      setPublishers(response.data.publishers);
      setItemsCount(response.data.publishersCount);
    }
  };
  useEffect(() => {
    trackPromise(getPublishers());
  }, [currentPage]);

  /*KOJA JE RAZLIKA AKO JE OVDJE ARROW FUNC U ODNOSU NA OBICNU FUNKCIJU */
  const handleDelete = async (publisher) => {
    await axios
      .delete("/api/Publishers/" + publisher.publisherId)
      .catch((err) => console.log("Error:", err));

    const publishersFiltered = publishers.filter(
      (p) => p.publisherId !== publisher.publisherId
    );

    setPublishers(publishersFiltered);
  };

  const getRequestParams = (search, pageSize, currentPage) => {
    let params = [];

    if (search) {
      params["name"] = search;
    }

    if (pageSize) {
      params["pageSize"] = pageSize;
    }

    if (currentPage) {
      params["currentPage"] = currentPage;
    }

    return params;
  };

  const handleSearch = async () => {
    setCurrentPage(1);
    let params = getRequestParams(searchQuery, pageSize, currentPage);

    const response = await axios
      .get(`/api/Publishers/paginate?${qs.stringify(params)}`)
      .catch((err) => console.log("Error:", err));

    if (response && response.data) {
      setPublishers(response.data.publishers);
      setItemsCount(response.data.publishersCount);
    }
  };

  useEffect(() => {
    trackPromise(handleSearch());
  }, [searchQuery]);

  const handleChange = (e) => {
    setsearchQuery(e.target.value);
  };

  const handlePageChange = async (page) => {
    setCurrentPage(page);
  };

  return (
    <React.Fragment>
      <SearchBox value={searchQuery} onChange={handleChange} />
      <Link to={`/publishersAdd`} className="btn btn-primary btn-sm">
        Add
      </Link>
      {promiseInProgress ? (
        <LoadingSpinner />
      ) : (
        <React.Fragment>
          <PublishersContext.Provider value={publishers}>
            <PublishersTable onDelete={handleDelete} />
          </PublishersContext.Provider>
          <Pagination
            itemsCount={itemsCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Publishers;
