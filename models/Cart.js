const mongoose = require("mongoose")
const { Schema } = mongoose;

const CartSchema = new mongoose.Schema( 
    {
        quantity : {type : Number, required: true},
        user: {type: Schema.Types.ObjectId, ref:'User', required:true},
        product : {type: Schema.Types.ObjectId, ref:'Product',  required:true}
    
       
    },
   

);

const virtual = CartSchema.virtual('id')
virtual.get(function(){
    return this._id;
})

CartSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform: function (response, ret) { delete ret._id}

})

module.exports = mongoose.model("Cart", CartSchema);