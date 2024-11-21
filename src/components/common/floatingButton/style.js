import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FloatingButtonContainer = styled.div`
  z-index: 1000;
`;

export const FloatingDivContainer = styled.div`
  position: fixed;
  bottom: 3.75rem;
  right: 1.875rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  transition: height 0.5s;
  height: ${(props) => (props.showDivs ? '23rem' : '0')};
  overflow: hidden;
  gap: 0.625rem;
`;

export const FloatingButton = styled.button`
  position: fixed;
  bottom: 1.875rem;
  right: 1.875rem;
  width: 4.5rem;
  height: 4.5rem;
  border: none;
  border-radius: 50%;
  background: #393939;
  color: white;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border: 1px solid #fff;
`;

export const StyledIcon = styled.img`
  width: 2rem;
  height: 2rem;
`;

export const StyledLink = styled(Link)`
  width: 4.5rem;
  height: 4.5rem;
  margin: 10px, 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition:
    opacity 0.3s,
    transform 0.3s;
  animation: ${(props) => (props.showDivs ? 'expand' : 'collapse')} 0.5s
    forwards;
`;

export const FloatingDiv = styled.button`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  background: ${(props) => props.color};
  padding: 0;
  border: none;
  margin: 0;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 24px;
  cursor: pointer;
  transition: bottom 0.5s ease-out;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

export const Text = styled.div`
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 0.5rem;
  font-style: normal;
  font-weight: 900;
  line-height: 120%; /* 0.6rem */
`;
