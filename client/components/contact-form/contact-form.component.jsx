
import { useState } from "react";
import useRequest from "../../hooks/use-request";
const ContactForm = ({ isSignedIn, userEmail, userName }) => {
    const [email, setEmail] = useState(userEmail || "");
    const [name, setName] = useState(userName || "");
    const [message, setMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        await doRequest();

    }
    const { doRequest, errors, setErrors } = useRequest({
        url: "http://localhost:5000/api/support/",
        method: "post",
        body: {
            email,
            name,
            message
        },
        onSuccess: () => {
            setErrors(null);
            alert("Done")
            setEmail("");
            setName("");
            setMessage("");
        }
    });

    return <div className="form-content">
        {errors}
        <form onSubmit={handleSubmit}>
            <p className="form-pitch">Don't be shy</p>
            <p className="form-lead">We are happy to answer your queries. Leave us some information and we'll be in touch within one business day.</p>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" onChange={(e) => { setName(e.target.value) }} className="form-control" id="name" placeholder="John Doe" value={name} />
                <div className="valid-feedback">
                    Looks good!
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} value={email} className="form-control" id="email" placeholder="john@doe.com" />
                <div className="valid-feedback">
                    We will not share your email with anyone.
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea value={message} onChange={(e) => {
                    setMessage(e.target.value)
                }} className="form-control" id="message" rows="3"></textarea>
                <div className="invalid-feedback">
                    Looks good!
                 </div>
            </div>
            <button className="btn btn-primary" type="submit">Send Message</button>
        </form>
    </div>
}

export default ContactForm;