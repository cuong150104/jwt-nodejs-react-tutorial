import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from '../models/index';


const salt = bcrypt.genSaltSync(10);



const hashUserPassword =(userPassword)=>
{
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser =  async (email, password, username) =>
{
    // let hashpass =hashUserPassword(password);
    // const connection = await mysql.createConnection({host: 'localhost',user: 'root',database: 'jwt',Promise: bluebird});
    //    // A simple SELECT query


    // const [rows, fields] = 
    // await connection.execute('INSERT INTO user (email, password, username) VALUES (?, ?, ?)',
    // [email,hashpass,username]);



    let hashpass = hashUserPassword(password);
    try{
       await db.User.create({
            username: username,
            email: email,
            password: password,
        })
    }catch(error)
    {
        console.log(">> check error: ", error);
    }

}

const getUserList = async () => {
    // test relationships
    let newUser = await db.User.findOne({
        where: {id: 1},
        attributes: ["id", "username", "email"],
        include: {model: db.Group , attributes: ["name","description"]},
        raw: true,
        nest: true
    }) 
//    console.log(">>> check newUser: ", newUser);


   
//    let r = await db.Role.findAll({
//     include: {model: db.Group},
//     raw: true,
//     nest: true
//    })

//    console.log(">>> check r: ", r);


    try {
        let user = [];
        user = await db.User.findAll();
        return user;
    } catch (error) {
        // Xử lý lỗi ở đây
        console.error('Error in getUserList:', error);
        throw error; // Rethrow lỗi để nó có thể được xử lý ở mức cao hơn
    }

//     const connection = await mysql.createConnection({host: 'localhost',user: 'root',database: 'jwt',Promise: bluebird});

//     try{
//         const [rows, fields] = await connection.execute('Select * from user ');
//         return rows;
//     }catch(error)
//     {
//         console.log(">>> check error: ", error);
//     }
//     // query database
// const [rows, fields] = await connection.execute('Select * from user ');

}

const deleteUser = async (userId) => {

   try{
     await db.User.destroy({
        where: { id: userId}
     })
    }catch(error)
    {
        console.log("<<< check DELETE: ", error);
    }
    
    // const connection = await mysql.createConnection({host: 'localhost',user: 'root',database: 'jwt', Promise: bluebird});

    // try{
    //     const [rows, fields] = await connection.execute('DELETE FROM user WHERE id=?',[id]);
    //     return rows;
    // }catch(error)
    // {
    //     console.log(">>> check error: ", error);
    // }
 

}

const getUserById  = async (id) =>{
    let user = {}
    user = await db.User.findOne({
        where: { id: id}
    })
    return user.get({ plain: true});

    // const connection = await mysql.createConnection({host: 'localhost',user: 'root',database: 'jwt',Promise: bluebird});

    // try{
    //     const [rows, fields] = await connection.execute('select * FROM user WHERE id=?',[id]);
    //     return rows;
    // }catch(error)
    // {
    //     console.log(">>> check error: ", error);
    // }
}

const updateUserInfor = async (email, username, id) => {

    await db.User.update(
        { email: email , username: username}, 
        {
           where:  { id: id}
         }
         );

    // const connection = await mysql.createConnection({host: 'localhost',user: 'root',database: 'jwt',Promise: bluebird});

    // try{
       
    //     const [rows, fields] = await connection.execute(' UPDATE user SET email = ?, username = ? WHERE id=?',[email, username, id]);
    //     return rows;
    // }catch(error)
    // {
    //     console.log(">>> check error: ", error);
    // }
}
module.exports = {
    createNewUser,getUserList,deleteUser, getUserById, updateUserInfor
}