// to allow grandchild components to communicate with parent components, create a global channel through which the app communicates
// this channel is a new Vue instance, and you can replace the this keyword with the eventBus declaration (see review object onSubmit())
var eventBus = new Vue()

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template:
    // bind an active tab class to display whcih tab is active
    // the tabs component is a grandchild of the product component, so we will no longer be listening for form submissions here
    `
    <div>
        <span
            :class="{ activeTab: selectedTab === tab}"
            class="tab"
            v-for="(tab, index) in tabs"
            :key="index"
            @click="selectedTab = tab"
        >
        {{ tab }}
        </span>
        <div v-show="selectedTab==='Reviews'">
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

        <product-review v-show="selectedTab==='Make a Review'"></product-review>
    </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'   
        }
    }
})

Vue.component('product-review', {
    template:
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
                eventBus.$emit('review-submitted', productReview)
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

        <product-tabs :reviews="reviews"></product-tabs>        

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
        // addReview method was removed because of eventBus
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
    },
    // mounted is a lifecycle hook
    // place here code that you want to run as soon as the app is mounted
    // this replaces the addReview method
    mounted() {
        eventBus.$on('review-submitted', function(productReview) {
            this.reviews.push(productReview)
        })
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