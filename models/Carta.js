const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartaSchema = new Schema({
  productName: { type: String, required: true},
  price: { type: Number, required: true }
},
{
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      return ret;
    }
  }
});

const Carta = mongoose.model("Carta", cartaSchema);

module.exports = Carta;
