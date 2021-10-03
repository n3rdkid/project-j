import { useState } from "react";
import Link from "next/link"
import Router from "next/router"
import useRequest from "../../hooks/use-request";

const ResetPassword = ({ token }) => {
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");

    const { doRequest, errors } = useRequest({
        url: "http://localhost:5000/api/users/reset",
        method: "post",
        body: {
            token,
            confirmPassword,
            password
        },
        onSuccess: () => {
            Router.push("/auth/sign-in")
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
                <label>New Password </label>
                <input
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    type="password"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Confirm Password </label>{" "}
                <input
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                    }}
                    type="password"
                    className="
                    form-control"
                />
            </div>
            {errors}
            <div className="form-row">
                <button className="col-4 btn btn-primary" type="submit"> Change Password </button>
                <button className="offset-1 col-4 btn btn-outline-dark" onClick={() => {
                    setPassword("");
                    setConfirmPassword("");
                }} type="reset"> Cancel </button>
            </div>
        </form>
    </div>
}
export default ResetPassword;