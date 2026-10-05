<?php

use App\Http\Controllers\StorefrontController;
use Illuminate\Support\Facades\Route;

Route::get('/', [StorefrontController::class, 'home'])->name('home');
Route::get('/products', [StorefrontController::class, 'products'])->name('products.index');
Route::get('/products/{slug}', [StorefrontController::class, 'product'])->name('products.show');
Route::get('/build-pc', [StorefrontController::class, 'builder'])->name('builder');
Route::get('/promotions', [StorefrontController::class, 'promotions'])->name('promotions');
Route::get('/cart', [StorefrontController::class, 'cart'])->name('cart');
Route::get('/wishlist', [StorefrontController::class, 'wishlist'])->name('wishlist');
Route::get('/checkout', [StorefrontController::class, 'checkout'])->name('checkout');
Route::get('/support', [StorefrontController::class, 'support'])->name('support');
Route::get('/login', [StorefrontController::class, 'login'])->name('login');
Route::get('/register', [StorefrontController::class, 'register'])->name('register');
Route::get('/forgot-password', [StorefrontController::class, 'forgotPassword'])->name('password.request');
Route::get('/account', [StorefrontController::class, 'account'])->name('account');
Route::get('/orders/track', [StorefrontController::class, 'trackOrder'])->name('orders.track');
