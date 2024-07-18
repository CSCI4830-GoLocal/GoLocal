import json
from app.models.company import Company
from app.models.post import Post
from app.config import db

def test_list_posts(client):
    response = client.get("/post/list")

    assert response.status_code == 200
    assert "posts" in response.json

def test_create_post(client):
    company_data = {
        "name": "Acme Inc",
        "address": "123 Main St",
        "city": "Springfield",
        "state": "IL",
        "zip": 62701
    }
    post_data = {
        "companyId": 1,
        "comment": "This is a test post."
    }
    
    create_company = client.post("/company/create", json=company_data)
    response = client.post("/post/create", json=post_data)
    assert response.status_code == 201
    assert "post" in response.json

    post = Post.query.filter_by(comment=post_data["comment"]).first()
    assert post.comment == post_data["comment"]
    assert post.company_id == post_data["companyId"]

def test_create_post_missing_fields(client):
    post_data = {
        "comment": "This is a test post."
    }
    response = client.post("/post/create", json=post_data)
    assert response.status_code == 400
    assert "error" in response.json

def test_create_post_without_company(client):
    post_data = {
        "companyId": 999,
        "comment": "This is a test post."
    }
    response = client.post("/post/create", json=post_data)
    assert response.status_code == 404
    assert "error" in response.json

def test_update_post(client):
    company = Company(name="Acme Inc", address="123 Main St", city="Springfield", state="IL", zip=62701)
    db.session.add(company)
    db.session.commit()
    post = Post(comment="This is a test post.", company_id=company.id)
    db.session.add(post)
    db.session.commit()

    data = {
        "comment": "Updated comment"
    }
    response = client.patch(f"/post/update/{post.id}", json=data)
    assert response.status_code == 200
    assert "post" in response.json

    updated_post = Post.query.get(post.id)
    assert updated_post.comment == data["comment"]

def test_update_post_not_found(client):
    data = {
        "comment": "Updated comment"
    }
    response = client.patch("/post/update/999", json=data)
    assert response.status_code == 404
    assert "error" in response.json

def test_delete_post(client):
    company = Company(name="Acme Inc", address="123 Main St", city="Springfield", state="IL", zip=62701)
    db.session.add(company)
    db.session.commit()
    post = Post(comment="This is a test post.", company_id=company.id)
    db.session.add(post)
    db.session.commit()

    response = client.delete(f"/post/delete/{post.id}")
    assert response.status_code == 200
    assert "message" in response.json

    deleted_post = Post.query.get(post.id)
    assert deleted_post is None

def test_delete_post_not_found(client):
    response = client.delete("/post/delete/999")
    assert response.status_code == 404
    assert "error" in response.json
