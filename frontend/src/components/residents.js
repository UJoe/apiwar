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
import "./residents.css";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";

import Loading from "./loading";

const useStyles = makeStyles((theme) => ({
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
    float: "right",
  },
  tableName: {
    fontWeight: "bold",
  },
}));

const Residents = ({ planeta, people, setOpen }) => {
  const [loading, setLoading] = useState(true);

  /* let people = []; */
  //console.log("Planet:", planeta);
  //console.log("People:", people);

  const classes = useStyles();

  /* const fetcher = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data) {
          people.push(data);
        }
      })
      .catch((error) => console.error(error));
  };

  residents.map((url, index) => fetcher(url));
  console.log("People:", people);
 */
  return (
    <>
      <span id="fcknx" onClick={() => setOpen(false)}>
        {loading ? (
          <Loading loading={loading} setLoading={setLoading} />
        ) : (
          <CancelPresentationIcon />
        )}
      </span>
      <h1>Residents of {planeta}</h1>
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
                  Height
                </TableCell>
                <TableCell className={classes.tableName} align="left">
                  Mass
                </TableCell>
                <TableCell className={classes.tableName} align="left">
                  Skin Color
                </TableCell>
                <TableCell className={classes.tableName} align="left">
                  Hair Color
                </TableCell>
                <TableCell className={classes.tableName} align="left">
                  Eye Color
                </TableCell>
                <TableCell className={classes.tableName} align="left">
                  Birth Year
                </TableCell>
                <TableCell className={classes.tableName} align="left">
                  Gender
                </TableCell>
                <TableCell
                  className={classes.tableName}
                  align="left"
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {people.map((row) => {
                //console.log("row: " + row);

                return (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">
                      {row.height === "unknown"
                        ? row.height
                        : row.height / 100 + " m"}
                    </TableCell>
                    <TableCell align="left">
                      {row.mass === "unknown" ? row.mass : row.mass + " kg"}
                    </TableCell>
                    <TableCell align="left">{row.skin_color}</TableCell>
                    <TableCell align="left">{row.hair_color}</TableCell>
                    <TableCell align="left">{row.eye_color}</TableCell>
                    <TableCell align="left">{row.birth_year}</TableCell>
                    <TableCell align="left">
                      {row.gender === "male" ? (
                        <img
                          class="genderpic"
                          src="male.png"
                          alt={row.gender}
                        />
                      ) : row.gender === "female" ? (
                        <img
                          class="genderpic"
                          src="female.png"
                          alt={row.gender}
                        />
                      ) : (
                        "n/a"
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell colSpan={8}>
                  <Button
                    colSpan={8}
                    className={(classes.button, "closepan")}
                    onClick={() => setOpen(false)}
                    variant="contained"
                    default
                  >
                    Close
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Residents;
