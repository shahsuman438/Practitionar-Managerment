require("dotenv").config();
require("./src/common/db/db");
const express = require("express");
const app = express();
const cors=require('cors')
const publicRouter = require("./src/routes");
const cookieParser=require('cookie-parser')
const path=require('path')
const corsOptions={
  origin:'*',
  credentials:true
}
const APP_PORT =
  (process.env.NODE_ENV === "test"
    ? process.env.TEST_APP_PORT
    : process.env.APP_PORT) ||
  process.env.PORT ||
  "3000";
const APP_HOST = process.env.APP_HOST || "0.0.0.0";

app.set("port", APP_PORT);
app.set("host", APP_HOST);
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
// API Routes
app.use("/api", publicRouter);
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV=="production"){
  app.use(express.static(path.join(__dirname,"../app/practitionar/dist")));
  app.get('*',(req,res)=>{ 
      res.sendFile(path.join(__dirname,'../app/practitionar','dist','index.html'))
  })
}else{
  app.get('/',(req,res)=>{
      res.send("API Running")
  })
} 


app.listen(app.get("port"), app.get("host"), () => {
  console.log(
    `Server started at http://${app.get("host")}:${app.get("port")}/api`
  );
});
