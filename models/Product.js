const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
    {
        title : {type : String, required: true, unique:true},
        description : { type: String, required: true},
        price : { type: Number,min:[0, 'wrong min price'], max:[100000, 'wrong max price']},
        discountPercentage : { type: Number,min:[1, 'wrong min dicount'], max:[99, 'wrong max discount']},
        rating : { type: Number,min:[1, 'wrong min rating'], max:[99, 'wrong max rating'], default:0},
        stock : { type: Number,min:[0, 'wrong min stock'], default:0},
        category: { type: String,required: true},
        brand: { type: String,required: true},
        thumbnail : { type: String, required: true},
        images : { type: [String], required: true},
        deleted : {type: Boolean, default:false}
    
       
    },
    // {timestamps: true}

);

const virtual = ProductSchema.virtual('id')
virtual.get(function(){
    return this._id;
})

ProductSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform: function (response, ret) { delete ret._id}

})

module.exports = mongoose.model("Product", ProductSchema);