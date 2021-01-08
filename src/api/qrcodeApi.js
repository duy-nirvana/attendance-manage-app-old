const { default: axiosClient } = require("./axiosClient");

const qrcodeApi = {
    getById: (id) => {
        const url = `/qrcode/${id}`;
        return axiosClient.get(url, {id});
    },
    getByUserId: (id) => {
        const url = `/qrcode/user/${id}`;
        return axiosClient.get(url, {id});
    },
    createOne: (body) => {
        const url = '/qrcode/create';
        return axiosClient.post(url, body);
    },
    updateById: (id) => {
        const url = `/qrcode/${id}`;
        return axiosClient.patch(url, {id});
    },
    updateExp: (id, body) => {
        const url = `/qrcode/exp/${id}`;
        return axiosClient.patch(url, body);
    }
}

export default qrcodeApi;