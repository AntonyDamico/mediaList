import Responses from "../core/Responses";

class Middleware {

    isLoggedIn (req, res, next) {
        if(req.session.userId) return next();
        res.redirect('/auth/login')
    }

    isValidRequest(req, res, next) {
        if(Middleware.includesMovieOrShow(req)) return next();
        Responses.failed(res, null, 'fix the url');
        // res.redirect('/auth/login')
    }

    static includesMovieOrShow(req) {
        return ['movie', 'show'].includes(req)
    }

}

export default new Middleware();
