import {BaseEntityService} from "../../base-services/BaseEntityService";
import HostURLs from "../../../types/strings/HostURLs";
import IShopItemDetails from "../../../types/dto/domain/shop-items/IShopItemDetails";
import IShopItemListElement from "../../../types/dto/domain/shop-items/IShopItemListElement";
import IShoppingCartItemAction from "../../../types/dto/domain/shop-items/IShoppingCartItemAction";
import QueryParams from "../../../types/strings/Queries";

interface IShopItemService {
    getCartItems(): Promise<IShopItemListElement[] | undefined>,
    getShopItemDetails(itemId: string): Promise<IShopItemDetails | undefined>,
    addRemoveCartItem(cartAction: IShoppingCartItemAction): Promise<void>,
    clearShoppingCart(): Promise<void>;
}

export class ShopItemService extends BaseEntityService<IShopItemDetails> implements IShopItemService {
    constructor() {
        super(HostURLs.SHOP_ITEM_CONTROLLER);
    }

    async getCartItems(): Promise<IShopItemListElement[] | undefined> {
        try {
            const response = await this.axios.get(HostURLs.GET_ALL_CART_ITEMS);
            return response.data;
        } catch (error) {
            console.error(`Failed to retrieve cart items: ${error}`);
        }
    }

    async getShopItemDetails(itemId: string): Promise<IShopItemDetails | undefined> {
        try {
            const apiRequest = `${HostURLs.GET_ITEM_DETAILS}${QueryParams.SHOP_ITEM}${itemId}`
            const response = await this.axios.get(apiRequest)
            return response.data;
        } catch (error) {
            console.error(`Failed to leave a review: ${error}`);
        }
    }

    async addRemoveCartItem(cartAction: IShoppingCartItemAction): Promise<void> {
        try {
            return await this.axios.put(HostURLs.ADD_REMOVE_ITEM, cartAction);
        } catch (error) {
            console.error(`Failed to add a tag: ${error}`);
        }
    }

    async clearShoppingCart(): Promise<void> {
        try {
            return await this.axios.delete(HostURLs.CLEAR_CART);
        } catch (error) {
            console.error(`Failed to remove a tag: ${error}`);
        }
    }
}
