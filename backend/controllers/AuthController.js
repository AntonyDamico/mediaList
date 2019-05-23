import AuthService from '../services/AuthService';

class AuthController {

    static loginPage(req, res) {
        let message = req.query.message;
        if (req.session.userId) message = 'Ya estás logueado';
        res.render('login', {message});
    }

    static async login(req, res) {
        const user = req.body.username;
        const password = req.body.password;
        const userData = await AuthService.login(user, password);

        if (!userData[0]) res.redirect('/auth/login?message=usuario+o+password+equivocados');

        req.session.userId = userData[0].id;
        res.redirect('/');
    }

    static registerPage(req, res) {
        res.render('register');
    }

    static async register(req, res) {
        const user = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        if (password !== confirmPassword) {
            res.redirect('/auth/register?message=las+contraseñas+deben+coincidir')
            return;
        }

        const userData = await AuthService.register(user, email, password);

        res.redirect('/auth/login');
    }

    static logout(req, res) {
        req.session.destroy();
        res.redirect('/');
    }
}

export default AuthController;
