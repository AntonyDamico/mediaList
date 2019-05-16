

class AuthController {

    static loginPage (req, res) {
        res.render('login');
    }

    static async login(req, res){
        const user = req.body.username;
        const password = req.body.password;
    }
}

export default AuthController;
