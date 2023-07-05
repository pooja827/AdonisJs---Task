import{schema} from '@ioc:Adonis/Core/Validator'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import employees from'App/Models/employees'
export default class Employeemodel{
//Selectall
public async selectAll(){
const em = await employees.all()
return em

}

//SelectionBy
public async selectById({params}:HttpContextContract){
    const viewemp = await employees.findBy('id',params.id)
    if (!viewemp) {
        return 'The record with the specified ID does not exist.'
      }
    return viewemp 
    
}

//Insertion
public async insertion({request}: HttpContextContract){
    const insertion = schema.create({
        emp_id: schema.string(),
        emp_name: schema.string(),
        age: schema.number(),
        salary: schema.number(),
        dep_id: schema.number()
        
        })
        const inserts = await request.validate({schema: insertion})   
        const inserted =await employees.create({
        emp_id:inserts.emp_id,
        emp_name:inserts.emp_name,
        age:inserts.age,
        salary:inserts.salary,
        dep_id:inserts.dep_id
    
 })
 return "Employee details added successfully"
}

//updation
public async updation({ request, response, params }: HttpContextContract) {
    try {
      const updation = schema.create({
        emp_id: schema.string(),
        emp_name: schema.string(),
        age: schema.number(),
        salary: schema.number(),
        dep_id: schema.number()
      });
  
      const updateemp = await request.validate({ schema: updation });
      const updates = await employees.findOrFail(params.id);
  
      updates.emp_id = updateemp.emp_id;
      updates.emp_name = updateemp.emp_name;
      updates.age = updateemp.age;
      updates.salary = updateemp.salary;
      updates.dep_id = updateemp.dep_id;
  
      await updates.save();
  
      return "Employee details updated Successfully!";
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        response.notFound({
          error: 'Employee not found',
        });
      } else {
        response.internalServerError({
          error: 'An error occurred while updating employee details',
        });
      }
    }
  }

  //Deletion
  public async deletion({ params, response }: HttpContextContract) {
    const delemp = await employees.findBy('id', params.id);
    
    if (!delemp) {
      return 'The record with the specified ID does not exist.';
    }
    
    try {
      await delemp.delete();
      return 'Employee Details Deleted Successfully!';
    } catch (error) {
      response.internalServerError({
        error: 'An error occurred while deleting employee details',
      });
    }
  }

  public async searchAll({ params, request, response }: HttpContextContract) {
    const { search } = request.all();
  
    const Database = await employees.query()
      .join('departments', 'employees.dep_id', '=', 'departments.deptid')
      .where(function (query) {
        query
          .whereRaw('employees.id::text ILIKE ?', `%${search}%`)
          .orWhere('employees.emp_id', 'ILIKE', `%${search}%`)
          .orWhere('employees.emp_name', 'ILIKE', `%${search}%`)
          .orWhereRaw('employees.age::text ILIKE ?', `%${search}%`)
          .orWhereRaw('employees.salary::text ILIKE ?', `%${search}%`)
        //  .orWhere('departments.dept_name', 'ILIKE', `%${search}%`)
          .orWhereRaw('employees.dep_id::text ILIKE ?', `%${search}%`);
        // Add more 'orWhere' conditions for additional columns
      });
  
    return response.json(Database);
  }
  
}



