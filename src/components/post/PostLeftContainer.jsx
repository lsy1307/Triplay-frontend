import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TripTitle from './leftContainer/TripTitle';
import MapContainer from './leftContainer/MapContainer';
import TripInfo from './leftContainer/TripInfo';
import { checkIfFollowing, followUser, unfollowUser } from '../../api/follow';
import CommentSection from '../comment/CommentSection';

const LeftContainer = ({ post, isLoaded }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [comments, setComments] = useState([]);
    const startDate = post.tripStartDate;
    const endDate = post.tripEndDate;

    useEffect(() => {
        const fetchIsFollowing = async () => {
            try {
                const isFollowing = await checkIfFollowing(post.userId, post.currentUserId);
                setIsFollowing(isFollowing);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchIsFollowing();
    }, [post.userId, post.currentUserId]);

    const toggleFollowing = async () => {
        try {
            if (isFollowing) {
                await unfollowUser(post.userId, post.currentUserId);
                setIsFollowing(false);
            } else {
                await followUser(post.userId, post.currentUserId);
                setIsFollowing(true);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const addComment = (comment) => {
        setComments([...comments, comment]); // Add the new comment to the list
    };

    return (
        <LeftPanel>
            <TripTitle post={post} />
            <MapContainer isLoaded={isLoaded} places={post.tripDetails.places} />
            <TripInfo
                post={post}
                startDate={startDate}
                endDate={endDate}
                isFollowing={isFollowing}
                toggleFollowing={toggleFollowing}
            />
            {/* Add the comment section below TripInfo */}
            <CommentSection comments={comments} addComment={addComment} />
        </LeftPanel>
    );
};

export default LeftContainer;

const LeftPanel = styled.div`
    flex: 1;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;
`;
