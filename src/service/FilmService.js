import {action, makeObservable} from "mobx";
import axios from "axios"

const baseURL = "http://www.omdbapi.com/?apikey=a1fd6e89";

class FilmService{

    constructor() {
        makeObservable(this, {
            getFilms : action,
        });
    }

    async getFilms (params,page) {
        console.log(params)
        let searchParams = {
            type: params.type,
            y: params.year ,
            s:  params.film,
            page: page
        }
        let response = await axios.get(baseURL, { params: searchParams});
            if(response) {
                return response.data
            }
    }
    async getDetails (id) {
        let res = await axios.get(baseURL, { params: {i : id}});
        if(res) {
            return res.data
        }
    }


}

export default new FilmService();