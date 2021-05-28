import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

import "./App.css";

const countriesURL = "https://restcountries.eu/rest/v2/all";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  TableContainer: {
    borderRadius :15,
    margin : '10px 10px',
   
  },
  TableHeader : {
    backgroundColor: theme.palette.info.light,
    color: theme.palette.getContrastText(theme.palette.info.light)
  }
}));

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const classes = useStyles();




  const getCountriesWithAxios = async () => {
    const response = await axios.get(countriesURL);
    setCountriesData(response.data);
    
  };

  useEffect(() => {
    getCountriesWithAxios();
  }, []);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <TableContainer component={Paper} className= {classes.TableContainer}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead className= {classes.TableHeader}>
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Flag</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Capital</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Population</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Region</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
             
                {countriesData.map((country) => (
                  
                  <TableRow key={country.callingCodes+country.name} >   {/* Was missing key after using Array map func. */}
                    <TableCell component="th" scope="row">
                      {country.name}                               {/* Country name and capital needed to be swapped */}
                    </TableCell>
                    <TableCell align="right">
                      <img src={country.flag} alt="" width="32px" />   {/* the image url was in country.flag and not country flags */}
                    </TableCell>
                    <TableCell align="right">{country.capital}</TableCell>
                    <TableCell align="right">{country.population}</TableCell>
                    <TableCell align="right">{country.region}</TableCell>
                  </TableRow>
                  
                ))}
                
              </TableBody>
              
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
