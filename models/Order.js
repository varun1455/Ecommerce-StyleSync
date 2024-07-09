const mongoose = require("mongoose")
const { Schema } = mongoose;

const OrderSchema = new mongoose.Schema( 
    {
        
        items : {type:[Schema.Types.Mixed], required:true},
        totalAmount : { type: Number, required:true},
        totalItemsCount : { type: Number, required:true},
        loguser: {type: Schema.Types.ObjectId, ref:'User', required:true},
        paymentMethod : {type: String, required:true},
        status : {type:String, default:'pending'},
        selectedAddress: {type:Schema.Types.Mixed, required:true}
       
    },
   

);

const virtual = OrderSchema.virtual('id')
virtual.get(function(){
    return this._id;
})

OrderSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform: function (response, ret) { delete ret._id}

})

module.exports = mongoose.model("Order", OrderSchema);