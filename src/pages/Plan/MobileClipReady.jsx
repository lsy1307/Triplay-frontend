import React, { useState } from 'react';
import styled from 'styled-components';

const MobileClipReady = () => {
  const [images, setImages] = useState([]);

  return <div>
    <div className="Header"></div>
      <TotalContainer>
        <TitleContainer>
          <InfoContainer>
            <TripDate>23.10.28 ~ 10.29</TripDate>
            <TripTitle>Trip to 태안</TripTitle>
          </InfoContainer>
          <ButtonContainer>
            <BlacKButton>Post Upload</BlacKButton>
            <BlacKButton>Make a Video</BlacKButton>
          </ButtonContainer>
        </TitleContainer>
        <FlexContainer>
          <GridContainer>
            {images.map((image, index) =>
              <GridImage src="src/assets/images/planTripStartPage/plantrip1.png" />
            )}
            <GridImage src="src/assets/images/clipStartPage/plusCircleButton.jpg"></GridImage>
          </GridContainer>
        </FlexContainer>
      </TotalContainer>
    <div className="Footer"></div>
  </div>
}

export default MobileClipReady

const TotalContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem;
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const TripDate = styled.p`
    // font-family
    // font-size
    text-align: start;
    margin: 0;
`

const TripTitle = styled.p`
    // font-family
    font-size: 1.5rem;
    text-align: start;
    margin: 0;
`

const ButtonContainer = styled.div`
    display: flex;
    gap: 0.1rem;
    padding: 0.5rem 0 0.5rem 0;
`

const BlacKButton = styled.button`
    background-color: black;
    border: 0;
    border-radius: 0.5rem;
    color: white;
`

const FlexContainer = styled.div`
    width:90%;
    display:flex;
    justify-content:center;
    margin: 0 auto;
`

const GridContainer = styled.div`
    width: 30em;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    gap: 0.75em;
    justify-content: left;
`;

const GridImage = styled.img`
    width: 7em;
    height: 10em;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    text-align: center;
`;