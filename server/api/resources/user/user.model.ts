
import * as mongoose from 'mongoose';
// import * as bcryptjs from 'bcryptjs';

const { Schema } = mongoose;
const UserSchema = new Schema({
  local: {
    name: String,
    email: String,
    password: String,
  },
  google: {
    email: String,
    id: String,
    displayName: String,
    token: String,
  },
  twitter: {
    username: String,
    id: String,
    token: String,
    displayName: String,
  },
  github: {
    email: String,
    id: String,
    displayName: String,
    token: String,
  },
});
export default mongoose.model('User', UserSchema);

/*
const { Schema }   = mongoose ;
const  UserSchema = new Schema({
   local:  { email: String, password: String},
   google: { email: String, displayName: String, token: String},
   twitter: { username: String, id: String, token: String, displayName: String },
   github: { email: String, id: String, displayName: String, token: String}

  //  email: { type: String, required: true, lowercase: true, unique: true },
  //  password:  { type: String, required: true, },

 });

// UserSchema.pre('save', async function() {
//   if (this.isModified('password')  || this.isNew  ) {
//        const salt = await bcryptjs.genSalt();
//        const hash = await bcryptjs.hash(this.password, salt);
//     this.password = hash;
//   }
//
// });

export default  mongoose.model('User', UserSchema);
 */
