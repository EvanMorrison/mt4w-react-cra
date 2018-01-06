import styled from 'styled-components';


export const Row = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
`

export const RowCentered = Row.extend`
  justify-content: center;
  align-content: center;
`

export const Column = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`
export const Section = Column.extend`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 50px 10%;
  border-radius: 100% 0 100% 0/ 100px 0 200px 0;
  ${props => props.topcolor && `border-top: 8px solid ${props.topcolor}`};
  ${props => props.bottomcolor && `border-bottom: 12px solid ${props.bottomcolor}`};
`
export const SectionTitle = styled.h1`
  font-family: ${props => props.theme.titleFont};
  font-size: 3em;
  margin: 1em 0 1em; 
  `
export const SectionBody = styled.div`
  margin-bottom: 100px; 
`
export const Paragraph = styled.p`
  font-family: ${props => props.theme.textFont};
  font-size: 1.15em;
  font-weight: 300;
  line-height: 1.5em;
  max-width: 48em;
  text-align: justify;
  margin-top: 2em;
  &:first-of-type {
    margin-top: 0;
  }
`
