import 'source-map-support/register'
import {getUserId} from '../utils' //Establishing link with Utils for getUserID
import {createLogger} from '../../utils/logger' //Importing createLogger for Logging events
import {deleteItem} from '../../Todo_BusinessLogic' //Importing Delete function from Business Logic file

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

const Logging = createLogger('deleteTodo.ts_logs') //Creating Logs file for DeleteTodo


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId

  const user = getUserId(event) //to check authorized users access
  
  Logging.info('User access granted',user) //logging for user access

  const item = await deleteItem(todoId , user) //DeleteTodo function called from Business Logic

  Logging.info('Item Deleted',item) //logging for deletedTodo Item


  // TODO: Remove a TODO item by id
  //Changed to return API Gateway Event
  //return deleteTodoItem
  //reference taken from: https://stackoverflow.com/questions/53976371/which-type-do-i-return-with-aws-lambda-responses-in-typescript-to-suite-aws-apig
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
      'Access-Control-Allow-Headers': 'Accept'
    },
    body: JSON.stringify({
      item:item
    })
  }
}
