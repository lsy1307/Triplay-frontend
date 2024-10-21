import React, { useState } from 'react';
import styled from 'styled-components';

const CommentSection = ({ comments, addComment }) => {
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment.trim()) {
            addComment(newComment);
            setNewComment(''); // Clear the input after adding
        }
    };

    return (
        <CommentContainer>
            <CommentInputWrapper>
                <CommentInput
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 입력해주세요..."
                />
                <AddCommentButton onClick={handleAddComment}>댓글 추가</AddCommentButton>
            </CommentInputWrapper>

            <CommentsList>
                {comments.length > 0 ? (
                    comments.map((comment, idx) => (
                        <Comment key={idx}>
                            <p>{comment}</p>
                        </Comment>
                    ))
                ) : (
                    <p>첫 번째 댓글을 남겨보세요!</p>
                )}
            </CommentsList>
        </CommentContainer>
    );
};

export default CommentSection;

const CommentContainer = styled.div`
    margin-top: 20px;
`;

const CommentInputWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const CommentInput = styled.input`
    flex: 1;
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
`;

const AddCommentButton = styled.button`
    padding: 10px;
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #333;
    }
`;

const CommentsList = styled.div`
    max-height: 200px;
    overflow-y: auto;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
`;

const Comment = styled.div`
    padding: 8px 0;
    border-bottom: 1px solid #ddd;

    &:last-child {
        border-bottom: none;
    }
`;
