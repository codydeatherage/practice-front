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
    background-color: black;
`
const SpellImg = styled.img`
    border: 1px solid green;
    height: 47.5%;
    width: 47.5%;
`
const MatchListItem = ({ match, data, name }) => {
    const findPlayer = (arr) => {
        let p = '';
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

    const getRuneName = (runeId) => {
        switch (runeId) {
            case 8112: return "Electrocute";
            case 8124: return "Predator";
            case 8128: return "DarkHarvest";
            case 9923: return "HailOfBlades";
            case 8351: return "GlacialAugment";
            case 8360: return "Unsealed Spellbook";
            case 8358: return "MasterKey";//omnistone dev namebreak;
            case 8005: return "PressTheAttack";
            case 8008: return "LethalTempo";
            case 8021: return "FleetFootwork";
            case 8010: return "Conqueror";
            case 8437: return "GraspOfTheUndying";
            case 8439: return "Aftershock";
            case 8465: return "Guardian";
            case 8214: return "SummonAery";
            case 8229: return "ArcaneComet";
            case 8230: return "PhaseRush";
        }
    }

    const getRuneStyle = (runeId) => {
        switch (runeId) {
            case 8000: return 'Precision';
            case 8100: return "Domination";
            case 8200: return "Sorcery";
            case 8300: return "Inspiration";
            case 8400: return "Resolve";
        }
    }

    if (data) {
        let timeSinceGame = 0;
        let currDate = Date.now();
        const player = findPlayer(data.participants);
        timeSinceGame = msToTime(currDate - data.gameCreation);
        let summoner1 = getSummonerSpellName(player.summoner1Id);
        let summoner2 = getSummonerSpellName(player.summoner2Id);
        let primaryStyle = getRuneStyle(player.perks.styles[0].style);
        let primaryRuneName = getRuneName(player.perks.styles[0].selections[0].perk);
        let secondStyle = getRuneStyle(player.perks.styles[1].style);
        let primIcon = '';
        switch (primaryRuneName) {
            case "Aftershock": primIcon = 'perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png';
                break;
            case "LethalTempo": primIcon = 'perk-images/Styles/Precision/LethalTempo/LethalTempoTemp.png'; break;
            default: primIcon = `perk-images/Styles/${primaryStyle}/${primaryRuneName}/${primaryRuneName}.png`;
        }

        let primaryRune = { name: primaryRuneName, style: primaryStyle, icon: primIcon }


        let secondStyleIcon = '';
        switch (secondStyle) {
            case 'Domination': secondStyleIcon = 'perk-images/Styles/7200_Domination.png'; break;
            case 'Sorcery': secondStyleIcon = 'perk-images/Styles/7202_Sorcery.png'; break;
            case 'Inspiration': secondStyleIcon = 'perk-images/Styles/7203_Whimsy.png'; break;
            case 'Resolve': secondStyleIcon = 'perk-images/Styles/7204_Resolve.png'; break;
            case 'Precision': secondStyleIcon = 'perk-images/Styles/7201_Precision.png'; break;
        }

        const secRune = { name: secondStyle, icon: secondStyleIcon }
        let runes = [primaryRune, secRune];
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
                            <SpellImg src={`https://ddragon.leagueoflegends.com/cdn/img/${runes[0].icon}`}></SpellImg>
                            <SpellImg src={`https://ddragon.leagueoflegends.com/cdn/11.13.1/img/spell/${summoner2}.png`}></SpellImg>
                            <SpellImg src={`https://ddragon.leagueoflegends.com/cdn/img/${runes[1].icon}`}></SpellImg>
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