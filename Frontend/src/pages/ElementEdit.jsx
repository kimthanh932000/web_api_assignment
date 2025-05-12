import * as React from "react";
import { useParams } from "react-router-dom";
import Form from "../components/Form";

export default function ElementEdit(props) {
  const [element, setElement] = React.useState({});
  const { element_id } = useParams();

  React.useEffect(() => {
    setElement(props.findElement(props.data, element_id));
    console.log("element: " + element.name);
  }, [props, element_id, element]);

  function renderDataForm() {
    return (
      <Form
        urls={props.urls}
        element={element}
        element_id={element_id}
        updateDataAPI={props.updateDataAPI}
      />
    );
  }

  return (
    <React.Fragment>
      <h2 className="mt-4">{props.title}</h2>
      {element ? (
        renderDataForm()
      ) : (
        <h1>
          <progress
            className="progress is-large is-primary"
            max="100"
          ></progress>
        </h1>
      )}
    </React.Fragment>
  );
}
