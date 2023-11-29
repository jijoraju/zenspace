import React, { useState } from 'react';

const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <span
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === currentPage ? 'active' : ''}
        >
          {i}
        </span>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <span onClick={() => handlePageChange(currentPage - 1)}>&laquo;</span>
      {renderPageNumbers()}
      <span onClick={() => handlePageChange(currentPage + 1)}>&raquo;</span>
    </div>
  );
};

export default Pagination;
