import styled from 'styled-components'
import { forwardRef, useEffect, useState } from 'react'
import './../style/Item.css'
import ItemHover from './ItemHover'
import { Tooltip } from '@material-ui/core';
import axios from 'axios'

const HoverContainer = styled.div`
    height: 100%;
    width: fit-content;
    z-index: -100;
    border: 1px solid white;
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


const Item = ({ item }) => {
    const [hovered, setHovered] = useState('');
    const [itemDetails, setItemDetails] = useState('');

    const ItemDetails = forwardRef(function MyComponent(props, ref) {
        return <HoverContainer {...props} ref={ref} />
    })

    useEffect(() => {
        const fetchData = async (item) => {
            await axios.get('http://ddragon.leagueoflegends.com/cdn/11.14.1/data/en_US/item.json')
                .then(async (res) => {
                    await res.data;
                    const { data } = res.data;
                    for (let i in data) {
                        const regex = /<[^>]+>/g;
                        if (i == item) {
                            const foundItem = data[item];
                            setItemDetails(
                                {
                                    id: item,
                                    name: foundItem.name,
                                    description: foundItem.description.replaceAll(regex, ''),
                                    prices: { total: foundItem.gold.total, base: foundItem.gold.base },
                                    plaintext: foundItem.plaintext
                                }
                            );
                        }

                    }
                })
        }
        fetchData(item);
    }, []);

    if (itemDetails) {
        return (
            <Tooltip arrow placement="top" title={<ItemHover details={itemDetails}></ItemHover>}>
                <ImgContainer onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                    {/*  {hovered ? <HoverContainer/> : null} */}

                    <Img src={`http://ddragon.leagueoflegends.com/cdn/11.13.1/img/item/${item}.png`} alt="" />
                </ImgContainer>
            </Tooltip >)
    } else {
        return <ImgContainer />
    }
}


export default Item