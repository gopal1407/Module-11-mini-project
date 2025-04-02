from flask import Flask
from flask_cors import CORS
from models import db
from routes.customer_routes import customer_bp
from routes.product_routes import product_bp
from routes.order_routes import order_bp

app.register_blueprint(order_bp)

app = Flask(__name__)
CORS(app)

app.config.from_pyfile("config.py")
db.init_app(app)

# Register routes
app.register_blueprint(customer_bp, url_prefix="/api/customers")
app.register_blueprint(product_bp, url_prefix="/api/products")

if __name__ == "__main__":
    app.run(debug=True)
