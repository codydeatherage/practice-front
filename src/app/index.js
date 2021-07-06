import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { PlayerData, MoviesInsert, MoviesUpdate, SummonerSearch } from '../pages/index'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                {/* <Route path="/movies/list" exact component={MoviesList} /> */}
                <Route path="/movies/create" exact component={MoviesInsert} />
                <Route
                    path="/movies/update/:id"
                    exact
                    component={MoviesUpdate}
                />
                <Route path="/search" exact component={SummonerSearch} />
                <Route path={'/search/:name'} exact component={PlayerData} />
            </Switch>
        </Router>
    )
}

export default App