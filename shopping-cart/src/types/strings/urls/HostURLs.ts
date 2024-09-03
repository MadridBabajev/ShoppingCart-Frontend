enum HostURLs {
    // == Controllers ==
    HOST_BASE_URL = "https://mb-distributed-22-23-backend.azurewebsites.net/api/",
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