
import buildClient from "../../api/build-client"
import UpdateCompanyProfile from "../../components/update-company-profile"
const UpdateProfilePage = (data) => {
    return <section className="user-form bg-light" >
        <div className="container-xxl">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-5">
                    <UpdateCompanyProfile {...data} />
                </div>
                <div className="col-6">
                </div>
            </div>
        </div>
    </section >
}
UpdateProfilePage.getInitialProps = async (context) => {

    const client = buildClient(context);
    const { data } = await client.get("/api/company/profile");
    return data;
}
export default UpdateProfilePage;