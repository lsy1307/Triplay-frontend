import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const RegistPartyContentsContainer = (props) => {

    // 일행 등록 부분 -> 나중에 서버에서 이거는 객체로 partyNo, name, enum({solo, friend ...})
    const parties = ["혼자", "친구와", "연인과", "아이와", "부모님과"];

    const [selectedPartyNum, setSelectedPartyNume] = useState(null);

    return (
        <Container>
              <RegistPartyContentsWrapper>
                <RegistPartyTitleWrapper>
                  <FontAwesomeIcon icon={faUser} style={{ fontSize: "3em" }} />
                  {selectedPartyNum !== null ? (
                    <RegistPartyTitleLabel>
                      <RegistPartyCard isselected="true">
                        {parties[selectedPartyNum]}
                      </RegistPartyCard>
                      여행
                    </RegistPartyTitleLabel>
                  ) : (
                    <RegistPartyTitleLabel>
                      일행을 등록해주세요
                    </RegistPartyTitleLabel>
                  )}
                </RegistPartyTitleWrapper>
                <RegistPartyContentWrapper>
                  {parties.map((partyName, index) => {
                    return (
                      <RegistPartyCard
                        key={index}
                        isselected={`${selectedPartyNum === index}`}
                        onClick={() => {
                          setSelectedPartyNume(index);
                          props.setPartyName(parties[index])
                        }}
                      >
                        {partyName}
                      </RegistPartyCard>
                    );
                  })}
                </RegistPartyContentWrapper>
              </RegistPartyContentsWrapper>
            </Container>
    );
};

export default RegistPartyContentsContainer;


const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const RegistPartyTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 0.7rem;
`;

const RegistPartyContentsWrapper = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
`;

const RegistPartyContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: start;
`;

const RegistPartyCard = styled.div`
  height: 2.5rem;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ isselected }) =>
    isselected === "true" ? "#d3d3d3" : "white"}; /* 선택된 상태 스타일링 */

  &:hover {
    background-color: #f0f0f0; /* 마우스 오버 시 스타일링 */
  }

  border: 1px solid black;
  border-radius: 15px;
  margin: 0.3em;
`;

const RegistPartyTitleLabel = styled.label`
  width: 100%;
  font-size: 2rem;
  margin-left: 0.5em;
  display: flex;
  align-items: center;
`;