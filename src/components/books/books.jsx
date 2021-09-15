import React, { useState, useEffect } from "react";
import { axios } from "../../axios";
import BooksTable from "./booksTable";
import BooksContext from "../../contexts/booksContext";
import SearchBox from "./../common/searchBox";
import { Link } from "react-router-dom";
import qs from "qs";
import Pagination from "./../common/pagination";
import LoadingSpinner from "../common/loadingSpinner";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";

function Books() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setsearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState();
  const { promiseInProgress } = usePromiseTracker();

  const getBooks = async () => {
    let params = getRequestParams(searchQuery, pageSize, currentPage);

    const response = await axios
      .get(`/api/Books/paginate?${qs.stringify(params)}`)
      .catch((err) => console.log("Error:", err));

    if (response && response.data) {
      setBooks(response.data.books);
      setItemsCount(response.data.booksCount);
    }
  };
  useEffect(() => {
    trackPromise(getBooks());
  }, [currentPage]);
  /*KOJA JE RAZLIKA AKO JE OVDJE ARROW FUNC U ODNOSU NA OBICNU FUNKCIJU */
  const handleDelete = async (book) => {
    await axios
      .delete("/api/Books/" + book.bookId)
      .catch((err) => console.log("Error:", err));

    const booksFiltered = books.filter((b) => b.bookId !== book.bookId);

    setBooks(booksFiltered);
  };

  const getRequestParams = (search, pageSize, currentPage) => {
    let params = [];

    if (search) {
      params["title"] = search;
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
      .get(`/api/Books/paginate?${qs.stringify(params)}`)
      .catch((err) => console.log("Error:", err));

    if (response && response.data) {
      setBooks(response.data.books);
      setItemsCount(response.data.booksCount);
    }
  };
  useEffect(() => {
    trackPromise(handleSearch());
  }, [searchQuery]);

  const handleChange = (e) => {
    setsearchQuery(e.target.value);
  };

  const handlePageChange = async (page) => {
    console.log("trigger page change");
    setCurrentPage(page);
  };

  return (
    <React.Fragment>
      <SearchBox value={searchQuery} onChange={handleChange} />
      <Link to={`/booksAdd`} className="btn btn-primary btn-sm">
        Add
      </Link>
      {promiseInProgress ? (
        <LoadingSpinner />
      ) : (
        <React.Fragment>
          <BooksContext.Provider value={books}>
            <BooksTable onDelete={handleDelete} />
          </BooksContext.Provider>
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

export default Books;
