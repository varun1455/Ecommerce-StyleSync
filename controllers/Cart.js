const Cart = require('../models/Cart')

exports.fetchCartByUser = async (req, res) =>{

    const {user} = req.query;


    try {

        const response = await Cart.find({user:user}).populate('product');
        res.status(200).json(response);
        
    } catch (error) {   
        console.log(error)
        res.status(400).json(error);
        
    }

}

exports.addToCart = async (req, res) => {
    const cart = new Cart(req.body);
  
    try {
      const response = await cart.save();
      const result = await response.populate('product');
    //   console.log(result);
      res.status(201).json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  };


  exports.deleteFormCart = async (req, res) => {

    const {id} = req.params;
   
  
    try {
      const response = await Cart.findByIdAndDelete(id);
    
    //   console.log(result);
      res.status(201).json(response);
    } catch (err) {
    //   console.log(err);
      res.status(400).json(err);
    }
  };



  exports.updateCart = async (req, res) =>{

    const {id} = req.params;
  
    try {
  
      const response = await Cart.findByIdAndUpdate(id, req.body, {new:true})
      const result = await response.populate('product');
      res.status(200).json(result);
      
    } catch (error) {
      res.status(400).json(error);
      
    }
  
  
  }