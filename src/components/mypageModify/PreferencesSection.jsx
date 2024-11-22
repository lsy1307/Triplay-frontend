import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getPreference } from '../iconUtils';
import { getPreferences, registerUserPreferences } from '../../api/preferences';

const PreferencesSection = () => {
  const preferenceOptions = [
    { key: '1', label: '신나는 액티비티' },
    { key: '2', label: 'SNS에서 본 곳' },
    { key: '3', label: '맛있는 여행' },
    { key: '4', label: '쇼핑은 필수!' },
    { key: '5', label: '예술적 감각을 깨우다' },
  ];

  const [selectedPreferences, setSelectedPreferences] = useState(
    Array(preferenceOptions.length).fill(false)
  );

  // 사용자 취향 데이터를 불러와 초기 상태 설정
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await getPreferences();
        const selectedIds = response.data.map(pref => pref.preferenceId);

        // 서버에서 가져온 선택된 취향을 기반으로 상태 업데이트
        const updatedPreferences = preferenceOptions.map(option =>
          selectedIds.includes(parseInt(option.key))
        );
        setSelectedPreferences(updatedPreferences);
      } catch (error) {
        console.error('Error fetching preferences:', error);
      }
    };

    fetchPreferences();
  }, []);

  const handleCheckboxChange = (index) => {
    const updatedPreferences = [...selectedPreferences];
    updatedPreferences[index] = !updatedPreferences[index];
    setSelectedPreferences(updatedPreferences);
  };

  const handleSavePreferences = async () => {
    // 선택된 preference의 key를 id로 변환하여 서버에 전송
    const selectedIds = preferenceOptions
      .filter((_, index) => selectedPreferences[index])
      .map((option) => parseInt(option.key)); // 숫자로 변환

    try {
      await registerUserPreferences(selectedIds);
      alert('취향 정보가 수정되었습니다!');
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  return (
    <PreferencesContainer>
      <Title>당신의 취향을 알려주세요!</Title>
      {preferenceOptions.map((preference, index) => (
        <PreferenceItem key={preference.key}>
          <label>
            <Icon src={getPreference(preference.key)} alt={preference.label} />
            {preference.label}
          </label>
          <input
            type="checkbox"
            checked={selectedPreferences[index]}
            onChange={() => handleCheckboxChange(index)}
          />
        </PreferenceItem>
      ))}
      <SaveButton onClick={handleSavePreferences}>저장</SaveButton>
    </PreferencesContainer>
  );
};

export default PreferencesSection;

const PreferencesContainer = styled.div`
  background-color: #333;
  color: #fff;
  padding: 50px 80px;
  border-radius: 10px;
  width: 50%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h3`
  text-align: center;
  margin-bottom: 20px;
`;

const PreferenceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;

  label {
    font-size: 20px;
    display: flex;
    align-items: center;
  }

  input {
    transform: scale(1.5);
  }
`;

const Icon = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 15px;
`; 

const SaveButton = styled.button`
  background-color: #B2B2B2;
  color: white;
  padding: 10px 20px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #4C4C4C;
  }
`;
