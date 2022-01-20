import ListSaga from '../features/todo/todoSaga'
import {all} from 'redux-saga/effects'

export default function* rootSaga(){
    yield all([...ListSaga])
}