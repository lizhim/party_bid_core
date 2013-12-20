function Activity(activity_name) {
    this.name = activity_name;
    this.id = Activity.id();
}

Activity.prototype.create = function () {
    var activities_json = JSON.parse(localStorage.activities);
    activities_json.push(this);
    localStorage.setItem("activities", JSON.stringify(activities_json))
    localStorage.current_activity = "0";
    localStorage.activity_id_generator = "3"
}

Activity.id = function () {
    var activities_json = JSON.parse(localStorage.activities);
    var counter = activities_json.length
    localStorage.setItem("counter", JSON.stringify(counter))
    return localStorage.getItem("counter");
}

Activity.get_current_activity = function () {
    return localStorage.getItem("current_activity")
}

Activity.get_current_bid = function () {
    return localStorage.getItem("current_bid")
}
