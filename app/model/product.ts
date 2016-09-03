import { User } from '../model/user';

export/**
 * Product
 */
class Product {
    id:number;
    name:string;
    price:number;
    original_price:number;
    orders:number;
    is_featured:boolean;
    product_images:Array<ProductImage>;
    product_types:Array<ProductType>;
    relative_products:Array<Product>;
    remain_seconds:number;
    expired_date:Date;
    definition:string;
    information:string;
    definition_2:string;
    information_2:string;
    definition_3:string;
    information_3:string;
    product_category:Category;
    travel_buyer:User;
}

export /**
 * ProductImage
 */
class ProductImage {
    image_medium_url:string;
    image_thumb_url:string;
}

export /**
 * ProductType
 */
class ProductType {
    id:number;
    name:string = "Please select";
    storage:number;
}

export class Category {
  id: number;
  name: string;
  selected: boolean;
}


export /**
 * ShoppingCart
 */
class ShoppingCart{
    id:number;
    items_count:number;
    total:number;
    shopping_cart_items:Array<ShoppingCartItem>;
}

export/**
 * ShoppingCartItem
 */
class ShoppingCartItem {
    id:number;
    quantity:number;
    subtotal:number;
    product:Product;
    selected_product_type:ProductType;
}