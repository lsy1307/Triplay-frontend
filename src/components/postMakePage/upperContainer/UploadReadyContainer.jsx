import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PlusButtonSrc from '../../../assets/images/clipStartPage/ImagePlusButton.svg';


const UploadReadyContainer = (props) => {

  return <>
    <FlexContainer>
      <GridContainer>
        {props.imageFiles.map((file, index) => {
          const url = file.img instanceof File ? URL.createObjectURL(new Blob([file.img], { type: file.type })) : null;
          return <GridItem key={index}>
            <GridImage src={url} />
          </GridItem>;
        })}
      </GridContainer>
    </FlexContainer>
  </>
}

export default UploadReadyContainer


const FlexContainer = styled.div`
    width:90%;
    display:flex;
    padding-top: 1rem;
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

const GridItem = styled.div`
    position: relative;
    width: 7em;
    height: 10em;
`

const GridImage = styled.img`
    width: 7em;
    height: 10em;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    text-align: center;
`;

const GridRemoveButton = styled.button`
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    background-color: #e3e3e3;
    border-radius: 3em;
    border: 0;
    color: black;
`