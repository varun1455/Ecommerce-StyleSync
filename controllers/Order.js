const Order = require('../models/Order')


exports.fetchOrderByUser = async (req, res) =>{

    const {user} = req.query;


    try {

        const response = await Order.find({loguser:user});
        res.status(200).json(response);
        
    } catch (error) {   
        console.log(error)
        res.status(400).json(error);
        
    }

}

exports.createOrder = async (req, res) => {
    const order = new Order(req.body);
  
    try {
      const response = await order.save();
    //   const result = await response.populate('product');
    //   console.log(result);
      res.status(201).json(response);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  };


  exports.deleteOrder = async (req, res) => {

    const {id} = req.params;
   
  
    try {
      const response = await Order.findByIdAndDelete(id);
    
    //   console.log(result);
      res.status(201).json(response);
    } catch (err) {
    //   console.log(err);
      res.status(400).json(err);
    }
  };



  exports.updateOrder = async (req, res) =>{

    const {id} = req.params;
  
    try {
  
      const response = await Order.findByIdAndUpdate(id, req.body, {new:true})
    //   const result = await response.populate('product');
      res.status(200).json(response);
      
    } catch (error) {
      res.status(400).json(error);
      
    }
  
  
  }