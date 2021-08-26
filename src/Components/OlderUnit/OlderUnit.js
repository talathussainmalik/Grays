import { Container } from '@material-ui/core'
import React,{useState,useRef,useEffect} from 'react'
import {Form,Col,Row,Overlay,Tooltip} from 'react-bootstrap'
import './OlderUnit.css'
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Main from '../Main/Main'
import firebase from '../Database/Database';
import { firebaseApp } from '../Database/Database';

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #3E72E3 30%, #3E72E3 90%)",
    border: 0,
    margin:0,
    marginTop:"20%",
    textTransform: 'none',
   alignItems:"center",
    borderRadius: 5,
    color: "white",
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
    margin:0,
    marginTop:"45%",
    marginLeft:"8%",
    textTransform: 'none',
   alignItems:"center",
    borderRadius: 5,
    color: "white",
    height: 22,
    width:15,
    padding: "0 30px",
    "&:hover": {
      color: "black",
    },
  },
});
export default function OlderUnit() {
  const ac = useSty();
  const classes = useStyles();
  const [state2,setstate2]=useState("");
    const [state , setstate] = useState({
        fileName : "",
        location : "0",
        tires:"No",
        milesAdjustment:"None",
        type:"older",
        admnt:"0",
        err:"",
        fname:""
        });
        const [show, setShow] = useState(false);
        const [aray , setaray] = useState([]);
        const target = useRef(null);

        useEffect(() => {
          const fb =async()=>{
            const db = firebase.collection('notes');
            const snapshot = await db.where('note', '!=', '').get();
            snapshot.forEach(doc => { 
              setaray(aray =>([
               ...aray,
               {
                 note: (doc.data().note)
               }
             ]))
           })
          }
          fb();
        },[]);

        const onChng = e =>{
            if(e.target.value=='Yes'){
              setstate({...state ,tires : 'Yes'})
            }
            else{
              setstate({...state ,tires : 'No'})
            }
          }
          const onChng2 = e =>{
            if(e.target.value=='If has more than 80K + Miles'){
              setstate({...state ,milesAdjustment : 'If has more than 80K + Miles'})
            }
            else if(e.target.value=='If has more than 100K + Miles'){
              setstate({...state ,milesAdjustment : 'If has more than 100K + Miles'})
            }
            else{
                setstate({...state,milesAdjustment:'None'})
            }
          }
          const ch=async(e)=>{
            if(e){
              const file =e.target.files[0];
              const storageRef = firebaseApp.storage().ref();
                  const fileRef = storageRef.child(file.name);
                  await fileRef.put(file);
                  setstate({...state , fileName:(await fileRef.getDownloadURL()),
                    fname:(file.name)});
              }
        }
          const submit=()=>{
            if(state.fileName == ""){
              setstate({...state,err:"Upload File"})
            }
            else{
            setstate2("ab");
          }
          }
    return (
        <div>
              { state2=="" ?
          <Container>
              <h2 style={{fontFamily:"Times New Roman"}}>Older Unit</h2>
              <input type="file" name="file" onChange={ch}/>
              <p style={{color:"Red"}}>{state.err}</p>
               <Form>
                {/* <Form.Group controlId="formFile" className="mb-3">
    <Form.Control type="file" value={state.fileName}
          onChange={e => setstate({...state, fileName: e.target.value })}  />
  </Form.Group> */}
  <Row style={{display:"inline-flex"}} >
    <Col> <Form.Group style={{marginTop:"12%"}} className="mb-3">
    <Form.Label   className="loc">Location</Form.Label>
    <Form.Control type="text" placeholder="" value={state.location}
          onChange={e => setstate({...state, location: e.target.value })} />
  </Form.Group></Col>
 <Col>
 <Button className={ac.root} ref={target} onClick={() => setShow(!show)}>
        Notes
      </Button>
      <Overlay target={target.current} show={show} placement="right" >
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            {aray.map((aray,i) => 
            <p key={i}>{aray.note}</p>)}
          </Tooltip>
        )}
      </Overlay>
 </Col>
      </Row>
      <Row>
      <Col> <Form.Group style={{marginTop:"2%"}} className="mb-3">
    <Form.Label   className="loc">Adjustment</Form.Label>
    <Form.Control type="text" placeholder="" value={state.admnt}
          onChange={e => setstate({...state,admnt: e.target.value })} />
  </Form.Group></Col>
      </Row>
      <Row>
      <Form.Label className="tires2">Tires</Form.Label>
  <Form.Select style={{marginTop:"3%",marginLeft:"4%"}} onChange={onChng}>
  <option value="No">No</option>
  <option value="Yes">Yes</option>
</Form.Select >
      </Row>
  
<br/>
<Form.Label className="miles2">Miles Adjustment</Form.Label>
  <Form.Select style={{marginTop:"3%",marginLeft:"2%"}} onChange={onChng2} >
  <option value="None">None</option>
  <option value="If has more than 80K + Miles">80K + Miles</option>
  <option value="If has more than 100K + Miles">100K + Miles </option>
</Form.Select>
                </Form>
                
                <Row className="but">
          <Col>
            <Button className={classes.root} onClick={submit}>
             Submit
            </Button>
          </Col>
          </Row>
              </Container> : <Main data={state}/> }


        </div>
    )
}
