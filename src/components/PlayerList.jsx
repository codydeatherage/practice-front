import styled from 'styled-components'

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

const PlayerList = ({ players }) => {
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
            <Team>
                {leftTeam.map((player) => {
                    return (
                        <Player>
                            <ChampionSplash src={`http://ddragon.leagueoflegends.com/cdn/11.13.1/img/champion/${player.championName}.png`} alt="" />
                            <Label>{player.summonerName}</Label>
                        </Player>
                    )

                })}
            </Team>
            <Team>
                {rightTeam.map((player) => {
                    return (
                        <Player>
                            <ChampionSplash src={`http://ddragon.leagueoflegends.com/cdn/11.13.1/img/champion/${player.championName}.png`} alt="" />
                            <Label>{player.summonerName}</Label>
                        </Player>
                    )

                })}
            </Team>
        </Container>
    )


}

export default PlayerList;