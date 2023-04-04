
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
        cart: 0,
        styleObject: {
            color: 'red',
            backgroundColor: 'red',
            fontSize: '13px'
        },
        styleObject2: {
            margin: '5px',
            padding: '20px'
        },
        activeClass: true,
        errorClass: false,
        classObject: {
            active: true,
            'text-danger': false
        },
        aClass: 'active',
        eClass: 'text-danger'
    },
    methods: {
        // triggered by event listener in html
        addToCart() {
            this.cart += 1
        },
        updateProduct(variantImage) {
            this.image = variantImage
        },
    }
})