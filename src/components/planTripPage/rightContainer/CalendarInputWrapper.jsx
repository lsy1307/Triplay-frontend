import React, { useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const CalendarInputWrapper = (props) => {
    const refDatePicker = useRef(null);
    const [startDate, endDate] = props.dateRange;
    
    const openDatePicker = () => {
        refDatePicker.current.setOpen(true);
    };

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
                <CalendarIcon icon={faCalendarAlt} onClick={openDatePicker} />
                {startDate && endDate ? (
                    <CalendarLabel onClick={openDatePicker}>{`${formatDate(startDate)} ~ ${formatDate(endDate)}`}</CalendarLabel>
                ) : (
                    <CalendarLabel onClick={openDatePicker}>
                        언제 떠나는 여행인가요?
                    </CalendarLabel>
                )}

                <DatePicker
                    ref={refDatePicker}
                    selectsRange
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => props.setDateRange(update)}
                    dateFormat="yyyy/MM/dd"
                    customInput={<HiddenInput />}
                />
            </ContentsWrapper>
        </Container>
    );
};

export default CalendarInputWrapper;

const Container = styled.div`
  width: 70%;
  margin-bottom: 2rem;
  padding: 1rem 0;
`;

const ContentsWrapper = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 좌측 정렬 */
  border-radius: 8px;
  padding: 10px 15px;
  cursor: pointer;
`;

const CalendarIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 2rem;
  color: #333;
  margin-right: 0.8rem;
`;

const CalendarLabel = styled.label`
  font-size: 1.4rem;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
`;

const HiddenInput = styled.input`
  display: none;
`;

const GlobalStyle = createGlobalStyle`
    .react-datepicker {
        font-size: 1.5rem;
        width: 28rem;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }

    .react-datepicker__month-container {
        width: 100%;
    }

    .react-datepicker__header {
        background-color: #a4d4ae;
        color: white;
        border-bottom: none;
        padding-top: 8px;
        padding-bottom: 8px;
    }

    .react-datepicker__day-name, 
    .react-datepicker__day, 
    .react-datepicker__time-name {
        width: 3rem;
        line-height: 3rem;
        font-size: 1.4rem;
        color: #333;
    }

    .react-datepicker__day {
        font-weight: 500;
        color: #4CAF50;
    }

    .react-datepicker__day--selected, 
    .react-datepicker__day--in-range, 
    .react-datepicker__day--keyboard-selected {
        background-color: #88c999;
        color: white;
        border-radius: 50%;
    }

    .react-datepicker__day:hover {
        background-color: #cfead6;
    }
`;
