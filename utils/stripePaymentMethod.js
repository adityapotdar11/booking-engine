const config = require("../config/config");
const stripe = require("stripe")(config.jwtSecret);

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
