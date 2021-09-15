import React, { useState, useEffect } from "react";
import { axios } from "../../axios";
import AuthorsTable from "./authorsTable";
import AuthorsContext from "../../contexts/authorsContext";
import SearchBox from "./../common/searchBox";
import { Link } from "react-router-dom";
import Pagination from "../common/pagination";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import qs from "qs";
import LoadingSpinner from "../common/loadingSpinner";

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [searchQuery, setsearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState();
  const { promiseInProgress } = usePromiseTracker();

  const getAuthors = async () => {
    let params = getRequestParams(searchQuery, pageSize, currentPage);

    const response = await axios
      .get(`/api/Authors/paginate?${qs.stringify(params)}`)
      .catch((err) => console.log("Error:", err));

    if (response && response.data) {
      setAuthors(response.data.authors);
      setItemsCount(response.data.authorsCount);
    }
  };

  useEffect(() => {
    trackPromise(getAuthors());
  }, [currentPage]);

  /*KOJA JE RAZLIKA AKO JE OVDJE ARROW FUNC U ODNOSU NA OBICNU FUNKCIJU */
  const handleDelete = async (author) => {
    await axios
      .delete("/api/Authors/" + author.authorId)
      .catch((err) => console.log("Error:", err));

    const authorsFiltered = authors.filter(
      (a) => a.authorId !== author.authorId
    );

    setAuthors(authorsFiltered);
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
      .get(`/api/Authors/paginate?${qs.stringify(params)}`)
      .catch((err) => console.log("Error:", err));

    if (response && response.data) {
      setAuthors(response.data.authors);
      setItemsCount(response.data.authorsCount);
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
      <Link to={`/authorsAdd`} className="btn btn-primary btn-sm">
        Add
      </Link>
      {promiseInProgress ? (
        <LoadingSpinner />
      ) : (
        <React.Fragment>
          <AuthorsContext.Provider value={authors}>
            <AuthorsTable onDelete={handleDelete} />
          </AuthorsContext.Provider>
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

export default Authors;
