const { default: axiosClient } = require("./axiosClient");

const classApi = {
    getAll: () => {
        const url = '/classes';
        return axiosClient.get(url)
    },
    getById: (id) => {
        const url = `/classes/${id}`;
        return axiosClient.get(url, {id});
    }
}

export default classApi;