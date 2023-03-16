import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { ohclReducer } from './OHCLDATA/reducer';
import { orderBookReducer } from './orderBook/reducer';

const rootReducer = combineReducers({
    ohlc:ohclReducer,
    orderBook:orderBookReducer
});

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    rootReducer,
    createComposer(applyMiddleware(thunk)),
);
