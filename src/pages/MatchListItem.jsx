import styled from 'styled-components'
const Container = styled.div`
    border: 2px solid red;
    height: 12vh;
    width: 690px;
    background-color: #73C2EA
    margin: 5px;
    display: flex;
`
const RoundImg = styled.div`
    border-radius: 50%;
    overflow: hidden;
    height: 50px;
    margin: auto 5px;
    border: 2px solid green;
`
const TimesContainer = styled.div`
    border: 1px solid blue;
    font-size: 11px;
    height: 100%;
    width: 70px;
    margin-left:0;

`
const ChampionImg = styled.img`
    height: 50px;
    width: 50px;
`
const Label = styled.label`
    margin: 5px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 30px;
`
const SpellsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: auto 0;
    height: 50px;
    width: 50px;
    border: 1px solid blue;
`
const SpellImg = styled.img`
    border: 1px solid green;
    height: 47.5%;
    width: 47.5%;
`
const MatchListItem = ({ match, data, name }) => {
    const findPlayer = (arr) =>{
        let p= '';
        for (let d of arr) {
            if (d.summonerName.toLowerCase() === name.toLowerCase()) {
                p = d;
            }
        }
        return p;
    }
    
    function msToTime(ms) {
        let seconds = (ms / 1000).toFixed(0);
        let minutes = (ms / (1000 * 60)).toFixed(0);
        let hours = (ms / (1000 * 60 * 60)).toFixed(0);
        let days = (ms / (1000 * 60 * 60 * 24)).toFixed(0);
        if (seconds < 60) return seconds + " seconds";
        else if (minutes < 60) return minutes + " minutes";
        else if (hours < 24) return hours + " hours";
        else return days + " Days"
    }

    const getSummonerSpellName = (id) => {
        switch (id) {
            case 1: return 'SummonerBoost';
            case 3: return 'SummonerExhaust';
            case 4: return 'SummonerFlash';
            case 6: return 'SummonerHaste';
            case 7: return 'SummonerHeal';
            case 11: return 'SummonerSmite';
            case 12: return 'SummonerTeleport';
            case 13: return 'SummonerMana';
            case 14: return 'SummonerDot';
            case 21: return 'SummonerBarrier';
            case 30: return 'SummonerPoroRecall';
            case 31: return 'SummonerPoroThrow';
            case 32: return 'SummonerSnowball';
            case 39: return 'SummonerSnowURFSnowball_Mark';
            default: console.log('COULDNT FIND NAME FOR ', id);
        }
    }

    if (data) {
        let timeSinceGame = 0;
        let currDate = Date.now();
        const player = findPlayer(data.participants);
        timeSinceGame = msToTime(currDate - data.gameCreation);
        let summoner1 = getSummonerSpellName(player.summoner1Id);
        let summoner2 = getSummonerSpellName(player.summoner2Id);
        return (
            <Container>
                {data ?
                    <>
                        <TimesContainer>
                            <Label>{data.gameMode}</Label>
                            <Label>{`${timeSinceGame}`}</Label>
                            <Label>{`${player.summonerName}`}</Label>

                        </TimesContainer>
                        <RoundImg>
                            <ChampionImg src={`http://ddragon.leagueoflegends.com/cdn/11.13.1/img/champion/${player.championName}.png`} alt=""></ChampionImg>
                        </RoundImg>
                        <SpellsContainer>
                            <SpellImg src={`https://ddragon.leagueoflegends.com/cdn/11.13.1/img/spell/${summoner1}.png`}></SpellImg>
                            <SpellImg></SpellImg>
                            <SpellImg src={`https://ddragon.leagueoflegends.com/cdn/11.13.1/img/spell/${summoner2}.png`}></SpellImg>
                            <SpellImg></SpellImg>
                        </SpellsContainer>
                        <div>
                            {`${player.kills}/${player.deaths}/${player.assists}`}
                        </div>
                    </>

                    :
                    <>
                        <Label>{match}</Label>
                    </>
                }
            </Container>
        )
    } else {
        return (
            <Container>
                <Label>Loading...</Label>
            </Container>
        )
    }
}
export default MatchListItem