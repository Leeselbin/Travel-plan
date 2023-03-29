import { AxiosResponse } from "axios";

class CustomError extends Error {
    response?: AxiosResponse;

    constructor(message: string, response?: AxiosResponse) {
        super(message);
        this.name = 'CustomError';
        this.response = response;
    }
}

export default CustomError;