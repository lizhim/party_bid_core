function notify_sms_received(sms_json) {
    var receive_message_front = sms_json.messages[0].message.substring(0, 2).toUpperCase();
    if (receive_message_front == "BM") {
        Message.judge_start_or_end(sms_json)
    }
    else if (receive_message_front == "JJ") {
        Message.bid_start_or_end(sms_json)
    }
}
function Message(name, phone) {
    this.name = name;
    this.phone = phone;
}
Message.save_phone = function (sms_json) {
    return sms_json.messages[0].phone;
}
Message.save_name = function (sms_json) {
    return  sms_json.messages[0].message.substring(2);
}
Message.judge_start_or_end = function (sms_json) {
    if (localStorage.is_signing_up == "true") {
        Message.judge_is_signing_up_or_has_signed(sms_json)
    }
}
Message.judge_is_signing_up_or_has_signed = function (sms_json) {
    var activities = JSON.parse(localStorage.activities);
    var current_activity = Activity.get_current_activity()
    if (Message.check_sign_up_phone_repeat(sms_json) == false) {
        activities[current_activity].sign_ups.push({"name": Message.save_name(sms_json), "phone": Message.save_phone(sms_json)})
    }
    localStorage.setItem("activities", JSON.stringify(activities))
}
Message.check_sign_up_phone_repeat = function (sms_json) {
    var activities = JSON.parse(localStorage.activities);
    var current_activity = Activity.get_current_activity()
    var phone_repeat = _.some(activities[current_activity].sign_ups, function (list) {
        return list.phone == Message.save_phone(sms_json)
    })
    return phone_repeat;
}
Message.bid_start_or_end = function (sms_json) {
    if (localStorage.is_bidding == "true") {
        Message.bid_is_sign_up(sms_json)
    }
}
Message.bid_is_sign_up = function (sms_json) {
    if (Message.check_sign_up_phone_repeat(sms_json) == true) {
        Message.judge_is_bidding_or_has_bid(sms_json)
    }
}
Message.judge_is_bidding_or_has_bid = function (sms_json) {
    var activities = JSON.parse(localStorage.activities);
    var current_activity = Activity.get_current_activity()
    var current_bid = Activity.get_current_bid()
    if (Message.check_bid_phone_repeat(sms_json)==false) {
        activities[current_activity].biddings[current_bid].push({"name": get_bids_name(sms_json), "phone": Message.save_phone(sms_json),
            "price": Message.save_name(sms_json)})
    }
    localStorage.setItem("activities", JSON.stringify(activities))
}
Message.check_bid_phone_repeat = function (sms_json) {
    var activities = JSON.parse(localStorage.activities);
    var current_activity = Activity.get_current_activity()
    var current_bid = Activity.get_current_bid()
    var bid_phone_repeat = _.some(activities[current_activity].biddings[current_bid], function (num) {
        return num.phone == Message.save_phone(sms_json);
    })
    return bid_phone_repeat;
}