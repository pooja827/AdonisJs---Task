/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/


import Route from '@ioc:Adonis/Core/Route'
//import Check from 'App/Controllers/Http/MyFirstsController'
import Expense from 'App/Modules/Expenses/Http/ExpensesController'
import './expense-routes'
//import ExpensesController from'App/Modules/Expenses/Http/Expense2'
import ExpenseControl from 'App/Modules/Expenses/Http/Expense2'
import validation from 'App/Controllers/Http/MyFirstsController'
import 


// Route.get( '/',  async (ctx) => {
//   ctx.test ='testing';
//   new Error ('Hello this is not good')
//   return {hello:ctx.test}

  
// })
Route.get('/',async () =>{
  return("welcome Pooja")
})
Route.get('test/hello',async () =>{
  return("welcome page 2")
})
Route.on('/testing').redirectToPath('https://amazon.in')

//string approach
Route.get('controller','myFirstsController.check')
// Route.get('controls',async({request})=>{
//   return new validation().check({request})

// })
Route.get('/control', async ({ request, response }) => {
  const validations = new validation()
  await validations.check({request, response})
})

Route.group(()=>{
  Route.get('expenses','ExpensesController.index')
  Route.get('expenses2','ExpensesController.index')
}).namespace('App/Modules/Expenses/Http')

//type2 to output controller
////Route.get('controller2',async()=>{
//  return new MyFirstsController().index()
//})

Route.get('expenses3',async()=>{
  return new Expense().index()
})


//url routing


Route.get('new',async(ctx)=>{
  return new ExpenseControl().indexes(ctx)
})

// Route.get('new','Expense2.indexes').namespace('App/Modules/Expenses/Http/')


//DB
Route.group(() =>{
Route.post('insert','Employee.insertval')
Route.patch('update/:id','Employee.update')
Route.get('select','Employee.selection')
Route.get('selectbyid','Employee.selectedid')
Route.get('delete','Employee.deletion')
Route.get('inserted','Employee.insertall')

Route.get('model','Employeemodel.selectAll')
Route.post('insertion','Employeemodel.insertion')
Route.get('selected/:id','Employeemodel.selectById')
Route.patch('updation/:id','Employeemodel.updation')
Route.delete("Deletion/:id",'Employeemodel.deletion')

Route.get('modelDepartment','departmentmodel.selectAll')
Route.post('insertionDepartment','departmentmodel.insertion')
Route.get('selectedDepartment/:id','departmentmodel.selectById')
Route.patch('updationDepartment/:deptid','departmentmodel.updation')
Route.delete("deletionDepartment/:id",'departmentmodel.deletion')

Route.get("joins",'departmentmodel.joinAll')}).middleware('Employeemiddleware')

