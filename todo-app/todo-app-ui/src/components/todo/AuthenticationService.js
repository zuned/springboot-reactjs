import axios from 'axios'

class AuthenticationService  {
   
    onLoginSuccess(username, password) {
        console.log("adding username to session storage");
        sessionStorage.setItem("authenticatedUser" , username);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem("authenticatedUser", username)
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    executeJwtAuthenticationService(username, password) {
        let serverUrl = 'http://localhost:8080';
        return axios.post(`${serverUrl}/authenticate`, {
            username,
            password
        })
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }


    // executeBasicAuthenticationService(username ,password) {
    //     let serverUrl = 'http://localhost:8080'
    //     return axios.get(`${serverUrl}/basicauth`,
    //         { headers: { authorization: this.createBasicAuthToken(username, password) } })
    // }

    // createBasicAuthToken(username, password) {
    //     return 'Basic ' + window.btoa(username + ":" + password)
    // }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isAuthenticated()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }

    clearSessionOnLogout() {
        console.log("removing username to session storage")
        sessionStorage.removeItem("authenticatedUser");
    }

    isAuthenticated(){
        let user = sessionStorage.getItem("authenticatedUser");
        if(user=== null)return false;
        return true;
    }

    getLoggedInUsername() {
        let user = sessionStorage.getItem("authenticatedUser");
        if(user=== null)return '';
        return user;
    }
}


export default new AuthenticationService();