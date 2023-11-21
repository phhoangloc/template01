
import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"


const UpdateReducer = createSlice({
    name: "Update",
    initialState: 1,
    reducers: {
        setUpdate: {
            reducer: (state: number, action: PayloadAction<number>) => {
                return (state = state + action.payload)
            },
            prepare: (n: number) => {
                return {
                    payload: n
                }
            }
        }
    }
})

export const { actions, reducer } = UpdateReducer
export const { setUpdate } = actions;

export default UpdateReducer