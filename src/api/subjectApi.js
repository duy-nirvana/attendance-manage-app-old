const { default: axiosClient } = require("./axiosClient");

const subjectApi = {
    getAll: () => {
        const url = '/subjects';
        return axiosClient.get(url)
    },
    findOne: (searchString) => {
        const url = `/subjects/search?subject=${searchString}`;
        return axiosClient.get(url);
    }
}

export default subjectApi;