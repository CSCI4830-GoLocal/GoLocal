import json
from app.models.company import Company
from app.models.post import Post
from app.config import db


def test_list_posts(client):
    response = client.get("/api/v1/post/list")

    assert response.status_code == 200
    assert "posts" in response.json


def test_create_post(client):
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
    post_data = {
        "companyId": 1,
        "comment": "This is a test post."
    }
    client.post("/api/v1/user/create", json=user_data)
    client.post("/api/v1/company/create", json=company_data)
    response = client.post("/api/v1/post/create", json=post_data)
    assert response.status_code == 201
    assert "post" in response.json

    post = Post.query.filter_by(comment=post_data["comment"]).first()
    assert post.comment == post_data["comment"]
    assert post.company_id == post_data["companyId"]


def test_create_post_missing_fields(client):
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
    post_data = {
        "companyId": 1
    }
    client.post("/api/v1/user/create", json=user_data)
    client.post("/api/v1/company/create", json=company_data)
    response = client.post("/api/v1/post/create", json=post_data)

    assert response.status_code == 400
    assert "error" in response.json


def test_create_post_without_company(client):
    post_data = {
        "companyId": 999,
        "comment": "This is a test post."
    }
    response = client.post("/api/v1/post/create", json=post_data)
    assert response.status_code == 404
    assert "error" in response.json


def test_update_post(client):
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
    post_data = {
        "comment": "This is a test post.",
        "companyId": 1
    }
    client.post("/api/v1/user/create", json=user_data)
    client.post("/api/v1/company/create", json=company_data)
    client.post("/api/v1/post/create", json=post_data)

    data = {
        "comment": "Updated comment"
    }

    response = client.patch("/api/v1/post/update/1", json=data)
    assert response.status_code == 200
    assert "post" in response.json

    updated_post = Post.query.get(1)
    assert updated_post.comment == data["comment"]


def test_update_post_not_found(client):
    data = {
        "comment": "Updated comment"
    }
    response = client.patch("/api/v1/post/update/999", json=data)
    assert response.status_code == 404
    assert "error" in response.json


def test_delete_post(client):
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
    post_data = {
        "comment": "This is a test post.",
        "companyId": 1
    }
    client.post("/api/v1/user/create", json=user_data)
    client.post("/api/v1/company/create", json=company_data)
    client.post("/api/v1/post/create", json=post_data)

    response = client.delete("/api/v1/post/delete/1")
    assert response.status_code == 200
    assert "message" in response.json

    post = Post.query.get(1)
    assert post is None


def test_delete_post_not_found(client):
    response = client.delete("/api/v1/post/delete/999")
    assert response.status_code == 404
    assert "error" in response.json
