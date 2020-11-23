const { default: axiosClient } = require("./axiosClient");

const qrcodeApi = {
    createOne: (body) => {
        const url = '/qrcode/create';
        return axiosClient.post(url, body)
    },
    updateById: (id) => {
        const url = `/qrcode/${id}`;
        return axiosClient.patch(url, {id})
    }
}

export default qrcodeApi;