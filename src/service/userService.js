import bcrypt from 'bcryptjs';
import mysql from 'mysql2';

const salt = bcrypt.genSaltSync(10);

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
});

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

const getUserList = () => {
    connection.query(
        'Select * from user ',
        function (err, results, fields){
          if(err)
          {
              console.log(err);
          } 
        
        }
        );
}
module.exports = {
    createNewUser,getUserList
}