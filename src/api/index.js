import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertMovie = payload => api.post(`/movie`, payload)
export const getAllMovies = () => api.get(`/movies`)
export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
export const deleteMovieById = id => api.delete(`/movie/${id}`)
export const getMovieById = id => api.get(`/movie/${id}`)

export const insertSummoner = payload => api.post(`/summoner`, payload)
export const searchByName = name => api.get(`/search/${name}`)
export const getMatchData = matchId => api.get(`/search/matches/${matchId}`)

const apis = {
    insertMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById,
    searchByName,
    insertSummoner,
    getMatchData
}

export default apis