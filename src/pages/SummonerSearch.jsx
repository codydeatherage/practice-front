import { useState, useEffect } from 'react'
import styled from 'styled-components'
import api from '../api'
import MatchList from './MatchList'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`
const SummonerSearch = () => {
    const [name, setName] = useState('');
    const [matchList, setMatchList] = useState([]);
    const [ready, setReady] = useState(false);
    const [fullName, setFullName] = useState('');

    const handleSearch = async () => {
        let n = '';
        if(name === '' && fullName){
            n = fullName;
        }
        else if(name !== ''){
            n = name;
        }
        await api.searchByName(n).then((res) => {
            console.log('set ready');
            setMatchList(res.data.data);
            setReady(true);
            console.log(`${n} id: ${res.data.data[0]}`);
        });
    }

  /*   useEffect(async () => {
       setMatchList([]);
    }, [name]) */

    return (
        <Wrapper>
            <Title>Enter summoner name</Title>
            <Label>Name: </Label>
            <InputText
                type="text"
                value={fullName}
                onChange={(e) => { setFullName(e.target.value) }}
            />
            <Button onClick={async () => {
                setName(fullName);
                if (fullName !== name) {
                    setMatchList([]);
                }
                await handleSearch();
            }
            }>Search</Button>
            <CancelButton href={'/search'}>Cancel</CancelButton>
            {matchList && ready ? <MatchList matchList={matchList} res={10} name={name} /> : null}
        </Wrapper>
    )
}
export default SummonerSearch