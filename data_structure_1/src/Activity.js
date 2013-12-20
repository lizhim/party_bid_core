function Activity(activity_name) {
    this.name = activity_name;
    this.sign_ups = [];
    this.bids = [];
}

Activity.prototype.create = function () {
    var activity_array = JSON.parse(localStorage.getItem("activities"));
    activity_array.push(this);
    localStorage.setItem("activities", JSON.stringify(activity_array))
}

Activity.prototype.active = function () {
    localStorage.setItem("current_activity", this.name)
}

Activity.get_current_activity = function () {
    return localStorage.getItem("current_activity")
}

Activity.get_current_bid = function () {
    return localStorage.getItem("current_bid")
}

