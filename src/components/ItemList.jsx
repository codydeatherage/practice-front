import styled from 'styled-components'
import { useEffect, useState } from 'react'
import axios from 'axios'
const Container = styled.div`
    border: 1px solid black;
    display: flex;
    height: 60%;
    margin: auto 0;
    padding: 1%;
    width: 310px;
`

const HoverContainer = styled.div`
    height: 100px;
    width: 100px;
    z-index: -100;
    background-color: black;

`


const ImgContainer = styled.div`
    border-radius: 10%;
    background-color: #7196ab;
    width: 40px;
    height: 100%;
    z-index: 100;
    margin: 0 auto ;
`

const Img = styled.img`
    border-radius: 10%;
    width: 40px;
    height: 100%;
    margin: 0 auto ;
`

const ItemList = ({ items }) => {
    const [itemDetails, setItemDetails] = useState([]);
    const [hovered, setHovered] = useState('');
    useEffect(() => {
        const fetchData = async (items) => {
            await axios.get('http://ddragon.leagueoflegends.com/cdn/11.14.1/data/en_US/item.json')
                .then(async (res) => {
                    await res.data;
                    const { data } = res.data;
                    for (let item in data) {
                        for (let i of items) {
                            if (i == item) {
                                itemDetails.push({ id: item, name: data[item].name, details: data[item].description });
                            }
                        }
                    }
                })
                .then(() => {
                    setItemDetails(itemDetails);
                })
        }
        fetchData(items);
    }, []);

    return (
        <>
            <Container>
                {items.map((item, index) => {
                    if (item !== 0) {
                        return (
                            <ImgContainer onMouseOver={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} key={index}>
                                {itemDetails && hovered ? <HoverContainer/> : null}
                               
                                <Img src={`http://ddragon.leagueoflegends.com/cdn/11.13.1/img/item/${item}.png`} alt="" />
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