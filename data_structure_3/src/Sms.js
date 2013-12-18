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
    var sign_ups = JSON.parse(localStorage.sign_ups);
    var current_activity = Activity.get_current_activity()
    if (Message.check_sign_up_phone_repeat(sms_json) == false) {
        sign_ups.push({"name": Message.save_name(sms_json), "phone": Message.save_phone(sms_json), "activity_id": current_activity})
    }
    localStorage.setItem("sign_ups", JSON.stringify(sign_ups))
}
Message.check_sign_up_phone_repeat = function (sms_json) {
    var sign_ups = JSON.parse(localStorage.sign_ups);
    var current_activity = Activity.get_current_activity()
    var activity = _.filter(sign_ups, function (num) {
        return num.activity_id == current_activity
    })
    var phone_repeat = _.some(activity, function (list) {
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
    var bids = JSON.parse(localStorage.bids);
    var bid = _.find(bids, function (list) {
        return (list.activity_id == Activity.get_current_activity() && list.name == Activity.get_current_bid())
    })
    if (Message.check_bid_phone_repeat(sms_json) == false) {
        bid.biddings.push({"phone": Message.save_phone(sms_json), "price": Message.save_name(sms_json)})
    }
    localStorage.setItem("bids", JSON.stringify([bid]))
}
Message.check_bid_phone_repeat = function (sms_json) {
    var bids = JSON.parse(localStorage.bids);
    var current_activity = _.find(bids, function (list) {
        return (list.activity_id == Activity.get_current_activity() && list.name == Activity.get_current_bid())
    })
    var bid_phone_repeat = _.some(current_activity.biddings, function (bid) {
        return bid.phone == Message.save_phone(sms_json)
    })
    return bid_phone_repeat;
}