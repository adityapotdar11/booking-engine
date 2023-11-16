const stripe = require("stripe")("sk_test_PoYnFX3hEP3vXKuNdTTU34nH");
const createPM = async () => {
    const paymentMethod = await stripe.paymentMethods.create({
        type: "card",
        card: {
            number: "4242424242424242",
            exp_month: 12,
            exp_year: 2034,
            cvc: "314",
        },
    });

    console.log(paymentMethod.id);
};

createPM();
