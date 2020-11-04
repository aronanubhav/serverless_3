import 'source-map-support/register'
import {getUserId} from '../utils' //Establishing link with Utils for getUserID
import {createLogger} from '../../utils/logger' //Importing createLogger for Logging events
import {AllTodo} from '../../Todo_BusinessLogic' //Importing AllTodo function from Business Logic file

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

const Logging = createLogger('getTodos.ts_logs') //Creating Logs file for getTodos

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // TODO: Get all TODO items for a current user
  
 const user = getUserId(event) //to check authorized users access

 const items = await AllTodo(user) //Fetch all Todos for a user

 Logging.info('Todo List for user',items,user) //logging all items for the user

 //Changed to return API Gateway Event
//return AllTodoItems //return Todo IDs for the user
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
      items
    })
  }
}
