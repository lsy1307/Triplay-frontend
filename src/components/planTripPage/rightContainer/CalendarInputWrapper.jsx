import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { createGlobalStyle } from "styled-components"; // 달력 크기 조정할 때 쓰는거임
import DatePicker from "react-datepicker";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const CalendarInputWrapper = (props) => {
    // 캘린더 부분
    const refDatePicker = useRef(null);
    const [startDate, endDate] = props.dateRange;
    const openDatePicker = () => {
        // DatePicker 참조를 통해 달력을 엽니다.
        refDatePicker.current.setOpen(true);
    };

    // 캘린더 날짜 포맷
    const formatDate = (date) => {
        if (!date) return "";
        return new Intl.DateTimeFormat("kr", {
        year: "numeric",
        month: "long",
        day: "numeric",
        }).format(date);
    };

    return (
        <Container>
            <ContentsWrapper>
                <GlobalStyle />
                <FontAwesomeIcon
                    icon={faCalendarAlt}
                    onClick={openDatePicker}
                    style={{ cursor: "pointer", fontSize: "3rem" }}
                />
                {startDate && endDate ? (
                    <CalenderInputLabel onClick={openDatePicker}>{`${formatDate(startDate)} ~ ${formatDate(endDate)}`}</CalenderInputLabel>
                ) : (
                    <CalenderInputLabel onClick={openDatePicker}>
                    언제 떠나는 여행인가요?
                    </CalenderInputLabel>
                )}

                <DatePicker
                    ref={refDatePicker}
                    selectsRange
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => props.setDateRange(update)}
                    dateFormat="yyyy/MM/dd"
                    customInput={
                    <input type="text" style={{ display: "none" }} />
                    }
                />
            </ContentsWrapper>
            
            </Container>
    );
};

export default CalendarInputWrapper;

const Container = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const ContentsWrapper = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const CalenderInputLabel = styled.label`
  cursor: pointer;
  font-size: clamp(0.5rem, 1.6vw, 2rem); /* 폰트 크기를 동적으로 조정 */
  margin-left: 0.5em;
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden; /* 넘치는 텍스트 숨기기 */
  text-overflow: ellipsis; /* 넘치는 텍스트에 '...' 표시 */
`;


const GlobalStyle = createGlobalStyle`
    /* 전역 CSS 파일이나 createGlobalStyle 컴포넌트에 추가 */
    .react-datepicker {
        font-size: 2rem; /* 전체 달력 텍스트의 기본 크기를 설정 */
        width: 30rem; /* 전체 달력의 너비 조정 */
    }

    .react-datepicker__month-container {
        width: 100%; /* 각 월별 컨테이너의 너비를 달력 너비에 맞춤 */
    }

    .react-datepicker__header {
        background-color: #f0f0f0; /* 달력의 상단 부분(월/년 표시) 배경색 설정 */
    }

    /* 달력 내 일자(숫자)의 너비와 높이 설정 */
    .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name {
        width: 4rem; /* 일자 및 요일 칸의 너비 설정 */
        line-height: 4rem; /* 일자 및 요일 칸의 높이 설정, 중앙 정렬을 위함 */
        font-size: 2rem; /* 일자 텍스트 크기를 더 크게 설정 */
    }

    /* 각 날짜 숫자에 대한 추가 스타일링 */
    .react-datepicker__day {
        font-size: 1.8rem; /* 숫자(일자)의 텍스트 크기 설정 */
        font-weight: bold; /* 숫자를 더 두껍게 표시 */
    }
`;