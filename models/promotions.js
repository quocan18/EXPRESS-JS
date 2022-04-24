var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Currency = mongoose.Types.Currency;

require("mongoose-currency").loadType(mongoose);

var promoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    price: {
      type: Currency,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      required: fasle,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Promotion", promoSchema);
