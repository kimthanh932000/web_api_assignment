import * as React from "react";
import { Outlet } from "react-router-dom";

export default function SharedLayout(props) {
  return (
    <React.Fragment>
      <div className="container is-fluid is-fullheight">
        <h1 className="title is-1 mt-4">{props.app_title}</h1>
        <div className="content is-medium">
          <Outlet />
        </div>
      </div>
      <footer className="footer mt-6">
        Made with ❤ by{" "}
        <a href="https://github.com/e-candeloro">Ettore Candeloro</a>
      </footer>
    </React.Fragment>
  );
}
