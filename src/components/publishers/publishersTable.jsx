import React, { useContext } from "react";
import PublishersContext from "./../../contexts/publishersContext";
import { Link } from "react-router-dom";
import Table from "./../common/table";

const PublishersTable = ({ onDelete }) => {
  const publishers = useContext(PublishersContext);

  const columnsPublishers = [
    { name: "publisherId", label: "Id" },
    {
      name: "name",
      label: "Name",
    },
    { name: "adress.country", label: "Country" },
    {
      key: "edit",
      content: (publisher) => (
        <Link
          to={`/publishersEdit/${publisher.publisherId}`}
          className="btn btn-primary btn-sm"
        >
          Edit
        </Link>
      ),
    },
    {
      key: "delete",
      label: (publisher) => (
        <Link to={`/not-found}`} className="btn btn-primary btn-sm">
          Add
        </Link>
      ),
      content: (publisher) => (
        <button
          onClick={() => onDelete(publisher)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  return <Table columns={columnsPublishers} data={publishers} />;
};

export default PublishersTable;
