import styled from 'styled-components'

const Container = styled.div`
display: flex;
flex-wrap: wrap;
margin: auto 0;
height: 50px;
width: 50px;
border: 1px solid blue;
background-color: black;
`
const Img = styled.img`
border: 1px solid green;
height: 49%;
width: 49%;
`
const SpellsContainer = ({spells}) =>{
    return(
        <Container>
            {spells.map((spell, index)=>{
                return <Img src={`${spell}`} key={index} alt=""></Img>
            })}
        </Container>
    )
}

export default SpellsContainer;