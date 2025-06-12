const InventoryTable = require("../models/inventoryTable.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");


const saveSessionProducts = async (req, res, next) => {
  try {
    const { session_id, products } = req.body;

    if (!session_id || !Array.isArray(products)) {
      return res.status(400).json({ message: "Session ID and products required" });
    }

     const sessionIdExists = await InventoryTable.findOne({session_id});
     if(sessionIdExists){
        throw new ApiError(409,"This session already added.");
     }
    const records = products.map((product) => ({
      ...product,
      session_id,
    }));

    await InventoryTable.insertMany(records);

    res.status(200).json({ message: "Products saved successfully" });
  } catch (err) {
    next(err);
  }
};



// get inventory table records 
const getInventoryTableRecords = async(_,res,next)=>{
    try {
        const records = await InventoryTable.find();
        res.status(200).json(new ApiResponse(200,"Records fetched successfully.",records));
        
    } catch (error) {
        next(error)
    }
}


// delete inventory table records 


const deleteSessionProducts = async (req, res, next) => {
  try {
    const { session_id } = req.body;

    if (!session_id) {
      return res.status(400).json({ message: "Session ID required" });
    }

    await InventoryTable.deleteMany({ session_id });

    res.status(200).json({ message: "Products deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const deleteSingleSessionProduct = async(req,res,next)=>{
  try {
    const {styleNumber,size} = req.body;
    if(!styleNumber || !size){
      return res.status(400).json({message:"Style Number and size required"});
    }
    
    const recordExists = await InventoryTable.findOne({styleNumber,size});

    if(!recordExists){
      return res.status(404).json({message:"Record not found"});
    }

    const session_id_record = await InventoryTable.findByIdAndDelete(recordExists._id);
    
    res.status(200).json({success:true,message:"Record deleted successfully.",session_id_record});
  } catch (error) {
    next(err);
  }
}

module.exports = {deleteSessionProducts, saveSessionProducts, getInventoryTableRecords , deleteSingleSessionProduct};


