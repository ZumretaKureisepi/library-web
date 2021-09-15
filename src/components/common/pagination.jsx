import React from "react";
import PropTypes from "prop-types";
import _ from "lodash"; // creating page array

const Pagination = (props) => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  const pageNumber = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pageNumber + 1); //lodash
  console.log("Pages", pageSize + " " + currentPage + " " + itemsCount);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={currentPage === page ? "page-item active" : "page-item"}
            key={page}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
