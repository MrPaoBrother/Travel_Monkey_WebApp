import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

import reducer from './reducer'
import mySaga from './mySaga'

const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

// then run the saga
sagaMiddleware.run(mySaga)

export default store;