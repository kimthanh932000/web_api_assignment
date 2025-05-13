import * as React from "react";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Form(props) {
  console.log("rendering form");
  const navigate = useNavigate();
  const element = props.element
  const element_id = props.element_id
  console.log(element)

  //SCHEMA FOR VALIDATION OF THE FORM -> CHANGE THIS FOR YOUR OWN FORM
  const schema = yup
    .object({
      name: yup.string().required(),
      description: yup.string().required(),
      elementType: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...element,
    },
    element,
  });

  React.useEffect(() => {
    reset(element);
  }, [props, reset, element]);

  const onSubmit = (data) => {
    console.log(data);
    if (element_id) {
      console.log("Updating:");
      console.log(
        "to " +
          props.urls.api_base_url +
          props.urls.api_element_list_url +
          "/" +
          element_id
      );
      props.updateDataAPI(
        props.urls.api_base_url + props.urls.api_element_list_url,
        data,
        element_id,
        "PUT"
      );
    } else {
      console.log("Posting:");
      console.log(
        "to " + props.urls.api_base_url + props.urls.api_element_list_url
      );
      props.updateDataAPI(
        props.urls.api_base_url + props.urls.api_element_list_url,
        data,
        "",
        "POST"
      );
    }
    // console.log(props.urls.app_home_url + props.urls.app_list_url)
    navigate(props.urls.app_list_url);
  };
  //console.log(errors);
  return (
    <React.Fragment>
      <div className="box">
        <form onSubmit={handleSubmit(onSubmit)}>
          {
            //EVERY INPUT IS WRAPPEN IN A FIELD DIV, A CONTROL DIV AND THEN NEED TO BE REGISTERED WITH HIS OWN NAME FROM THE SCHEMA
          }
          <div className="field">
            <div className="control">
              <input
                className="input"
                placeholder="name"
                {...register("name")}
              />
            </div>
            <p className="help is-danger">{errors.name?.message}</p>
          </div>
          <div className="field">
            <div className="control">
              <textarea
                className="textarea"
                type="text"
                placeholder="description"
                {...register("description")}
              />
            </div>
            <p className="help is-danger">{errors.description?.message}</p>
          </div>
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="type"
                {...register("elementType")}
              />
            </div>
            <p className="help is-danger">{errors.elementType?.message}</p>
          </div>
          <div className="buttons">
            <Link
              to={props.urls.app_list_url}
              className="button is-light"
            >
              Go Back 🔙
            </Link>
            <button className="button is-link" type="submit">
              Submit 📤
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
