export class User {

    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date,
    ) { }

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null
        }
        return this._token;
    }

    // constructor(
    //     id: string,
    //     name: string,
    //     password: string,
    //     mobile: number,
    //     address1: string,
    //     address2: string,
    //     pincode: number,
    //     city: string,
    //     gender: string,
    //     role: string,
    //     isActive: boolean,
    // ) { }
}