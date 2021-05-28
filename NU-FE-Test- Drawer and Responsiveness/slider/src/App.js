import axios from 'axios';
import BootstrapTable from "react-bootstrap-table-next";
import React, { useState, useEffect } from "react";
import paginatorFactory from "react-bootstrap-table2-paginator";
import {Modal} from "react-bootstrap"; 
import {ListItem, List} from '@material-ui/core'
import './App.css';

const countriesURL = "https://restcountries.eu/rest/v2/all";

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [modalInfo, setModalInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const getCountriesWithAxios = async () => {
    const response = await axios.get(countriesURL);
    setCountriesData(response.data);
  };

  useEffect(() => {
    getCountriesWithAxios();
  }, []);


  function imageFormatter(cell) {
    
    return (
      <img src={cell} alt=" " width="32px" />
    );
  }
  const columns = [
    {dataField: "name", text: "Name",},
    {dataField: "flag", text: "Flag", formatter: imageFormatter},
    {dataField: "capital", text: "Capital"},
    {dataField: "population", text: "Population"},
    {dataField: "region", text: "Region"},
  ];

  const rowEvents = {
    onClick: (e,row) => {
      
      setModalInfo(row)
      toggle()
    }
  }

  const toggle = () => {
    setShowModal(handleShow);
  }

  const rowStyle = (row, rowIndex) => {
   
    return { 
      backgroundColor: '#E7F2F8',
    }
  };

  const ModalData = () => {
    return(
      <Modal show = {show} onHide= {handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalInfo.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <List>
            <ListItem><img src={modalInfo.flag} alt=" " width="70px" /></ListItem>
            <ListItem>Native Name : {modalInfo.nativeName}</ListItem>
            <ListItem>Subregion : {modalInfo.subregion}</ListItem>
            <ListItem>Calling Code : {modalInfo.callingCodes}</ListItem>
            <ListItem>Demonym : {modalInfo.demonym}</ListItem>
            <ListItem>Area : {modalInfo.area} SqKm</ListItem>
            <ListItem>Alpha 3 Code : {modalInfo.alpha3Code}</ListItem>
          </List>
        
        </Modal.Body>


      </Modal>
    )

  }

  

  return (
    <div className="App">

      <BootstrapTable 
      keyField="name"
      data = {countriesData}
      columns ={columns}
      rowStyle={ rowStyle }
      pagination={paginatorFactory()}
      rowEvents={rowEvents}
      />
      

     {show ? <ModalData /> : null}
    </div>
  );
}


export default App;
