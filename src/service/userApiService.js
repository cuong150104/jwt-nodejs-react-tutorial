import db from '../models/index';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { checkEmailExist, checkPhoneExist, hashUserPassword } from './loginRegisterService';

const getAllUser = async (req, res) => {


    try {
        let users = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "sex"],
            include: { model: db.Group, attributes: ["name", "description"] },
        });
        if (users) {
            return {
                EM: 'get data success',
                EC: 0,
                DT: users
            }
        } else {
            return {
                EM: 'get data success',
                EC: 0,
                DT: []
            }
        }
    } catch (erorr) {
        console.log(erorr);
        return {
            EM: 'something wrongs with sevice',
            EC: 1,
            DT: []
        }
    }
}
const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id", "username", "email", "phone", "sex"],
            include: { model: db.Group, attributes: ["name", "description"] },
        })
        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }
        return {
            EM: 'ok fetch',
            EC: 0,
            DT: data
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'something wrongs with sevice',
            EC: 1,
            DT: []
        }
    }
}
const createNewUser = async (data) => {
    // check email ./ phonenumber are exist
    try {
        let isEmailExist = await checkEmailExist(data.email);
        if (isEmailExist === true) {
            return {
                EM: 'the email is already exist',
                EC: 1,
                DT: 'email'
            }
        }

        let isPhoneExits = await checkPhoneExist(data.phone);
        if (isPhoneExits === true) {
            return {
                EM: 'the phone number is already exist',
                EC: 1,
                DT: 'phone'
            }
        }

        //hash user password
        let hashPassword = hashUserPassword(data.password);

        await db.User.create({ ...data, password: hashPassword });
        return {
            EM: ' create ok',
            EC: 0,
            DT: []
        }
    } catch (e) {
        console.log(e);
    }
}
const updateUser = async (data) => {
    try {
        let user = await db.User.finOne({
            where: { id: data.id }
        })
    } catch (e) {
        console.log(e);
    }
}
const deleteUser = async (id) => {

    try {
        let user = await db.User.findOne({
            where: { id: id }
        })

        if (user) {
            console.log("check id: ", id);
            await user.destroy();
            return {
                EM: 'Delete user succeeds',
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: 'ok fetch',
                EC: 2,
                DT: []
            }
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'something wrongs with sevice',
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    getAllUser, createNewUser, updateUser, deleteUser, getUserWithPagination
}