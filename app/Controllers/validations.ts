import{schema,rules} from '@ioc:Adonis/Core/Validator'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
export default class validation{
    public async check({request}:HttpContextContract){
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
         const payload = await request.validate({ schema: newPostSchema })
         console.log(payload.title)
         console.log(payload.name)
         console.log(payload.age)
         console.log(payload.courses)



    }
}