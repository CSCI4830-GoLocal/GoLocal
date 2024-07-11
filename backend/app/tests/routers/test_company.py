import json
from app.models.company import Company
from app.models.user import User
from app.config import db


def test_list_companies(client):
    response = client.get("/api/v1/company/list")

    assert response.status_code == 200
    assert "companies" in response.json


def test_create_company(client):
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
    create_user = client.post("/api/v1/user/create", json=user_data)
    response = client.post("/api/v1/company/create", json=company_data)
    assert response.status_code == 201
    assert "company" in response.json

    company = Company.query.filter_by(name=company_data["name"]).first()
    assert company.name == company_data["name"]
    assert company.address == company_data["address"]
    assert company.city == company_data["city"]
    assert company.state == company_data["state"]
    assert company.zip == company_data["zip"]
    assert company.owner_id == company_data["ownerId"]


def test_create_company_missing_fields(client):
    company_data = {
        "name": "Acme Inc"
    }
    user_data = {
        "firstName": "John",
        "lastName": "Doe",
        "email": "JohnDoe@gmail.com"
    }
    create_user = client.post("/api/v1/user/create", json=user_data)
    response = client.post("/api/v1/company/create", json=company_data)
    assert response.status_code == 400
    assert "error" in response.json


def test_create_company_without_owner(client):
    company_data = {
        "name": "Acme Inc",
        "address": "123 Main St",
        "city": "Springfield",
        "state": "IL",
        "zip": 62701,
        "ownerId": 1
    }
    response = client.post("/api/v1/company/create", json=company_data)
    assert response.status_code == 404
    assert "error" in response.json


def test_update_company(client):
    company = Company(name="Acme Inc", address="123 Main St", city="Springfield", state="IL", zip=62701, owner_id=1)
    db.session.add(company)
    db.session.commit()
    data = {
        "name": "Changed"
    }
    response = client.patch(f"/api/v1/company/update/{company.id}", json=data)
    assert response.status_code == 200
    assert "company" in response.json

    updated_company = Company.query.get(company.id)
    assert updated_company.name == data["name"]


def test_update_company_not_found(client):
    data = {
        "name": "Changed"
    }
    response = client.patch("/api/v1/company/update/999", json=data)
    assert response.status_code == 404
    assert "error" in response.json


def test_delete_company(client):
    company = Company(name="Acme Inc", address="123 Main St", city="Springfield", state="IL", zip=62701, owner_id=1)
    db.session.add(company)
    db.session.commit()

    response = client.delete(f"/api/v1/company/delete/{company.id}")
    assert response.status_code == 200
    assert "message" in response.json

    deleted_company = Company.query.get(company.id)
    assert deleted_company is None


def test_delete_company_not_found(client):
    response = client.delete("/api/v1/company/delete/999")
    assert response.status_code == 404
    assert "error" in response.json
