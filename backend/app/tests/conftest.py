import pytest
from flask import Flask
from app.config import db
from app.routers import router


@pytest.fixture
def app():
    app = Flask(__name__)

    app.config.update({
        "TESTING": True,
        "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:",
    })

    db.init_app(app)

    app.register_blueprint(router)

    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()


@pytest.fixture
def client(app):
    return app.test_client()
