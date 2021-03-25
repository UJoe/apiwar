import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Residents from "./residents";
import Loading from "./loading";
import "./navstyle.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  table: {
    minWidth: 650,
  },
  button: {
    margin: "10px",
    textTransform: "none",
  },
  tableName: {
    fontWeight: "bold",
  },
}));

const Planets = ({ planetData, pageNum, changePage, prev, next }) => {
  //console.log(planetData);
  function createData(
    name,
    diameter,
    climate,
    terrain,
    surface_water,
    population,
    residents,
    vote
  ) {
    return {
      name,
      diameter,
      climate,
      terrain,
      surface_water,
      population,
      residents,
      vote,
    };
  }

  const rows = [
    planetData.map((planet) =>
      createData(
        planet.name,
        planet.diameter,
        planet.climate,
        planet.terrain,
        planet.surface_water,
        planet.population,
        planet.residents
      )
    ),
  ];
  //console.log(rows);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modresidents, setModresidents] = useState([]);
  const [planeta, setPlaneta] = useState();
  const [people, setPeople] = useState([]);
  const [timo, setTimo] = useState(true);
  const [loading, setLoading] = useState(true);
  var parr = [];
  var crease = 0;

  const fetcher = async (url) => {
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        parr.push(data);
        //console.log(parr);
        return parr;
      })
      .catch((error) => console.error(error));
  };

  const handleOpen = () => {
    if (modresidents) {
      //console.log("handleOpen " + modresidents);
    }
    setOpen(true);
  };

  useEffect(() => {
    /* console.log("these are the modresidents: " + JSON.stringify(modresidents)); */
    const promises = modresidents.map((url, index) => {
      return fetch(url).then((response) => response.json());
    });
    Promise.all(promises).then((values) => {
      console.log(values);
      setPeople(values);
    });
  }, [modresidents]);

  const handleClose = () => {
    setOpen(false);
  };

  function handleClick() {
    setTimeout(() => {
      if (timo) {
        changePage((pageNum += crease));
        setLoading(true);
      }
    }, 400);
  }

  function handleDoubleclick() {
    setTimo(false);
    changePage((pageNum += crease));
    setTimeout(() => {
      setTimo(true);
    }, 401);
  }

  function voting(id) {
    let oldN = parseInt(document.getElementById("vn-" + id).innerHTML);
    document.getElementById("vn-" + id).innerHTML = (oldN + 1).toString();
  }

  return (
    <div>
      <h1>Star Wars universe planets</h1>
      <Button
        className={classes.button}
        disabled={prev === null || loading ? true : false}
        variant="contained"
        color="primary"
        href="#contained-buttons"
        onClick={() => {
          crease = -1;
          handleClick();
        }}
        onDoubleClick={() => {
          crease = -1;
          handleDoubleclick();
        }}
      >
        Previous
      </Button>
      <Button
        className={classes.button}
        disabled={next === null || loading ? true : false}
        variant="contained"
        color="primary"
        href="#contained-buttons"
        onClick={() => {
          crease = 1;
          handleClick();
        }}
        onDoubleClick={() => {
          crease = 1;
          handleDoubleclick();
        }}
      >
        Next
      </Button>
      {loading ? (
        <Loading loading={loading} setLoading={setLoading} />
      ) : (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableName} align="left">
                  Name
                </TableCell>
                <TableCell className={classes.tableName} align="left">
                  Diameter
                </TableCell>
                <TableCell className={classes.tableName} align="left">
                  Climate
                </TableCell>
                <TableCell className={classes.tableName} align="left">
                  Terrain
                </TableCell>
                <TableCell className={classes.tableName} align="left">
                  Surface Water Percentage
                </TableCell>
                <TableCell className={classes.tableName} align="left">
                  Population
                </TableCell>
                <TableCell className={classes.tableName} align="left">
                  Residents
                </TableCell>
                <TableCell
                  className={classes.tableName}
                  align="left"
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {planetData.map(
                (row) =>
                  planetData && (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">
                        {row.diameter === "unknown"
                          ? row.diameter
                          : row.diameter
                              .split("")
                              .reverse()
                              .map((x, i) =>
                                i % 3 === 0 && i !== 0 ? (x = x + ",") : x
                              )
                              .reverse()
                              .join("") + " km"}
                      </TableCell>
                      <TableCell align="left">{row.climate}</TableCell>
                      <TableCell align="left">{row.terrain}</TableCell>
                      <TableCell align="left">
                        {row.surface_water === "unknown"
                          ? row.surface_water
                          : row.surface_water + "%"}
                      </TableCell>
                      <TableCell align="left">
                        {row.population === "unknown"
                          ? row.population
                          : row.population
                              .split("")
                              .reverse()
                              .map((x, i) =>
                                i % 3 === 0 && i !== 0 ? (x = x + ",") : x
                              )
                              .reverse()
                              .join("") + " people"}
                      </TableCell>
                      <TableCell align="center">
                        {!row.residents.length ? (
                          <span className="noknown">No known residents</span>
                        ) : (
                          <Button
                            id="resiBtn"
                            className={classes.button}
                            variant="contained"
                            type="button"
                            onClick={() => {
                              setModresidents(row.residents);
                              setPlaneta(row.name);
                              handleOpen();
                            }}
                          >
                            {row.residents.length + " residents"}
                          </Button>
                        )}
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          className={(classes.button, "votespan")}
                          variant="contained"
                          default
                          onClick={() => voting(row.name)}
                        >
                          vote
                        </Button>
                      </TableCell>
                      <TableCell>
                        <span
                          id={"vn-" + row.name}
                          className="voteCount"
                          key={"vn-" + row.name}
                        >
                          0
                        </span>
                      </TableCell>
                    </TableRow>
                  )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Residents planeta={planeta} people={people} setOpen={setOpen} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Planets;
