import * as React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Element(props) {
  const detail = props.details_button ? true : false;
  //change the element_title to the correct attribute name of the element object you receive from the API
  const element_title = props.element.name;
  // const { element_id } = useParams();

  // console.log(element_id)

  const listProperties = () => {
    return Object.keys(props.element).map((key) => {
      return (
        <React.Fragment key={key}>
          <p>
            <span className="is-capitalized is-rounded tag is-medium is-light">
              {key}
            </span>
            <span className=""> {props.element[key]}</span>
          </p>
        </React.Fragment>
      );
    });
  };
  return (
    //change the props.element.name to props.element.id to display the id instead of the name or other properties
    <React.Fragment>
      <div className="box">
        <h3>{element_title}</h3>
        {listProperties()}
        <hr />
        <div className="buttons">
          {detail ? (
            <Link
              className="button is-link is-light"
              to={
                props.urls.app_list_url +
                "/" +
                props.element.id
              }
            >
              Details 🔎
            </Link>
          ) : (
            <Link
              className="button is-light"
              to={props.urls.app_list_url}
            >
              Go Back 🔙
            </Link>
          )}
          <Link
            className="button is-light is-success"
            to={
              props.urls.app_list_url + props.urls.app_edit_url +
              "/" +
              props.element.id
            }
          >
            Edit ✏️
          </Link>
          <button
            className="button is-danger is-light"
            onClick={() =>
              props.deleteDataAPI(props.urls.api_base_url + props.urls.api_element_list_url + "/" + props.element.id)
            }
          >
            Delete ❌
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
