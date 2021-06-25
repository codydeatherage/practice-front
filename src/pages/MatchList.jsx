import { useEffect, useState } from 'react'
import styled from 'styled-components'
import api from '../api'
import MatchListItem from './MatchListItem'

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    border: 2px solid black;
    /* margin: 0 10px; */
`
const LoadButton = styled.button.attrs({
    className: `btn btn-success`,
})`
    width: 100%;
    height: 5vh;
`

const Label = styled.label`
    margin: 5px;
`

const MatchList = ({ matchList }) => {
    //initialized at 9 so 10 results are shown i.e. matchList[0:9]
    const [results, changeResults] = useState(10);
    let data = [];
    let loaded = [];

    const loadNext10Results = () => {
        if (results + 10 <= 100) {
            changeResults(results + 10);
        }
    }

    useEffect(async() => {
        for(let i = 0; i < results; i++){
            if(loaded.indexOf(matchList[i]) < 0){
                await api.getMatchData(matchList[i]).then((res)=>{
                    const {info} = res.data.data;
                    if(data.indexOf(info) < 0){
                        console.log(info);
                        data.push(info);
                    }
            })
            }
        }
        console.log(data[0].participants[7].championName);
    })

    return (
        <Wrapper>
            {
                matchList.map((match, index) => {
                    if (index < results) {
                        return <MatchListItem match={match} key={index} />
                    }
                })
            }
            <LoadButton onClick={() => { loadNext10Results() }}>Load more</LoadButton>
        </Wrapper>
    )
}
export default MatchList