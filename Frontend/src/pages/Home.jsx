import * as React from "react";
import { Link } from "react-router-dom";

export default function SharedLayout(props) {
  return (
    <React.Fragment>
      <h2 className="mt-4">React CRUD API Client App</h2>
      <p>This is a simple React App for:</p>
      <ul>
        <li>Creating</li>
        <li>Reading</li>
        <li>Updating</li>
        <li>Deleting</li>
      </ul>
      <p>
        data from a REST API.
        <br />
        <br />
        The current base URL for the API is:{" "}
        <span className="is-italic">{props.urls.api_base_url}</span>
      </p>
      <div className="buttons">
        <Link to={props.urls.app_list_url} className="button is-light is-link">
          Go to the Elements List
        </Link>
      </div>
    </React.Fragment>
  );
}
