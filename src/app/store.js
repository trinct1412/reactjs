import { configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import TodoReducer from '../features/todo/todoSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    todo: TodoReducer,
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga)