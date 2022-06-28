import {configureStore} from '@reduxjs/toolkit';
import {postOfFollowingReducer, specificUsersReducer, userReducer} from "../features/reducers/user";
import {likeReducer, myPostsReducer} from "../features/reducers/Post";


export const store = configureStore({
    reducer: {
        user: userReducer,
        postOfFollowing: postOfFollowingReducer, //postOfFollowingReducer
        specificUsers: specificUsersReducer,
        like: likeReducer,
        myPosts: myPostsReducer,
    },
});