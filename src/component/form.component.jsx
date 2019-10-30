import React from "react";
import "./form.style.css";

const Form = (props) => {
  return (
    <div className="container">
      <div>{props.error ? error() : null}</div>
      <form onSubmit ={props.loadWeather}>
        <div className="row">
          <div className="col-md-4 offset md-2">
            <input
              type="text"
              className="formControl"
              name="city"
              autoComplete="off"
              placeholder ='City'
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="formControl"
              name="country"
              autoComplete="off"
              placeholder ='Country'
            />
          </div>
          <div className="col-md-4 mt-md-0 py-2 text-md-left">
            <button className="btn btn-dark text-light">Get Weather</button>
          </div>
        </div>
      </form>
    </div>
  );
};
function error(){
  return(
    <div className="alert alert-danger mx-5" role='alert'>Please Enter City and Country</div>
  )
}
export default Form;
