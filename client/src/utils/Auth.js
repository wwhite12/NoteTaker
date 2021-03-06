import axios from "axios";


function Auth() {

    function logIn(username, password, cb) {
        axios.post("/api/authenticate", { username, password })
            .then(response => {
                localStorage.setItem("token", response.data.token);
                cb(response.data);
            });
    }

    function signUp(username, password, cb) {
        axios.post("/api/signup", { username, password }).then(res => {

            cb(res);

        });
    }


    function logOut(cb) {
        localStorage.removeItem("token");
        cb();
    }

    function getToken() {
        return localStorage.getItem("token");
    }

    function isLoggedIn() {
        if (localStorage.getItem("token")) {

            return true;
        } else {

            return false;
        }
    }

    return {
        isLoggedIn,
        logIn,
        logOut,
        getToken,
        signUp
    }
}

export default Auth();