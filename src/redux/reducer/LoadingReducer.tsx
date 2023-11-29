
import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"
const LoadingReducer = createSlice({
    name: "Loading",
    initialState: true,
    reducers: {
        setLoading: {
            reducer: (state: boolean, action: PayloadAction<boolean>) => {
                return (state = action.payload)
            },
            prepare: (msg: boolean) => {
                return {
                    payload: msg
                }
            }
        }
    }
})

export const { actions, reducer } = LoadingReducer
export const { setLoading } = actions;

export default LoadingReducer