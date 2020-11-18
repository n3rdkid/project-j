
import nodemailer from 'nodemailer';

// Configuración transportador NodeMailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587 ,
  auth: { 
    user: "sauravads619@gmail.com",
    pass: "sauravsrs- "}  ,
  secure: false,
  tls: {
    rejectUnauthorized: false
  }

});

const mailOptions = {
    from: 'Talented Talents',
    to: "",
    cc: "",
    subject: "",
    html:""
};

  export {transporter,mailOptions};