const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);

  try {
    const response = await product.save();
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};



exports.fetchProducts = async (req, res) =>{


  try {

      const response = await Product.find({}).exec();
      res.status(200).json(response);
      
  } catch (error) {   
      console.log(error)
      res.status(400).json(error);
      
  }

}

exports.fetchAllProducts = async (req, res) => {
  let query = Product.find({});
  let totalProductsQuery = Product.find({});
  if (req.query.category) {
      query = query.find({ category: req.query.category });
      totalProductsQuery = totalProductsQuery.find({ category: req.query.category });
    }
    if (req.query.brand) {
        query = query.find({ brand: req.query.brand });
        totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
    }
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }

    const totalproducts = await  totalProductsQuery.count().exec();
    // console.log({totalproducts})

  if (req.query.per_page && req.query._page) {
    const pagesize = req.query.per_page;
    const page = req.query._page;
    query = query.skip(pagesize * (page - 1)).limit(pagesize);
  }

  try {
    const response = await query.exec();
    // res.set('X-Total-Count', totalpages)
    res.status(201).json({response,totalproducts});
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};


exports.fetchProductById = async (req, res) =>{

  const {id} = req.params;

  try {

    const response = await Product.findById(id);
    res.status(200).json(response);
    
  } catch (error) {
    res.status(400).json(error);
    
  }


}


exports.updateProduct = async (req, res) =>{

  const {id} = req.params;

  try {

    const response = await Product.findByIdAndUpdate(id, req.body, {new:true})
    res.status(200).json(response);
    
  } catch (error) {
    res.status(400).json(error);
    
  }


}
