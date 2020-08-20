import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
export default function Form() {
  const [updateMovie, setUpdateMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: [],
  });
  const [stars, setStars] = useState("");
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${params.id}`).then((res) => {
      setUpdateMovie(res.data);
      console.log(res.data);
    });
  }, []);

  const inputHandler = (e) => {
    setUpdateMovie({ ...updateMovie, [e.target.name]: e.target.value });
  };

  const handleStars = (e) => {
    e.preventDefault();
    setUpdateMovie({ ...updateMovie, stars: [...updateMovie.stars], stars });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${params.id}`, updateMovie)
      .then((res) => {
        setUpdateMovie({ title: "", director: "", metascore: "", stars: [] });
        history.push("/");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      Title:{" "}
      <input
        type="text"
        value={updateMovie.title}
        name="title"
        onChange={inputHandler}
      />
      Director:{" "}
      <input
        type="text"
        value={updateMovie.director}
        name="director"
        onChange={inputHandler}
      />
      MetaScore:{" "}
      <input
        type="text"
        value={updateMovie.metascore}
        name="metascore"
        onChange={inputHandler}
      />
      Stars:{" "}
      <input
        type="text"
        value={updateMovie.stars}
        name="stars"
        onChange={handleStars}
      />
      <button>Submit</button>
    </form>
  );
}
