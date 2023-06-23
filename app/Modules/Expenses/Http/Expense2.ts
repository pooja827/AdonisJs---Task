import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


//import { HttpContext } from "@adonisjs/core/build/standalone";

export default class ExpenseControl{
    public async indexes({request,response,logger}:HttpContextContract){
        console.log('request', request.url())
        console.log('request', request.input('name','Pooja'))
        console.log('all', request.all())
        console.log('request', request.qs())
        logger.info ('This is an info')
        logger.error('not good')
        //true--etag
         return response.send({test:'Pooja'},true)
    }
}
