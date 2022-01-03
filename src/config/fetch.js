import axios from '../plugins/axios'
export default async(url, data = {}, type = "GET") => {
    let http = "http://120.79.167.83:6789" + url
    if (type == "GET") {
        return axios.get(http, { params: data })
    }
    return axios.post(http, data)
}