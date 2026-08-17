
import productService from "../services/product.service.js";

const getAllProducts = async (req, res) => {
    const products = await productService.getAllProducts(req.query);
    res.json(products);
};

const getProductById = async (req, res) => {
    const id = req.params.id;
    const products = await productService.getProductById(id);
    if(!products) return res.status(404).json({message: "Product not found"});
    res.json(products);
};

const createProduct = async (req, res) => {
    const userId = req.user._id;
   try{
    const products = await productService.createProduct(req.body, userId);
    res.json(products);
   } catch (error) {
    res.status(404).send(error.message);
   }
};

const updateProduct = async (req, res) => {
    const id = req.params.id;
    const input = req.body;
   try{
    const products = await productService.updateProduct(id, input);
    res.json(products);
   } catch (error) {
    res.status(404).send(error.message);
   }
};

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try{
        const products = await productService.deleteProduct(id);
        res.json(products);
    }catch (error){
        res.status(404).send(error.message);
    }
};

const getBrands = async (req, res) => {
    const brands = await productService.getBrands();
    res.json (brands);
};

const getCategories = async (req, res) => {
    const categories = await productService.getCategories();
    res.json(categories);
};

const getTotalCount = async (req, res) => {
    const count = await productService.getTotalCount();
    res.json(count);
};



export default {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getBrands, getCategories, getTotalCount};