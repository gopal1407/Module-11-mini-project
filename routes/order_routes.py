from flask import Blueprint, request, jsonify
from models import db, Order, OrderItem, Customer, Product
from datetime import datetime

order_bp = Blueprint("order", __name__, url_prefix="/api/orders")


# ✅ Create New Order
@order_bp.route("/", methods=["POST"])
def place_order():
    data = request.get_json()
    customer_id = data.get("customerId")
    order_date = data.get("orderDate")
    items = data.get("items", [])

    if not customer_id or not order_date or not items:
        return jsonify({"error": "Missing order fields"}), 400

    new_order = Order(
        customer_id=customer_id,
        order_date=datetime.strptime(order_date, "%Y-%m-%d"),
        status="pending"
    )
    db.session.add(new_order)
    db.session.commit()

    for item in items:
        product_id = item.get("productId")
        quantity = item.get("quantity", 1)
        if product_id and quantity:
            new_item = OrderItem(order_id=new_order.id, product_id=product_id, quantity=quantity)
            db.session.add(new_item)

    db.session.commit()
    return jsonify({"message": "Order placed successfully", "order_id": new_order.id})


# ✅ Get All Orders by Customer
@order_bp.route("/customer/<int:customer_id>", methods=["GET"])
def get_customer_orders(customer_id):
    customer = Customer.query.get(customer_id)
    if not customer:
        return jsonify({"error": "Customer not found"}), 404

    orders = Order.query.filter_by(customer_id=customer_id).all()
    result = []
    for order in orders:
        order_items = []
        for item in order.items:
            product = Product.query.get(item.product_id)
            order_items.append({
                "productId": item.product_id,
                "productName": product.name if product else "Unknown",
                "quantity": item.quantity
            })
        result.append({
            "id": order.id,
            "orderDate": order.order_date.strftime("%Y-%m-%d"),
            "status": order.status,
            "items": order_items
        })
    return jsonify(result)


# ✅ Cancel an Order
@order_bp.route("/<int:order_id>/cancel", methods=["PATCH"])
def cancel_order(order_id):
    order = Order.query.get(order_id)
    if not order:
        return jsonify({"error": "Order not found"}), 404
    if order.status != "pending":
        return jsonify({"error": "Cannot cancel this order"}), 400
    order.status = "cancelled"
    db.session.commit()
    return jsonify({"message": "Order cancelled"})
