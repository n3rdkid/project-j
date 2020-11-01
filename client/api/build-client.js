import axios from "axios";
const buildClient = ({ req }) => {
    if (typeof window === "undefined") {
        //We are on the server
        //request should be made to 
        return axios.create({
            baseURL: 'http://localhost:5000',
            headers: req.headers
        });
    } else {
        //we are on the client
        //request should be made with base url ""
        console.log("CALLING FROM CLIENT")
        return axios.create({
            baseURL: 'http://localhost:5000',
        });
    }
}
export default buildClient;