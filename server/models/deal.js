const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const DealSchema = new Schema({
  name: { type: String, required: true },
  owner: String,
  amount: {type: Number, required: true },
  company: {type: Schema.Types.ObjectId, ref: "Company", required: true},
  stage: {type: String, required: true},
  createdAt: { type: Date, required: true },
  closeDate: {type: Date, required: true},
  statusLastUpdatedAt: {type: Date, required: true}
});

module.exports = mongoose.model("Deal", DealSchema);