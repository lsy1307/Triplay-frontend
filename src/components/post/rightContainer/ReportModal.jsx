import React from 'react';
import styled from 'styled-components';

const ReportModal = ({ onClose }) => {
    return (
        <ModalOverlay>
            <ModalContent>
                <h2>신고</h2>
                <ul>
                    <li>홍보/상업성</li>
                    <li>같은 내용 도배</li>
                    <li>욕설/인신공격</li>
                    <li>음란/선정성</li>
                    <li>불법정보</li>
                    <li>권리침해 신고</li>
                </ul>
                <CloseButton onClick={onClose}>닫기</CloseButton>
            </ModalContent>
        </ModalOverlay>
    );
};

export default ReportModal;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    text-align: center;

    h2 {
        margin-bottom: 20px;
    }

    ul {
        list-style-type: none;
        padding: 0;

        li {
            margin: 5px 0;
            font-size: 18px;
            cursor: pointer;
            padding: 10px;

            &:hover {
                background-color: #f4f4f4;
            }
        }
    }
`;

const CloseButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;
