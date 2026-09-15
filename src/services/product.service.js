import fs from "fs/promises";
import Products from "../models/Products.js";
import uploadFile from "../utils/fileUploader.js";
import { file } from "zod";
import { PRODCUT_DESCRIPTION_PROMPT } from "../constants/prompt.js";
import promptAi from "../utils/ai.js";

const getAllProducts = async (query) => {
  const sort =  query.sort? JSON.parse(query.sort): {};
  const limit = query.limit?? 10;
  const offset = query.offset?? 0;

  const filters = {};
  const {category, brands, name, min, max, createdBy} = query;

   if(category) filters.category = category;
   if(brands) filters.brand = {$in: brands.split(",")};
   if(name) filters.name = {$regex: name, $options: "i"}; // i: case insensitive 
   if(min) filters.price = {$gte: min};
   if(max) filters.price = {...filters.price, $lte: max};
   if(createdBy) filters.createdBy = createdBy;
   const products =  await Products.find(filters).sort(sort).limit(limit).skip(offset);
   return products;
};

const getProductById = async (id) =>{
    const products = await Products.findById(id);
    return products;
};
const createProduct = async (data, files, userId) => {
  const uploadedFiles = await uploadFile(files);
  const promptMessage = PRODCUT_DESCRIPTION_PROMPT
  .replace("%s", data.name)
  .replace("%s", data.brand)
  .replace("%s", data.category);

  const description = data.description ?? (await promptAi(promptMessage));
  return await Products.create({...data, imageUrls:uploadedFiles.map((file)=> file.url), createdBy:userId});
};

const updateProduct = async (id, input, files) => {
  const updateData = input;
  if(files && files.length > 0){
    const uploadedFiles = await uploadFile(files);
    updateData.imageUrls = uploadedFiles.map((file) => file.url);
  }
  return await Products.findByIdAndUpdate(id, updateData, {new:true});
};

const deleteProduct = async (id) => {
  return await Products.findByIdAndDelete(id);
};

const getBrands = async () => {
  return await Products.distinct("brand");
};

const getCategories = async() =>{
  return await Products.distinct("category");
};

const getTotalCount = async() => {
  return await Products.countDocuments();
};


export default {getAllProducts,  getProductById, createProduct, updateProduct, deleteProduct, getBrands, getCategories, getTotalCount};