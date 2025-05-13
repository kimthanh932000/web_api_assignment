import * as React from "react";
import { useParams } from "react-router-dom";
import Form from "../components/Form";

export default function ElementEdit(props) {
  const [element, setElement] = React.useState({});
  const { element_id } = useParams();
  console.log(element_id)

  React.useEffect(() => {
    // props.findElement(
    //   props.urls.api_base_url + props.urls.api_element_list_url,
    //   element_id
    // ).then((data) => {
    //   setElement(data);
    //   console.log("element: " + data.name);
    // });
    // setElement(() => props.findElement(props.urls.api_base_url + props.urls.api_element_list_url, element_id));
    // console.log(props)
    // console.log("element: " + element.name);
    // setElement(() => props.findElement(props.urls.api_base_url + props.urls.api_element_list_url, element_id));
    findElement(props.urls.api_base_url + props.urls.api_element_list_url, element_id);
  }, [element_id]);


  const findElement = (url, id) => {
    // setLoading(true);
    console.log("Fetching data from: " + url + "/" + id);
    fetch(`${url}/${id}`)
      .then((response) => {
        if (!response.ok) {
          console.log("Response: " + response.json());
          throw Error(response.statusText);
        }
        // setLoading(false);
        // console.log(response.json())
        return response.json();
      })
      .then((data) => {
        console.log(data)
        setElement(data);
        // return data;
        // console.log("Successfully fetched data from: " + url);
        // setElements(data);
        // return response.json();
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

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
      {renderDataForm()}
      {/* {element ? (
        renderDataForm()
      ) : (
        <h1>
          <progress
            className="progress is-large is-primary"
            max="100"
          ></progress>
        </h1>
      )} */}
    </React.Fragment>
  );
}
