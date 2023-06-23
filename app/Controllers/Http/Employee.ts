import{schema} from '@ioc:Adonis/Core/Validator'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Database from "@ioc:Adonis/Lucid/Database"
export default class Employee{
    //Insertion
public async insertval({request}: HttpContextContract){
        const insertion = schema.create({
        emp_id: schema.string(),
        emp_name: schema.string(),
        age: schema.number(),
        salary: schema.number(),
        hire_date: schema.date(),
        
        })
const insert= await request.validate({schema: insertion})
  await Database
 .insertQuery()
 .table('employees')
 .insert ({emp_id:insert.emp_id,emp_name:insert.emp_name,age:insert.age,salary:insert.salary,hire_date:insert.hire_date},
    )
}
//updation

public async update({request, params}: HttpContextContract){
    const updation = schema.create({
        emp_id: schema.string(),
        emp_name: schema.string(),
        age: schema.number(),
        salary: schema.number(),
        hire_date: schema.date(),
        
        })
const updates= await request.validate({schema: updation})
  await Database
  .from('employees')
  .where('id', params.id)
  .update({emp_id:updates.emp_id,emp_name:updates.emp_name,age:updates.age,salary:updates.salary,hire_date:updates.hire_date })
  return "Updation Successfull"
}
//Overall Selection

public async selection(){

const selectdetails = await Database
.query()
.from('employees')
.select('*')

return selectdetails

}
//SelectByid
public async selectedid({request}: HttpContextContract){
    const selectid = schema.create({
        id:schema.number(),
        
        })

const selectById= await request.validate({schema: selectid})


  const selectionById= await Database
  .from('employees')
  .where('id', selectById.id )
    .select('*')
    if(selectionById.length == 0)  return "error: Userid does not exist"
    else return selectionById;
  
}

//Deletion
public async deletion({request}: HttpContextContract){
    const deleted = schema.create({
        id:schema.number(),
        
        })
const deleteById= await request.validate({schema: deleted})


  const deletes= await Database
  .from('employees')
  .where('id', deleteById.id )
  .delete()
  return "Deleted 1 column";
}
public async insertall({request}: HttpContextContract){
    const insertion = schema.create({
    emp_id: schema.array().anyMembers(),
    emp_name: schema.array().anyMembers(),
    age: schema.array().anyMembers(),
    salary: schema.array().anyMembers(),
    hire_date: schema.array().anyMembers(),
    
    })
const insert= await request.validate({schema: insertion})
await Database
.insertQuery()
.table('employees')
.multiInsert ([{emp_id:insert.emp_id,emp_name:insert.emp_name,age:insert.age,salary:insert.salary,hire_date:insert.hire_date},
])
}

}