import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "./reducer/MenuReducer";
import ThemeReducer from "./reducer/ThemeReduce";

const store = configureStore({
    reducer: {
        menu: MenuReducer.reducer,
        theme: ThemeReducer.reducer,
    }
})

export default store