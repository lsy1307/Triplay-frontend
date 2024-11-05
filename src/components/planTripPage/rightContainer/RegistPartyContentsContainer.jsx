import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const RegistPartyContentsContainer = (props) => {
  const parties = ["혼자", "친구와", "연인과", "아이와", "부모님과"];
  const [selectedPartyNum, setSelectedPartyNum] = useState(null);

  return (
    <Container>
      <RegistPartyContentsWrapper>
        <RegistPartyTitleWrapper>
          <UserIcon icon={faUser} />
          {selectedPartyNum !== null ? (
            <RegistPartyTitleLabel>
              <SelectedParty>{parties[selectedPartyNum]}</SelectedParty> 여행
            </RegistPartyTitleLabel>
          ) : (
            <RegistPartyTitleLabel>일행을 등록해주세요</RegistPartyTitleLabel>
          )}
        </RegistPartyTitleWrapper>
        <RegistPartyContentWrapper>
          {parties.map((partyName, index) => (
            <RegistPartyCard
              key={index}
              isselected={`${selectedPartyNum === index}`}
              onClick={() => {
                setSelectedPartyNum(index);
                props.setPartyName(parties[index]);
              }}
            >
              {partyName}
            </RegistPartyCard>
          ))}
        </RegistPartyContentWrapper>
      </RegistPartyContentsWrapper>
    </Container>
  );
};

export default RegistPartyContentsContainer;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  margin-bottom: 1.5rem;
`;

const RegistPartyTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
  margin-left: 1.1rem;
`;

const UserIcon = styled(FontAwesomeIcon)`
  font-size: 1.8rem;
  color: #333;
`;

const RegistPartyContentsWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const RegistPartyContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.5rem;
`;

const RegistPartyCard = styled.div`
  height: 2.5rem;
  padding: 0 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ isselected }) => (isselected === "true" ? "#a4d4ae" : "#fff")}; /* 선택된 상태 연두색 배경 */
  font-size: 1.2rem;
  color: #333;
  border: 1px solid ${({ isselected }) => (isselected === "true" ? "#88c999" : "#ccc")};
  border-radius: 12px;
  transition: background-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease;
  box-shadow: ${({ isselected }) => (isselected === "true" ? "0px 4px 8px rgba(0, 150, 0, 0.15)" : "none")};

  &:hover {
    background-color: #e0f7fa;
    transform: translateY(-1px);
  }
`;

const RegistPartyTitleLabel = styled.label`
  font-size: 1.6rem;
  font-weight: 500;
  color: #333;
  display: flex;
  align-items: center;
`;

const SelectedParty = styled.span`
  font-weight: 700;
  margin-right: 0.3rem;
  color: #4caf50;
`;
