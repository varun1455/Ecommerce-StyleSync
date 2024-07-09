const Category = require('../models/Categories');

exports.fetchCategory = async (req, res) =>{


    try {

        const categories = await Category.find({}).exec();
        res.status(200).json(categories);
        
    } catch (error) {   
        console.log(error)
        res.status(400).json(error);
        
    }

}


exports.createCategory = async (req, res) => {
    const category = new Category(req.body);
  
    try {
      const response = await category.save();
      res.status(201).json(response);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  };