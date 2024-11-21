import React, { useState } from 'react';
import styled from 'styled-components';
import defaultProfileImage from '../../assets/images/default-profile-image.png';

const CommentSection = ({ comments, addComment, updateComment, deleteComment, currentUserId }) => {
    const [newComment, setNewComment] = useState('');

    const handleAdd = () => {
        if (newComment.trim()) {
            addComment(newComment);
            setNewComment('');
        }
    };

    return (
        <Container>
            <h3>댓글</h3>
            <CommentsList>
                {comments.map((comment) => (
                    <Comment key={comment.postCommentId}>
                        <Header>
                            <LeftHeader>
                                <ProfileImage
                                    src={comment.profileImageUrl || defaultProfileImage}
                                    alt="Profile"
                                />
                                <UserName>{comment.userName}</UserName>
                            </LeftHeader>
                            <RightHeader>
                                {comment.userId === currentUserId ? (
                                    <>
                                        <ActionButton
                                            onClick={() =>
                                                updateComment(
                                                    comment.postCommentId,
                                                    prompt('수정할 댓글:', comment.postCommentContent)
                                                )
                                            }
                                        >
                                            수정
                                        </ActionButton>
                                        <ActionButton onClick={() => deleteComment(comment.postCommentId)}>
                                            삭제
                                        </ActionButton>
                                    </>
                                ) : (
                                    <ActionButton onClick={() => alert('신고가 접수되었습니다.')}>
                                        신고
                                    </ActionButton>
                                )}
                            </RightHeader>
                        </Header>
                        <Body>
                            <CommentText>{comment.postCommentContent}</CommentText>
                        </Body>
                        <Footer>
                            <Datetime>{new Date(comment.writtenDatetime).toLocaleString()}</Datetime>
                        </Footer>
                    </Comment>
                ))}
            </CommentsList>
            <AddCommentWrapper>
                <CommentInput
                    type="text"
                    placeholder="댓글을 입력하세요"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <AddCommentButton onClick={handleAdd}>댓글 추가</AddCommentButton>
            </AddCommentWrapper>
        </Container>
    );
};

export default CommentSection;

// Styled Components
const Container = styled.div`
    margin: 25px;
`;

const CommentsList = styled.div`
    margin-bottom: 20px;
`;

const Comment = styled.div`
    padding: 15px 0;
    border-bottom: 1px solid #ddd; /* Adds a border line for separation */
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const LeftHeader = styled.div`
    display: flex;
    align-items: center;
`;

const RightHeader = styled.div`
    display: flex;
    gap: 10px;
`;

const ProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
`;

const UserName = styled.span`
    font-weight: bold;
    font-size: 1rem;
`;

const Body = styled.div`
    margin: 10px 0;
`;

const CommentText = styled.p`
    font-size: 0.95rem;
`;

const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    color: #888;
    font-size: 0.85rem;
`;

const Datetime = styled.span`
    font-size: 0.85rem;
    color: #666;
`;

const ActionButton = styled.button`
    background: none;
    border: none;
    color: #ddd;
    cursor: pointer;
    font-size: 0.9rem;

    &:hover {
        text-decoration: underline;
    }
`;

const AddCommentWrapper = styled.div`
    display: flex;
    gap: 10px;
`;

const CommentInput = styled.input`
    flex: 1;
    padding: 10px;
    border: 0.5px solid #eee;
    border-radius: 4px;
`;

const AddCommentButton = styled.button`
    padding: 10px 20px;
    background-color:#B5E69F;
    color: black;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #28a428; /* Darker lime green */
    }
`;
