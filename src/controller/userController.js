import userApiService from '../service/userApiService';
const readFunc = async (req, res) => {

    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            let data = await userApiService.getUserWithPagination(+page, +limit);
            return res.status(200).json({
                EM: data.EM,// error message
                EC: data.EC,//error code
                DT: data.DT, //data
            })
        }
        let users = await userApiService.getAllUser();

        // console.log("check page: ",page, "limit+ ", limit);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'erorr from sever',// error message
            EC: '-1',//error code
            DT: '', //date
        })
    }
}
const createFunc = async (req, res) => {
    try {
        let data = await userApiService.createNewUser(req.body);
        return res.status(200).json({
           EM: data.EM,// error message
            EC: data.EC,//error code
            DT: data.DT, //data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'erorr from sever32',// error message
            EC: '-1',//error code
            DT: '', //date
        })
    }
}
const updateFunc = async (req, res) => {
    try {
        let users = await userApiService.getAllUser();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'erorr from sever',// error message
            EC: '-1',//error code
            DT: '', //date
        })
    }
}
const deleteFnuc = async (req, res) => {
    try {
        let data = await userApiService.deleteUser(req.body.id);
        console.log(req.body.id);
        return res.status(200).json({
            EM: data.EM,// error message
            EC: data.EC,//error code
            DT: data.DT, //data
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'erorr from sever',// error message
            EC: '-1',//error code
            DT: '', //date
        })
    }
}

module.exports = {
    readFunc, createFunc, updateFunc, deleteFnuc
}