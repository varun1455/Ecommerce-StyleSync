const User = require('../models/User');

exports.fetchUsers = async (req, res) =>{


    try {

        const users = await User.find({}).exec();
        res.status(200).json(users);
        
    } catch (error) {   
        console.log(error)
        res.status(400).json(error);
        
    }

}





  exports.fetchUserById = async (req, res) =>{

    const {id} = req.user;
  
    try {
  
      const user = await User.findById(id).exec();
      res.status(200).json({id:user.id, email:user.email, name:user.name, addresses:user.addresses });
      
    } catch (error) {
      res.status(400).json(error);
      
    }
  
  
  }

  
exports.updateUser = async (req, res) =>{

    const {id} = req.user;
  
    try {
  
      const user = await User.findByIdAndUpdate(id, req.body, {new:true})
      res.status(201).json({ email:user.email, name:user.name, addresses:user.addresses });
      
    } catch (error) {
      res.status(400).json(error);
      
    }
  
  
  }
  