import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const VideoThumbnail = ({ videoUrl, alt }) => {
  return (
    <ThumbnailContainer>
      <PlayIcon icon={faPlay} />
    </ThumbnailContainer>
  );
};

const ThumbnailContainer = styled.div`
  width: 100%;
  height: 100px;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const PlayIcon = styled(FontAwesomeIcon)`
  font-size: 2rem;
  color: #333;
`;

export default VideoThumbnail;