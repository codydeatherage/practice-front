import { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
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

const PlayerData = () => {
    let { name } = useParams();
    const [names, setNames] = useState(name);
    const mounted = useRef();
    const [matchList, setMatchList] = useState([]);
    const [ready, setReady] = useState(false);
    const handleSearch = async () => {
        console.log('name searched', name);
        setReady(false);
        await api.searchByName(name).then((res) => {
            setMatchList(res.data.data);
            console.log(`${name} id: ${res.data.data[0]}`);
        })
    }

    const search = () => {
        setMatchList([]);
    }

    useEffect(() => {
        let a = async () => {
            console.log(`names: ${names} | name:${name} | prevmount:${namesRef} | currmount:${mounted.current}`);
            mounted.current = name;
            setNames(mounted.current);
            await handleSearch();
        }
        if(mounted.current !== name){
            a();
        }
        else if(matchList.length > 0){
            setReady(true);
        }
    }, [matchList])

    const namesRef = mounted.current;
    return (
        <Wrapper>
            {matchList.length > 0 && ready ? <MatchList matchList={matchList} res={10} search={search} /> : <div>Loading...</div>}
        </Wrapper>
    )
}
export default PlayerData