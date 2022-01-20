import { fork, take, call, put, takeLatest } from "redux-saga/effects"
import { TodoAction } from "./todoSlice"
import todoApi from '../../api/todoApi'

function* addToDo(action){
    try {
        yield call(todoApi.add,action.payload)
    } catch (error) {
        yield put({payload:error,type:TodoAction.errorTodo.type})
    }
}

function* deleteToDo(payload){
    try {
        yield call(todoApi.delete,payload.id)
    } catch (error) {
        yield put({payload:error,type:TodoAction.errorTodo.type})
    }
}

function* fetchToDo(){
    try {
        const result = yield call(todoApi.getAll)
        yield put({payload:result,type:TodoAction.fetchToDo.type})
    } catch (error) {
        yield put({payload:error,type:TodoAction.errorTodo.type})
    }
   
}

function* watchTodoFetchList(){
    const action = yield take(TodoAction.fetchToDo.type)
    yield fork(fetchToDo, action.payload)
}

function* watchAddTodo(){
    yield takeLatest(TodoAction.addToDo.type, addToDo)
}

function* watchDeleteTodo(){
    while(true){
        const action = yield take(TodoAction.deleteToDo.type);
        yield fork(deleteToDo, action.payload)
    }
}

function* addingToDoSaga(){
    yield fork(watchAddTodo)
}

function* fetchToDoSaga(){
    yield fork(watchTodoFetchList)
}

function* deleteToDoSaga(){
    yield fork(watchDeleteTodo)
}

export default [
    addingToDoSaga(),
    fetchToDoSaga(),
    deleteToDoSaga(),
]