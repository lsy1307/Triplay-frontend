import React, { useEffect, useState } from 'react';
import Header from '../../layout/Header';
import LeftContainer from '../../components/post/PostLeftContainer';
import RightContainer from '../../components/post/PostRightContainer';
import { useJsApiLoader } from '@react-google-maps/api';
import { fetchPostDetail } from '../../api/postDetail';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
    const { postId } = useParams();
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    });

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPost = async () => {
            try {
                const post = await fetchPostDetail(postId);

                const postWithDetail = {
                    ...post,
                };
                
                setPost(postWithDetail);
            } catch (error) {
                console.error("Error fetching post details:", error);
            } finally {
                setLoading(false);
            }
        };

        getPost();
    }, [postId]);

    if (loading) {
        return <div>포스트 정보를 가져오는 중입니다...</div>;
    }

    if (!post) {
        return <div>포스트를 찾을 수 없습니다.</div>;
    }
    
    return (
        <div>
            <Header />
            <Container>
                <LeftContainer post={post} isLoaded={isLoaded} />
                <RightContainer post={post} />
            </Container>
        </div>
    );
};

export default PostDetail;

const Container = styled.div`
    display: flex;
    width: 100%;
    height: calc(100vh - 60px);
    padding: 30px 60px;
`;