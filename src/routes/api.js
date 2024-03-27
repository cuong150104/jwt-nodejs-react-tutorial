import express from "express"
import apiController from '../controller/apiControlles';
import userController from '../controller/userController';
import groupController from '../controller/groupController';
import { checkUserJWT, checkUserPermission } from "../middleware/JWTAction";
const router = express.Router();

/**
 * 
 * @param {*} app : expree app
 * @returns 
 */

const testMiddleware = (req, res, next) => {
    console.log("calling a middleware");
    if (true) {
        return res.send("reject middleware");
    }
    next();
};

const initApiRoutes = (app) => {
    // path, handle
    // rest API
    // GET - R, POST - C, PUT - U, DELETE - D

    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);

    router.get(
        "/user/read",
        checkUserJWT,
        checkUserPermission,
        userController.readFunc
    );
    router.post("/user/create", userController.createFunc);
    router.put("/user/update", userController.updateFunc);
    router.delete("/user/delete", userController.deleteFunc);

    router.get("/group/read", groupController.readFunc);
    return app.use("/api/v1/", router);
}

export default initApiRoutes;