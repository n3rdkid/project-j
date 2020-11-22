import Link from "next/link";

const Footer = ({ currentUser }) => {
    const employerLinks = [
        {
            label: "Browse Candidates",
            href: "/"
        },
        {
            label: "Post a Job",
            href: "/"
        }
        ,
        {
            label: "Resume Page",
            href: "/"
        }].map(({ label, href }) => <li key={label}>
            <Link href={href}>
                <a className="footer-link">{label}</a>
            </Link>
        </li>)
    const candidateLinks = [
        {
            label: "Browse Jobs",
            href: "/browse-jobs"
        },
        {
            label: "Pinned Jobs",
            href: "/"
        }
    ].map(({ label, href }) => <li key={label}>
        <Link href={href}>
            <a className="footer-link">{label}</a>
        </Link>
    </li>)
    const accountLinks = [
        {
            label: "Dashboard",
            href: "/"
        },
        !currentUser && {
            label: "Create Account",
            href: "/auth/sign-up"
        },
        {
            label: "My Account",
            href: "/"
        }, !currentUser && {
            label: "Sign in",
            href: "/auth/sign-in"
        },

    ].filter(linkConfig => linkConfig).map(({ label, href }) => <li key={label}>
        <Link href={href}>
            <a className="footer-link">{label}</a>
        </Link>
    </li>)
    return (
        <footer>
            <div className="container-xxl">
                <div className="row">
                    <div className="col-sm-6 col-lg-4">
                        <div className="footer-col">
                            <h2 className="footer-heading">RojgariBoard</h2>
                            <p>RojgariBoard is a digital recruitment platform built to help recruit the best candidates for your open positions.</p>
                            <ul className="footer-social list-unstyled">
                                <li><a href="#"><i className="fa fa-faceboot"></i></a></li>
                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg">
                        <div className="footer-col">
                            <h2 className="footer-heading">Employers</h2>
                            <ul className="list-unstyled">
                                {employerLinks}
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg">
                        <div className="footer-col">
                            <h2 className="footer-heading">Candidates</h2>
                            <ul className="list-unstyled">
                                {candidateLinks}
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg">
                        <div className="footer-col">
                            <h2 className="footer-heading">Account</h2>
                            <ul className="list-unstyled">
                                {accountLinks}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p className="text-center">Copyright &copy; SkillNepal Pvt. Ltd. {new Date().getFullYear()} All rights reserved | Powered by <a className="text-decoration-none" href="https://peuconomia.com/">Peuconomia International Pvt. Ltd.</a> </p>
            </div>
        </footer>
    )
}

export default Footer;
