import loginRegisterService from '../service/loginRegisterService'
const testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test api'
    })
}

const handleRegister = async (req, res) => {
    try {
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                message: 'missing required parameters',// error message
                EC: '1',//error code
                DT: '', //date
            })
        }
        if (req.body.password && req.body.password.length < 4) {
            return res.status(200).json({
                message: 'your password must have mre than 3 letters',// error message
                EC: '1',//error code
                DT: '', //date
            })
        }
        // service: create user
        let data = await loginRegisterService.registerNewUser(req.body)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,//error code
            DT: '', //date
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'erorr from sever',// error message
            EC: '-1',//error code
            DT: '', //date
        })
    }

}

const handleLogin = async (req, res) => {
    try {
        let data = await loginRegisterService.handleUserLogin(req.body);
        res.cookie("jwt", data.DT.access_token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
        });
        return res.status(200).json({
            EM: data.EM,// error message
            EC: data.EC,//error code
            DT: data.DT, //data
        })
    } catch (error) {
        console.log("check: ", error)
        return res.status(500).json({
            EM: 'erorr from sever',// error message
            EC: '-1',//error code
            DT: '', //date
        })

    }

}


module.exports = {
    testApi, handleRegister, handleLogin
}