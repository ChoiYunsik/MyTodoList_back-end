import passport from "passport";
import dotenv from 'dotenv';
import User from "../models/user_schema.js";
import Sns from "../models/sns_schema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// passport 전략 사용
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as NaverStrategy } from 'passport-naver-v2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as KakaoStrategy } from 'passport-kakao';

dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY;

// passport의 약속된 필드 이름을 변경
const passportConfig = {
  usernameField : 'email', passwordField : 'password'
}

const passportVerify = async (email, password, done) => {
  try {
    // 아이디 검증
    const user = await User.findOne({ email: email }).lean();
    if(!user){
      return done(null, false, {message : "The user does not exist"})
    }
 
    const plainPassword = password; 
    const hashedPassword = user.password;

    bcrypt.compare(plainPassword, hashedPassword, (err, result) => {

      if(err) { return done(err) }
      if(result) {
        // 로그인 성공
        return done(null, user);
      }else {
        return done(null, false, { message : "The password is incorrect"})
      }
    })

  } catch (error) {
    console.log(error);
    done(error)
  }
}

// jwt로그인 전략
const JWTConfig = {
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY
}

const JWTVerify = async (jwtPayload, done) => {
  try {
    const user = await User.findOne({ email : jwtPayload.email }).lean();
    if(!user){
      done(null, false, {message : "The authentication information is incorrect"})
    }
    return done(null, user)
    
  } catch (error) {
    console.error(error)
    done(error)
  }
}

const naverConfig = {
  clientID : process.env.NAVER_ID,
  clientSecret : process.env.NAVER_SECRET,
  callbackURL : "/auth/naver/callback",
}

const naverVerify = async (accessToken, refreshToken, profile, done) => {
  console.log("naver profile", profile)
  const { id, email, name, profileImage, provider, mobile} = profile;

  try {
    // 네이버로 로그인했는지, 또는 회원가입 한 적이 있는지 확인
    const exUser = await User.findOne({email : email}).populate({
      path : "snsId", // 연관 컬럼
      match : {
        email : email,
        provider : provider
      }
    }).lean()

    const accessToken = jwt.sign(
      {
        email : email,
        issuer : "Yunsik"
      },
      SECRET_KEY,
      {
        expiresIn : '24h'
      }
    )

  if(exUser){
    exUser.accessToken = accessToken;
    done(null, exUser)
  }else {
    // 신규 회원일 경우 회원가입
    const createdSnsUser = await Sns.create({
      snsId : id,
      email : email,
      name : name,
      phone : mobile,
      picture : profileImage,
      provider : provider
    })

    const newUser = await User.create({
      email: createdSnsUser.email,
      name : name,
      phone : mobile,
      picture : createdSnsUser.picture,
      snsId : createdSnsUser._id
    })
    
    newUser.accessToken = accessToken;
    done(null, newUser);
  }

  } catch (error) {
    console.error(error)
  }
}
const googleConfig = {
  clientID : process.env.GOOGLE_ID,
  clientSecret : process.env.GOOGLE_SECRET,
  callbackURL : "/auth/google/callback",
}

const googleVerify = async (accessToken, refreshToken, profile, done) => {
  console.log('google profile', profile)
  const { id, emails, displayName, picture, provider, phone } = profile;
  const email = emails[0].value;
  try {
    // 구글 플랫폼에 로그인을 했고 && snsId필드에 구글 아이디가 있는 일치하는 경우
    const exUser = await User.findOne({email : email}).populate({
      path : "snsId", // 연관 컬럼
      match : {
        email : email,
        provider : provider
      }
    }).lean()

    const accessToken = jwt.sign(
      {
        email : email,
        issuer : "sehwan"
      },
      SECRET_KEY,
      {
        expiresIn : '24h'
      }
    )

    if(exUser){
      exUser.accessToken = accessToken;
      console.log("exUser", exUser)
      done(null, exUser)
    }else{
      // 회원가입 후 로그인
      const createdSnsUser = await Sns.create({
        snsId : id,
        email : email,
        name : displayName,
        picture : picture,
        provider : provider
      })

      const newUser = await User.create({
        email : createdSnsUser.email,
        name : displayName,
        phone : phone,
        picture : createdSnsUser.picture,
        snsId : createdSnsUser._id, // 스키마의 ID 참조
      })

      newUser.accessToken = accessToken;
      console.log("newUser", newUser)
      done(null, newUser);
    }

  } catch (error) {
    console.error(error)
    done(error)
  }
}


const initializePassport = () => {
  passport.use('local', new LocalStrategy(passportConfig, passportVerify));
  passport.use('jwt', new JWTStrategy(JWTConfig, JWTVerify));
  passport.use('naver', new NaverStrategy(naverConfig, naverVerify));
  passport.use('google', new GoogleStrategy(googleConfig, googleVerify));
}

export { initializePassport }