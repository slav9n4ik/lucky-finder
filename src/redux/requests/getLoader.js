import axios from "axios";

function getLoaderData() {
    return axios.get(`../loader`)
        .then(response => {
            return response.data
        });
}

export {getLoaderData}