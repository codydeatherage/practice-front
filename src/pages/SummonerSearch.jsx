import { useEffect, useState } from 'react'
import styled from 'styled-components'
import api from '../api'

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

    const handleSearch = async () =>{
        await api.searchByName(name).then((res)=>{
            console.log(`${name} id: ${res.data.data}`);
        });
    }

    return (
        <Wrapper>
            <Title>Enter summoner name</Title>

            <Label>Name: </Label>
            <InputText
                type="text"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
            />
            <Button onClick={()=>handleSearch()}>Search</Button>
            <CancelButton href={'/search'}>Cancel</CancelButton>
        </Wrapper>
    )
}
export default SummonerSearch