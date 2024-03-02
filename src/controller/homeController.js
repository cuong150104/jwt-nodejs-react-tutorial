import userService from '../service/userService';

const handleHelloWord = (req, res) => {
    return res.render("home.ejs");
}

const handleUserPage = async (req, res) => {
    let userList = await userService.getUserList();
   // console.log(">>> check user link: ", userList );
    return res.render("user.ejs", {userList});
}



const handleCreateNewUser = (req, res) => {
let email = req.body.email;
let password= req.body.password;
let username= req.body.username;
  

    return res.send("handleCreateUser");
}
module.exports = {
    handleHelloWord, handleUserPage, handleCreateNewUser
}
