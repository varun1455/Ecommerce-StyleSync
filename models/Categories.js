const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema(
    {
        value : {type : String, required: true, unique:true},
        label : { type: String, required: true, unique:true}
        // checked: {type: Boolean, default:false}
    
       
    },
    // {timestamps: true}

);

const virtual = CategorySchema.virtual('id')
virtual.get(function(){
    return this._id;
})

CategorySchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform: function (response, ret) { delete ret._id}

})

module.exports = mongoose.model("Category", CategorySchema);