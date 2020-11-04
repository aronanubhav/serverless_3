//Created as part of rubric to separate Business Logic from IO

import * as AWS from 'aws-sdk'
import {CreateTodoRequest} from '../src/requests/CreateTodoRequest' //Import Create Todo Request datatype
import {UpdateTodoRequest} from '../src/requests/UpdateTodoRequest' //Import UpdateTodo datatype
import {createLogger} from '../src/utils/logger' //Importing createLogger for Logging events
import {TodoItem} from '../src/models/TodoItem' //Importing TodoItem Data type from models
import {TodoDelete} from '../src/models/TodoDelete' //Importing TodoDelete Data type from models
//import {TodoUpdate} from '../src/models/TodoUpdate' //Importing TodoUpdate Data type from models
//import {isUuid} from 'uuidv4' //Taken from https://www.npmjs.com/package/uuidv4
import * as uuid from 'uuid'; //new version of import taken from https://stackoverflow.com/questions/60830848/attempted-import-error-uuid-does-not-contain-a-default-export-imported-as-u
import {createTodo} from '../src/Todo_IO' //Import createTodo from IO layer
import {deleteTodo} from '../src/Todo_IO' //Import deleteTodo from IO layer
import {getAllTodo} from '../src/Todo_IO' //Import getAllTodo from IO layer
import {UpdateTodos} from '../src/Todo_IO' //Import UpdateTodo from IO layer
//import {setTodoAttachmentUrl} from '../src/Todo_IO' //Import setTodoAttachmentUrl from IO layer
//import { appendFile } from 'fs'

//Picked from Lesson 4.2
const s3 = new AWS.S3({
  //  region: 'eu-west-1',
    signatureVersion: 'v4' // Use Sigv4 algorithm
  })


//const current_date = new Date()

const bucket_name = process.env.S3_BUCKET_NAME

//const cors = require('cors');
//app.Use(cors());
 
const Logging = createLogger('Todo_BusinessLogic.ts_logs') //Creating Logs file for Business Logic

export async function createNewTodoItem(newTodoItem: CreateTodoRequest, user: string): Promise<TodoItem>{
    Logging.info('Inside Create New To Do', newTodoItem, user)
    
    const TodoUUID = uuid.v4()
    const newItem = await createTodo(
        {//datatype as taken from Models
        userId: user,
        todoId: TodoUUID,
        createdAt: new Date().toISOString(), //added toDateString later to convert to string --> changed to toISOString
        name: newTodoItem.name,
        dueDate: newTodoItem.dueDate,
        done: false,
        //attachmentUrl: 'https://'+process.env.S3_BUCKET_NAME+'.s3-eu-west-1.amazonaws.com/'+TodoUUID //changed ' from overall to support variables
        //attachmentUrl: `https://${bucket_name}.s3-eu-west-1.amazonaws.com/${TodoUUID}`
        attachmentUrl: `https://sls2-bucket-dev.s3-eu-west-1.amazonaws.com/${TodoUUID}`

    }
    )
    return newItem
}


export async function deleteItem(TodoID:string, UserId: string): Promise<TodoDelete> {
    Logging.info('Inside Delete Todo Item', TodoID , UserId)

    const TodoDeleteItem = await deleteTodo(
        {//datatype taken from Models
        userId: UserId,
        todoId:TodoID 
        })
    return TodoDeleteItem
}


export async function uploadURL(UploadURL: string): Promise<string>{
    Logging.info('Inside upload URL', UploadURL)
   const presignedUrl = s3.getSignedUrl('putObject', { // The URL will allow to perform the PUT operation
    //   return s3.getSignedUrl('putObject', { // The URL will allow to perform the PUT operation Changed to return URL
       Bucket: bucket_name, // Name of an S3 bucket
       Key: UploadURL, // id of an object this URL allows access to
     //  ACL: 'public-read',
       Expires: 3000  // A URL is only valid for 50 minutes
     })
     Logging.info(presignedUrl)
 //const presignedUrl = await setTodoAttachmentUrl(UploadURL, UserId);

    return presignedUrl as string
}



export async function AllTodo(userId:string): Promise<TodoItem[]> {
    Logging.info('Inside All Todo function', userId)
   // const AllTodos = getAllTodo(userId)
    return await getAllTodo(userId)
}


export async function UpdateTodo(updatedTodo:UpdateTodoRequest, todoId:string, userId:string): Promise<void> {
    Logging.info('Inside Update Todo Item', updatedTodo, todoId, userId)

    await UpdateTodos(updatedTodo, todoId, userId);
}