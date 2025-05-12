import * as React from "react";
import Form from "../components/Form";

export default function ElementAdd(props) {
  React.useEffect(() => {
    //console.log("rendering form");
  }, []);

  function renderDataForm() {
    return <Form urls={props.urls} updateDataAPI={props.updateDataAPI} />;
  }

  return (
    <React.Fragment>
      <h2 className="mt-4">{props.title}</h2>
      {renderDataForm()}
    </React.Fragment>
  );
}
