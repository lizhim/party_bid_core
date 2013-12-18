function SignUp(name,phone){
    this.name=name;
    this.phone=phone;
}
SignUp.render_sign_ups=function(current_activity){
    var activities = JSON.parse(localStorage.activities);
    var activity = _.find(activities, function (list) {
        return list.name == current_activity;
    })
        return activity.sign_ups;
}
