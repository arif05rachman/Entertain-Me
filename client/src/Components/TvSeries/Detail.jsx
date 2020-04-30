import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Link, useParams } from "react-router-dom"
import { Card, Spinner, Button } from "react-bootstrap";
import { FIND_ONE_TV_SERIES } from "../../schemas/tvSeriesSchemas";

export default () => {
  const { tvSeriesId } = useParams()
  const { loading, error, data } = useQuery(FIND_ONE_TV_SERIES, {
    variables: { _id: tvSeriesId },
  });

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-content-center align-middle align-items-center"
        style={{ width: "100vw", height: "100vh" }}
      >
        <div>
          <Spinner animation="border" role="status" style={{fontSize: "200px"}}>
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div>{error}</div>
    )
  }
  const {
    title,
    overview,
    poster_path,
    popularity,
    tags,
  } = data.findOneTvSeries;
  return (
    <>
      <div className="container mt-4">
        <Card className="p-4">
          <div className="row">
            <div className="col-4">
              <Card.Img
                variant="top"
                src={poster_path}
                style={{ height: "400px" }}
              />
              <Card>
                <Card.Body>
                  <div className="px-2">
                    <div className="row">
                      <div>{}</div>
                      <div>Popularity: {popularity}</div>
                    </div>
                  </div>
                  <div className=" row p-2">
                    {tags && tags.map((tag) => {
                      return (
                        <em
                          className="bg-info text-light font-weight-bold px-1 m-1 rounded-lg"
                          key={tag}
                        >
                          {tag}
                        </em>
                      );
                    })}
                  </div>
                </Card.Body>
              </Card>
            </div>
            <Card className="p-2 col-8">
              <Card.Body>
                <Card.Title className="text-center">{title}</Card.Title>
                <hr />
                <Card.Text className="text-justify">{overview}</Card.Text>
              </Card.Body>
              <Link to="/tv">
                <Button className="col">Back to List</Button>
              </Link>
            </Card>
          </div>
        </Card>
      </div>
    </>
  );
};
