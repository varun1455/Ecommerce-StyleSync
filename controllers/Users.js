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

    const {id} = req.params;
  
    try {
  
      const response = await User.findById(id, 'name email id').exec();
      res.status(200).json(response);
      
    } catch (error) {
      res.status(400).json(error);
      
    }
  
  
  }

  
exports.updateUser = async (req, res) =>{

    const {id} = req.params;
  
    try {
  
      const response = await User.findByIdAndUpdate(id, req.body, {new:true})
      res.status(200).json(response);
      
    } catch (error) {
      res.status(400).json(error);
      
    }
  
  
  }
  