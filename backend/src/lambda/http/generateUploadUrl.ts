import 'source-map-support/register'
import {createLogger} from '../../utils/logger' //Importing createLogger for Logging events
import {uploadURL} from '../../Todo_BusinessLogic' //Importing UploadUrl function from Business Logic file
//import {getUserId} from '../utils' //Establishing link with Utils for getUserID


import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

const Logging = createLogger('generateUploadUrl.ts_logs') //Creating Logs file for generateUploadUrl

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  //const user = getUserId(event) //to check authorized users access


  //const uploadURLItem = await uploadURL(todoId, user)
  const uploadURLItem = await uploadURL(todoId)

  Logging.info('Upload URL generated',uploadURLItem,todoId) //Logging for uploadURL

  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
  //Changed to return API Gateway Event
  //return uploadURLItem
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
      item:uploadURLItem
    })
  }
}
