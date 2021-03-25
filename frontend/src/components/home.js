import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Planets from "./planets";
import "./navstyle.css";

//if line 9 useState is set to true, you can see the data without logging in

function Home(props) {
  const [toBeLegal, setToBeLegal] = useState(
    props.location.state === undefined ? "" : props.location.state.boolean
  );
  const [planetData, setPlanetData] = useState([]);
  const [page, setPage] = useState(1);
  const [prev, setPrev] = useState();
  const [next, setNext] = useState();

  const fetcher = async (e, value) => {
    await fetch(`https://swapi.dev/api/planets/?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPlanetData(data.results);
        setNext(data.next);
        setPrev(data.previous);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetcher();
  }, [page]);

  console.log(props.location.obj);

  //ha a login sikeres volt, akkor ennek false-nak kell lennie, ha nem történt valid beléptetés, akkor true
  //backendből kell lekérni
  if (!toBeLegal) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <div className="navbar">
        <Link
          className="navitem"
          to={"/login"}
          onClick={() => {
            fetch("http://localhost:8000/logout", {
              method: "POST",
            })
              .then((response) => response.json())
              .then((data) => console.log(data));
          }}
        >
          Log out
        </Link>
        <img className="logo" src="logo.png" alt="Api Wars"></img>
        <span className="loggeduser">{window.loggedinuser}</span>
      </div>
      <Planets
        planetData={planetData}
        pageNum={page}
        changePage={setPage}
        prev={prev}
        next={next}
      />
    </>
  );
}

export default Home;
