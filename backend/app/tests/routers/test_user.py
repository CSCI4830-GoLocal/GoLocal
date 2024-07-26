import json
from app.models.user import User
from app.config import db


def test_list_users(client):
    response = client.get("/api/v1/user/list")

    assert response.status_code == 200
    assert "users" in response.json


def test_create_user(client):
    data = {
        "firstName": "John",
        "lastName": "Doe",
        "email": "JohnDoe@gmail.com",
        "password": "password"
    }
    response = client.post("/api/v1/user/create", json=data)
    assert response.status_code == 201
    assert "user" in response.json

    user = User.query.filter_by(email=data["email"]).first()
    assert user.first_name == data["firstName"]
    assert user.last_name == data["lastName"]
    assert user.email == data["email"]
    assert user.password == data["password"]


def test_create_user_missing_fields(client):
    data = {
        "firstName": "Jane"
    }
    response = client.post("/api/v1/user/create", json=data)
    assert response.status_code == 400
    assert "error" in response.json


def test_update_user(client):
    user = User(first_name="John", last_name="Doe",
                email="john.doe@example.com", password="password")
    db.session.add(user)
    db.session.commit()
    data = {
        "firstName": "Johnny"
    }
    response = client.patch(f"/api/v1/user/update/{user.id}", json=data)
    assert response.status_code == 200
    assert "user" in response.json

    updated_user = User.query.get(user.id)
    assert updated_user.first_name == "Johnny"


def test_update_user_not_found(client):
    data = {
        "firstName": "Johnny"
    }
    response = client.patch("/api/v1/user/update/999",
                            data=json.dumps(data), content_type='application/json')
    assert response.status_code == 404
    assert "error" in response.json


def test_delete_user(client):
    user = User(first_name="John", last_name="Doe",
                email="john.doe@example.com", password="password", is_owner=False)
    db.session.add(user)
    db.session.commit()

    response = client.delete(f"/api/v1/user/delete/{user.id}")
    assert response.status_code == 200
    assert "message" in response.json

    deleted_user = User.query.get(user.id)
    assert deleted_user is None


def test_delete_user_not_found(client):
    response = client.delete("/api/v1/user/delete/999")
    assert response.status_code == 404
    assert "error" in response.json
