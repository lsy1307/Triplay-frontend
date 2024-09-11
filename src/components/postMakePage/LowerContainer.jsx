import styled from 'styled-components';

const LowerContainer = (props) => {



  return <TotalContainer>
    {
      props.locationList.map((location, index) => {

      })
    }
  </TotalContainer>
}

export default LowerContainer

const TotalContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`