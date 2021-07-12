import styled from 'styled-components'

const HoverContainer = styled.div`
    height: 100%;
    width: fit-content;
    z-index: -100;
    display: flex;
    flex-wrap: wrap;
    border: 1px solid white;
`
const Label = styled.label`
    background-color: black;
    width: 100%;
    color: white;
    font-size: 12px;
    font-weight: normal;
`
const Span = styled.span`
    background-color: red;
    width:100%;
    color: #00cfbc; 
    font-size: 11px;
    font-weight: bold;
    font-family: "Helvetica Neue",Helvetica,"Apple SD Gothic Neo",AppleGothic,Dotum,Arial,Tahoma;
`

const Name = styled.h1`
    background-color: black;
    width: 100%;
    color: #00cfbc; 
    font-size: 14px;
    font-weight: bold;
    font-family: "Helvetica Neue",Helvetica,"Apple SD Gothic Neo",AppleGothic,Dotum,Arial,Tahoma;
`

const ItemHover = ({ details }) => {
    //console.log(details.description);
    let stats =[];
    if (parseInt(details.description[0])) {
        const regexPassives = /(?:[A-Z]?[a-z]*:)/g;
        console.log(details.description);
        const statsStr = details.description.slice(0, details.description.search(regexPassives));
        //console.log(statsStr);
        const regexStats = /(?<=[a-z])\d/;
        console.log(statsStr);
        let numStats = statsStr.split(0, statsStr.search(regexStats)).length;
        //stats = statsStr.split(0, statsStr.search(/\d+\D*/gm));
        stats = statsStr.match(/\d+\D*/gm);

    }
    return (
        <HoverContainer>
            <Span>
                <Name>{details.name}</Name>
            </Span>
            <Span>
                <Label>{details.plaintext}</Label>
            </Span>
            <Span>
                {stats.map((st, index)=>{
                    return <Label>{st}</Label>
                })}
            </Span>
            <Span>
                <Label>Passive</Label>
            </Span>
            <Span>
                <Label>{'Price(sellPrice)'}</Label>
            </Span>
        </HoverContainer>
    )
}

export default ItemHover