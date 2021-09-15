import React, { useContext } from "react";
import BooksContext from "./../../contexts/booksContext";
import { Link } from "react-router-dom";
import Table from "./../common/table";

const BooksTable = ({ onDelete }) => {
  const books = useContext(BooksContext);

  const columnsBooks = [
    { name: "bookId", label: "Id" },
    { name: "title", label: "Title" },
    { name: "pages", label: "Pages" },
    { name: "price", label: "Price" },
    {
      key: "edit",
      content: (book) => (
        <Link
          to={`/booksEdit/${book.bookId}`}
          className="btn btn-primary btn-sm"
        >
          Edit
        </Link>
      ),
    },
    {
      key: "delete",
      label: () => (
        <Link to={`/not-found`} className="btn btn-primary btn-sm">
          Add
        </Link>
      ),
      content: (book) => (
        <button
          onClick={() => onDelete(book)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  return <Table columns={columnsBooks} data={books} />;
};

export default BooksTable;
