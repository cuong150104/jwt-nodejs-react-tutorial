import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";//de bao mat
require("dotenv").config();
import bodyParser from 'body-parser';
//import connection from "./config/connectDB";


const app = express();
const PORT = process.env.PORT || 8080;

//config cors
configCors(app);//  cors la de bao mat


//config view engine
configViewEngine(app);

//cofig body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connnection
//connection();

//init web routes
initWebRoutes(app);
initApiRoutes(app);
app.listen(PORT, ()=> {
    console.log(">>> JWT Backend s running on the port = "+PORT);
})