class AuthenticationService  {
   
    onLoginSuccess(username) {
        console.log("adding username to session storage");
        sessionStorage.setItem("authenticatedUser" , username);
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
}


export default new AuthenticationService();