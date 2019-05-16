import AuthService from '../services/AuthService';

class AuthController {

    static loginPage(req, res) {
        const message = req.query.message;
        res.render('login', {message});
    }

    static async login(req, res) {
        const user = req.body.username;
        const password = req.body.password;
        const userData = await AuthService.login(user, password);

        if(!userData[0]) res.redirect('/auth/login?message=usuario+o+password+equivocados');
        res.send('good')
    }
}

export default AuthController;
