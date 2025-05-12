import React from "react";

import { Route, Routes } from "react-router-dom";
import ElementsList from "./pages/ElementsList";
import ElementDetail from "./pages/ElementDetail";
import ElementEdit from "./pages/ElementEdit";
import ElementAdd from "./pages/ElementAdd";
import SharedLayout from "./pages/SharedLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  const titles = {
    app_title: "React CRUD Client",
    app_element_list_title: "Elements List",
    app_detail_title: "Element Detail",
    app_edit_title: "Edit Element",
    app_add_title: "Add Element",
  };

  const urls = {
    api_base_url: process.env.REACT_APP_API_GATEWAY,
    api_element_list_url: "/elements",
    // api_get_post_element_list_url: "http://127.0.0.1:8000/api/elements",
    // app_home_url: "/app/react",
    app_home_url: "/",
    app_list_url: "/elements",
    app_element_id_url: "/:element_id",
    app_edit_url: "/edit",
    app_add_url: "/add",
  };

  const [elements, setElements] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    //NOTE: React in Strict Mode (when developing and not in deployment) calls this twice!
    // getDataAPI(urls.api_base_url + urls.api_element_list_url);
  }, [urls.api_base_url, urls.api_element_list_url]);

  const getDataAPI = (url) => {
    setLoading(true);
    console.log("Fetching data from: " + url);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          console.log("Response: " + response.json());
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Successfully fetched data from: " + url);
        setElements(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const deleteDataAPI = (url, id) => {
    setLoading(true);
    fetch(url + "/" + id, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response.json());
          throw Error(response.statusText);
        } else {
          setElements((prevElements) => {
            const newElements = prevElements.filter((item) => item.id !== id);
            console.log("Deleted element with id " + id);
            setLoading(false);
            return newElements;
          });
        }
        //return response.json();
      })
      .then((data) => data)
      .catch((err) => console.log(err.message));
  };

  const updateDataAPI = (url, data_dict, id = "", method) => {
    const is_post = method === "POST";
    setLoading(true);
    console.log(
      "Fetching data from: " + url + "/" + id + " with method: " + method
    );
    fetch(url + "/" + id, {
      method: method,
      body: JSON.stringify({
        ...data_dict,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Obtained Response: " + response.json());
          console.log("While trying to update/post data: ");
          console.log(data_dict);
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (is_post) {
          setElements((prevElements) => {
            const newElements = [...prevElements, data];
            console.log("Created element with id " + data.id + " with data: ");
            console.log(data);
            setLoading(false);
            return newElements;
          });
        } else {
          setElements((prevElements) => {
            const newElements = prevElements.map((item) => {
              if (item.id !== id) {
                return item;
              } else {
                return data;
              }
            });
            console.log("Updated element with id " + id + " with data: ");
            console.log(data);
            setLoading(false);
            return newElements;
          });
        }
      })
      .catch((err) => console.log(err.message));
  };

  const findElement = (data, id) => {
    console.log("Searching for element with id: " + id);
    const el = data.filter((element) => element.id === parseInt(id))[0];
    if (el) {
      console.log("Found element:\n");
      console.log(el);
      return el;
    } else {
      console.log("Element not found!");
      return false;
    }
  };

  return (
    <React.Fragment>
      <Routes>
        <Route
          path={urls.app_home_url}
          element={<SharedLayout app_title={titles.app_title} />}
        >
          <Route index element={<Home urls={urls} />} />
          <Route
            path={urls.app_home_url + urls.app_list_url}
            element={
              <ElementsList
                title={titles.app_element_list_title}
                data={elements}
                getDataAPI={getDataAPI}
                deleteDataAPI={deleteDataAPI}
                urls={urls}
                loading={loading}
              />
            }
          />
          <Route
            path={
              urls.app_home_url + urls.app_list_url + urls.app_element_id_url
            }
            element={
              <ElementDetail
                title={titles.app_detail_title}
                data={elements}
                findElement={findElement}
                deleteDataAPI={deleteDataAPI}
                urls={urls}
              />
            }
          />
          <Route
            path={urls.app_home_url + urls.app_edit_url + urls.app_element_id_url}
            element={
              <ElementEdit
                title={titles.app_edit_title}
                data={elements}
                findElement={findElement}
                updateDataAPI={updateDataAPI}
                urls={urls}
              />
            }
          />
          <Route
            path={urls.app_home_url + urls.app_add_url}
            element={
              <ElementAdd
                title={titles.app_add_title}
                updateDataAPI={updateDataAPI}
                urls={urls}
              />
            }
          />
          <Route
            path={urls.app_home_url + "/" + "*"}
            element={<NotFound urls={urls} />}
          />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
