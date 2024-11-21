import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TripTitle from './leftContainer/TripTitle';
import MapContainer from './leftContainer/MapContainer';
import TripInfo from './leftContainer/TripInfo';
import ReportModal from './leftContainer/ReportModal';
import CommentSection from '../comment/CommentSection';
import { fetchComments, addComment, updateComment, deleteComment } from '../../api/comment';
import useCurrentUser from '../../hooks/get-current-user';

const LeftContainer = ({ post, isLoaded }) => {
    const [comments, setComments] = useState([]);
    const { userId: currentUserId } = useCurrentUser(); // 사용자 ID 가져오기

    const [showReportModal, setShowReportModal] = useState(false);

    const openReportModal = () => setShowReportModal(true);
    const closeReportModal = () => setShowReportModal(false);


    useEffect(() => {
        const loadComments = async () => {
            try {
                const fetchedComments = await fetchComments(post.postId);
                setComments(fetchedComments);
            } catch (error) {
                console.error('댓글 로드 실패:', error);
            }
        };
        loadComments();
    }, [post.postId]);

    const handleAddComment = async (newCommentContent) => {
        try {
            const newComment = await addComment({
                postId: post.postId,
                postCommentContent: newCommentContent,
            });
            setComments((prevComments) => [...prevComments, newComment]);
        } catch (error) {
            console.error('댓글 추가 실패:', error);
        }
    };

    const handleUpdateComment = async (postCommentId, updatedContent) => {
        try {
            await updateComment(postCommentId, { postCommentContent: updatedContent });
            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.postCommentId === postCommentId
                        ? { ...comment, postCommentContent: updatedContent }
                        : comment
                )
            );
        } catch (error) {
            console.error('댓글 수정 실패:', error);
        }
    };

    const handleDeleteComment = async (postCommentId) => {
        try {
            await deleteComment(postCommentId);
            setComments((prevComments) =>
                prevComments.filter((comment) => comment.postCommentId !== postCommentId)
            );
        } catch (error) {
            console.error('댓글 삭제 실패:', error);
        }
    };

    return (
        <LeftPanel>
            <Header>
                <TripTitle post={post} />
                <OptionsButton onClick={openReportModal}>•••</OptionsButton>
            </Header>
            <MapContainer isLoaded={isLoaded} places={post.places} />
            <TripInfo post={post} />
            <CommentSection
                comments={comments}
                currentUserId={currentUserId} // 전달
                addComment={handleAddComment}
                updateComment={handleUpdateComment}
                deleteComment={handleDeleteComment}
            />
            {showReportModal && <ReportModal onClose={closeReportModal} />}
        </LeftPanel>
    );

};

export default LeftContainer;

const Header = styled.div`
    display: flex;
    justify-content: space-between; /* Align items to the left and right */
    align-items: center; /* Vertically center align */
    margin-bottom: 20px; /* Add some space below the header */
`;

const LeftPanel = styled.div`
    flex: 1;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;
`;

const OptionsButton = styled.button`
    background: transparent;
    border: none;
    font-size: 1.5rem; /* Slightly larger font size for visual hierarchy */
    cursor: pointer;

    &:hover {
        color: #007bff; /* Optional hover effect */
    }
`;
