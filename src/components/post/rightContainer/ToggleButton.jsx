import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ToggleIcon } from '../../../assets/svgs/toggle_icon.svg';

const ToggleButton = ({ isOpen, onClick }) => {
    return (
        <StyledToggleButton onClick={onClick} isOpen={isOpen}>
            <ToggleIcon />
        </StyledToggleButton>
    );
};

export default ToggleButton;

const StyledToggleButton = styled.button`
    padding: 5px;
    background-color: transparent;
    border: none;
    cursor: pointer;

    svg {
        transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
        transition: transform 0.3s ease;
    }
`;
