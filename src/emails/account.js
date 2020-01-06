const sgMail = require('@sendgrid/mail')

const fromMail = 'hoangthinh1801@gmail.com'

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: fromMail,
        subject: 'Welcome to Task manager app',
        text: `Welcome to the task manager app ${name}.`
    })

}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: fromMail,
        subject: 'Cancellation Task manager app',
        text: `Goodbye ${name}`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}