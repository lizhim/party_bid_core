function Activity(activity_name) {
    this.name = activity_name;
    this.sign_ups = [];
    this.bids = [];
    this.biddings = {};
}

Activity.prototype.create = function () {
    var activities_json = JSON.parse(localStorage.activities);
    var activity_ids = JSON.parse(localStorage.activity_ids);
    var counter = activity_ids.length;
    activities_json[counter] = (this)
    localStorage.setItem("activities", JSON.stringify(activities_json))
    localStorage.setItem("counter", JSON.stringify(counter))
    activity_ids[counter] = localStorage.getItem("counter");
    localStorage.setItem("activity_ids", JSON.stringify(activity_ids));
    localStorage.current_activity = "0";
    localStorage.activity_id_generator = "3";
}

Activity.get_current_activity = function () {
    return localStorage.getItem("current_activity")
}

Activity.get_current_bid = function () {
    return localStorage.getItem("current_bid")
}


