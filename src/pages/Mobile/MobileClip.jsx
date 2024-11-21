import { GetAxiosInstance } from '../../axios/AxiosMethod.js';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import MobileHeader from '../../layout/MobileHeader.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const MobileClip = () => {
  const navigate = useNavigate();
  const [clips, setClips] = useState([]);

  const changeClips = (newClips) => {
    setClips(prevState => newClips)
  }

  const getThumbNail = async (clipId) => {
    const response = await GetAxiosInstance(`https://localhost:8443/file/image/clip/thumbnail/${clipId}`, {
        // TODO :: Clip Image Get EndPoint 수정
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(response.data)
    return response.data
  }

  const getClips = async () => {
    const response = await GetAxiosInstance(`https://localhost:8443/clip`, {
        // TODO :: Clip Image Get EndPoint 수정
        headers: { 'Content-Type': 'application/json' },
    });
    let clips = response.data;
    for(var i = 0; i < clips.length; i++) {
        let clipFileUrl = await getThumbNail(clips[i].clipId)
        clips[i].clipFileUrl = clipFileUrl
    }

    changeClips(clips)
  };

  const handleCardClick = (clipId) => {
    navigate(`/clip/${clipId}`);
  };

  useEffect(()=> {
    getClips();
  },[])

  useEffect(() => {
    console.log(clips);
  }, [clips.length])

  return  <>
    <TotalContainer>
      <Container>
        <ClipGrid>
            {clips.map((clip, index) => (
              <ClipCard key={index} onClick={() => handleCardClick(clip.clipId)}>
                  <img src={clip.clipFileUrl} alt={`clip ${index + 1}`} />
                  <TextOverlay>
                      <div className="top-row">
                          <p>업로드 시간 : {clip.uploadDatetime.split('T')[0]}</p>
                      </div>
                      <div className="bottom-row">
                          <div className="profile-info">
                              <p>{clip.clipTitle}</p>
                          </div>
                      </div>
                  </TextOverlay>
              </ClipCard>
            ))}
        </ClipGrid>
      </Container>
    </TotalContainer>
  </>;
};

export default MobileClip;

const TotalContainer = styled.div`
  height: 100vh; /* 전체 화면을 차지하도록 설정 */
  display: flex;
  flex-direction: column;
  margin: 0; /* 기본 여백 제거 */
`

const InnerContainer = styled.div`
  width: 100%;
  flex-grow: 1; /* 남은 공간을 차지 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* 내부 콘텐츠가 넘치는 경우 숨김 처리 */
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
`;

const ClipGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    gap: 20px;
    width: 100%;
    justify-content: center;
`;

const TextOverlay = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    color: black;
    padding: 16px;
    box-sizing: border-box;
    text-align: left;
    background: white;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height:40%;

    .top-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .bottom-row {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .profile-info {
            display: flex;
            align-items: center;

            img {
                border-radius: 50%;
                width: 40px;
                height: 40px;
                margin-right: 12px;
            }

            p {
                font-size: x-large;
                font-weight: bolder;
            }
        }

        .icons {
            display: flex;
            gap: 10px;

            img {
                width: 40px;
                height: 40px;
            }
        }
    }

    h3 {
        margin: 0;
        font-size: 24px;
    }

    p {
        margin: 5px 0 0;
        font-size: 16px;
    }
`;

const ClipCard = styled.button`
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    height: 120px;
    width: 100%;
    border: none;
    padding: 0;
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    &:hover ${TextOverlay} {
        opacity: 1;
    }
`;