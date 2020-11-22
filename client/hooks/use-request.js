
import axios from "axios";
import { useState } from "react";


axios.defaults.withCredentials = true;
const useRequest = ({ url, method, body, onSuccess, params }) => {
    const [errors, setErrors] = useState(null)
    const doRequest = async () => {
        try {
            const { data } = await axios({ method, url, data: body, params })
            if (onSuccess) {
                onSuccess(data);
            }
            return data;
        } catch (err) {
            if (err.response) {
                const errs = err.response.data.errors;
                setErrors(<div className="alert alert-danger">
                    <ul className="my-0 list-unstyled">
                        {errs.map(error => <li key={error.message}>{error.message}</li>)}
                    </ul>
                </div>)
            }
        }

    }
    return { doRequest, errors, setErrors };
}
export default useRequest;