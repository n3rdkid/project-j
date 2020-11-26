import { useState } from "react";
import Link from "next/link"
import Router from "next/router"
import useRequest from "../../hooks/use-request";

const SignUpUser = ({ }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { doRequest, errors } = useRequest({
        url: "http://localhost:5000/api/users/signup",
        method: "post",
        body: {
            email,
            password
        },
        onSuccess: () => {
            Router.push("/")
        }
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        doRequest();
    }
    return <div className="form-content">
        <h2 className="form-title">Sign Up</h2>
        <form onSubmit={handleSubmit}>

            <div className="form-group">
                <label> Email Address </label>
                <input
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    type="email"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label> Password </label>{" "}
                <input
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    type="password"
                    className="form-control"
                />
            </div>
            {errors}

            <div className="form-row">
                <button className="col-4 btn btn-primary" type="submit"> Sign up </button>
                <button className="offset-1 col-4 btn btn-outline-dark" onClick={() => {
                    setEmail("");
                    setPassword("");
                }} type="reset"> Reset </button>
            </div>
            <div className="form-group">
                <div>Already have an account ? <Link href="/auth/sign-in"><a>Sign In</a></Link></div>
            </div>
        </form>
    </div>
}
export default SignUpUser;