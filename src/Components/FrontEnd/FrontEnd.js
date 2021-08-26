import { Container } from '@material-ui/core'
import React,{useState} from 'react'
import {Row,Col} from 'react-bootstrap'
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import './FrontEnd.css'
import Trailer from '../Trailer/Trailer';
import Wheels from '../5thWheel/5thWheel';
import Olderunit from '../OlderUnit/OlderUnit';
import log from './just_round_logo.png'
const useStyles = makeStyles({
    root: {
      background: "linear-gradient(45deg, #3E72E3 30%, #3E72E3 90%)",
      border: 0,
      margin:0,
     alignItems:"center",
      borderRadius: 5,
      textTransform: 'none',
      color: "white",
      height: 48,
      padding: "0 30px",
      "&:hover": {
        color: "black",
      },
    },
  });
  const useStyle = makeStyles({
    root: {
      background: "linear-gradient(45deg, #3E72E3 30%, #3E72E3 90%)",
      border: 0,
      alignItems:"center",
      borderRadius: 5,
      color: "white",
      textTransform: 'none',
      height: 48,
      padding: "0 30px",
      "&:hover": {
        color: "black",
      },
    },
  });
  const useSty = makeStyles({
    root: {
      background: "linear-gradient(45deg, #3E72E3 30%, #3E72E3 90%)",
      border: 0,
      alignItems:"center",
      borderRadius:5,
      color: "white",
      textTransform: 'none',
      height: 48,
      padding: "0 30px",
      "&:hover": {
        color: "black",
      },
    },
  });
export default function FrontEnd() {
const [state,setstate]=useState("");
    const classes = useStyles();
   const bt2=useStyle();
   const bt3=useSty();
   const trailer=()=>{
     setstate("trailer");
   }
   const Wheel=()=>{
    setstate("Wheel");
  }
  const OlderModel=()=>{
    setstate("OlderModel");
  }
    return (
        <div>
          
            <Container>
              <Row><img src={log} style={{height:"13%",width:"13%",marginTop:"2%"}}/></Row>
            <h1 style={{fontFamily:"Times New Roman"}}>Gary's Auto</h1>
        <Row className="but">
          <Col>
            <Button className={classes.root} onClick={trailer}>
              Trailer/Motorhome
            </Button>
          </Col>
          <Col>
            <Button className={bt2.root} onClick={Wheel}>
              5th Wheel
            </Button>
          </Col>
          <Col>
            <Button className={bt3.root}onClick={OlderModel}>
              Older Model
            </Button>
          </Col>
        </Row>
               
            </Container>
            { state == 'OlderModel' ?   <Olderunit/> : 
        state == 'Wheel' ?  <Wheels/> :
      <Trailer/>
        }
             
        </div>
    )
}
