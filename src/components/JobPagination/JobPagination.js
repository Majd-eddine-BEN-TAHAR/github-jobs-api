import React from "react";
import "./JobPagination.css";
import PreviousIcon from "./../../assets/previous.svg";
import NextIcon from "./../../assets/next.svg";

const JobPagination = ({ page, setPage, hasNextPage }) => {
  const adjustPage = (amount) => {
    setPage((currentPage) => currentPage + amount);
  };
  return (
    <div className="PaginationContainer">
      {/* The Previous Icon : show when not in 1     */}
      {page !== 1 && (
        <div
          className="PaginationItem"
          onClick={() => {
            adjustPage(-1);
          }}
        >
          <img src={PreviousIcon} alt="previousIcon" />
        </div>
      )}

      {/* condition 1 : show 1 when our page number not equal 1  */}
      {/* condition 2 : show ... when our page number > 2  */}
      {/* condition 3 : show  previous page when page number > 2 => if pageNumber = 3 we will show the previous page which is 2    */}
      {page !== 1 && (
        <div
          className="PaginationItem"
          onClick={() => {
            setPage(1);
          }}
        >
          1
        </div>
      )}
      {page > 2 && <div className="PaginationItem">...</div>}
      {page > 2 && (
        <div
          className="PaginationItem"
          onClick={() => {
            adjustPage(-1);
          }}
        >
          {page - 1}
        </div>
      )}

      {/* 1 div :  show current page number with active class*/}
      {/* 2 div :  show next current page number if there's a next page*/}
      <div className="PaginationItem Active">{page}</div>
      {hasNextPage && (
        <div
          className="PaginationItem"
          onClick={() => {
            adjustPage(1);
          }}
        >
          {page + 1}
        </div>
      )}

      {/* The next Icon */}
      {hasNextPage && (
        <div
          className="PaginationItem"
          onClick={() => {
            adjustPage(1);
          }}
        >
          <img src={NextIcon} alt="nextIcon" />
        </div>
      )}
    </div>
  );
};

export default JobPagination;
