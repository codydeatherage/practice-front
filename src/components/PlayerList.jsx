import styled from 'styled-components'
import { Link } from 'react-router-dom'
const Container = styled.div`
    display: flex;
    width: 30%;
    height: 98%;
    margin: auto;
    margin-right: 0;
`

const Team = styled.div`
    width: 50%;
    height: 100%;
`

const Player = styled.div`
    display: flex;
    width: 100%;
    height: 19%;
    text-align: center;
    margin-top: 1px;
`

const ChampionSplash = styled.img`
    width: 16px;
    height: 100%;
    border: 1px solid black;
    border-radius: ;
`

const Label = styled.div`
    width: calc(80% - 16px);
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 3px;
    text-align:left;
    font-size: 13px;
`

const PlayerList = ({ players, search }) => {
    let leftTeam = [];
    let rightTeam = [];
    for (let p of players) {
        if (p.teamId === 100) {//blue side
            leftTeam.push(p);
        }
        else if (p.teamId === 200) {//red side
            rightTeam.push(p);
        }
    }
    return (
        <Container>
            <Team key={1}>
                {leftTeam.map((player, index) => {
                    return (
                        <Link onClick={() => search(player.summonerName)} to={`/search/${player.summonerName}`}>
                            <Player key={index + player.summonerName}>
                                <ChampionSplash src={`http://ddragon.leagueoflegends.com/cdn/11.13.1/img/champion/${player.championName}.png`} key={index + player.summonerName + 1} alt="" />
                                <Label key={index + player.summonerName + 2} >{player.summonerName}</Label>
                            </Player>
                        </Link>
                    )

                })}
            </Team>
            <Team key={2}>
                {rightTeam.map((player, index) => {
                    return (
                        <Link onClick={() => search(player.summonerName)} to={`/search/${player.summonerName}`}>
                            <Player key={index + player.summonerName}>
                                <ChampionSplash key={index + player.summonerName + 1} src={`http://ddragon.leagueoflegends.com/cdn/11.13.1/img/champion/${player.championName}.png`} alt="" />
                                <Label key={index + player.summonerName + 2} >{player.summonerName}</Label>
                            </Player>
                        </Link>
                    )

                })}
            </Team>
        </Container>
    )


}

export default PlayerList;