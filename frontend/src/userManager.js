//Class to manage User - login state
var userLoginState, userVerificationState = false
var userID = ""
var userMail = ""

function getUserLoginState(){
    return this.userLoginState
}

function setUserLoginState(boo){

    if (typeof boo != "boolean" ){
        console.error("Parameter was not a boolean - LoginState not updated!")
    }
    else this.userLoginState = boo
}

function getUserVerificationState(){
    return this.userVerificationState
}

function setUserVerificationState(boo){
    if (typeof boo != "boolean"){
        console.error("Parameter was not a boolean - VerificationState not updated!")
    }
    else this.userVerificationState = boo
}

function getUserID(){
    return this.userID
}

function setUserID(uid){
    if(typeof uid != "string"){
        console.error("uid was not a string - uid not updated!")
    }
    else this.userID = uid
}

function getUserMail() {
    return this.userMail
}

function setUserMail(userMail){
    if(typeof userMail != "string"){
        console.error("userMail was not a string - userMail not updated")
    }
    else
        this.userMail = userMail
}


export {setUserID, setUserLoginState, setUserVerificationState, setUserMail, getUserID, getUserLoginState, getUserVerificationState, getUserMail}