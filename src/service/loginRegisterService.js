import db from '../models/index';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = async (userPassword) => {
    let hashPassword = await bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })

    if (user) {
        return true;
    }
    return false;
}

const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    })

    if (user) {
        return true;
    }
    return false;
}
const registerNewUser = async (rawUserData) => {
    try {
        // check email ./ phonenumber are exist

        let isEmailExist = await checkEmailExist(rawUserData.email);
        if (isEmailExist === true) {
            return {
                EM: 'the email is already exist',
                EC: 1
            }
        }
        let isPhoneExits = await checkPhoneExist(rawUserData.phone);
        if (isPhoneExits === true) {
            return {
                EM: 'the phone number is already exist',
                EC: 1
            }
        }
        //hash user password
        let hashPassword = hashUserPassword(rawUserData.password);

        //create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPassword,
            phone: rawUserData.phone
        })

        return {
            EM: 'A user is created successfully!',
            EC: 0
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'something wrongs in service...',
            EC: 0
        }
    }


}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);//true or false
}

const handleUserLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin }
                ]
            }
        })

        if (user) {
            console.log("<< tim thay");
            let isCorrectPassword = checkPassword(rawData.password, user.password);
            if (isCorrectPassword === true) {

                return {
                    EM: 'ok!',
                    EC: 0,
                    DT: ''
                }
            }
        }

        console.log(">> not found user with email/phone: ", rawData.valueLogin, rawData.password);
        return {
            EM: 'Your email/phone number or password is incorrect!',
            EC: 1,
            DT: ''
        }



    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrongs in service...',
            EC: 0
        }
    }
}

module.exports = {
    registerNewUser, handleUserLogin, checkEmailExist, checkPhoneExist, hashUserPassword
}