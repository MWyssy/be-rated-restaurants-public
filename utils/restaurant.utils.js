exports.formattedRestaurants = (restaurants) => {
    return restaurants.map((restaurant) => {
        return [restaurant.restaurant_name, restaurant.area_id, restaurant.cuisine, restaurant.website]
    })
}