
const usersService = require('../services/users-service');
const jwt = require('jsonwebtoken');

exports.login = async function (req, res, next) {

    const input = {
        email: req.body.email,
    }

    let result = await usersService.checkIfExists(input);

    if(result.length){
        const user = result[0];
        const check = await usersService.comparePassword(req.body.password, user.password);

        if(check){
            res.json(prepareUser(user));
        }
        else{
            res.status(403);
            res.json({error: 'Wrong Password!'})
        }
    }
    else{
        res.status(403);
        res.json({error: 'No such email!'})
    }
}

exports.register = async function (req, res, next) {

    const input = {
        name: req.body.name,
        email: req.body.email,
        password: await usersService.cryptPassword(req.body.password),
    }

    const alreadyRegistered = await usersService.checkIfExists(input);

    if(alreadyRegistered.length){
        res.status(403);
        res.json('The user is already registered');
    }
    else{
        const result = await usersService.register(input);
        let user = await usersService.getById(result.insertId);
        res.json(prepareUser(user));
    }

}

function prepareUser(user){
    delete(user.password);
    user.apiToken = generateAccessToken(user);
    return user;
}

function generateAccessToken(user) {
    return jwt.sign({id: user.id}, process.env.TOKEN_SECRET, { expiresIn: 60*60 });
}
