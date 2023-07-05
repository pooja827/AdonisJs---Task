import{schema} from '@ioc:Adonis/Core/Validator'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import departments from'App/Models/departments'
import employees from'App/Models/employees'
export default class departmentmodel{
//Selectall
public async selectAll(){
const department = await departments.all()
return department

}

//SelectionBy
public async selectById({params}:HttpContextContract){
    const viewdep = await departments.findBy('deptid',params.id)
    if (!viewdep) {
        return 'The record with the specified ID does not exist.'
      }
    return viewdep 
    
}

//Insertion
public async insertion({request}: HttpContextContract){
    const insertion = schema.create({
    dept_name: schema.string()

        
        })
        const inserts = await request.validate({schema: insertion})   
        const inserted =await departments.create({

        dept_name:inserts.dept_name,

    
 })
 return "Department details added successfully"
}

//updation
public async updation({ request, response, params }: HttpContextContract) {
    try {
      const updation = schema.create({
        
        dept_name: schema.string()
        
      });
  
      const updatedepartment= await request.validate({ schema: updation });
      const updates = await departments.findOrFail(params.deptid);
  
      
      updates.dept_name = updatedepartment.dept_name;
      await updates.save();
  
      return "Department details updated Successfully!";
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        response.notFound({
          error: 'Department not found',
        });
      } else {
        response.internalServerError({
          error: 'An error occurred while updating Department details',
        });
      }
    }
  }

  //Deletion
  public async deletion({ params, response }: HttpContextContract) {
    const deletedepartment = await departments.findBy('deptid', params.id);
    
    if (!deletedepartment) {
      return 'The record with the specified ID does not exist.';
    }
    
    try {
      await deletedepartment.delete();
      return 'Department Details Deleted Successfully!';
    } catch (error) {
      response.internalServerError({
        error: 'An error occurred while deleting Department details',
      });
    }
  }

  public async joinAll(){
    const Database =employees.query()
    .join('departments','employees.dep_id','=','departments.deptid')
    const result = (await Database).map((obj) =>
    {
        return{
            id:obj.$attributes.id,
            emp_id:obj.$attributes.emp_id,
            emp_name:obj.$attributes.emp_name,
            age:obj.$attributes.age,
            salary:obj.$attributes.salary,
            dep_id:obj.$attributes.dep_id,
            dept_name:obj.$extras.dept_name,


        }
    })


return result
}
public async joinTablesById({ params }: HttpContextContract){
  const Database = employees.query()
   .join('departments', 'employees.dep_id', '=', 'departments.deptid')
   .where('employees.dep_id',params.id)
   const result = (await Database).map((obj) =>
   {
       return{
        id:obj.$attributes.id,
        emp_id:obj.$attributes.emp_id,
        emp_name:obj.$attributes.emp_name,
        age:obj.$attributes.age,
        salary:obj.$attributes.salary,
        dep_id:obj.$attributes.dep_id,
        dept_name:obj.$extras.dept_name
       }
   })
   return result
}
}