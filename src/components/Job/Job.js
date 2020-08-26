import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown/with-html";
import "./Job.css";

const Job = ({ job }) => {
  const current_datetime = new Date(job.created_at);
  const formatted_date =
    current_datetime.getDate() +
    "-" +
    (current_datetime.getMonth() + 1) +
    "-" +
    current_datetime.getFullYear();
  const description = useRef(null);
  const [showHideDetails, setShowHideDetails] = useState(false);

  const showHide = () => {
    description.current.classList.toggle("description-opened");
    setShowHideDetails((prevState) => !prevState);
  };

  return (
    <div className="Job">
      <div className="title-company-logo">
        <h1 className="title">
          {job.title} - <span className="company-name">{job.company}</span>
        </h1>
        <div className="logo">
          <img src={job.company_logo} alt={job.id} />
        </div>
      </div>
      <h3 className="date">{formatted_date}</h3>
      <div className="time-place">
        <h3 className="type">{job.type}</h3>
        <h3 className="location">{job.location}</h3>
      </div>
      {/* eslint-disable-next-line */}
      <a className="link" href={job.url} target="_blank">
        {job.url}
      </a>
      <div className="details">
        <div className="description" ref={description}>
          <ReactMarkdown
            source={job.description}
            escapeHtml={false}
          ></ReactMarkdown>
        </div>

        <button className="btn-description" onClick={showHide}>
          {showHideDetails === false ? "view details" : "hide details"}
        </button>
      </div>
    </div>
  );
};

export default Job;
