enum ApiUrls {
    // == Controllers ==
    API_BASE_URL = "http://localhost:8000/api/",
    ACCOUNT_CONTROLLER = "v1/identity/account/",
    SHOP_ITEM_CONTROLLER = "v1/shopItem/",

    // == Actions ==
    // Identity
    REGISTER = "Register",
    LOGIN = "Login",
    LOGOUT = "Logout",
    REFRESH_JWT_TOKEN = "RefreshToken",

    // ShopItems
    GET_ALL_CART_ITEMS = "GetAllCartItems",
    ADD_REMOVE_ITEM = "AddRemoveCartItem",
    CLEAR_CART = "ClearShoppingCart",
    GET_ALL_ITEMS = "GetAllShopItems",
    GET_ITEM_DETAILS = "GetShopItemDetails",
}

export default ApiUrls;