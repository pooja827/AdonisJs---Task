import departments from'App/Models/departments'
import employees from'App/Models/employees'
export default class joinsController{
    //Selectall
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
}