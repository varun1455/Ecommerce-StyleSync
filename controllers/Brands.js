// const Brands = require('../models/Brands');
const Brand = require('../models/Brands');

exports.fetchBrands = async (req, res) =>{


    try {

        const brands = await Brand.find({}).exec();
        res.status(200).json(brands);
        
    } catch (error) {   
        console.log(error)
        res.status(400).json(error);
        
    }

}

exports.createBrand = async (req, res) => {
    const brand = new Brand(req.body);
  
    try {
      const response = await brand.save();
      res.status(201).json(response);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  };