import * as mongoose from 'mongoose';

const dogSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  age: Number,
});

const dogModel = mongoose.model('dog', dogSchema);

export default dogModel;
