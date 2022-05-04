
const usersService = require('../services/users-service');
const jwtHelper = require('../helpers/jwt-helper');
var nodemailer = require('nodemailer');

exports.login = async function (req, res, next) {

    let user = await usersService.getByEmail(req.body.email);

    if(user){
        const check = await usersService.comparePassword(req.body.password, user.password);

        if(check){
            res.json(prepareUser(user));
        }
        else{
            res.status(403);
            res.json({error: 'Wrong Password'})
        }
    }
    else{
        res.status(403);
        res.json({error: 'The user is not registered. Register your account first'})
    }
}

exports.register = async function (req, res, next) {

    const email = req.body.email;

    const alreadyRegistered = await usersService.getByEmail(email);

    if(alreadyRegistered){
        res.status(403);
        res.json('The user is already registered');
    }
    else{
        const input = {
            name: req.body.name,
            email: email,
            password: await usersService.cryptPassword(req.body.password),
        }

        const result = await usersService.register(input);
        let user = await usersService.getById(result.insertId);

        await sendWelcomeEmail(req.body.name, email);

        res.json(prepareUser(user));
    }

}

function createHtml(name, email){
    return `
<div style="background: #eee; padding: 30px 20px;">
<div style="
border: 1px solid #ddd; 
max-width: 550px; 
background: white; 
margin: 0 auto;
padding: 10px 20px;
">
<p>Hi ` + name + `,</p>
<p>Thanks for creating your account ` + email + ` with us!</p>
<p>If you need any help from us, please call or send us an email anytime.</p>
<hr>
<p>UIST</p>
<div style="text-align: center;">
<a target="_blank" href="https://google.com">Our Website</a>
</div>
</div>
</div>
    `;
}

async function sendWelcomeEmail(name, email){

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_CODE
        }
    });

    const result = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thanks for joining us!',
        html: createHtml(name, email)
    });

}

function prepareUser(user){
    delete(user.password);
    user.apiToken = jwtHelper.generateAccessToken(user);
    return user;
}
