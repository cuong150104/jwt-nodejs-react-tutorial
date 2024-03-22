import loginRegisterService from '../service/loginRegisterService'
const testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test api'
    })
}

const handleRegister = async (req, res) =>{
    try{
        if(!req.body.email || !req.body.phone || !req.body.password)
        {
               return res.status(200).json({
                message: 'missing required parameters',// error message
                EC: '1',//error code
                DT: '', //date
            })
        }
        if(req.body.password && req.body.password.length < 4)
        {
            return res.status(200).json({
                message: 'your password must have mre than 3 letters',// error message
                EC: '1',//error code
                DT: '', //date
            })
        }
        // service: create user
        let data = await  loginRegisterService.registerNewUser(req.body)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,//error code
            DT: '', //date
        })
        
    }catch(e){
        return res.status(200).json({
            message: 'erorr from sever',// error message
            EC: '-1',//error code
            DT: '', //date
        })
    }
    console.log(">>>call me",req.body);
}
module.exports = {
    testApi, handleRegister
}