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

        if (!userData[0]) res.redirect('/auth/login?message=usuario+o+clave+equivocados');

        req.session.userId = userData[0].id;
        res.redirect('/');
    }

    static registerPage(req, res) {
        let message = req.query.message;
        res.render('register', {message});
    }

    static async register(req, res) {
        const user = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        if (!AuthController.validateEmail(email)) res.redirect('/auth/register?message=correo+no+valido');

        if(!AuthController.validatePassword(password)) res.redirect('/auth/register?message=la+clave+debe+tener+por+lo+menos+una+letra+mayúscula+una+minúscula+y+un+número')
        if (password !== confirmPassword) {
            res.redirect('/auth/register?message=las+contraseñas+deben+coincidir');
            return;
        }

        const userData = await AuthService.register(user, email, password);

        res.redirect('/auth/login');
    }

    static logout(req, res) {
        req.session.destroy();
        res.redirect('/');
    }

    static validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    static validatePassword(password) {
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        return re.test(String(password));
    }
}

export default AuthController;
