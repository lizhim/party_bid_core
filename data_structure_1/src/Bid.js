function bid(name) {
    this.name = name;
    this.biddings = [];
}

bid.create_new_bid = function (activity_name) {
    var activities = JSON.parse(localStorage.getItem("activities")) || [];
    var bid = _.map(activities, function (list) {
        if (list.name == activity_name) {
            var counter = list.bids.length + 1;
            var name = "竞价" + counter;
            list.bids.push({"name": name, "biddings": []});
        }
        return list;
    })
    localStorage.setItem("activities", JSON.stringify(bid))
}

