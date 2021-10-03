import Link from "next/link";
import { useEffect } from "react"
import buildClient from "../../api/build-client"
const CompanyProfile = ({ name, location, logo }) => {

    // useEffect(() => {
    //     effect
    //     return () => {
    //         cleanup
    //     }
    // }, [input])
    return <section className="dashboard bg-light" >
        <div className="container-xxl">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-5">
                    Profile info here
                    Name: {name}
                    Location : {location}
                    <img src={`data:image/jpeg;base64,${logo}`} alt="logo" />
                </div>
                <div className="col-6">
                    <Link href="/company/update-profile">
                        <a className="btn btn-primary">Update Profile</a>
                    </Link>
                </div>

            </div>
        </div>
    </section >
}
CompanyProfile.getInitialProps = async (context) => {

    const client = buildClient(context);
    const { data } = await client.get("/api/company/profile");
    return data;
}
export default CompanyProfile;