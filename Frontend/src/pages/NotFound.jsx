import * as React from "react";
import { Link } from "react-router-dom";

export default function SharedLayout(props) {
  return (
    <React.Fragment>
      <h2 className="mt-4">404 Page not Found</h2>
      <p>It seems that this page doesn't exist 😢</p>
      <div className="buttons">
        <Link to={props.urls.app_home_url} className="button is-light is-link">
          Go to Home Page
        </Link>
      </div>
    </React.Fragment>
  );
}
