import * as React from "react";
import Element from "../components/Element";
import { Link } from "react-router-dom";

export default function ElementList(props) {
  const getData = () => {
    props.getDataAPI(props.urls.api_base_url +  props.urls.api_element_list_url);
    // props.loading = false;
  };
  React.useEffect(() => {
    getData();
  }, []);

  function renderDataElements() {
    return props.data.map((element) => {
      return (
        <Element
          key={element.id}
          details_button={true}
          element={element}
          deleteDataAPI={props.deleteDataAPI}
          urls = {props.urls}
        />
      );
    });
  }

  return (
    <React.Fragment>
      <h2 className="mt-4">{props.title}</h2>
      <div className="buttons">
        <Link to={props.urls.app_add_url} className="button is-light is-success">
          Add Element ➕
        </Link>
      </div>
      {props.loading ? (
        <h1>
          <progress
            className="progress is-large is-primary"
            max="100"
          ></progress>
        </h1>
      ) : (
        renderDataElements()
      )}
    </React.Fragment>
  );
}
