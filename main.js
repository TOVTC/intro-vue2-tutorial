Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: 
    `
    <ul>
        <li v-for="detail in details">{{ detail }}</li>
    </ul>
    `
})

Vue.component('product', {
    // pass in an options object
    // each component has its own scope and receives variables from its parent component using props (a custom attribute)
    // in order to receive props, a component must explicitly declare props it expects to receive using the props option
    // using a props object allows access to Vue's built-in validation options (e.g. dataType, required?, set a default value, etc.)
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: 
    // templates can only have one root element, like in React, so wrap elements in a div
    `
    <div class="product">
        <div class="product-image">
            <img :src="image">
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p>Shipping: {{ shipping }}</p>

            <product-details :details="details"></product-details>

            <div v-for="(variant, index) in variants"
                :key="variant.variantId"
                class="color-box"
                :style="{backgroundColor: variant.variantColor}"
                @mouseover="updateProduct(index)"
            >
            </div>

        <button v-on:click="addToCart" :disabled="!inStock" :class="{disabledButton: !inStock}">Add to Cart</button>
        </div>

        <div class="cart">
            <p>Cart({{ cart }})</p>
        </div>
    </div>
    `,
    // data is not itself an object, but a function that returns an object so that each component that shares this data
    // isn't sharing the same object but a new data object being returned every time
    data() {
        return {
            brand: "Vue Mastery",
            product: 'Socks',
            selectedVariant: 0,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: './assets/images/vmSocks-green-onWhite.jpg',
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: './assets/images/vmSocks-blue-onWhite.jpg',
                    variantQuantity: 0
                }
            ],
            cart: 0,
        }
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(index) {
            this.selectedVariant = index
        },
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return 2.99
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
})