
var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        image: './assets/images/vmSocks-green-onWhite.jpg',
        inStock: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: './assets/images/vmSocks-green-onWhite.jpg'
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: './assets/images/vmSocks-blue-onWhite.jpg'
            }
        ],
        cart: 0
    },
    methods: {
        // triggered by event listener in html
        addToCart() {
            this.cart += 1
        },
        updateProduct(variantImage) {
            this.image = variantImage
        },
        removeFromCart() {
            if (this.cart > 0) {
                this.cart -= 1
            }
        }
    }
})