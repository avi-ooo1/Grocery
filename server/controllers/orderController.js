import Order from "../models/Order.js";
import Product from "../models/Product.js";
import stripe from 'stripe'
import User from '../models/User.js'

//PLace Order COD : /api/order/cod

export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        if (!address || items.length == 0) {
            return res.json({ success: false, message: "Invalid Data" })
        }
        //Calculate amount using items
        let amount = await items.reduce(async (acc, item) => {       //acc is the initial count of the amount
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)               // 0 is the initial amount of acc

        //Add tax charge (2%)
        amount += Math.floor(amount * 0.02);

        await Order.create(({
            userId,
            items,
            amount,
            address,
            paymentType: 'COD'
        }));
        return res.json({ success: true, message: 'Order Placed Successfully' })
    } catch (error) {
        return res.json({ success: false, message: error.message });

    }
}

//PLace Order Stripe : /api/order/stripe

export const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        const { origin } = req.headers;
        if (!address || items.length == 0) {
            return res.json({ success: false, message: "Invalid Data" })
        }
        let productData = []
        //Calculate amount using items
        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity,
            });
            amount += product.offerPrice * item.quantity;
        }

        //Add tax charge (2%)
        amount += Math.floor(amount * 0.02);

        const order = await Order.create(({
            userId,
            items,
            amount,
            address,
            paymentType: 'Online'
        }));

        //Clear the cart data after placing order
        await User.findByIdAndUpdate(userId, { cartItems: {} });

        //Stripe Gateway Initialize
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        //create line items for stripe
        const line_items = productData.map((item) => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: Math.floor(item.price * 100)
                },
                quantity: item.quantity,
            }
        })
        //create session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId,
            }
        })

        return res.json({ success: true, url: session.url })
    } catch (error) {
        return res.json({ success: false, message: error.message });

    }
}

//Stripe webhooks to verify payment action : /stripe
export const stripeWebhooks = async (req, res) => {
    //Stripe Gateway Initialize
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const sig = req.headers["stripe-signature"]
    let event;
    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        res.status(400).send(`Webhook Error: ${error.message}`)
    }

    //handle the event
    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object;
            const { orderId, userId } = session.metadata;

            //Mark payment as Paid
            await Order.findByIdAndUpdate(orderId, { isPaid: true });

            //Clear the cart data after payment is successfull
            await User.findByIdAndUpdate(userId, { cartItems: {} });

            break;
        }
        default:
            console.error(`Unhandled event type ${event.type}`);
            break;
    }
    res.json({ received: true });
}

//Get Order By userID : /api/order/user
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await Order.find({
            userId,
            $or: [{ paymentType: 'COD' }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


//Get all order (for seller/admin) : /api/order/seller
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: 'COD' }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 });       //-1 is user for (last order show on the top)
        res.json({ success: true, orders });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}