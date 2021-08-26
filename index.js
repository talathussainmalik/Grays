const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const { urlencoded } = require('express');
const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors());
const pdf = require('pdf-parse')


app.get('/',()=>{
  resizeBy.send("welcome to Grays Auto Sales")
})

app.post('/api/ext',async (req,res)=>{
  let data = req.body;
  var myData = ''; 
  try {
    pdf(data.nam).then(function (data){
        myData= data.text;
        return res.send(myData)
      })
    
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message
    });
  }
})

const Port=process.env.PORT||3001;
  app.listen(Port,()=>{
    console.log(`server starting at port ${Port}`);
  })