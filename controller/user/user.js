import User from "../../models/user_schema.js";
import path from 'path'
import bcrypt, { hash } from 'bcrypt';

const loginUser = async (req, res) => {
    //console.log(req.body)
    const findUser = await User.findOne({email : req.body.email}).lean()

    if(!findUser){
        return res.status(401).json({
            loginSuccess : false,
            message : "The email does not exist"
        })
    }else{
        // 비밀번호 검증
        const passwordMatch = req.body.password === findUser.password;
        if(!passwordMatch){
            return res.status(401).json({
                loginSuccess : false,
                message : "The password does not match"
            })
        }
        // 민감한 정보를 제거
        const { password, ...user} = findUser;
        //console.log(user)
        return res.status(200).json({
            user,
            loginSuccess : true,
            message : "Login completed"
        })
    }
}
const registerUser = async (req, res) => {
    //console.log(req.body)
    const { name, email, password, phone } = req.body;
    const findUser = await User.findOne({email : email}).lean();

    if(findUser){
       
        return res.status(409).json({
            registerSuccess : false,
            message : "This email already exists"
        })
    }else{
        
        // 비밀번호 해시화
        const saltRounds = 10; // 해시 강도를 설정(높을 수록 안전);
        const plainPassword = req.body.password
        console.log("현재 비밀번호", plainPassword);

        bcrypt.hash(plainPassword, saltRounds, async (err, hashPassword) => {
            if(err){
                console.log(err)
            }else{
                console.log("해쉬 비밀번호", hashPassword);
                let registerUser = {
                    email : email,
                    password : hashPassword,
                    name : name,
                    phone : phone
                }

                await User.create(registerUser);
                return res.status(201).json({
                    message : "Congratulations! Your registration is complete",
                    registerSuccess : true
                })
            }
        })
    }
}
const updateUser = async (req, res) => {
    //req.body.email
    const findUser = await User.findOne({email : req.body.email })
    const updatedUser = await User.updateOne(findUser,{
        // email : req.body.email,
        // name : req.body.name
    })
}
const deleteUser = async (req, res) => {
    const user = await User.findOne({email : req.body.email});
    const DeletedUser = await User.deleteOne(user);
}

const updatePicture = async (req, res) => {
    const uploadFolder = "uploads/profiles";
    const relativePath = path.join(uploadFolder, req.file.filename).replace(/\\/g, '/');
    const email = req.body.email;

    const currentUser = await User.findOne({email : email})
    const updatedUser = await User.updateOne(
        currentUser,
        {picture : `/${relativePath}`})

    console.log(req.body)
    res.status(200).json({
        message : "Updated",
        filePath : `/${relativePath}`,
    })
}

export {loginUser, registerUser, updateUser, deleteUser, updatePicture }