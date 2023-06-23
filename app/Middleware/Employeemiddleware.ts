import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Employeemiddleware {
  public async handle({request,response}: HttpContextContract, next: () => Promise<void>) {
    const appKey = request.header('app-key')
    if(appKey !== 'ID0gIo7Jfyj7XkdcOJxd2OS3MY4OLnTV'){
      return response.status(401).json({error: 'Invalid app key'});
    // code for middleware goes here. ABOVE THE NEXT CALL
    }
    await next()
  
}
}