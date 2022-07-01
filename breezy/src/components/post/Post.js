import React, {useEffect, useState} from 'react'
import {
    Avatar,
    Snackbar,
    Stack,
    Typography
} from "@mui/material";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addCommentOnPost, likePost} from "../../features/action/postAction";
import Alert from "@mui/material/Alert";
import {getFollowingPosts, getMyPosts} from "../../features/action/userAction";
import {Container, List, PostDetails, PostFooterFirst, PostHeader, PostImg, PostText} from "../styledComponents/PostStyled";
const DeleteAndEdit =React.lazy(()=>
    import("./post-functions/deletepost/DeleteAndEdit"));
const PostLikes=React.lazy(() =>
import ("./post-functions/likes/PostLikes"));
const CommentComponent=React.lazy(() =>
    import ("./post-functions/comment/CommentDialog"));
const CommentShort=React.lazy(() =>
    import("./post-functions/comment/CommentShort"));

const Post = ({
                  postImage,
                  caption,
                  ownerId,
                  ownerName,
                  ownerAvatar,
                  likes = {},
                  comments = {},
                  createdAt,
                  postId,
                  setFetchAgain,
                  fetchAgain,
                  isDelete = false,
                  isAccount = false,
              }) => {


    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false);
    const [likesUser, setLikesUser] = useState(false);
    const [commentValue,setCommentValue] = useState("");
    const [commentToggle,setCommentToggle] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [errorAlert, setErrorAlert] = React.useState('')
    const [messageAlert, setMessageAlert] = React.useState('')
    const[captionValue,setCaptionValue] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const {error,loading, message} = useSelector((state) => state.like)
    const {user} = useSelector(state => state.user)
    const open = Boolean(anchorEl);

    const date = new Date(createdAt);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const handleLike = async () => {
        setLiked(!liked);
        await dispatch(likePost(postId));
        setFetchAgain(true);
    }

    const addCommentHandler = async (e) => {
        e.preventDefault();
        await dispatch(addCommentOnPost(postId,commentValue));
        setFetchAgain(true);
    };

    useEffect(() => {
        likes.forEach(item => {
            if (item._id === user._id) {
                setLiked(true)
            }
        })
    }, [likes, user._id]);


    useEffect(() => {
        if (error) {
            setAlertOpen(true)
            setErrorAlert(error)
        }
        if (message) {
            setAlertOpen(true)
            setMessageAlert(message)
        }
    }, [error, message]);


    return (
        <Container key={postId} >
            <div key={ownerId}>
            <PostHeader >
                <List >
                    <Avatar
                        title={ownerName}
                        src={ownerAvatar}
                        alt={ownerName}
                        sx={{
                            height: "50px",
                            width: "50px",
                        }}
                    />

                    <Link to={`/user/${ownerId}`}>
                        <Typography
                            fontWeight={700}
                        >
                            {ownerName}
                        </Typography>
                        <Typography
                            fontWeight={100}
                            sx={{
                                color: '#111',
                                fontSize: '12px',
                            }}
                        >
                            {date.toLocaleTimeString()} {date.toLocaleString('en-us', {weekday: 'long'})}, {date.getDate()} {date.toLocaleString('default', {month: 'long'})}
                        </Typography>
                    </Link>

                </List>
                {isAccount ?
                    <DeleteAndEdit
                        open={open}
                        handleClick={handleClick}
                        handleClose={handleClose}
                        anchorEl={anchorEl}
                        setAnchorEl={setAnchorEl}
                        captionValue={captionValue}
                        setCaptionValue={setCaptionValue}
                        postId={postId}
                        loading={loading}
                        setFetchAgain={setFetchAgain}
                        fetchAgain={fetchAgain}
                    />
                    : null
                }
            </PostHeader>
                <PostHeader>
                    <div style={{flexGrow:0.3}}/>
                    <List>
                        <Typography noWrap>
                              {caption}
                        </Typography>
                     </List>
                    <div style={{flexGrow:1}}/>
                    <div style={{flexGrow:1}}/>
                </PostHeader>



            {postImage ? (
                <PostImg>
                    <img src={postImage} alt={"post"}/>
                </PostImg>
            ) : (
                <PostText >
                    <Typography
                        fontWeight={700}
                        sx={{
                            fontSize: '14px',
                            lineHeight: '1.5',
                        }}>
                        {caption}
                    </Typography>
                </PostText>
            )}


            <PostFooterFirst >
                <div>
                    <PostLikes
                        key={postId}
                        likes={likes}
                        likesUser={likesUser}
                        setLikesUser={setLikesUser}
                        liked={liked}
                        handleLike={handleLike}
                        postId={postId}
                        setFetchAgain={setFetchAgain}
                        fetchAgain={fetchAgain}
                    />
                </div>
                <div>
                    <CommentComponent
                        postId={postId}
                        comments={comments}
                        commentToggle={commentToggle}
                        setCommentToggle={setCommentToggle}
                        commentValue={commentValue}
                        setCommentValue={setCommentValue}
                        addCommentHandler={addCommentHandler}
                        isAccount={isAccount}
                        fetchAgain={fetchAgain}
                        setFetchAgain={setFetchAgain}
                    />
                </div>
            </PostFooterFirst>

            <PostDetails  >

                <List>
                    {comments.length > 0 ? (
                        <CommentShort
                            key={comments[0]._id}
                            postId={postId}
                            comments={comments}
                            commentToggle={commentToggle}
                            setCommentToggle={setCommentToggle}
                            commentValue={commentValue}
                            setCommentValue={setCommentValue}
                            addCommentHandler={addCommentHandler}
                            isAccount={isAccount}
                        />
                    ) : null}
                </List>

            </PostDetails>

            <Stack spacing={2} sx={{width: '100%'}}>
                <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleAlertClose} severity="success" sx={{width: '100%'}}>
                        {messageAlert}
                    </Alert>
                </Snackbar>
            </Stack>
            </div>
        </Container>
    )
}
export default Post