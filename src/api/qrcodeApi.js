const { default: axiosClient } = require("./axiosClient");

const qrcodeApi = {
    createOne: (body) => {
        const url = '/qrcode/create';
        return axiosClient.post(url, body)
    }
}

export default qrcodeApi;