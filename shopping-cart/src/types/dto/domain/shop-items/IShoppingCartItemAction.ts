import ECartItemActions from "./ECartItemActions";

interface IShoppingCartItemAction
{
    itemId: string,
    itemAction: ECartItemActions,
    quantity: number | null
}

export default IShoppingCartItemAction;