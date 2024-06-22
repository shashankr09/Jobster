import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import jobSlice from "./jobSlice";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import storageSession from 'redux-persist/lib/storage/session'



const reducer = combineReducers({
    user: userSlice,
    job:jobSlice
})

const appReducer=(state,action)=>{
    if(action.type==='RESET'){
        return reducer(undefined,action)
    }
    return reducer(state,action);
}

const persistConfig = {
    key: 'root',
    storage:storage
  }

  const persistedReducer = persistReducer(persistConfig, appReducer);



export const store=configureStore({
    reducer:persistedReducer
})

export const persistor=persistStore(store);