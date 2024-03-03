const Category= require("../models/category.model");


exports.createNewCategory= async (req,res)=>{

    const {name, description}= req.body;

    const cat= await Category.findOne({name:name});

    if(cat){
        return res.status(400).json({
            success:false,
            message:`${name} category is already present`
        })
    }

    const categoryData={
        name: name,
        description:description
    }

    try{

        const category = await Category.create(categoryData);

        return res.status(200).json({
            success:true,
            message:`${name} category created successfully`,
            category
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error while creating new category"
        })
    }

}