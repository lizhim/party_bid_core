function Bidding(phone, price) {
    this.phone = phone;
    this.price = price;
}

Bidding.render_biddings = function (current_activity, current_bid) {
    var bids = JSON.parse(localStorage.bids);
    var current = _.find(bids, function (list) {
        return (list.activity_id == current_activity && list.name == current_bid)
    })
    return Bidding.get_group_price(current, current_activity, current_bid);
}

Bidding.get_group_price = function (current, current_activity, current_bid) {
    var price = _.groupBy(current.biddings, function (list) {
        return list.price
    })
    var price_array = [];
    _.map(price, function (value, key) {
        price_array.push({"price": key, "number": value.length})
        localStorage.setItem("price_array", JSON.stringify(price_array))
        return JSON.parse(localStorage.getItem("price_array"))
    })
    return Bidding.get_biddings(JSON.parse(localStorage.getItem("price_array")), current_activity, current_bid)
}

Bidding.get_biddings = function (get_price_array, current_activity, current_bid) {
    var biddings = [];
    biddings.push({"name": Bidding.get_sign_ups_name(get_price_array, current_activity, current_bid),
        "phone": Bidding.get_bid_person_phone(get_price_array, current_activity, current_bid),
        "price": Bidding.get_bid_person_price(get_price_array)})
    return biddings;
}

Bidding.get_sign_ups_name = function (get_price_array, current_activity, current_bid) {
    var sign_ups = JSON.parse(localStorage.sign_ups);
    var bid_person_name = _.find(sign_ups, function (bid) {
        return bid.phone == Bidding.get_bid_person_phone(get_price_array, current_activity, current_bid)
    })
    if (bid_person_name != undefined) {
        return bid_person_name.name
    }
}

Bidding.get_bid_person_phone = function (get_price_array, current_activity, current_bid) {
    var bids = JSON.parse(localStorage.bids);
    var current = _.find(bids, function (num) {
        return (num.activity_id == current_activity && num.name == current_bid)
    })
    var bidder = _.find(current.biddings, function (list) {
        return list.price == Bidding.get_bid_person_price(get_price_array)
    })
    return bidder.phone;
}

Bidding.get_bid_person_price = function (get_price_array) {
    var bid_person = _.find(get_price_array, function (list) {
        return list.number == 1
    })
    return bid_person.price
}


