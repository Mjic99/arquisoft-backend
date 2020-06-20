const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: '300marcelero21@gmail.com',
        subject: 'Bienvenidos al himalaya!!',
        text: `Hola ${name}!, bienvenido`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: '300marcelero21@gmail.com',
        subject: 'Adiós vaquero',
        text: `${name}, estamos tristes que tengas que irte :(`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}