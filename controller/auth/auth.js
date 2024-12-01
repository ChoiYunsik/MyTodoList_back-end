import dotenv from 'dotenv';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import SNS from '../../models/sns_schema.js';
dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY;

const localStrategy = async (req, res, next) => {
  try {
    const error = req.error;
    const authenticatedUser = req.user;
    const info = req.info;
    console.log(authenticatedUser)

    if(error || !authenticatedUser){
      res.status(400).json({message : info.message})
    }

    // user데이터를 통해 로그인 진행
    req.login(authenticatedUser, {session : false}, async (loginError) => {
      if(loginError){
        return res.json(loginError)
      }
      
      // 클라이언트 JWT생성 후 반환
      const accessToken = jwt.sign(
        { 
          email : authenticatedUser.email,
          issuer : "yunsik"
        },
        SECRET_KEY,
        {
          expiresIn : '24h'
        }
      )

      console.log("authenticatedUser", authenticatedUser)
      console.log("token", accessToken)
      const {password, ...user} = authenticatedUser;
      
      res.status(200).json({
        user,
        accessToken,
        loginSuccess : true,
        message : "Login completed"
      })

    })

  } catch (error) {
    
  }
}

const jwtStrategy = async (req, res, next) => {
    try{
        const jwtAuthenticatedUser = req.user;
        const {password, ...user} = jwtAuthenticatedUser;
        res.json({
            user,
            message : "Automatic login completed",
            loginSuccess : true
        })

    }catch(error){
        console.error(error)
        next(error)


    }

}

export { localStrategy, jwtStrategy}
