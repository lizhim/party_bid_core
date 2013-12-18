function bidding(name){
    this.name=name;
}
bidding.create_new_bid = function (activity_name) {
    var activities = JSON.parse(localStorage.activities);
    var counter = activities[activity_name].bids.length + 1;
    var name = "竞价" + counter;
    activities[activity_name].bids.push({"name":name})
    activities[activity_name].biddings[name]=[];
    localStorage.setItem("activities",JSON.stringify(activities))
}