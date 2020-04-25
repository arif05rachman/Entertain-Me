import React, {useState} from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom"
import { useMutation } from "@apollo/react-hooks";
// import { useHistory } from "react-router-dom";

import { UPDATE_TV_SERIES, DELETE_TV_SERIES } from "../../schemas/tvSeriesSchemas";


export default (props) => {
  const { _id, title, overview, poster_path, popularity, tags } = props.tvSeries
  const refetch = props.refetch
  const [updateTvSeries] = useMutation(UPDATE_TV_SERIES);
  const [deleteTvSeries] = useMutation(DELETE_TV_SERIES);
  // const history = useHistory();
  // MODAL ADD
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [titleEdit, setTitleEdit] = useState(title)
  const [overviewEdit, setOverviewEdit] = useState(overview)
  const [posterPathEdit, setPosterPathEdit] = useState(poster_path)
  const [popularityEdit, setPopularityEdit] = useState(popularity)
  const handleSave = () => {
    const updateTvSeriesData = {
      _id: _id,
      title: titleEdit,
      overview: overviewEdit,
      popularity: parseFloat(popularityEdit),
      poster_path: posterPathEdit,
      tags: [""],
    };
    updateTvSeries({ variables: updateTvSeriesData });
    refetch();
    // history.push("/tvSeries");
    setShow(false);
  }
  // MODAL DELETE
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleCancelDelete = () => setShowDelete(false);
  const handleDelete = () => {
    const deleteId = {
      _id: _id
    }
    deleteTvSeries({ variables: deleteId });
    refetch();
    setShowDelete(false);
  }
  return (
    <>
      <div className="col p-2 d-flex justify-content-center">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Tvseries</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={titleEdit}
                  onChange={(e) => setTitleEdit(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Overview</label>
                <textarea
                  className="form-control"
                  value={overviewEdit}
                  onChange={(e) => setOverviewEdit(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <label>Poster Path</label>
                <input
                  type="text"
                  className="form-control"
                  value={posterPathEdit}
                  onChange={(e) => setPosterPathEdit(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Popularity</label>
                <input
                  type="number"
                  max="10"
                  className="form-control"
                  value={popularityEdit}
                  onChange={(e) => setPopularityEdit(e.target.value)}
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
        <Card style={{ width: "13rem" }}>
          <Card.Img variant="top" src={poster_path} />
          <Card.Body>
            <Card.Title className="text-center">{title}</Card.Title>
            <Card.Text>
              <span className="row px-2">
                {tags &&
                  tags.map((tag) => {
                    return (
                      <em
                        className="bg-info text-light font-weight-bold px-1 m-1 rounded-lg"
                        key={tag}
                      >
                        {tag}
                      </em>
                    );
                  })}
              </span>
            </Card.Text>
            <div className="text-center row">
              <Link to={`/tvSeries/${_id}`}>
                <Button variant="primary" className="col">
                  Show
                </Button>
              </Link>
              <Button variant="warning" className="col" onClick={handleShow}>
                Edit
              </Button>
              <Button
                variant="danger"
                className="col"
                onClick={handleShowDelete}
              >
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* DELETE MODAL */}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Tvseries?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* END DELETE MODAL */}
    </>
  );
};
