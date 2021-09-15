import React, { useContext } from "react";
import AuthorsContext from "./../../contexts/authorsContext";
import { Link } from "react-router-dom";
import Table from "./../common/table";

const AuthorsTable = ({ onDelete }) => {
  const authors = useContext(AuthorsContext);

  const columnsAuthors = [
    { name: "authorId", label: "Id" },
    {
      content: () => <i class="fa fa-user" aria-hidden="true" />,
      label: "Image",
    },
    { name: "name", label: "Name" },
    { name: "birthdayStr", label: "DOB" },
    { name: "email", label: "Email" },
    {
      key: "edit",
      content: (author) => (
        <Link
          to={`/authorsEdit/${author.authorId}`}
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
      content: (author) => (
        <button
          onClick={() => onDelete(author)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  return <Table columns={columnsAuthors} data={authors} />;
};

export default AuthorsTable;
