export class UserDetails {
    constructor(
        public id: string,
        public email: string,
        public name: string,
        public mobile: number,
        public address1: string,
        public address2: string,
        public pincode: number,
        public city: string,
        public gender: string,
        public role: string,
        public isActive: boolean,
    ) { }

}