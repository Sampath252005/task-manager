import mongoose from 'mongoose';
import { unique } from 'next/dist/build/utils';
import { unstable_act } from 'react/cjs/react.production.min';
const { Schema } = mongoose;

const userSchema = new Schema({
   username:{type:String, required:true},
   email:{type:String, required:true ,unique:true},
   password: { type: String, required: true },
   profilePicture: { type: String, default: "" },
});
export default mongoose.models.User || mongoose.model("User", userSchema);
