Vue.component('product-review', {
    // the v-model directive offers two-way data binding
    // it captures data properties in child components to be passed to parent components
    template:
    // v-model binds the value of the input to a property name
    // the .number modifier typecasts the value of the select field into an integer
    // add an event listener to parent element to listen for form submission, don't forget to use the .prevent to prevent default
    `
    <form class="review-form" @submit.prevent="onSubmit">

        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </p>

        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name">
        </p>

        <p>
            <label for="review">Review:</label>
            <textarea id="review" v-model="review"></textarea>
        </p>

        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>

        <p>Would you recommend this product?</p>
            <label>
                Yes
                <input type="radio" value="Yes" v-model="recommended" />
            </label>
            <label>
                No
                <input type="radio" value="No" v-model="recommended" />
            </label>
        <p>
            <input type="submit" value="Submit">
        </p>
    </form>
    `,
    data() {
        return {
            name: null,
            rating: null,
            review: null,
            recommended: null,
            // to catch errors to display in template
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating && this.recommended) {
                var productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommended: this.recommended
                }
                this.$emit('review-submitted', productReview)
                this.errors = []
                this.name = null,
                this.review = null,
                this.rating = null
                this.recommended = null
            } else {
                if(!this.name) {
                    this.errors.push("Name required.")
                }
                if(!this.review) {
                    this.errors.push("Review required.")
                }
                if(!this.rating) {
                    this.errors.push("Rating required.")
                }
                if(!this.recommended) {
                    this.errors.push("Recommendation required.")
                }
            }
        }
    }
})

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
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: 
    // you can also use the HTML 5 required attribute to provide an automatic error message if a field is not filled in
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

        <div>
            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul>
                <li v-for="review in reviews">
                    <p>{{ review.name }}</p>
                    <p>Rating: {{ review.rating }}</p>
                    <p>{{ review.review }}</p>
                    <p>Recommended: {{ review.review }}</p>
                </li>
            </ul>
        </div>

        <product-review @review-submitted="addReview"></product-review>

    </div>
    `,
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
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {
            this.selectedVariant = index
        },
        addReview(productReview) {
            this.reviews.push(productReview)
        }
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
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        }
    }
})