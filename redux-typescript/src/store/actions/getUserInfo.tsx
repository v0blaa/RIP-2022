import { AppDispatch } from "..";
import axios from "axios";
import { userInfoSlice } from "../reducers/userInfoSlice";
import { TokenProps } from "../../MedicineTypes/MedicineTypes";
import Cookies from "universal-cookie";

export const login = (loginProps: {username: string, password: string}) => async (dispatch: AppDispatch) => {
    const cookies = new Cookies()
    dispatch(userInfoSlice.actions.userInfoFetching())
    axios.post('/auth/jwt/create/', {...loginProps})
    .then((response) => {
        axios.get('/userinfo/?username=' + loginProps.username)
        .then((userResponse) => {
            cookies.set('access-token', response.data.access, { path: '/' });
            cookies.set('refresh-token', response.data.refresh, { path: '/' });
            cookies.set('username', userResponse.data[0].username, { path: '/' });
            axios.get('/full_orders/?user_id=' + userResponse.data[0].id + '&status_id=1', {headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + response.data.access,
            }})
            .then((orderResponse) => {
                if (orderResponse.data[0])
                    dispatch(userInfoSlice.actions.userInfoFetcgingOrder(orderResponse.data[0]))
            })
            dispatch(userInfoSlice.actions.userInfoFetchingUser(userResponse.data[0]))
        })
        dispatch(userInfoSlice.actions.userInfoFetchingToken(response.data))
        dispatch(userInfoSlice.actions.userInfoFetchingSuccess())
    })
    .catch((error: any) => {
        dispatch(userInfoSlice.actions.userIngoFetchingError(error.message))
    })
}

export const getCookies = (cookiesProps: {token: TokenProps, username: string}) => async(dispatch: AppDispatch) => {
    dispatch(userInfoSlice.actions.userInfoFetching())
        axios.get('/userinfo/?username=' + cookiesProps.username)
        .then((userResponse) => {
            axios.get('/full_orders/?user_id=' + userResponse.data[0].id + '&status_id=1', {headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookiesProps.token.access,
            }})
            .then((orderResponse) => {
                if (orderResponse.data[0])
                    dispatch(userInfoSlice.actions.userInfoFetcgingOrder(orderResponse.data[0]))
            })
            dispatch(userInfoSlice.actions.userInfoFetchingUser(userResponse.data[0]))
        })
        dispatch(userInfoSlice.actions.userInfoFetchingToken(cookiesProps.token))
        dispatch(userInfoSlice.actions.userInfoFetchingSuccess())
}

export const refreshToken = (refreshToken: string) => async(dispatch: AppDispatch) => {
    const cookies = new Cookies()
    dispatch(userInfoSlice.actions.userInfoFetching())
    axios.post('/auth/jwt/refresh/', {refreshToken})
    .then((response) => {
        cookies.set('access-token', response.data.access, { path: '/' });
        dispatch(userInfoSlice.actions.userInfoFetchingRefresh(response.data.access))
    })
}

export const registration = (regProps: {email: string, username: string, password: string}) => async (dispatch: AppDispatch) => {
    dispatch(userInfoSlice.actions.userInfoFetching())
    axios.post('/auth/users/', {...regProps})
    .then((response) => {
        axios.post('/auth/jwt/create/', {username: regProps.username, password: regProps.password})
        .then((tokenResponse) => {
            dispatch(userInfoSlice.actions.userInfoFetchingToken(tokenResponse.data))
        })
        dispatch(userInfoSlice.actions.userInfoFetchingUser(response.data))
        dispatch(userInfoSlice.actions.userInfoFetchingSuccess())
    })
    .catch((error: any) => {
        dispatch(userInfoSlice.actions.userIngoFetchingError(error.message))
    })
}