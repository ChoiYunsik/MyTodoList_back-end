import { Schema, model } from "mongoose";
import { getCurrentTime } from "../utils/utils.js";

const todoSchema = new Schema({
    email : {type : String, require : true},
    title : {type : String, require: true},
    isChecked : {type : Boolean, default : false},
    //content : {type : String, require : true},
    // user : {type : email, ref : "User", require : true},
    createAt : { type : String, default : getCurrentTime},
    updateAt : {type : String, default : getCurrentTime}
})


export default model("Todo", todoSchema, "todo");