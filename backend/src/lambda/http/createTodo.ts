import 'source-map-support/register'
import {getUserId} from '../utils' //Establishing link with Utils for getUserID
import {createLogger} from '../../utils/logger' //Importing createLogger for Logging events
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import {createNewTodoItem} from '../../Todo_BusinessLogic' //Importing Todo Item function from Business Logic file


const Logging = createLogger('createTodo.ts_logs') //Creating Logs file for CreateTodo

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newTodo: CreateTodoRequest = JSON.parse(event.body)

  const user = getUserId(event) //to check authorized users access
  
  Logging.info('User access granted',user) //logging for user access

  const newItem = await createNewTodoItem(newTodo , user) //CreateTodo function called from Business Logic

  Logging.info('New Todo Item created',newItem) //logging for new Todo Item

  // TODO: Implement creating a new TODO item
  //Changed to return API Gateway Event
  //return newTodoItem //return new Todo item
  //reference taken from: https://stackoverflow.com/questions/53976371/which-type-do-i-return-with-aws-lambda-responses-in-typescript-to-suite-aws-apig
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
      'Access-Control-Allow-Headers': 'Accept'
    },
    body: JSON.stringify({
      item: {
        ...newItem
      }
    })
  }
}
