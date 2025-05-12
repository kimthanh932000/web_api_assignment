# React CRUD API Client App

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white) ![Bulma](https://img.shields.io/badge/bulma-00D0B1?style=for-the-badge&logo=bulma&logoColor=white)

A simple React App for C.R.U.D. operations on data from an external REST API.

## Preview

<img src="https://user-images.githubusercontent.com/67196406/210624907-57ab5337-ab01-4238-bd0d-a67306907949.png" width="500">

<img src="https://user-images.githubusercontent.com/67196406/210624999-846e2b24-686f-4adc-aa84-6961d6cbe64d.png" width="500">

<img src="https://user-images.githubusercontent.com/67196406/210625070-e20bd03a-60d9-4993-8935-bc442bca076d.png" width="500">

## Packages Used

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This App uses mainly the following npm packages:

- React DOM Router
- React Hook Form
- Yup validator
- Bulma CSS

## Setup

Node.js and Node Package Manager (NPM) are required to run and build this project.
To setup the app, while inside the project folder, execute the following commands:

```Shell
  npm install
  npm start
```

This will install all the dependencies and run a server in development mode on [http://localhost:3000](http://localhost:3000).

## Usage

In the `App.jsx` inside the src folder, various arguments are used and passed to the app elements as props.
In particular the base url, with the various urls parameters are used to make fetch calls to an API.

## API Endpoints

In this case the value used are an example and fetch the data to a localhost Django web-server that serves an API with the following endpoints.

### **{base_url}/elements**

- GET: list of elements is returned
- POST: a new element is added

### **{base_url}/elements/{element_id}**

- PUT: modifies the element data, selecting it by his element_id
- DELETE: deletes the element with id of element_id

## App Pages

The default pages for the app are mapped with the following urls:

### **{app_base_url}/**

Shows the home page, with the API base url displayed and a link to the element list.

### **{app_base_url}/elements**

Shows the element list fetched with a GET API call.

### **{app_base_url}/edit/element_id**

Shows a page to edit the element with element_id, via a PUT call to the API.

### **{app_base_url}/add**

Shows a page to add a new element via a POST call to the API.

## Customization

Altough the components are made to be flexible enough without editing a lot of code, some of them needs to be fixed/modified, especially the `Form.jsx` that has all the Yup validators and forms element specifically made for the data used for the example API.

An example of the JSON data fetched by example the API is:

```JSON
    {
        "id": 56,
        "name": "Kiwi",
        "description": "A beautiful 🥝",
        "element_type": "C"
    }
```

And the yup validation Schema is the following:

```JavaScript
  const schema = yup
    .object({
      name: yup.string().required(),
      description: yup.string().required(),
      element_type: yup.mixed().oneOf(["A", "B", "C", "D"]),
    })
    .required();
```

An example of the form (in this case the element name) is:

```JavaScript
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
  ```

The register string passed,the placeholder attribute and other small tweaks are necessary to adapt to your data.

## Improvements to Make

- [x] Reduce props passed for urls
- [ ] Add code comments and improve documentation
- [ ] Use better React patterns to reduce passed props and reduce written code
- [ ] Edit Form.jsx to generalize fetched JSON data from the API (avoid hardcoding)
- [ ] Add a way to setting up the form validation more easily
- [ ] Add visual feedbacks when editing/adding/deleting data  
- [ ] Improve app navigation and layout
