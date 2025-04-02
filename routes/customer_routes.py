from flask import Blueprint, request, jsonify
from models import db, Customer

customer_bp = Blueprint("customer_bp", __name__)

@customer_bp.route("/", methods=["POST"])
def create_customer():
    data = request.json
    new_customer = Customer(name=data["name"], email=data["email"], phone=data["phone"])
    db.session.add(new_customer)
    db.session.commit()
    return jsonify({"message": "Customer created", "id": new_customer.id})

@customer_bp.route("/<int:id>", methods=["GET"])
def get_customer(id):
    customer = Customer.query.get_or_404(id)
    return jsonify({"id": customer.id, "name": customer.name, "email": customer.email, "phone": customer.phone})

@customer_bp.route("/<int:id>", methods=["PUT"])
@customer_bp.route("/", methods=["GET"])
def get_all_customers():
    customers = Customer.query.all()
    result = [
        {"id": c.id, "name": c.name, "email": c.email, "phone": c.phone}
        for c in customers
    ]
    return jsonify(result)

def update_customer(id):
    data = request.json
    customer = Customer.query.get_or_404(id)
    customer.name = data["name"]
    customer.email = data["email"]
    customer.phone = data["phone"]
    db.session.commit()
    return jsonify({"message": "Customer updated"})

@customer_bp.route("/<int:id>", methods=["DELETE"])
def delete_customer(id):
    customer = Customer.query.get_or_404(id)
    db.session.delete(customer)
    db.session.commit()
    return jsonify({"message": "Customer deleted"})
