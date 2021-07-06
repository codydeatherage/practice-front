import styled from 'styled-components'

const Container = styled.div`
    border: 1px solid black;
    display: flex;
    height: 60%;
    margin: auto 0;
    padding: 1%;
    width: 310px;
`

const ImgContainer = styled.div`
    border-radius: 10%;
    background-color: #7196ab;
    width: 40px;
    height: 100%;
    margin: 0 auto ;
`

const Img = styled.img`
    border-radius: 10%;
    width: 40px;
    height: 100%;
    margin: 0 auto ;
`

const ItemList = ({ items }) => {
    return (
        <>
            <Container>
                {items.map((item, index) => {
                    if (item !== 0) {
                        return (
                            <ImgContainer>
                                <Img src={`http://ddragon.leagueoflegends.com/cdn/11.13.1/img/item/${item}.png`} alt=""/>
                            </ImgContainer>
                        )
                    } else {
                        return <ImgContainer />
                    }
                })
                }
            </Container>
        </>
    )
}

export default ItemList;