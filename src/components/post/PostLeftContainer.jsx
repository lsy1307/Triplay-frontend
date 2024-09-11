import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TripTitle from './leftContainer/TripTitle';
import MapContainer from './leftContainer/MapContainer';
import TripInfo from './leftContainer/TripInfo';
import { checkIfFollowing, followUser, unfollowUser } from '../../api/follow';

const LeftContainer = ({ post, isLoaded }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const startDate = post.dates[0];
    const endDate = post.dates[post.dates.length - 1];

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

    return (
        <LeftPanel>
            <TripTitle post={post} />
            <MapContainer isLoaded={isLoaded} places={post.places} />
            <TripInfo
                post={post}
                startDate={startDate}
                endDate={endDate}
                isFollowing={isFollowing}
                toggleFollowing={toggleFollowing}
            />
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
