import logo from './logo.svg';
import './App.css';
import {useEffect,useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { FaGithub,FaTwitter,FaHeart,FaLessThan,FaGreaterThan} from "react-icons/fa";



function App(){
let[data,setdata]=useState([]);
let[temp,settemp]=useState([]);
let[load,setload]=useState(true);
let[ser,setser]=useState("");
useEffect(()=>{
  axios.get('https://rickandmortyapi.com/api/character')
  .then(function (response) {
    // handle success
    console.log(response.data.results);
    setdata(response.data.results)
    settemp(response.data.results)
    setload(false)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  }); 
},[])

const search=()=>{
  var tmp=data.filter((ele,ind)=>{
    return ele.name==ser;
  });
  setser("")
  setdata(tmp);
}

const all=()=>{
  setdata(temp)
}

  return (
   <>
  <nav>
    <Row>
      <Col></Col>
      <Col>
        <ul className='d-flex main_menu justify-content-end m-0'>
          <li>Docs</li>
          <li>About</li>
          <li className='support'>SUPPORT US</li>
        </ul>
      </Col>
    </Row>
  </nav>
  <div className='slider'>
    <Row className='text-center'>
      <Col><h1>The Rick and Morty API</h1></Col>
    </Row>
  </div>

  <div className='main_content'>
    <Row>
      <Col className='pb-4'>
        <div>
          <input type='text' onChange={(e)=>setser(e.target.value)} value={ser} className='me-2'></input>
          <input type='button' value="Search" style={{color:"white",backgroundColor:"#3C3E44"}} onClick={search}></input>
          <input type='button'  className='ms-2' value="All" style={{color:"white",backgroundColor:"#3C3E44"}} onClick={all}></input>
        </div>
      </Col>
    </Row>
      <Row xl={2}>
       {
        load?<div className='top'><Spinner className='loading' animation='border' variant='light'></Spinner></div>:
        data.map((ele,ind)=>{
         return(
          <Col className='p-0 m-0'>
            <div className='main_box d-flex'>
              <div className='img'>
                <img src={ele.image} className='w-100'></img>
              </div>
              <div className='content my-auto'> 
                <div className='s1'>
                  <h4 className='m-0 p-0'>{ele.name}</h4>
                  <div className='d-flex align-items-center'>
                   <p className="status m-0 me-1" style={{backgroundColor:ele.status=="Alive"?"green":ele.status=="Dead"?"red":"grey"}}></p>
                   <span className='m-0'>{ele.status}-{ele.species}</span>
                  </div>
                </div>
                <div className="s2">
                  <p className='m-0'>Last known location:</p>
                  <span>{ele.origin.name}</span>
                </div>
                <div className="s3">
                  <p className='m-0'>First seen in:</p>
                  <span>{ele.location.name}</span>
                </div>
              </div>
            </div>
          </Col>
         )
        })
       }
      </Row>
  </div>

  <div className='footer'>
    <div className='text-center justify-content-center d-flex s1'>
      <p xl={2} className='p-2 m=0 pb-0'>CHARACTERS: 826</p>
      <p xl={2} className='p-2 m=0 pb-0'>OCATIONS: 126</p>
      <p xl={2} className='p-2 m=0 pb-0'>EPISODES: 51</p>
    </div>
    <div className='d-flex justify-content-center align-items-center s2'>
       <span className='pe-2'>EPISODES: 51S</span>
        <span className='circle'></span>
    </div>
    <div className='s3'>
      <div className='d-flex justify-content-center'>
       <div className='power m-3'>
        <p className='m-0'>DEPLOYS BY</p>
        <p className='m-0'>netlify</p>
      </div>
      <div className='power m-3'>
        <p className='m-0'>Powered by</p>
        <p className='m-0'>Stellate</p>
      </div>
      </div>
    </div>
    <div className='text-center icon'>
       <i className='mx-3'><FaGithub /></i>
       <i className='mx-3'><FaTwitter /></i>
       <i className='mx-3'><FaHeart /></i>
    </div>
    <div className='text-center mt-4'>
      <span style={{color:"grey"}}><i><FaLessThan /></i><i><FaGreaterThan /></i>by <span style={{color:"white"}}>Axel Fuhrmann</span> 2024</span>
    </div>
  </div>
   </>
  );
}

export default App;
