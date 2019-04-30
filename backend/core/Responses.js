class Responses {

    static successfulResponse(res, data = null, message = null) {
        message = message === null ? 'Request Successful' : message;
        res.status(200).send({message, data})
    }

    static failedResponse(res, error = null, message = null) {
        message = message === null ? 'Request Failed' : message;
        console.log(error);
        res.status(400).send({message})
    }
}

export default Responses
