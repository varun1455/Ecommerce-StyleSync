const mongoose = require("mongoose")
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
    {
        email : {type : String, required: true, unique:true},
        password : { type: String, required: true},
        name:{type : String},
        role:{type:String, required:true , default:'user'},
        addresses: { type: [Schema.Types.Mixed] }
        // orders: { type: [Schema.Types.Mixed] }
    
       
    },
 

);

const virtual = UserSchema.virtual('id')
virtual.get(function(){
    return this._id;
})

UserSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform: function (response, ret) { delete ret._id}

})

module.exports = mongoose.model("User", UserSchema);