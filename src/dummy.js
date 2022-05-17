import React, { useState, useEffect } from "react";
import "./App.css";
import "./dummy.css";
import Axios from "axios";
// import model from react-bootstrap we have
import { Modal } from "react-bootstrap";
function App1() {
  const [deletemovie, setdeleteMovie] = useState({});
  const [updatemovie, setupdateMovie] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = (e, val) => {
    e.preventDefault();
    setShow(true);
    // set val
    setdeleteMovie(val);
  };
  
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieList] = useState([]);
  // using the useffect is to get the from the axios get response we have
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      // display the data in the front
      setMovieList(response.data);
    });
    // it will call useEffect for one time only
  }, []);

  const submitReview = async (e) => {
    e.preventDefault();

    await Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    });
    //simultaneusly sends the data on the front screen
    await Axios.get("http://localhost:3001/api/get").then((response) => {
      // display the data in the front
      setMovieList(response.data);
    });
    // setting back setMovieName and setReview back to empty
    setMovieName("");
    setReview("");
  };

  const deleteReview = async (e) => {
    e.preventDefault();
    await Axios.delete(`http://localhost:3001/api/delete/${deletemovie.id}`);
    setShow(false);
    setdeleteMovie({});
    await Axios.get("http://localhost:3001/api/get").then((response) => {
      // display the data in the front
      setMovieList(response.data);
    });
  };
  //
  const updateReview = async (e, movie) => {
    e.preventDefault()
    await Axios.put("http://localhost:3001/api/update", {
      movieid: updatemovie.id,
      movieName: movieName,
      movieReview: review,
    });
    setupdateMovie({})
    setMovieName('')
    setReview('')
    await Axios.get("http://localhost:3001/api/get").then((response) => {
      // display the data in the front
      setMovieList(response.data);
    });
  };

  const handleMovieUpdate = (e, val) => {
    e.preventDefault();
    setupdateMovie(val);
    setMovieName(val.movie);
    setReview(val.movie_reviews);
  };

  return (
    <form>
      <h1 align="center">Crud application</h1>
      <div className="w-25 container">
        <div className="form-group">
          <label>Movie</label>
          <input
            type="text"
            name="movieName"
            value={movieName}
            className="form-control mb-2"
            onChange={(e) => {
              setMovieName(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>MovieReview</label>
          <input
            type="text"
            name="movieReview"
            value={review}
            className="form-control mb-2"
            onChange={(e) => {
              setReview(e.target.value);
            }}
          />
        </div>
      </div>
      <br />
      <div className="col-md-12 text-center">
        <button
          onClick={(e) => Object.keys(updatemovie).length > 0 ? updateReview(e) : submitReview(e)}
          type="submit"
          class="btn btn-primary"
        >
          {Object.keys(updatemovie).length > 0 ? "Update" : "Submit"}
        </button>
      </div>
      <div className="col-md-12 container">
        <table className="table table-bordered table-hover table-dark">
          <thead>
            <tr>
              <th scope="col">Movie</th>
              <th scope="col">Movie Review</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {movieReviewList.map((val) => (
              <tr>
                <td>{val.movie}</td>
                <td>{val.movie_reviews}</td>
                <td>
                  <>
                    <button
                      variant="primary"
                      className="btn btn-danger  btn-sm"
                      onClick={(e) => handleShow(e, val)}>
                      Delete
                    </button>
                    <button className="ms-1 btn btn-primary btn-sm" onClick={(e) => handleMovieUpdate(e, val)}>
                      Update
                    </button>
                  </>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Are you confirm to delete this ?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <button
            color="secondary"
            className="btn btn-outline-secondary"
            onClick={() => setShow(false)}>
            Close
          </button>
          <button
            color="primary"
            className="btn btn-outline-danger"
            onClick={(e) => {
              deleteReview(e);
            }}
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    </form>
  );
}
export default App1;
