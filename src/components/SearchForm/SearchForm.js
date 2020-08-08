import React from "react";
import "./SearchForm.css";

const SearchForm = ({ params, onParamsChange }) => {
  return (
    <form action="" className="SearchForm">
      <div className="input-group">
        <label htmlFor="location">Location</label>
        <input
          name="location"
          type="text"
          onChange={onParamsChange}
          value={params.description}
        />
      </div>

      <div className="input-group">
        <label htmlFor="description">Description</label>
        <input
          name="description"
          type="text"
          onChange={onParamsChange}
          value={params.description}
        />
      </div>

      <div className="input-group">
        <input
          type="checkbox"
          name="full_time"
          id="full_time"
          onChange={onParamsChange}
          value={params.full_time}
        />
        <label htmlFor="full_time">Only Full Time</label>
      </div>
    </form>
  );
};

export default SearchForm;
