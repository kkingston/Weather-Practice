import React from 'react'
import '../FormStyle.css'

const Form = props => {
  return (
    <div className="container">
      <div>{props.error ? error() : null}</div>
      <form onSubmit={props.loadWeather}>
        <div className="row">
          <div className="col-md-3 offset-md-2">
            <input type="text" className="form-control" value="City" name="city" autoComplete="off"/>
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control" value="Country" name="country" autoComplete="off"/>
          </div>
          <div className="col-md-3 mt-md-0 text-md-left">
            <button type="submit" className="btn btn-warning">How's the weather?? &rarr;</button>
          </div>
        </div>
      </form>
    </div>
  )
}

function error() {
  return (
    <div className="alert alert-danger mx-5" role="alert">Oopsie.. You forgot to tell which city.. </div>
  )
}

export default Form;