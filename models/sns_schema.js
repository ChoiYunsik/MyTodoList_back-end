import { Schema, model } from "mongoose";
import { getCurrentTime } from "../utils/utils.js";

const snsSchema = new Schema({
    snsId : { type : String, require : true, unique : true},
    email :  { type : String, require : true },
    name : String,
    picture : String,
    provider : String,
    phone : { type : String, default : "000-0000-0000"},
    createAt : { type : String, default : getCurrentTime},
    updateAt : { type : String, default : getCurrentTime}
  
})

export default model("Sns", snsSchema, "Sns");