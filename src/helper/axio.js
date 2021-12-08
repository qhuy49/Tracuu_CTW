import axios from "axios";
var port = "";
var baseUrl = "";
if (document.location.port === "3000") {
    baseUrl = process.env.REACT_APP_PUBLIC_URL;
}
else {
    if (document.location.port != 80 && document.location.port != 445) {
        port = ":" + document.location.port.toString();
    }
    // baseUrl = document.location.protocol + "//" + document.location.hostname + port + "/api";
    baseUrl = document.location.protocol + "//" + document.location.hostname + port;
}
axios.defaults.baseURL = baseUrl;
// const baseUrl = process.env.REACT_APP_PUBLIC_URL;
const axiosInstance = axios.create({
    baseURL: baseUrl
})
export default axiosInstance;