import React, { useState } from 'react';
import menuIcon from '../../../assets/svgs/floatingButton/menu_icon.svg';
import userIcon from '../../../assets/svgs/floatingButton/user_icon.svg';
import clipIcon from '../../../assets/svgs/floatingButton/clip_icon.svg';
import postIcon from '../../../assets/svgs/floatingButton/post_icon.svg';
import tripIcon from '../../../assets/svgs/floatingButton/trip_icon.svg';
import {
  FloatingButtonContainer,
  FloatingDivContainer,
  FloatingButton,
  StyledIcon,
  StyledLink,
  FloatingDiv,
  Text,
} from './style';

const FloatingButtonComponent = () => {
  const [showDivs, setShowDivs] = useState(false);

  const handleFloatingButtonClick = () => {
    setShowDivs((prev) => !prev);
  };
  return (
    <FloatingButtonContainer>
      <FloatingDivContainer showDivs={showDivs}>
        <StyledLink to="mypage" showDivs={showDivs}>
          <FloatingDiv color="#919191">
            <StyledIcon src={userIcon} />
            <Text>profile</Text>
          </FloatingDiv>
        </StyledLink>

        <StyledLink to="clip" showDivs={showDivs}>
          <FloatingDiv color="#919191">
            <StyledIcon src={clipIcon} />
            <Text>clip</Text>
          </FloatingDiv>
        </StyledLink>

        <StyledLink to="post" showDivs={showDivs}>
          <FloatingDiv color="#919191">
            <StyledIcon src={postIcon} />
            <Text>post</Text>
          </FloatingDiv>
        </StyledLink>

        <StyledLink to="trip" showDivs={showDivs}>
          <FloatingDiv color="#919191">
            <StyledIcon src={tripIcon} />
            <Text>trip</Text>
          </FloatingDiv>
        </StyledLink>
      </FloatingDivContainer>

      <FloatingButton onClick={handleFloatingButtonClick}>
        <StyledIcon src={menuIcon} />
        <Text>triplay</Text>
      </FloatingButton>
    </FloatingButtonContainer>
  );
};

export default FloatingButtonComponent;
