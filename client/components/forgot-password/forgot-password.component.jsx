import { useState } from "react";
import useRequest from "../../hooks/use-request";

const ForgotPassword = ({ }) => {
    const [email, setEmail] = useState("");

    const { doRequest, errors } = useRequest({
        url: "http://localhost:5000/api/users/forgot",
        method: "post",
        body: {
            email,
        },
        onSuccess: () => {
           alert("Done")
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        doRequest();
    }
    return <div className="form-content">
        <h2 className="form-title">Reset Password</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label> Email </label>
                <input
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    type="email"
                    className="form-control"
                />
            </div>
            {errors}
            <div className="form-row">
                <button className="col-4 btn btn-primary" type="submit"> Submit</button>
                <button className="offset-1 col-4 btn btn-outline-dark" onClick={() => {
                    setEmail("");
                }} type="reset"> Reset </button>
            </div>
        </form>
    </div>
}
export default ForgotPassword;