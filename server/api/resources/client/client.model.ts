import * as mongoose from 'mongoose';


const  Schema = mongoose.Schema;
const  CliientSchema = new Schema({
    firstName: { type: String, required: true, },
    lastName:  { type: String, required: true, },
    email: { type: String , required: true, },
});


export default  mongoose.model('Client', CliientSchema);
