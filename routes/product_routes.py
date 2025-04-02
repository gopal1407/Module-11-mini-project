from flask import Blueprint, request, jsonify
from models import db, Product

product_bp = Blueprint("product_bp", __name__)

@product_bp.route("/", methods=["GET"])
def get_products():
    products = Product.query.all()
    return jsonify([
        {"id": p.id, "name": p.name, "price": p.price, "stock": p.stock}
        for p in products
    ])

@product_bp.route("/", methods=["POST"])
def create_product():
    data = request.json
    new_product = Product(name=data["name"], price=data["price"], stock=data.get("stock", 0))
    db.session.add(new_product)
    db.session.commit()
    return jsonify({"message": "Product created", "id": new_product.id})

@product_bp.route("/<int:id>", methods=["GET"])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify({"id": product.id, "name": product.name, "price": product.price, "stock": product.stock})

@product_bp.route("/<int:id>", methods=["PUT"])
def update_product(id):
    data = request.json
    product = Product.query.get_or_404(id)
    product.name = data["name"]
    product.price = data["price"]
    product.stock = data.get("stock", product.stock)
    db.session.commit()
    return jsonify({"message": "Product updated"})

@product_bp.route("/<int:id>", methods=["DELETE"])
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted"})
