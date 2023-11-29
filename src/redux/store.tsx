import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "./reducer/MenuReducer";
import ThemeReducer from "./reducer/ThemeReduce";
import UserReducer from "./reducer/UserReduce";
import UpdateReducer from "./reducer/UpdateReduce";
import LoadingReducer from "./reducer/LoadingReducer";

const store = configureStore({
    reducer: {
        menu: MenuReducer.reducer,
        theme: ThemeReducer.reducer,
        user: UserReducer.reducer,
        update: UpdateReducer.reducer,
        loading: LoadingReducer.reducer
    }
})

export default store