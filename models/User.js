import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
   username:{type:String, required:true},
   email:{type:String, required:true ,unique:true},
   password: { type: String, required: true },
    profilePic:{
       type: String,
       default: "/profile.png" // Default profile picture path,
   }
});
export default mongoose.models.User || mongoose.model("User", userSchema);
