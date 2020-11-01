
import axios from "axios";
import { useState } from "react";


axios.defaults.withCredentials = true;
const useRequest = ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null)
    const doRequest = async () => {
        try {
            const { data } = await axios[method](url, body)
            if (onSuccess) {
                onSuccess(data);
            }
            return data;
        } catch (err) {
    
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