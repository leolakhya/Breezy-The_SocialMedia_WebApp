import {axiosInstance} from "../../config/axios";
import axios from "axios";

export const loginUser = (values) =>

    async (dispatch) => {
        try {

            dispatch({
                type: 'LoginRequest',                                           // request auth
            })
            //fetching data from server
            const {data} = await axiosInstance.post(                                    // post request to server
                "/login",
                values, {
                    headers:
                        {
                            'Content-Type': 'application/json',
                        }
                }
            );
            dispatch({                                                         //dispatching the token to the reducer
                type: 'LoginSuccess',
                payload: data.user,
            })

        } catch (error) {
            await dispatch({              //dispatching the error to the reducer
                type: 'LoginFailed',
                payload: error.response.data.message,
            })
            dispatch({
                type:'clearError',
            })
        }
    }

export const loadUser = () =>
    async (dispatch) => {
        try {
            dispatch({
                type: 'LoadUserRequest'
            })
            //fetching data from server
            const {data} = await axiosInstance.get(                                    // post request to server
                "/me"
            );
            dispatch({                                                         //dispatching the token to the reducer
                type: 'LoadUserSuccess',
                payload: data.user,
            })

        } catch (e) {
            dispatch({
                type: 'LoadUserFailure',
                payload: e.response.data.message,
            })
            dispatch({
                type:'clearError',
            })
        }
    }

export const registerUser = (values) =>
    async (dispatch) => {
        try {
            dispatch({
                type: 'RegisterRequest'
            })
            console.log(values)
            const {data} = await axiosInstance.post(                                    // post request to server
                "/register",
                values, {
                    headers:
                        {
                            'Content-Type': 'application/json',
                        }
                }
            );
            console.log(data)
            dispatch({                                                         //dispatching the token to the reducer
                type: 'RegisterSuccess',
                payload: data.user
            })

        } catch (e) {
            console.log(e.response.data.message);
           await dispatch({              //dispatching the error to the reducer
                type: 'RegisterFailure',
                payload: e.response.data.message,
            })
            dispatch({
                type:'clearError',
            })
        }

    }

export const getFollowingPosts = () => async (dispatch) => {
    try {
        dispatch({
            type: 'postOfFollowingRequest'
        })
        //fetching data from server
        const {data} = await axiosInstance.get(                                    // post request to server
            "/posts"
        );
        console.log(data)
        dispatch({                                                         //dispatching the token to the reducer
            type: 'postOfFollowingSuccess',
            payload: data.sortedPosts,
        })

    } catch (e) {
        dispatch({
            type: 'postOfFollowingFailed',
            payload: e.response.data.message,
        })
    }
}

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({
            type: 'allUsersRequest'
        })
        //fetching data from server
        const {data} = await axiosInstance.get(                                    // post request to server
            "/users"
        );
        console.log(data)
        dispatch({                                                         //dispatching the token to the reducer
            type: 'allUsersSuccess',
            payload: data.users,
        })

    } catch (e) {
        dispatch({
            type: 'allUsersFailure',
            payload: e.response.data.message,
        })
    }
}
export const logOutUser = () => async (dispatch) => {
    try {
        dispatch({
            type: 'Logout'
        });
        await axios.post(
            '/api/v1/logout'
        )// post request to server

    } catch (e) {
        console.log(e)
    }
}
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({
            type: 'forgotPasswordRequest'
        })
        console.log(email)
        //fetching data from server
        const {data} = await axiosInstance.post(                                    // post request to server
            '/user/forgot-password', {
                email
            },{
                headers: {
                    "Content-Type" : "application/json",
                },
            }
        );
        console.log(data)
        dispatch({                                                         //dispatching the token to the reducer
            type: 'forgotPasswordSuccess',
            payload: data.message,
        })

    } catch (e) {
        await dispatch({
            type: 'forgotPasswordFailure',
            payload: e.response.data.message
        })
        dispatch({
                type:'clearError',
            })
    }
}
export const resetPassword = (token,password) => async (dispatch) => {
    try {
        dispatch({
            type: 'resetPasswordRequest'
        })
        console.log(token)
        //fetching data from server
        const {data} = await axios.put(                                    // post request to server
            `/api/v1/reset-password/${token}`, {
                password
            },{
                headers: {
                    "Content-Type" : "application/json",
                },
            }
        );
        console.log(data)
        dispatch({                                                         //dispatching the token to the reducer
            type: 'resetPasswordSuccess',
            payload: data.users,
        })

    } catch (e) {
        dispatch({
            type: 'resetPasswordFailure',
            payload: e.response.data.message,
        })
    }
}