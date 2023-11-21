import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "./reducer/MenuReducer";
import ThemeReducer from "./reducer/ThemeReduce";
import UserReducer from "./reducer/UserReduce";
import UpdateReducer from "./reducer/UpdateReduce";

const store = configureStore({
    reducer: {
        menu: MenuReducer.reducer,
        theme: ThemeReducer.reducer,
        user: UserReducer.reducer,
        update: UpdateReducer.reducer
    }
})

export default store