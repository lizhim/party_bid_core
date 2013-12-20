function transform_bids_to_view_model(current_activity) {
    var activities = JSON.parse(localStorage.activities);
    var activity = _.find(activities, function (list) {
        return list.name == current_activity;
    })
    if (activity != undefined) {
        return activity.bids
    }
}

function transform_biddings_to_view_model(current_activity, current_bid) {
    var activities = JSON.parse(localStorage.activities);
    var activity = _.find(activities, function (num) {
        return num.name == current_activity
    })
    var bid = _.find(activity.bids, function (list) {
        return list.name == current_bid
    })
    if (bid != undefined) {
        return get_bid_price(bid.biddings, current_activity, current_bid)
    }
    return;
}

function get_bid_price(array, current_activity, current_bid) {
    var price_array = []
    var price = _.groupBy(array, function (one) {
        return one.price
    })
    _.map(price, function (value, key) {
        price_array.push({"price": key, "number": value.length})
        save_price_array(price_array)
        return get_price_array()
    })
    return get_bid_person(JSON.parse(localStorage.getItem("price_array")), current_activity, current_bid)
}

function save_price_array(price_array) {
    return localStorage.setItem("price_array", JSON.stringify(price_array))
}

function get_price_array() {
    return JSON.parse(localStorage.getItem("price_array"))
}

function get_bid_person(get_price_array, current_activity, current_bid) {
    var bid_person = _.filter(get_price_array, function (list) {
        return list.number == 1
    })
    var bids_biddings = get_bids_biddings(current_activity, current_bid)
    var bid_person_information = _.find(bids_biddings, function (num) {
        return num.price == bid_person[0].price
    })
    return [bid_person_information];
}

function get_bids_biddings(current_activity, current_bid) {
    var activities = JSON.parse(localStorage.activities);
    var activity = _.find(activities, function (num) {
        return num.name == current_activity
    })
    var bid = _.find(activity.bids, function (list) {
        return list.name == current_bid
    })
    if (bid != undefined) {
        return bid.biddings;
    }
}

function get_bids_name(sms_json) {
    var activities = JSON.parse(localStorage.activities);
    var activity = _.find(activities, function (list) {
        return list.name == Activity.get_current_activity();
    })
    var bids_name = _.find(activity.sign_ups, function (num) {
        return num.phone == Message.save_phone(sms_json);
    })
    if (bids_name != undefined) {
        return bids_name.name;
    }
}

function save_bid_to_activities(bid) {
    return localStorage.setItem("activities", JSON.stringify(bid))
}

function save_bids(sms_json, num) {
    _.map(num.bids, function (bid) {
        if (bid.name == Activity.get_current_bid() && Message.check_bid_phone_repeat(sms_json) == false) {
            bid.biddings.push({"name": get_bids_name(sms_json), "phone": Message.save_phone(sms_json),
                "price": Message.save_name(sms_json)})
        }
    })
}


