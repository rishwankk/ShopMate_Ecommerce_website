const express=require("express")
const admin=require("../controller/adminControll")
const productController=require("../controller/productcontrol")
const categoryController=require("../controller/categorycontrol")
const adminLogout=require("../controller/commoncontrol")
const multer=require("multer")
const router=express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/productImage');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });


router.get("/",admin.getAdminHome)

//product-control route

router.get("/addproduct",productController.getAddProduct)
.post("/addproduct",upload.single('productImage'),productController.postAddProduct)
router.get('/viewproducts/:categoryId?',productController.getViewProducts)
router.delete('/deleteproduct/:id', productController.deleteProduct);
router.get("/updateproduct/:id",productController.getUpdateProduct)
router.post("/updateproduct/:id",upload.single('productImage'),productController.postUpdateProduct)


//category-controlroute
router.get("/addcategory",categoryController.getAddCategory)
.get("/getSubcategories/:categoryId",categoryController.getSubcategory)
.get("/viewcategories",categoryController.viewCategories)
.post("/addcategory",categoryController.postAddCategory)
.delete("/deletecategory/:id",categoryController.deleteCategory)
.delete("/deletesubcategory/:id",categoryController.deleteSubcategory)
.post("/updatecategory/:id",categoryController.postUpdateCategory)
.post("/updatesubcategory/:id",categoryController.postUPdateSubcategory)

//logout

router.get("/logout",adminLogout.logout)








module.exports=router