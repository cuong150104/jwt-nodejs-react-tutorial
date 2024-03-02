import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';



const salt = bcrypt.genSaltSync(10);



const hashPassword =(userPassword)=>
{
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = (email, password, username) =>
{
    let hashpass = hashPassword(password);

       // A simple SELECT query
 connection.query(
    'INSERT INTO user (email, password, username) VALUES (?, ?, ?)',[email,hashpass,username],
    function (err, results, fields){
      if(err)
      {
          console.log(err);
      } 
    
    }
    );
}

const getUserList = async() => {
    const connection = await mysql.createConnection({host: 'localhost',user: 'root',database: 'jwt',Promise: bluebird});

    let users =[];
    // connection.query(
    //     'Select * from user ',
    //     function (err, results, fields){
    //       if(err)
    //       {
    //           console.log(err);
    //           return users;
    //       } 
    //     users = results;
    //     return users;
    //     }
    //     );

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
module.exports = {
    createNewUser,getUserList
}