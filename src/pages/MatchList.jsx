import { useEffect, useState } from 'react'
import styled from 'styled-components'
import MatchListItem from './MatchListItem'

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    border: 2px solid black;
    /* margin: 0 10px; */
`
const LoadButton = styled.button.attrs({
    className: `btn btn-success`,
})`
    width: 100%;
    height: 5vh;
`

const Label = styled.label`
    margin: 5px;
`

const MatchList = ({ matchList }) => {
    //initialized at 9 so 10 results are shown i.e. matchList[0:9]
    const [results, changeResults] = useState(9);

    const loadNext10Results = () => {
        if (results + 10 <= 99) {
            changeResults(results + 10);
        }
    }

    return (
        <Wrapper>
            {
                matchList.map((match, index) => {
                    if (index <= results) {
                        return <MatchListItem match={match} />
                    }
                })
            }
            <LoadButton onClick={() => { loadNext10Results() }}>Load more</LoadButton>
        </Wrapper>
    )
}
export default MatchList