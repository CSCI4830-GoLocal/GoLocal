import json
from app.models.company import Company
from app.models.reviews import Reviews
from app.config import db


def test_list_reviews(client):
    response = client.get("/api/v1/reviews/list")

    assert response.status_code == 200
    assert "reviews" in response.json


def test_create_reviews(client):
    company_data = {
        "name": "Acme Inc",
        "address": "123 Main St",
        "city": "Springfield",
        "state": "IL",
        "zip": 62701,
        "ownerId": 1
    }
    user_data = {
        "firstName": "John",
        "lastName": "Doe",
        "email": "JohnDoe@gmail.com"
    }
    reviews_data = {
        "companyId": 1,
        "comment": "This is a test review."
    }
    client.post("/api/v1/user/create", json=user_data)
    client.post("/api/v1/company/create", json=company_data)
    response = client.post("/api/v1/reviews/create", json=reviews_data)
    assert response.status_code == 201
    assert "reviews" in response.json

    reviews = Reviews.query.filter_by(comment=reviews_data["comment"]).first()
    assert reviews.comment == reviews_data["comment"]
    assert reviews.company_id == reviews_data["companyId"]


def test_create_reviews_missing_fields(client):
    company_data = {
        "name": "Acme Inc",
        "address": "123 Main St",
        "city": "Springfield",
        "state": "IL",
        "zip": 62701,
        "ownerId": 1
    }
    user_data = {
        "firstName": "John",
        "lastName": "Doe",
        "email": "JohnDoe@gmail.com"
    }
    reviews_data = {
        "companyId": 1
    }
    client.post("/api/v1/user/create", json=user_data)
    client.post("/api/v1/company/create", json=company_data)
    response = client.post("/api/v1/reviews/create", json=reviews_data)

    assert response.status_code == 400
    assert "error" in response.json


def test_create_reviews_without_company(client):
    reviews_data = {
        "companyId": 999,
        "comment": "This is a test review."
    }
    response = client.post("/api/v1/reviews/create", json=reviews_data)
    assert response.status_code == 404
    assert "error" in response.json


def test_update_reviews(client):
    company_data = {
        "name": "Acme Inc",
        "address": "123 Main St",
        "city": "Springfield",
        "state": "IL",
        "zip": 62701,
        "ownerId": 1
    }
    user_data = {
        "firstName": "John",
        "lastName": "Doe",
        "email": "JohnDoe@gmail.com"
    }
    reviews_data = {
        "comment": "This is a test review.",
        "companyId": 1
    }
    client.post("/api/v1/user/create", json=user_data)
    client.post("/api/v1/company/create", json=company_data)
    client.post("/api/v1/reviews/create", json=reviews_data)

    data = {
        "comment": "Updated comment"
    }

    response = client.patch("/api/v1/reviews/update/1", json=data)
    assert response.status_code == 200
    assert "reviews" in response.json

    updated_reviews = Reviews.query.get(1)
    assert updated_reviews.comment == data["comment"]


def test_update_reviews_not_found(client):
    data = {
        "comment": "Updated comment"
    }
    response = client.patch("/api/v1/reviews/update/999", json=data)
    assert response.status_code == 404
    assert "error" in response.json


def test_delete_reviews(client):
    company_data = {
        "name": "Acme Inc",
        "address": "123 Main St",
        "city": "Springfield",
        "state": "IL",
        "zip": 62701,
        "ownerId": 1
    }
    user_data = {
        "firstName": "John",
        "lastName": "Doe",
        "email": "JohnDoe@gmail.com"
    }
    reviews_data = {
        "comment": "This is a test review.",
        "companyId": 1
    }
    client.post("/api/v1/user/create", json=user_data)
    client.post("/api/v1/company/create", json=company_data)
    client.post("/api/v1/reviews/create", json=reviews_data)

    response = client.delete("/api/v1/reviews/delete/1")
    assert response.status_code == 200
    assert "message" in response.json

    reviews = Reviews.query.get(1)
    assert reviews is None


def test_delete_reviews_not_found(client):
    response = client.delete("/api/v1/reviews/delete/999")
    assert response.status_code == 404
    assert "error" in response.json
