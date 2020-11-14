const { default: axiosClient } = require("./axiosClient");

const userApi = {
    getAll: (params) => {
        const url = '/users';
        return axiosClient.get(url, { params });
    }
}

export default userApi;