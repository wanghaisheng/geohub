import styled from 'styled-components'

type StyledProps = {
  showPoints?: boolean
}

const StyledStandardFinalResults = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 30px;

  .pointsWrapper {
    font-size: 20px;
    font-weight: 600;
    font-style: italic;
    letter-spacing: 1px;
    color: #ababab;

    @media (max-width: 600px) {
      font-size: 18px;
    }
  }

  .progress-bar {
    margin-top: 10px;
    margin-bottom: 16px;
    max-width: 525px;
    width: 100%;
  }

  .finishedMessage {
    font-size: 16px;
    color: #808080;
    margin-bottom: 30px;

    @media (max-width: 600px) {
      font-size: 14px;
      text-align: center;
    }
  }
`

export default StyledStandardFinalResults