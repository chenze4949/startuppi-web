import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import Globals = require('../globals');

import 'rxjs/add/operator/toPromise';

import { Product, Category, ProductType, ProductImage, ShoppingCart, ShoppingCartItem} from '../model/product';

@Injectable()
export class ProductService {

  private productsUrl = Globals.host + '/api/v1/products';  // URL to web api
  private productDetailUrl = Globals.host + '/api/v1/products/';  // URL to web api
  private shoppingCartUrl = Globals.host + '/api/v1/shopping_carts/get_shopping_cart';  // URL to web api
  private addShoppingCartUrl = Globals.host + '/api/v1/shopping_carts/add_product_to_shopping_cart';  // URL to web api

  constructor(private http: Http) { }

  getProducts(sortKey:string, sort:string, page:number, keyword:string, category_ids:Array<number>): Promise<Product[]> {
    let url = this.productsUrl + "?" + "key="+ sortKey + "&sort=" + sort + "&page=" + page
    for (var index = 0; index < category_ids.length; index++) {
      var element = category_ids[index];
      url = url + "&category_ids[]=" + element
    }
    if (keyword.length > 0) {
      url = url + "&keyword=" + keyword
    }
    return this.http.get(url)
               .toPromise()
               .then(response => response.json().response)
               .catch(this.handleError);
  }

  getProduct(id: number): Promise<Product> {
    return this.http.get(this.productDetailUrl + id)
               .toPromise()
               .then(response => this.mapJSONtoProductDetail(response.json().response))
               .catch(this.handleError);
  }

  getShoppingCart(): Promise<ShoppingCart>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('uid', localStorage.getItem('uid'));
    headers.append('client', localStorage.getItem('client'));
    headers.append('access-token', localStorage.getItem('access-token'));
    return this.http.get(this.shoppingCartUrl,{headers:headers})
               .toPromise()
               .then(response => this.mapJSONtoShoppingCart(response.json().response))
               .catch(this.handleError);
  }

  addShoppingCart(quantity:number,product_id:number,product_type_id:number): Promise<ShoppingCart>{
    let creds = JSON.stringify({ quantity: quantity, product_type_id: product_type_id, product_id: product_id});
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('uid', localStorage.getItem('uid'));
    headers.append('client', localStorage.getItem('client'));
    headers.append('access-token', localStorage.getItem('access-token'));
    console.log(creds);
    return this.http.post(this.addShoppingCartUrl, creds, {headers:headers})
               .toPromise()
               .then(response => this.mapJSONtoShoppingCart(response.json().response))
               .catch(this.handleError);
  }

  mapJSONtoProduct(data):Product{
    let product:Product = new Product();
    product.id = data.id;
    product.name = data.name;
    product.price = data.price;
    product.original_price = data.original_price;
    product.orders = data.orders;
    product.is_featured = data.is_featured;
    product.expired_date = new Date(data.end_time);
    product.remain_seconds = data.remain_seconds;
    let images = new Array<ProductImage>();
    for (var index = 0; index < data.product_images.length; index++) {
      var element = data.product_images[index];
      let image:ProductImage = new ProductImage();
      image.image_medium_url = element.image_medium_url;
      image.image_thumb_url = element.image_thumb_url;
      images.push(image);
    }
    
    return product;
  }
  mapJSONtoProductDetail(data):Product{
    let product:Product = new Product();
    product.id = data.id;
    product.name = data.name;
    product.price = data.price;
    product.original_price = data.original_price;
    product.orders = data.orders;
    product.is_featured = data.is_featured;
    product.expired_date = new Date(data.end_time);
    product.remain_seconds = data.remain_seconds;
    product.definition = data.definition;
    product.information = data.information;
    product.definition_2 = data.definition_2;
    product.information_2 = data.information_2;
    product.definition_3 = data.definition_3;
    product.information_3 = data.information_3;

    let category:Category = new Category();
    category.id = data.product_category.id;
    category.name = data.product_category.name;
    product.product_category = category;

    let types = new Array<ProductType>();
    for (var index = 0; index < data.product_types.length; index++) {
      var element = data.product_types[index];
      types.push(this.mapJSONtoProductType(element));
    }
    product.product_types = types;

    let images = new Array<ProductImage>();
    for (var index = 0; index < data.product_images.length; index++) {
      var element = data.product_images[index];
      let image:ProductImage = new ProductImage();
      image.image_medium_url = element.image_medium_url;
      image.image_thumb_url = element.image_thumb_url;
      images.push(image);
    }

    let relative_products = new Array<Product>();
    for (var index = 0; index < data.relative_products.length; index++) {
      var element = data.relative_products[index];
      relative_products.push(this.mapJSONtoProduct(element));
    }
    product.relative_products = relative_products
    
    return product;
  }

  mapJSONtoShoppingCart(data):ShoppingCart{
    let cart:ShoppingCart = new ShoppingCart();
    cart.id = data.id;
    cart.items_count = data.items_count;
    cart.total = data.total;
    let shopping_cart_items = new Array<ShoppingCartItem>();
    for (var index = 0; index < data.shopping_cart_items.length; index++) {
      var element = data.shopping_cart_items[index];
      shopping_cart_items.push(this.mapJSONtoShoppingCartItem(element));
    }
    cart.shopping_cart_items = shopping_cart_items
    return cart;
  }

  mapJSONtoShoppingCartItem(data):ShoppingCartItem{
    let item:ShoppingCartItem = new ShoppingCartItem();
    item.id = data.id;
    item.quantity = data.quantity;
    item.subtotal = data.subtotal;
    item.product = this.mapJSONtoProduct(data.product);
    item.selected_product_type = this.mapJSONtoProductType(data.selected_product_type);
    return item;
  }

  mapJSONtoProductType(data):ProductType{
    let type:ProductType = new ProductType();
    type.id = data.id;
    type.name = data.name;
    type.storage = data.storage;
    
    return type;
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}





/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/