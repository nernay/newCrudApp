import React, { useState } from "react";
import "./App.css";

function App() {
  const [movieName, setMovieName] = useState("");
  // on submit button it will prevent the page from reloading
  // on the sync function we it will prevent it from crashing the hardware

  const submitReview = (e) => {
    alert(movieName);
    // it will the page from reloading
    e.preventDefault();
  };

  return (
    <div className="App">
      <form onSubmit={submitReview} className="container">
        <h1>CRUD APPLICATION</h1>
        <div className="row">
          <div className="form-group col-xs-3">
              <label>Movie Name</label>
              <input type="text" name="movieName" value={movieName} onChange={(e) => setMovieName(e.target.value)}
                className="form-control mb-2"/>
          </div>
          <div className="col-12 text-start">
            <label>Review</label>
            <input type="text" name="review" className="form-control mb-2" />
          </div>
          <div className="col-12 text-start">
            <button className="btn btn-success" type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
