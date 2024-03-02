import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';



const salt = bcrypt.genSaltSync(10);



const hashPassword =(userPassword)=>
{
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser =  async (email, password, username) =>
{
    let hashpass = hashPassword(password);
    const connection = await mysql.createConnection({host: 'localhost',user: 'root',database: 'jwt',Promise: bluebird});

       // A simple SELECT query


    const [rows, fields] = 
    await connection.execute('INSERT INTO user (email, password, username) VALUES (?, ?, ?)',
    [email,hashpass,username]);

}

const getUserList = async() => {
    const connection = await mysql.createConnection({host: 'localhost',user: 'root',database: 'jwt',Promise: bluebird});

    try{
        const [rows, fields] = await connection.execute('Select * from user ');
        return rows;
    }catch(error)
    {
        console.log(">>> check error: ", error);
    }
    // query database
const [rows, fields] = await connection.execute('Select * from user ');

}

const deleteUser = async (id) => {
    
    const connection = await mysql.createConnection({host: 'localhost',user: 'root',database: 'jwt',Promise: bluebird});

    try{
        const [rows, fields] = await connection.execute('DELETE FROM user WHERE id=?',[id]);
        return rows;
    }catch(error)
    {
        console.log(">>> check error: ", error);
    }
    // query database
   const [rows, fields] = await connection.execute('Select * from user ');

}
module.exports = {
    createNewUser,getUserList,deleteUser
}