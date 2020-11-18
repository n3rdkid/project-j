
import buildClient from "../../api/build-client"
import useRedirect from "../../hooks/use-redirect"
import ForgotPassword from "../../components/forgot-password"
const ForgotPasswordPage = () => {
    return <section className="sign-in-form bg-light" >
        <div className="container-xxl">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-5">
                    <ForgotPassword />
                </div>
                <div className="col-6">

                </div>
            </div>
        </div>
    </section >
}
ForgotPasswordPage.getInitialProps = async (context) => {

    const client = buildClient(context);
    const { data } = await client.get("/api/users/current-user");
    // If user is already logged in redirect user
    if (data.currentUser) {
        useRedirect({ context, href: "/" })
    }
    return data;
}


export default ForgotPasswordPage;