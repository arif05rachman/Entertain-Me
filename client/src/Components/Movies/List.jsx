
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { Spinner, Button, Modal } from "react-bootstrap"
import { MovieCard } from "../../Components";
import { FETCH_ALL_MOVIES, ADD_MOVIE } from "../../schemas/moviesSchemas";

export default () => {
  const { loading, error, data, refetch } = useQuery(FETCH_ALL_MOVIES);
  const [addMovie] = useMutation(ADD_MOVIE);
  const history = useHistory();

  // ADDING
  const [show, setShow] = useState(false);
  const [titleAdd, setTitleAdd] = useState("");
  const [overviewAdd, setOverviewAdd] = useState("");
  const [posterPathAdd, setPosterPathAdd] = useState("");
  const [popularityAdd, setPopularityAdd] = useState("");
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-content-center align-middle align-items-center"
        style={{ width: "100vw", height: "100vh" }}
      >
        <div>
          <Spinner
            animation="border"
            role="status"
            style={{ fontSize: "200px" }}
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }
  // Modal Add
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSave = async () => {
    const addMovieData = {
      title: titleAdd,
      overview: overviewAdd,
      popularity: parseFloat(popularityAdd),
      poster_path: posterPathAdd,
      tags: ["anime"]
    };
    await addMovie({ variables: addMovieData });
    await refetch()
    // history.push("/movies");
    setShow(false);
    setTitleAdd("")
    setOverviewAdd("")
    setPosterPathAdd("")
    setPopularityAdd("")
  };
  
  return (
    <>
      <div className="container border border-black mt-2 rounded shadow-sm">
        <div className="text-center mt-2">
          <Button variant="primary" onClick={handleShow}>
            Add Movie
          </Button>
        </div>
        <hr/>
        <div className="row">
          {console.log(data)}
          {data.movies.map((movie) => {
            return (
              <MovieCard movie={movie} key={movie._id} refetch={refetch}/>
            );
          })}
        </div>
      </div>
      {/* MODAL ADD */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                value={titleAdd}
                onChange={(e) => setTitleAdd(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Overview</label>
              <textarea
                className="form-control"
                value={overviewAdd}
                onChange={(e) => setOverviewAdd(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Poster Path</label>
              <input
                type="text"
                className="form-control"
                value={posterPathAdd}
                onChange={(e) => setPosterPathAdd(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Popularity</label>
              <input
                type="number"
                max="10"
                className="form-control"
                value={popularityAdd}
                onChange={(e) => setPopularityAdd(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* END MODAL ADD */}
    </>
  );
};
