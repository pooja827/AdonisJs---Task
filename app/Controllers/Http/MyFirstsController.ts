import{schema,rules} from '@ioc:Adonis/Core/Validator'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
export default class validation{
    public async check({request,response}:HttpContextContract){
        const newPostSchema = schema.create({
            title: schema.string(),
            name: schema.string([
                rules.email(),
            ]
            ),
            age: schema.number(),
            courses: schema.array().members(schema.string()),
        
        })
         /**
   * Validate request body against the schema
   */
        //  const payload = await request.validate({ schema: newPostSchema })
        //  console.log(payload.title)
        //  console.log(payload.name)
        //  console.log(payload.age)
        //  console.log(payload.courses)
         
         try {
            /**
             * Validate request body against the schema
             */
            const payload = await request.validate({ schema: newPostSchema })
      
            // Return the validated payload as a response
            return response.status(200).json(payload)
          } catch (error) {
            // Handle validation error and return a response
            return response.status(400).json({
              errors: error.messages,
              /*errors:{
                username:['Undefined format specify an email address']

              }*/
            })
          }



    }
}
