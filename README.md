# Curtain PDP – Shopify Theme Task
## Live Demo
[https://ropstam-testing.myshopify.com/products/london-blind-linen]

password: 1234

## What Was Built
A custom Product Detail Page for curtains with dynamic pricing based on:
1. User-selected Width (sourced from product metafield)
2. User-selected Drop (sourced from product variants)
3. Fabric Panels count (calculated silently in the background never shown to user)

## Setup Instructions
1. Create a Shopify development store with Dawn theme
2. Create a product with two variant options: Fabric Panels and Drop
3. Set prices for every Fabric Panels / Drop combination
4. Go to Settings then go to custom data then go to products and add a JSON metafield with Namespace: custom.width_options
5. Add the JSON width-to-panel mapping to the product metafield
6. Upload the theme files from this repo via the Shopify code editor

## Pricing Logic Explained
1. User picks a Width (e.g. 150cm)
2. JavaScript reads the data-panels attribute on that option (e.g. 2)
3. It builds a variant title string: "2 Panels / [selected drop]"
4. It finds the matching Shopify variant and reads its price
5. The price is displayed live no page refresh needed

## Files Changed
1. assets/curtain-pdp.css: All custom styles
2. assets/curtain-pdp.js: Dynamic pricing logic
3. sections/main-product.liquid: Custom variant picker UI
4. snippets/buy-buttons.liquid: Button state control (disabled until Width + Drop selection, Buy Now redirects to checkout, Add to Cart adds selected variant to cart)
5. layout/theme.liquid: CSS/JS file includes
