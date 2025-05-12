import * as React from "react";
import Element from "../components/Element.jsx";
import { useParams, useNavigate } from "react-router-dom";

export default function ElementDetail(props) {
  const navigate = useNavigate();
  const { element_id } = useParams();
  const [element, setElement] = React.useState({});

  React.useEffect(() => {
    setElement(() => props.findElement(props.data, element_id));
  }, [props.data, element_id]);

  const deleteRedirect = (base_url, id) => {
    props.deleteDataAPI(base_url, id);
    navigate(props.urls.app_home_url + props.urls.app_list_url);
  };

  return (
    <React.Fragment>
      <h2 className="mt-4">{props.title}</h2>
      {element ? (
        <Element
          key={element.id}
          urls={props.urls}
          details_button={false}
          element={element}
          deleteDataAPI={deleteRedirect}
        />
      ) : (
        <progress className="progress is-large is-primary" max="100"></progress>
      )}
    </React.Fragment>
  );
}
