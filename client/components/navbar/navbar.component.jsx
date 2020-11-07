import Link from "next/link";
import Router from "next/router";
import useRequest from "../../hooks/use-request"


const Navbar = ({ currentUser }) => {
    const { doRequest } = useRequest({
        url: "http://localhost:5000/api/users/signout",
        method: "post",
        body: {},
        onSuccess: () => {
            Router.push("/")
        }

    })
    const links = [
        {
            label: "Home",
            href: "/"
        },
        {
            label: "Jobs",
            href: "/browse-jobs"
        },
        {
            label: "Candidates",
            href: "/"
        },
        {
            label: "Blog",
            href: "/"
        },
        {
            label: "Contact",
            href: "/"
        },
    ].map(({ label, href }) => <li key={label}>
        <Link href={href}>
            <a className="nav-link">{label}</a>
        </Link>
    </li>);
    const handleSignOut = async (e) => {
        doRequest();
    }


    return <header className="sticky-top">
        <nav id="navbar" className="navbar navbar-expand-lg navbar-light max-width">
            <Link href="/">
                <a className="navbar-brand">
                    <img className="logo" src="/images/logo.png" alt="Logo" />
                </a>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar-primary-items" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbar">
                <ul className="navbar-nav ml-auto">
                    {links}
                    {!currentUser ? <>
                        <Link href={currentUser ? '/post' : "/auth/sign-in"}>
                            <a className="btn btn-primary">Post a Job</a>
                        </Link>
                        <Link href={currentUser ? '/search' : "/auth/sign-in"}>
                            <a className="btn btn-warning">Want a Job</a>
                        </Link>
                    </> : ""}
                    {currentUser ? <>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="my-account" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                My account
  </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <Link href={"#"}>
                                    <a className="dropdown-item" href="#">Dashboard</a>
                                </Link>
                                <Link href={"#"}>
                                    <a className="dropdown-item" href="#">My Profile</a>
                                </Link>
                                <div className="dropdown-divider"></div>
                                <button className="dropdown-item" href="#" onClick={handleSignOut}>Sign Out</button>
                            </div>
                        </div>
                    </> : ""}
                </ul>
            </div>
        </nav>
    </header >
}

export default Navbar;