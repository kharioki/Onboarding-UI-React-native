import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

import { 
    Card, 
    UserInfo, 
    UserImg, 
    UserInfoText, 
    UserName, 
    PostTime, 
    PostText, 
    PostImg, 
    InteractionWrapper, 
    Interaction, 
    InteractionText,
    Divider
} from '../styles/FeedStyles';

const PostCard = ({ item }) => {
    const likedIcon = item.liked ? 'heart' : 'heart-outline';
    const likedIconColor = item.liked ? '#2e64e5' : '#333';
    let likeText;
    let postComments;

    if(item.likes == 1) {
        likeText = '1 Like';
    } else if(item.likes > 1) {
        likeText = item.likes + ' Likes';
    } else {
        likeText = '0 Likes';
    }

    if(item.comments == 1) {
        postComments = '1 Comment';
    } else if(item.comments > 1) {
        postComments = item.comments + ' Comments';
    } else {
        postComments = '0 Comments';
    }
    return (
        <Card>
            <UserInfo>
                <UserImg source={{uri: item.userImg}} />
                <UserInfoText>
                    <UserName>{item.userName}</UserName>
                    <PostTime>{item.postTime.toString()}</PostTime>
                </UserInfoText>
            </UserInfo>
            <PostText>{item.post}</PostText>
            {item.postImg !== null ? <PostImg source={{uri: item.postImg}} /> : <Divider />}
            <InteractionWrapper>
                <Interaction active={item.liked}>
                    <Ionicons name={likedIcon} size={25} color={likedIconColor} />
                    <InteractionText active={item.liked}>{likeText}</InteractionText>
                </Interaction>
                <Interaction>
                    <Ionicons name="md-chatbubble-outline" size={25} />
                    <InteractionText>{postComments}</InteractionText>
                </Interaction>
            </InteractionWrapper>
        </Card>
    )
};

export default PostCard;