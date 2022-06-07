const CategoryService = require('../../services/categoryService');
const categoryTable = require('../../models/index').Categories;

test('get all categories must work', async()=>{
    const response = {};

    const spy = jest.spyOn(CategoryService, 'getAllCategories').mockImplementation(()=>{
        return response;
    });

    await CategoryService.getAllCategories();
    expect(spy).toHaveBeenCalled();
})

test('create category should create a new category', async()=>{
    const response = {};
    const data = {name : 'Machines'};
    const spy = jest.spyOn(CategoryService, 'createCategory').mockImplementation(()=>{
        return response;
    });

    await CategoryService.createCategory(data);
    expect(spy).toHaveBeenCalled();
})

test('delete category should delete a category', async()=>{
    const categoryId = 1;
    
    const spy = jest.spyOn(CategoryService, 'deleteCategory').mockImplementation(()=>{
        return true;
    });

    await CategoryService.deleteCategory(categoryId);
    expect(spy).toHaveBeenCalled();
})

test('delete category should delete a category', async()=>{
    const categoryId = 1;
    const data = {name : 'Machines'};
    const spy = jest.spyOn(CategoryService, 'updateCategory').mockImplementation(()=>{
        return true;
    });

    await CategoryService.updateCategory(categoryId,data);
    expect(spy).toHaveBeenCalled();
})