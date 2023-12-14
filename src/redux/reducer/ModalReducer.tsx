
import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"
const ModalReducer = createSlice({
    name: "Modal",
    initialState: { type: "text", content: "text" },
    reducers: {
        setModal: {
            reducer: (state: { type: string, content: string }, action: PayloadAction<{ type: string, content: string }>) => {
                return (state = action.payload)
            },
            prepare: (msg: { type: string, content: string }) => {
                return {
                    payload: msg
                }
            }
        }
    }
})

export const { actions, reducer } = ModalReducer
export const { setModal } = actions;

export default ModalReducer