import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { sessionService } from 'redux-react-session';
import rootReducer from './rootReducer';

const middlewares = [logger, thunk];

const store = createStore(rootReducer, applyMiddleware(...middlewares));
sessionService.initSessionService(store);

export default store;
