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
    margin-top: 15px;
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
const MatchListItem = ({ match, data, name }) => {
    /* console.log('Item', data); */

    let currDate = Date.now();

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


    let timeSinceGame = 0;
    if (data) {
        timeSinceGame = msToTime(currDate - data.gameCreation);
        /*     const player = data.particpants.find((player) =>
                player.summonerName === name
            ); */
        let player = '';
       /*  console.log(data); */
         for (let d of data.participants) {
            if (d.summonerName.toLowerCase() === name.toLowerCase()) {
                player = d;
            }
        } 
        console.log(player);
        return (
            <Container>
                {/*  <Label>{match}</Label> */}
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
                    </>

                    :
                    <>
                    <Label>{match}</Label>
                    </>
                }
            </Container>
        )
    }else{
        return(
            <Container>
                <Label>Loading...</Label>
            </Container>
        )
    }
}
    export default MatchListItem