
import buildClient from "../../api/build-client"
import useRedirect from "../../hooks/use-redirect"
import SignInUser from "../../components/sign-in-user"
import SignInCompany from "../../components/sign-in-company"
const SignInPage = () => {
    return <section className="user-form bg-light" >
        <div className="container-xxl">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-5">
                    <SignInUser />
                </div>
                <div className="col-6">
                    <SignInCompany />
                </div>
            </div>
        </div>
    </section >
}
SignInPage.getInitialProps = async (context) => {

    const client = buildClient(context);
    const { data } = await client.get("/api/users/current-user");
    // If user is already logged in redirect user
    if (data.currentUser) {
        useRedirect({ context, href: "/" })
    }
    return data;
}


export default SignInPage;