import React, { useState,useEffect } from 'react'
import axios from 'axios';
import {Col,Row,Container} from 'react-bootstrap'
import './Main.css'
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Draggable from "react-draggable";
import firebase from '../Database/Database'
import Pdf from "react-to-pdf";
import { firebaseApp } from '../Database/Database';

const ref = React.createRef();
const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #3E72E3 30%, #3E72E3 90%)",
    border: 0,
    borderRadius: 3,
    color: "white",
    marginTop:"2%",
    marginBottom:"1%",
    textTransform: 'none',
    height: 48,
    padding: "0 30px",
    "&:hover": {
      color: "black",
    },
  },
});
const Main = (props) => {
  const classes = useStyles();
  
  let data ={nam:props.data.fileName};
  let array=[];
  const [header , setheader] = useState('')
  const [date , setdate] = useState('')
  const [manunote , setmanunote] = useState('')
  const [ynote , setynote] = useState('')
  const [price , setprice] = useState('')
  const [yr , setyr] = useState('')
  const [x , setx] = useState([]) 
  const [y , sety] = useState([])
  const [z , setz] = useState([])
  const [aray , setaray] = useState('');
  var vech =[];
    var minfo=[]; 
    var manufacturenote='';
    var yearnote = '';
    var no= 0;
    var min=[];

    useEffect(async() => {
      getfile();
    },[]);

    const fle =()=>{
      getfile();
    //   const storageRef = firebaseApp.storage().ref();
    // const fileRef = storageRef.child(props.data.fname).delete();
    }

  const getfile =async()=>{
    let a=await axios.post('/api/ext', data);    
    // setchk(a.data);
    //  setchk( a.data.split('\n').map(line => <span>{line},<br/></span>));
    let lines = a.data.split('\n');
    for (let i=0; i<lines.length; i++) {
        array.push(lines[i]);
    }
    setfile();
    setpric();
    setyr(x[2])
  }

  const setfile = () =>{
    let i;
    for(i=0; i<array.length;i++){
      if('Page' == array[i].split(" ")[0]){
        setheader(array[i-1].split("for ")[1])
      break;
    }
    }

    for(i; i<array.length;i++){
      let a=array[i].split(",")[0];
      if('Monday'== a ||'Tuesday'== a||'Wednesday'== a||'Thursday'== a||'Friday'== a||'Saturday'== a||'Sunday' ==a ){
        setdate(array[i])
      break;
    }
    }

    for(i; i<array.length;i++){
      if('Value' == array[i].split(" ")[0]){
        for(let j=i+1; j<array.length;j++){
           if('Vehicle'== array[j].split(" ")[0])
                break;
            vech.push(array[j]) ;  
       }
       sety(vech)
      break;
    }
    }


    for(i; i<array.length;i++){
      if('Vehicle' == array[i].split(" ")[0]){
        for(let j=i; j<array.length;j++){
           if('Suggested'== array[j].split(" ")[0]){
            minfo.push('Original Est. MSRP');
            min.push(array[j].split(":")[1]) ;
              break;
            }
            minfo.push(array[j].split(":")[0]) ;
            min.push(array[j].split(":")[1]) ;  
       }
       setz(minfo)
       setx(min)
      break;
    }
    }

    for(i; i<array.length;i++){
      if('Manufacturer' == array[i].split(" ")[0]){
        for(let j=i+1; j<array.length;j++){
          if(''== array[j])
          break;
        manufacturenote = manufacturenote + array[j] ;  
    }
       setmanunote(manufacturenote)
    break;
    }
    }

    for(i; i<array.length;i++){
      if('Year' == array[i].split(" ")[0]){
        for(let j=i+1; j<array.length;j++){
          if(''== array[j])
          break;
        yearnote = yearnote + array[j] ;  
    }
    setynote(yearnote)
    break;
    }
    }

    for(i=0; i<array.length;i++){
      if('Base' == array[i].split(" ")[0]){
        var pri= array[i].split("$")[1]
        pri = pri.split(",")
        no = (Number(pri[0]+pri[1]))
      break;
    }
    }
}
const click = () => {
  htmlToImage.toPng(document.getElementById("ab")).then(function (dataUrl) {
    download(dataUrl, x[2]+' '+x[3]+' '+x[4]);
  });
};

const setpric = async() =>{
  var sprice = 1;
  var comma='';
  var add='';
  if(props.data.type == 'older'){
    const db = firebase.collection('older');
    const snapshot = await db.where('location' , '!=' , '').get();
    snapshot.forEach(doc => {
       setaray(doc.data())
    })
    sprice = Number(props.data.location) * Number(aray.location) + Number(aray.pack) + Number(aray.recondition) + Number(props.data.admnt);
    if(props.data.tires == 'Yes'){
        sprice = Number(sprice) + Number(aray.tires);}
    if(props.data.milesAdjustment == 'If has more than 80K + Miles'){
      sprice = Number(sprice) + Number(aray.ifhasmorethan80Kmilesormore);
    }
    else if(props.data.milesAdjustment == 'If has more than 100K + Miles'){
      sprice = Number(sprice) + Number(aray.ifhasmorethan100Kmilesormore);
    }
    //setprice("$"+parseInt(no - Number(sprice)))
    comma = ("$"+parseInt(no - Number(sprice))).toString().split("");
  	      for(var i=0; i<comma.length;i++){
            sprice='';
            if(comma.length-i == 3){
              add=add + "," + comma[i]
            }
            else{
              add=add + comma[i]
            }
          }
          setprice(add)
  }
  else if(props.data.type == 'trailer'){
    const db = firebase.collection('Trailer');
    const snapshot = await db.where('location' , '!=' , '').get();
    snapshot.forEach(doc => {
       setaray(doc.data())
    })
    sprice = Number(props.data.location) * Number(aray.location) + Number(aray.pack) + Number(aray.recondition) + Number(props.data.admnt);
    if(props.data.tires == 'Motorhome'){
        sprice = Number(sprice) + Number(aray.motorhome);
      }
    else if(props.data.tires == 'Travel Trailer'){
      sprice = Number(sprice) + Number(aray.traveltrailer);
    }
    if(props.data.milesAdjustment == '(Ex=2012 or newer 95K + Miles)'){
      sprice = Number(sprice) + Number(aray.ifthemotorhomeissomewhatnewer2012andhashighmiles95Kormore);
    }
    else if(props.data.milesAdjustment == '(Ex= 2000 to 2011  90K + Miles)'){
      sprice = Number(sprice) + Number(aray.anytime2000modelyearmotorhomehas70Kto95Kmiles);
    }
    comma = ("$"+parseInt(no - Number(sprice))).toString().split("");
  	      for(var i=0; i<comma.length;i++){
            sprice='';
            if(comma.length-i == 3){
              add=add + "," + comma[i]
            }
            else{
              add=add + comma[i]
            }
          }
          setprice(add)
  }
  else{
    const db = firebase.collection('5thWheel');
    const snapshot = await db.where('location' , '!=' , '').get();
    snapshot.forEach(doc => {
       setaray(doc.data())
    })
    sprice = Number(props.data.location) * Number(aray.location) + Number(aray.pack) + Number(aray.recondition) + Number(props.data.admnt);
    if(props.data.tires == 'Yes'){
        sprice = Number(sprice) + Number(aray.tires);
      }
        comma = ("$"+parseInt(no - Number(sprice))).toString().split("");
  	      for(var i=0; i<comma.length;i++){
            sprice='';
            if(comma.length-i == 3){
              add=add + "," + comma[i]
            }
            else{
              add=add + comma[i]
            }
          }
          setprice(add)
  }
}


  return (
    <div>
      <Row className="btnD">
      <Col><Button className={classes.root} onClick={fle}>Generate Book</Button></Col>
        <Col> <Button className={classes.root}  onClick={click}>
        Download PNG
            </Button></Col>
            <Col><Pdf targetRef={ref} filename={x[2]+' '+x[3]+' '+x[4]}>
        {({ toPdf }) => <Button className={classes.root}  onClick={toPdf}>Download Pdf</Button>}
      </Pdf></Col>
      </Row>
      <div  id="ab"
          style={{ height: "1300px"}}>
      <Container  className="a4" ref={ref}>
        <Container >
        <div style={{marginBottom:"4%"}}></div>
          <Row className="head">
            <textarea className="header"   rows="1"
         cols="87" value={"West Coast & Southwest Region Pricing Information for "+header}
                    onChange={(e) => 
                      setheader(e.target.value )}/>
          </Row>
          <Row className="date2">
            <input className="date" size={30} value={date} type="text" onChange={(e) =>
                      setdate(e.target.value )
                    }/>
          </Row>
          <Row>
            <p className="info">Manufacturer Information</p>
          </Row>
          <Row>
          <p className="inform5">
              {y.map((y,i) => 
            <p key={i}>{y}</p>)}
              </p>
          </Row>
          <Row className="in">
            <Col style={{marginTop:"1%"}}>
            <p className="inform1">
              {z.map((z,i) => 
            <div><p key={i} size={38}>{z+":"} </p></div>)}
              </p>              
            </Col>
            <Col>
            <p className="inform3">
              {x.map((x,i) => 
            <div>{i==2 ? <input key={i} value={yr} size={38} className="inform2" style={{marginTop:"1%"}} onChange={(e) =>
              setyr(e.target.value )}/>
              :
           <input key={i} value={x} size={38} className="inform4" style={{marginTop:"1%"}} />
              }</div>)}
              </p>              
            </Col>
          </Row>
          <Row>
            <p className="net">Net Asset Value- Book Value</p>
          </Row>
          <Row className="bo">
          
              <p className="total">TOTAL VALUE</p>
           
              <input className="va"type="text" value={price} size={8} onChange={(e) =>
                      setprice(e.target.value )}/>
          
          </Row>
          <Row className="manufacnote">
            <Col>
            {ynote!="" ? <div className="checking">
            <p className="manu">Manufacturer Note:</p>
            <textarea className="nots" value={manunote} rows={5} cols={125} onChange={(e) =>
                      setmanunote(e.target.value )}/>
              </div> : console.log("empty") } 
            </Col>
          </Row>
          <Row className="manufacnote">
            <Col>
            {ynote!="" ? <div className="checking">
            <p className="manu2">Year Note:</p>
            <textarea className="nots" value={ynote} rows={22} cols={125} onChange={(e) =>
                      setynote(e.target.value )}/>
              </div> : console.log("empty") }
            </Col>
          </Row>
          <Row>
            <Col>
            <Draggable>
              <p className="foot">
                All values and related content contained in this net asset value
                are the opinions of Gary’s Auto Sales Inc Valuation Services
                editorial staff. The values are provided as-is. Gary’s Auto
                Sales Valuation Services make no warranty express or implied,
                including, without limitation, any warranty or merchantability
                or fitness for a particular purpose, and they assume no
                responsibility for the accuracy of the value or other
                information published herein. Gary’s Auto Sales Inc Valuation
                Services is not liable for any special, incidental, punitive or
                consequential damages resulting from any use of this content
                including, without limitation, lost profits. For additional
                information, please see the Gary’s Auto Sales Inc Privacy Policy
                https://www.askgary.io/garys-privacy-policy and Terms of Use
                https://www.askgary.io/garys-terms-of-use.
              </p>
              </Draggable>
            </Col>
          </Row>
        
        </Container>
      </Container>
     
      </div>
    
      </div>
    );
}
 

export default Main;