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
    const [results, changeResults] = useState(10);
    const [matchData, setMatchData] = useState([]);
    const MAX_RESULTS = 100;
    let loaded = [];
    let data = [];

    const loadNext10Results = () => {
        if (results + 10 <= MAX_RESULTS) {
            changeResults(results + 10);
        }
    }

    useEffect(async () => {
        console.log('Fetching match data ....');
        for (let i = 0; i < results; i++) {
            if (loaded.indexOf(matchList[i]) < 0) {
                await api.getMatchData(matchList[i]).then((res) => {
                    const { info } = res.data.data;
                    loaded.push(matchList[i]);
                    if (data.indexOf(info) < 0) {
                        data.push(info);
                    }
                }).then(() => {
                    if (i === results - 1) {
                        console.log('Matchdata finished');
                        setMatchData(data);
                        
                    }
                })
            }
        }
    }, [results])

    if (matchData) {
        console.log(matchData);
        return (
            <Wrapper>
                {
                    matchList.map((match, index) => {
                        if (index < results) {
                            let id = match.slice(4);
                            /* console.log(matchData.find((game) => game.gameId == id)); */
                            let gameData = matchData.find((game)=> game.gameId == id);
                            return <MatchListItem match={match} data={gameData} key={index} />
                        }
                    })
                }
                <LoadButton onClick={() => { loadNext10Results() }}>Load more</LoadButton>
            </Wrapper>
        )
    } else {
        return (
            <Wrapper>
                <div >Loading...</div>
            </Wrapper>
        )
    }

}
export default MatchList