import Product from '../models/products.js';

export const createProduct = async (req, res) => {
  try {
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
      createdBy: req.user._id
    });

    return res.status(201).json({
      message: 'Product created successfully',
      product: newProduct
    });

  } catch (error) {
    return res.status(500).json({ message: 'Product creation failed', error: error.message });
  }
};

export const getProducts= async(req,res)=>{
    
}
export const getProductById= async(req,res)=>{}
export const updateProduct= async(req,res)=>{}
export const deleteProduct= async(req,res)=>{}
