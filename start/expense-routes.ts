import Route from '@ioc:Adonis/Core/Route'
import Expense from 'App/Modules/Expenses/Http/ExpensesController'
Route.get('expenses4',async(ctx)=>{
    ctx.test = "Testing"
    return new Expense().index()
  })
  