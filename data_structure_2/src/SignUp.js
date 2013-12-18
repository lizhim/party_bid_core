function SignUp(name,phone){
    this.name=name;
    this.phone=phone;
}
SignUp.render_sign_ups=function(current_activity){
    var activities = JSON.parse(localStorage.activities);
    var current_activity=JSON.parse(localStorage.current_activity)
    return activities[current_activity].sign_ups;
}
