
const usersService = require('../services/users-service');
const jwtHelper = require('../helpers/jwt-helper');

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
        res.json(prepareUser(user));
    }

}

function prepareUser(user){
    delete(user.password);
    user.apiToken = jwtHelper.generateAccessToken(user);
    return user;
}
