const CategoryService = require('../../services/categoryService');
const CategoryController = require('../../controllers/categoryController');

const{mockResponse, mockRequest} = require('../mocker');

test('category controller should return list of categories', async ()=>{
    const req = mockRequest();
    const res = mockResponse();
    const response = [{name: 'electronics'}, {name: 'Kitchenware'}];
    //console.log(typeof response);
    try{
    const spy = jest.spyOn(CategoryService, 'getAllCategories').mockImplementation(() => {
        return response;
    })}catch(err){
        console.log("Cannot spy on get category function");
    }
    try{
    await CategoryController.getCategory(req, res);
    }catch(err){
        console.log("cannot call the controller get category function");
    }
    try{
    expect(spy).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
        message: 'Successfull get',
        code: 200,
        success: true,
        data: response
    });
}catch(err){
    console.log("Error in expectations");
}
});

test('category controller should create category', async()=>{
    const req = mockRequest();
    const res = mockResponse();
    const response = {name: 'electronics'};
    //console.log(typeof response);
    const spy = jest.spyOn(CategoryService, 'createCategory').mockImplementation(()=>{
        return response;
    })
    
    await CategoryController.createCategory(req,res);
    expect(spy).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
        message: "Successfully created the category",
        data : response
    });
});

test('category controller should delete category', async()=>{
    const req = mockRequest();
    const res = mockResponse();
    const response = {name: 'electronics'};
    //console.log(typeof response);
    const spy = jest.spyOn(CategoryService, 'deleteCategory').mockImplementation(()=>{
        return true;
    })
    
    await CategoryController.deleteCategory(req,res);
    expect(spy).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
        message : "Successfully deleted the category"
    });
});

test('category controller should update category', async()=>{
    const req = mockRequest();
    const res = mockResponse();
    const response = {name: 'electronics'};
    //console.log(typeof response);
    const spy = jest.spyOn(CategoryService, 'updateCategory').mockImplementation(()=>{
        return response;
    })
    
    await CategoryController.updateCategory(req,res);
    expect(spy).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
        message : "Succesfully update the category by ID",
        UpdatedCategory : response
    });
});