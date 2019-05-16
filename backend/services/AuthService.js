class AuthService {

    static login(user, password) {
        return knex('user')
            .where('username', user)
            .where('password', password)
    }
}

export default AuthService;
