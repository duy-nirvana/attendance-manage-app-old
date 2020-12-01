const { default: axiosClient } = require("./axiosClient");

const historyApi = {
    getAll: () => {
        const url = '/history';
        return axiosClient.get(url)
    },
    getUser: (id) => {
        const url = `/history/user/${id}`;
        return axiosClient.get(url, {id});
    },
    createOne: (body) => {
        const url = '/history/create';
        return axiosClient.post(url, body);
    }
}

export default historyApi;