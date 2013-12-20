function SignUp(name, phone, current_activity) {
    this.name = name;
    this.phone = phone;
    this.activity_id = current_activity;
}

SignUp.render_sign_ups = function (current_activity) {
    var sign_ups = JSON.parse(localStorage.sign_ups);
    var activity = _.filter(sign_ups, function (list) {
        return list.activity_id == current_activity
    })
    return activity;
}
