import React, { useState } from "react";
import useFetch from "./hooks/useFetch";
import Job from "./components/Job/Job";
import JobPagination from "./components/JobPagination/JobPagination";
import SearchForm from "./components/SearchForm/SearchForm";
import "./App.css";

function App() {
  const [params, setParams] = useState({
    location: "",
    description: "",
    full_time: false,
  });
  const [page, setPage] = useState(1);
  const [jobs, loading, error, hasNextPage] = useFetch(params, page);

  const onParamsChange = (e) => {
    // get the input name and value, it's dynamic for inputs
    let paramName;
    let paramValue;
    if (e.target.name === "full_time") {
      paramName = e.target.name;
      paramValue = e.target.checked;
      console.log(e.target.checked);
    } else {
      paramName = e.target.name;
      paramValue = e.target.value;
    }
    // return to first page when filtering
    setPage(1);
    setParams((prevParams) => ({
      ...prevParams,
      [paramName]: paramValue,
    }));
  };

  return (
    //
    <div className="Container">
      <h1 style={{ textAlign: "center", fontSize: "40px" }}>GitHub Jobs</h1>
      <SearchForm params={params} onParamsChange={onParamsChange} />
      <JobPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error, try Refreshing</h1>}
      <div className="Jobs">
        {jobs.length === 0 && !loading && !error
          ? "No Jobs"
          : jobs.map((job) => {
              return <Job key={job.id} job={job} />;
            })}
      </div>
      <JobPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </div>
  );
}

export default App;
