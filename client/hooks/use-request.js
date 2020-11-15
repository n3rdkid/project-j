
import axios from "axios";
import { useState } from "react";


axios.defaults.withCredentials = true;
const useRequest = ({ url, method, body, onSuccess, params }) => {
    console.log("PARAMS", params)
    const [errors, setErrors] = useState(null)
    const doRequest = async () => {
        try {
            const { data } = await axios.request({ method, url, body, params })
            if (onSuccess) {
                onSuccess(data);
            }
            return data;
        } catch (err) {
            console.log(err)

            const errs = err.response.data.errors;
            setErrors(<div className="alert alert-danger">
                <ul className="my-0 list-unstyled">
                    {errs.map(error => <li key={error.message}>{error.message}</li>)}
                </ul>
            </div>)
        }

    }
    return { doRequest, errors };
}
export default useRequest;