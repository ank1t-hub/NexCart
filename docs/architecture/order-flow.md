# Order Flow

## Current Order Lifecycle

```mermaid
flowchart LR
    Customer[Customer] --> Cart[Cart]
    Cart --> Checkout[Checkout Form]
    Checkout --> PlaceOrder[POST /api/order/place]
    PlaceOrder --> Controller[OrderController]
    Controller --> DB[(MongoDB)]
    DB --> Response[Order saved]
    Response --> Frontend[Orders page]
    Admin[Admin] --> AdminOrders[Admin Orders Panel]
    AdminOrders --> OrderList[POST /api/order/list]
    OrderList --> DB
    Admin --> UpdateStatus[POST /api/order/status]
    UpdateStatus --> DB
```

## Actual Behavior

- Customer adds products to cart
- Customer provides address and payment selection on checkout
- Order is created through the backend
- Order is stored in MongoDB
- Cart data for the user is cleared after order placement
- Admin can view orders and update order status

## Important Limitation

Payment integrations such as GPay, Razorpay, and PhonePe are not fully implemented. The project currently supports a base order-placement flow based on the implemented code.
