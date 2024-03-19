import express from "express"
import apiController from '../controller/apiControlles';
const router = express.Router();

/**
 * 
 * @param {*} app : expree app
 * @returns 
 */
const initApiRoutes = (app) => {


    router.get("/test-api", apiController.testApi);
    router.post("/register", apiController.handleRegister);
    
    return app.use("/api/v1/",router);
}

export default initApiRoutes;