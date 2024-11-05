import React from 'react';
import styled from 'styled-components';

const PreferencesSection = () => {
  return (
    <PreferencesContainer>
      <h3>당신의 취향을 알려주세요!</h3>
      <PreferenceItem>
        <label>신나는 액티비티</label>
        <input type="checkbox" />
      </PreferenceItem>
      <PreferenceItem>
        <label>SNS에서 본 곳</label>
        <input type="checkbox" />
      </PreferenceItem>
      <PreferenceItem>
        <label>맛있는 여행</label>
        <input type="checkbox" />
      </PreferenceItem>
      <PreferenceItem>
        <label>쇼핑은 필수!</label>
        <input type="checkbox" />
      </PreferenceItem>
      <PreferenceItem>
        <label>예술적 감각을 깨우다</label>
        <input type="checkbox" />
      </PreferenceItem>
    </PreferencesContainer>
  );
};

export default PreferencesSection;

const PreferencesContainer = styled.div`
  background-color: #333;
  color: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 50%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`;

const PreferenceItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  label {
    font-size: 16px;
  }

  input {
    transform: scale(1.5);
  }
`;
