enum HostURLs {
    // == Controllers ==
    API_BASE_URL = "https://localhost:7084/api/",
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
    GET_CART_ITEM_DETAILS = "GetShoppingCartItemDetails",
    ADD_REMOVE_ITEM = "AddRemoveCartItem",
    CLEAR_CART = "ClearShoppingCart",
    GET_ALL_ITEMS = "GetAllShopItems",
    GET_ITEM_DETAILS = "GetShopItemDetails",
}

export default HostURLs;