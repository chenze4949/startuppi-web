"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Globals = require('../globals');
require('rxjs/add/operator/toPromise');
var product_1 = require('../model/product');
var ProductService = (function () {
    function ProductService(http) {
        this.http = http;
        this.productsUrl = Globals.host + '/api/v1/products'; // URL to web api
        this.productDetailUrl = Globals.host + '/api/v1/products/'; // URL to web api
        this.shoppingCartUrl = Globals.host + '/api/v1/shopping_carts/get_shopping_cart'; // URL to web api
        this.addShoppingCartUrl = Globals.host + '/api/v1/shopping_carts/add_product_to_shopping_cart'; // URL to web api
    }
    ProductService.prototype.getProducts = function (sortKey, sort, page, keyword, category_ids) {
        var url = this.productsUrl + "?" + "key=" + sortKey + "&sort=" + sort + "&page=" + page;
        for (var index = 0; index < category_ids.length; index++) {
            var element = category_ids[index];
            url = url + "&category_ids[]=" + element;
        }
        if (keyword.length > 0) {
            url = url + "&keyword=" + keyword;
        }
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().response; })
            .catch(this.handleError);
    };
    ProductService.prototype.getProduct = function (id) {
        var _this = this;
        return this.http.get(this.productDetailUrl + id)
            .toPromise()
            .then(function (response) { return _this.mapJSONtoProductDetail(response.json().response); })
            .catch(this.handleError);
    };
    ProductService.prototype.getShoppingCart = function () {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('uid', localStorage.getItem('uid'));
        headers.append('client', localStorage.getItem('client'));
        headers.append('access-token', localStorage.getItem('access-token'));
        return this.http.get(this.shoppingCartUrl, { headers: headers })
            .toPromise()
            .then(function (response) { return _this.mapJSONtoShoppingCart(response.json().response); })
            .catch(this.handleError);
    };
    ProductService.prototype.addShoppingCart = function (quantity, product_id, product_type_id) {
        var _this = this;
        var creds = JSON.stringify({ quantity: quantity, product_type_id: product_type_id, product_id: product_id });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('uid', localStorage.getItem('uid'));
        headers.append('client', localStorage.getItem('client'));
        headers.append('access-token', localStorage.getItem('access-token'));
        console.log(creds);
        return this.http.post(this.addShoppingCartUrl, creds, { headers: headers })
            .toPromise()
            .then(function (response) { return _this.mapJSONtoShoppingCart(response.json().response); })
            .catch(this.handleError);
    };
    ProductService.prototype.mapJSONtoProduct = function (data) {
        var product = new product_1.Product();
        product.id = data.id;
        product.name = data.name;
        product.price = data.price;
        product.original_price = data.original_price;
        product.orders = data.orders;
        product.is_featured = data.is_featured;
        product.expired_date = new Date(data.end_time);
        product.remain_seconds = data.remain_seconds;
        var images = new Array();
        for (var index = 0; index < data.product_images.length; index++) {
            var element = data.product_images[index];
            var image = new product_1.ProductImage();
            image.image_medium_url = element.image_medium_url;
            image.image_thumb_url = element.image_thumb_url;
            images.push(image);
        }
        return product;
    };
    ProductService.prototype.mapJSONtoProductDetail = function (data) {
        var product = new product_1.Product();
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
        var category = new product_1.Category();
        category.id = data.product_category.id;
        category.name = data.product_category.name;
        product.product_category = category;
        var types = new Array();
        for (var index = 0; index < data.product_types.length; index++) {
            var element = data.product_types[index];
            types.push(this.mapJSONtoProductType(element));
        }
        product.product_types = types;
        var images = new Array();
        for (var index = 0; index < data.product_images.length; index++) {
            var element = data.product_images[index];
            var image = new product_1.ProductImage();
            image.image_medium_url = element.image_medium_url;
            image.image_thumb_url = element.image_thumb_url;
            images.push(image);
        }
        var relative_products = new Array();
        for (var index = 0; index < data.relative_products.length; index++) {
            var element = data.relative_products[index];
            relative_products.push(this.mapJSONtoProduct(element));
        }
        product.relative_products = relative_products;
        return product;
    };
    ProductService.prototype.mapJSONtoShoppingCart = function (data) {
        var cart = new product_1.ShoppingCart();
        cart.id = data.id;
        cart.items_count = data.items_count;
        cart.total = data.total;
        var shopping_cart_items = new Array();
        for (var index = 0; index < data.shopping_cart_items.length; index++) {
            var element = data.shopping_cart_items[index];
            shopping_cart_items.push(this.mapJSONtoShoppingCartItem(element));
        }
        cart.shopping_cart_items = shopping_cart_items;
        return cart;
    };
    ProductService.prototype.mapJSONtoShoppingCartItem = function (data) {
        var item = new product_1.ShoppingCartItem();
        item.id = data.id;
        item.quantity = data.quantity;
        item.subtotal = data.subtotal;
        item.product = this.mapJSONtoProduct(data.product);
        item.selected_product_type = this.mapJSONtoProductType(data.selected_product_type);
        return item;
    };
    ProductService.prototype.mapJSONtoProductType = function (data) {
        var type = new product_1.ProductType();
        type.id = data.id;
        type.name = data.name;
        type.storage = data.storage;
        return type;
    };
    ProductService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    ProductService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=product.service.js.map