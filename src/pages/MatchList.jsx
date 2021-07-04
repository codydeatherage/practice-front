import { useEffect, useState } from 'react'
import styled from 'styled-components'
import api from '../api'
import MatchListItem from './MatchListItem'

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    border: 2px solid black;
`
const LoadButton = styled.button.attrs({
    className: `btn btn-success`,
})`
    width: 100%;
    height: 5vh;
`

const MatchList = ({ matchList, name }) => {
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

    useEffect(() => {
        console.log('Fetching match data ....');
        const fetchData = async () => {
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
        }
        fetchData();
        /*         for (let i = 0; i < results; i++) {
                    if (loaded.indexOf(matchList[i]) < 0) {
                        await api.getMatchData(matchList[i]).then((res) => {
                            const { info } = res.data.data;
                            loaded.push(matchList[i]);
        
                            if (data.indexOf(info) < 0) {
                                data.push(info);
                                count++;
                            }
        
                        }).then(() => {
                            if (i === results - 1) {
                                console.log('Matchdata finished');
                                setMatchData(data);
                            }
                        })
                    }
                } */
       /*  console.log(`${count} games data retrieved`); */
    }, [results])

    if (matchData.length > 0) {
        return (
            <Wrapper>
                {
                    matchList.map((match, index) => {
                        if (index < results) {
                            let id = match.slice(4);
                            let gameData = matchData.find((game) => game.gameId === parseInt(id));
                            return <MatchListItem name={name} match={match} data={gameData} key={index} />
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