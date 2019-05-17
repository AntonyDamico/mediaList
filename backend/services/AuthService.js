class AuthService {

    static login(user, password) {
        return knex('user')
            .where('username', user)
            .where('password', password)
    }

    static register(username, email, password) {
        const userObj = {email, username, password};
        return knex('user').insert(userObj);
    }
}

export default AuthService;
