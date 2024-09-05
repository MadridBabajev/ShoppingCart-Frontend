import {BaseEntityService} from "../../base-services/BaseEntityService";
import HostURLs from "../../../types/strings/urls/HostURLs";
import IShopItemDetails from "../../../types/dto/domain/shop-items/IShopItemDetails";
import IShopItemListElement from "../../../types/dto/domain/shop-items/IShopItemListElement";
import Queries from "../../../types/strings/queries/Queries";
import IShoppingCartItemAction from "../../../types/dto/domain/shop-items/IShoppingCartItemAction";

interface IShopItemService {
    getCartItems(): Promise<IShopItemListElement[] | undefined>,
    getCartItemDetails(itemId: string): Promise<IShopItemDetails | undefined>,
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

    async getCartItemDetails(itemId: string): Promise<IShopItemDetails | undefined> {
        try {
            return await this.axios.get(HostURLs.GET_ALL_CART_ITEMS + `${Queries.SHOP_ITEM}${itemId}`);
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
