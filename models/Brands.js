const mongoose = require("mongoose")

const BrandSchema = new mongoose.Schema(
    {
        value : {type : String, required: true, unique:true},
        label : { type: String, required: true, unique:true}
        // checked: {type: Boolean, default:false}
    
       
    },
   

);

const virtual = BrandSchema.virtual('id')
virtual.get(function(){
    return this._id;
})

BrandSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform: function (response, ret) { delete ret._id}

})

module.exports = mongoose.model("Brand", BrandSchema);