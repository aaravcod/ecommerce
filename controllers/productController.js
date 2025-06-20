import Product from '../models/products.js';

export const createProduct = async (req, res) => {
  try {
    const userId = req.user._id;

    if (Array.isArray(req.body)) {
      const products = req.body.map(product => ({
        ...product,
        createdBy: userId
      }));

      const createdProducts = await Product.insertMany(products);

      return res.status(201).json({
        message: 'Bulk products created successfully',
        count: createdProducts.length,
        products: createdProducts
      });
    }

    const { name, description, price, brand, category, stock_count, images } = req.body;

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: 'Product already exists' });
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      brand,
      category,
      stock_count,
      images,
      createdBy: userId
    });

    return res.status(201).json({
      message: 'Product created successfully',
      product: newProduct
    });

  } catch (error) {
      if(error){return res.status(500).json({ message: 'Product creation failed', error: error.message })};
  }
};


export const getProducts= async(req,res)=>{
    try{
      const products=await Product.find();
      return res.status(200).json({
        message:"Fetched Products",
        success:true,
        count: await Product.countDocuments(),
        product: products
      });
    }
    catch(error){
      if(error){
        console.log(error);
        return res.status(500).json({message:'Failed to fetch'});
      }
    }
}
export const getProductById= async(req,res)=>{
  try{
    const {id}=req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }
    const productbyid=await Product.findById(id);
    if(!productbyid){return res.status(404).json({message:"Product Not found"})};
    return res.status(200).json({
      success:true,
      message:"Product Found by ID",
      productbyid
    });
  }

  catch(error){
    if(error){
      res.status(500).json({message:"No product with this id"})
    }
  }
}
export const updateProduct= async(req,res)=>{
  try{
    const {id}=req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }
    const product=await Product.findById(id);
    if(!product){return res.status(404).json({message:'Product Does not Exsist'});}
    const updatableFields = [
      'name',
      'description',
      'price',
      'brand',
      'category',
      'stock_count',
      'images',
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

    const updatedProduct = await product.save();

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  }
  catch(error){
    if(error){
      res.status(500).json({message:"Error updating Data"});
    }
  }
}
export const deleteProduct= async(req,res)=>{
  try{
    const {id}=req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }
    const deletedProduct = await Product.findByIdAndDelete(id);
    if(!deletedProduct){return res.status(404).json({message:'Product Does not Exsist'});}
    

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  }
  catch(error){
    if(error){
      res.status(500).json({message:"Error updating Data"});
    }
  }
}
