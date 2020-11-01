import "bootstrap/dist/css/bootstrap.min.css"
import "../scss/style.scss"
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import buildClient from "../api/build-client";
// All componets will pass through this component
const AppComponent = ({ Component, pageProps, currentUser }) => {
    return <>
        <Navbar currentUser={currentUser} />
        <Component {...pageProps} />
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/js/bootstrap.bundle.min.js" integrity="sha384-BOsAfwzjNJHrJ8cZidOg56tcQWfp6y72vEJ8xQ9w6Quywb24iOsW913URv1IS4GD" crossorigin="anonymous"></script>
        <Footer currentUser={currentUser} />
        
    </>
}

//Outside of pages in next we get (Component,ctx:{req,res}) for getInitialProps()
AppComponent.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get("/api/users/current-user");
    //pageProps of child component
    let pageProps = {};
    //Calling getInitialProps() of child components
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    return { ...data, pageProps };
};


export default AppComponent;