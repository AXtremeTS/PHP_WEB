<?php

namespace App\Http\Controllers;

use App\Support\ProductCatalog;
use Inertia\Inertia;
use Inertia\Response;

class StorefrontController extends Controller
{
    public function home(): Response
    {
        $products = ProductCatalog::all();

        return Inertia::render('Home', [
            'featuredProducts' => array_slice($products, 0, 4),
            'categories' => ProductCatalog::categories(),
        ]);
    }

    public function products(): Response
    {
        return Inertia::render('Products/Index', [
            'products' => ProductCatalog::all(),
            'categories' => ProductCatalog::categories(),
            'filters' => [
                'search' => (string) request()->query('search', ''),
                'category' => (string) request()->query('category', ''),
                'sort' => (string) request()->query('sort', 'recommended'),
            ],
        ]);
    }

    public function product(string $slug): Response
    {
        $products = ProductCatalog::all();
        $product = collect($products)->firstWhere('slug', $slug);
        abort_unless($product, 404);

        return Inertia::render('Products/Show', [
            'product' => $product,
            'relatedProducts' => array_values(array_slice(
                array_filter($products, fn (array $item): bool => $item['categorySlug'] === $product['categorySlug'] && $item['id'] !== $product['id']),
                0,
                4,
            )),
        ]);
    }

    public function builder(): Response
    {
        return Inertia::render('Builder/Index', ['products' => ProductCatalog::all()]);
    }

    public function promotions(): Response
    {
        return Inertia::render('Promotions/Index', [
            'products' => ProductCatalog::all(),
            'featuredProducts' => array_values(array_filter(ProductCatalog::all(), fn (array $product): bool => $product['oldPrice'] !== null)),
        ]);
    }

    public function cart(): Response
    {
        return Inertia::render('Cart/Index', ['products' => ProductCatalog::all()]);
    }

    public function wishlist(): Response
    {
        return Inertia::render('Wishlist/Index', ['products' => ProductCatalog::all()]);
    }

    public function checkout(): Response
    {
        return Inertia::render('Checkout/Index', ['products' => ProductCatalog::all()]);
    }

    public function support(): Response
    {
        return Inertia::render('Support/Index');
    }

    public function login(): Response
    {
        return Inertia::render('Auth/Login');
    }

    public function register(): Response
    {
        return Inertia::render('Auth/Register');
    }

    public function forgotPassword(): Response
    {
        return Inertia::render('Auth/ForgotPassword');
    }

    public function account(): Response
    {
        return Inertia::render('Account/Index', [
            'products' => ProductCatalog::all(),
        ]);
    }

    public function trackOrder(): Response
    {
        return Inertia::render('Orders/Track');
    }
}
