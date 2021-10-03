const { default: ContactUs } = require("../components/contact-form")

const ContactForm = () => {
    return <section className="contact-form bg-light">
        <div className="container-xxl">
            <p className="pre-title text-center">Get in touch</p>
            <h3 className="title text-center">Please get in touch, we'd love to hear from you</h3>

            <div className="row justify-content-center align-items-end">
                <div className="col-md-8 col-lg-6">
                    <ContactUs />
                </div>
                <div className="col-lg-5">
                    <div className="map-wrapper">
                        <p className="map-pitch">Visit Us</p>
                        <p className="map-lead">Our doors are always open. Feel free to visit us for a quick meeting.</p>
                        <iframe className="map" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7064.329506488532!2d85.309246!3d27.712199!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fdc76658b9%3A0x6c9793caa23b502b!2sChhetrapati%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1600570564281!5m2!1sen!2snp"></iframe>
                        <div className="form-social-buttons">
                            <p className="follow">Follow us :</p>
                            <div className="d-flex social-buttons">
                                <a target="_blank" href="https://www.facebook.com/rojgariboard" className="social--facebook"><i className="fa fa-facebook"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section >
}

export default ContactForm;