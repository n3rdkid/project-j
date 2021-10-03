
import buildClient from "../../api/build-client"
import useRedirect from "../../hooks/use-redirect"
import SignUpCompany from "../../components/sign-up-company"
import SignUpUser from "../../components/sign-up-user"
const SignUpPage = () => {
    return <section className="user-form bg-light" >
        <div className="container-xxl">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-5">
                    <SignUpUser />
                </div>
                <div className="col-6">
                    <SignUpCompany />
                </div>
            </div>
        </div>
    </section >
}
SignUpPage.getInitialProps = async (context) => {

    const client = buildClient(context);
    const { data } = await client.get("/api/users/current-user");
    // If user is already logged in redirect user
    if (data.currentUser) {
        useRedirect({ context, href: "/" })
    }
    return data;
}


export default SignUpPage;