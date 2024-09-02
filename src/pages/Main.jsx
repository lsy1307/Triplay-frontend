import React from 'react';
import styled from 'styled-components';
import Header from '../layout/Header';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();

  const goToPlanTripPage = () => {
    navigate('/plan');
  };

  return (
    <div>
      <Header />
      <TotalContainer>
        <UpperContainer>
          <UpperLeftContainer>
            <UpperLeftContainerImageWrapper>
              <PlanTripImg
                src="src/assets/images/planTripStartPage/plantrip1.png"
                alt=""
              />
            </UpperLeftContainerImageWrapper>
          </UpperLeftContainer>
          <UpperRightContainer>
            <UpperRightContentContainer>
              <UpperRightHeaderWrapper>
                Triplay : 여행의 즐거움에
                <br />
                게임의 재미를 더하다!
              </UpperRightHeaderWrapper>
              <UpperRightTextWrapper>
                여행 준비부터 여행 이후의 추억까지
                <br />
                TripPlay를 통해 더 특별한 경험으로 만들어보세요!
              </UpperRightTextWrapper>
              <UpperRightGoToPlanBtnWrapper>
                <UpperRightGoToPlanBtn onClick={goToPlanTripPage}>
                  여행 계획 세우러 가기
                </UpperRightGoToPlanBtn>
              </UpperRightGoToPlanBtnWrapper>
            </UpperRightContentContainer>
          </UpperRightContainer>
        </UpperContainer>
        <DownContainer>
          <DownLeftContainer>
            <DownLeftContentContainer>
              <DownLeftHeadrWrapper>Post & Clip</DownLeftHeadrWrapper>
              <DownLeftTextWrapper>
                다른 사람의 여행을 참고해서 자신의 여행 계획을
                <br />
                간편하게 작성해보세요. 여러분의 추억도 함께 공유할 수 있어요.
              </DownLeftTextWrapper>
              <DownLeftGoToViewOtherPlanBtnWrapper>
                <DownLeftGoToViewOtherPlanBtn>
                  다른 여행 계획 둘러보기
                </DownLeftGoToViewOtherPlanBtn>
              </DownLeftGoToViewOtherPlanBtnWrapper>
            </DownLeftContentContainer>
          </DownLeftContainer>
          <DownRightContainer>
            <DownRightImagesWrapper>
              <PlanTripImg
                src="src/assets/images/planTripStartPage/plantrip1.png"
                alt=""
              />
              <PlanTripImg
                src="src/assets/images/planTripStartPage/plantrip3.png"
                alt=""
              />
              <PlanTripImg
                src="src/assets/images/planTripStartPage/plantrip4.png"
                alt=""
              />
              <PlanTripImg
                src="src/assets/images/planTripStartPage/plantrip5.png"
                alt=""
              />
            </DownRightImagesWrapper>
          </DownRightContainer>
        </DownContainer>
      </TotalContainer>
      <div className="Footer"></div>
    </div>
  );
};

export default Main;

const TotalContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const UpperContainer = styled.div`
  display: flex;
  height: 70vh;
`;

const UpperLeftContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UpperLeftContainerImageWrapper = styled.div`
  width: 90%;
  height: 90%;
`;

const UpperRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  text-align: end;
  width: 50%;
`;

const UpperRightContentContainer = styled.div`
  width: 100%;
  height: 80%;
`;

const UpperRightHeaderWrapper = styled.div`
  font-size: 3.8vw;
  font-weight: 1000;
  margin: 5%;
`;

const UpperRightTextWrapper = styled.div`
  font-size: 1.6vw;
  font-weight: 500;
  margin: 5%;
`;

const UpperRightGoToPlanBtnWrapper = styled.div`
  margin: 5%;
  margin-top: 10%;
`;

const UpperRightGoToPlanBtn = styled.button`
  font-size: 2vw;
  height: 4em;
  width: 12em;
  background-color: #393939;
  color: white;
  font-weight: 1000;
  border-radius: 10px;
`;

const PlanTripImg = styled.img`
  width: 100%;
  height: 100%;
`;

const DownContainer = styled.div`
  display: flex;
  height: 70vh;
`;

const DownLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  text-align: start;
  width: 50%;
`;

const DownLeftContentContainer = styled.div`
  width: 100%;
  height: 80%;
`;

const DownLeftHeadrWrapper = styled.div`
  font-size: 3.8vw;
  font-weight: 1000;
  margin: 5%;
`;

const DownLeftTextWrapper = styled.div`
  font-size: 1.6vw;
  font-weight: 500;
  margin: 5%;
`;

const DownLeftGoToViewOtherPlanBtnWrapper = styled.div`
  margin: 5%;
  margin-top: 10%;
`;

const DownLeftGoToViewOtherPlanBtn = styled.button`
  font-size: 2vw;
  height: 4em;
  width: 12em;
  background-color: #393939;
  color: white;
  font-weight: 1000;
  border-radius: 10px;
`;

const DownRightContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DownRightImagesWrapper = styled.div`
  width: 90%;
  height: 90%;
  display: grid;
  grid-template-columns: repeat(2, auto);
  row-gap: 10px;
  column-gap: 10px;
`;
