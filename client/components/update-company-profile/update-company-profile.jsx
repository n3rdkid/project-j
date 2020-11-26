import axios from "axios";
import { useState } from "react";
import useRequest from "../../hooks/use-request";

const UpdateCompanyProfile = ({ name, location, logo }) => {
    const [companyLocation, setLocation] = useState(location);
    const [companyName, setName] = useState(name);
    const [companyLogo, setLogo] = useState(logo)
    const { doRequest, errors } = useRequest({
        url: "http://localhost:5000/api/company/profile",
        method: "put",
        body: {
            location: companyLocation,
            name: companyName,
            logo: companyLogo
        },
        onSuccess: () => {
            Router.push("/")
        }
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        doRequest();
    }
    const handleLogoUpdate = async (e) => {
        e.preventDefault();

        // axios.defaults.withCredentials = true;
        let formData = new FormData();
        formData.append('logo', companyLogo);
        const response = await axios.post("http://localhost:5000/api/company/profile/logo", formData, {
            headers: {
                'content-type': 'multipart/form-data'
            },
            withCredentials: true,
        })
        console.log("Response", response)
    }

    return <div className="form-content">
        <h2 className="form-title">Update Up</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label> Company Name </label>{" "}
                <input
                    value={companyName}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    type="text"
                    className="
                    form-control"
                />
            </div>
            <div className="form-group">
                <label> Company Location </label>{" "}
                <input
                    value={companyLocation}
                    onChange={(e) => {
                        setLocation(e.target.value);
                    }}
                    type="text"
                    className="
                    form-control"
                />
            </div>
            <div className="form-row">
                <button className="col-4 btn btn-warning" type="submit"> Update Profile </button>
                <button className="offset-1 col-4 btn btn-outline-dark" onClick={() => {
                    setName(name);
                    setLocation(location);
                }} type="reset"> Reset </button>
            </div>
            {errors}

        </form>
        <form onSubmit={handleLogoUpdate} method="POST">
            <div className="form-group">
                <label> Logo </label>{" "}
                <input
                    onChange={(e) => {
                        setLogo(e.target.files[0]);
                    }}
                    name="logo"
                    type="file"
                    className="form-control"
                />
            </div>
            <div className="form-row">
                <button className="col-4 btn btn-warning" type="submit"> Update Logo </button>
            </div>
        </form>

    </div>
}
export default UpdateCompanyProfile;