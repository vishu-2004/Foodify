import { configureStore } from "@reduxjs/toolkit";
import root_reducer from "./root_reducer";
import SagaData from "./saga";
import createSagaMiddleware from "redux-saga"

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer:root_reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(SagaData);

export default store;