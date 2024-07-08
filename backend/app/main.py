from flask import request, jsonify
from config import app, db
from routers import router


# Registering the original router from routers/__init__.py
app.register_blueprint(router)


@app.route("/")
def main():
    return "Hello World"


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)
