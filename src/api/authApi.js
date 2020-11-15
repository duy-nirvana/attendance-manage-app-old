const { default: axiosClient } = require("./axiosClient");

const authApi = {
    login: (body) => {
        url = '/users/auth/login';
        return axiosClient.post(url, body)
    }
}

export default authApi;