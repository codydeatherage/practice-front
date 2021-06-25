import styled from 'styled-components'

const Container = styled.div`
    border: 2px solid red;
    height: 15vh;
    background-color: #73C2EA
`

const Label = styled.label`
    margin: 5px;
`
const MatchListItem = ({match}) => {
    return (
        <Container>
            <Label>{match}</Label>
        </Container>
    )
}
export default MatchListItem