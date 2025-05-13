import * as React from "react";
import Element from "../components/Element.jsx";
import { useParams, useNavigate } from "react-router-dom";

export default function ElementDetail(props) {
  const navigate = useNavigate();
  const { element_id } = useParams();
  const [element, setElement] = React.useState({});

  React.useEffect(() => {
    setElement(() => props.findElement(props.urls.api_base_url + props.urls.api_element_list_url, element_id));
  }, [element_id]);

  const deleteRedirect = (base_url, element_id) => {
    console.log(element_id)
    props.deleteDataAPI(base_url, element_id);
    navigate(props.urls.app_home_url + props.urls.app_list_url);
  };

  return (
    <React.Fragment>
      <h2 className="mt-4">{props.title}</h2>
      <Element
          key={element.id}
          urls={props.urls}
          details_button={false}
          element={element}
          deleteDataAPI={deleteRedirect}
        />
      {/* {element ? (
        <Element
          key={element.id}
          urls={props.urls}
          details_button={false}
          element={element}
          deleteDataAPI={deleteRedirect}
        />
      ) : (
        <progress className="progress is-large is-primary" max="100"></progress>
      )} */}
    </React.Fragment>
  );
}
