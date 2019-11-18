class User {
    constructor(_user) {
        this.id = _user.id;
        this.username = _user.username;
        this.email = _user.email;
        this.zip_code = _user.zip;
    }
}

module.exports = User;