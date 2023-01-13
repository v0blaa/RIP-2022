import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProps, FullOrderProps, FullProductProps, TokenProps } from "../../MedicineTypes/MedicineTypes";

interface UserInfoState {
    user: UserProps,
    order: FullOrderProps,
    token: TokenProps,
    isLoading: boolean,
    error: string
}

const initialState: UserInfoState = {
    user: {
        id: 0,
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        is_staff: false,
    },
    order: {
        id: 0,
        count: 0,
        paid_date: "",
        sent_date: "",
        delivered_date: "",
        user: 0,
        status: 0,
        products: [],
    },
    token: {
        access: "",
        refresh: ""
    },
    isLoading: false,
    error: ""
}

export const userInfoSlice = createSlice({
    name: "user_info",
    initialState,
    reducers: {
        userInfoFetching(state) {
            state.isLoading = true
            state.error = ""
        },
        userInfoFetcgingOrder(state, action: PayloadAction<FullOrderProps>) {
            state.order = {...action.payload}
        },
        userInfoFetchingUser(state, action: PayloadAction<UserProps>) {
            state.user = {...action.payload}
        },
        userInfoFetchingToken(state, action: PayloadAction<TokenProps>) {
            state.token = {...action.payload}
        },
        userInfoFetchingRefresh(state, action: PayloadAction<string>) {
            state.token.access = action.payload
        },
        userInfoFetchingSuccess(state) {
            state.isLoading = false
            state.error = ""
        },
        userIngoFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
        userInfoAddProduct(state, action: PayloadAction<FullProductProps>) {
            let index = state.order.products.findIndex((element) => element.medicine.id === action.payload.medicine.id)
            if (index !== -1)
                state.order.products[index].count += 1
            else
                state.order.products.push({...action.payload})
        },
        userInfoDeleteProduct(state, action: PayloadAction<number>) {
            let index = state.order.products.findIndex((element) => element.id === action.payload)
            if (index !== -1)
            {
                if (state.order.products.length === 1 && state.order.products[0].count === 1)
                {
                    state.order = {...initialState.order}        
                }
                else {
                    if (state.order.products[index].count === 1)
                    {
                        let newProducts = [...state.order.products.slice(0, index), ...state.order.products.slice(index + 1)]
                        state.order.products = [...newProducts]
                    }
                    else
                        state.order.products[index].count -= 1
                }
            }
        },
        userInfoDeleteOrder(state) {
            state.order = {...initialState.order}
        },
        userInfoLogOut(state) {
            state.order = {...initialState.order}
            state.user = {...initialState.user}
            state.token = {...initialState.token}
            state.error = ''
            state.isLoading = false
        }
    }
})

export const {userInfoAddProduct, userInfoDeleteProduct, userInfoLogOut, userInfoFetcgingOrder, userInfoDeleteOrder} = userInfoSlice.actions;

export default userInfoSlice.reducer;