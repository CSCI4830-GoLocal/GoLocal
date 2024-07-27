from flask import Blueprint, jsonify, request
from app.models.user import User
from app.config import db


user_router = Blueprint("user", __name__, url_prefix="/user")


# This route will return a list of all users in the database
@user_router.route("/list", methods=["GET"])
def list_users():
    """
    List all users
    ---
    responses:
        200:
            description: A list of all users
            schema:
            type: json
            properties:
                id:
                    type: integer
                firstName:
                    type: string
                lastName:
                    type: string
                email:
                    type: string
                password:
                    type: string
                dateCreated:
                    type: datetime
                isOwner:
                    type: boolean
    """
    users = User.query.all()
    json_users = list(map(lambda user: user.to_json(), users))
    return jsonify({"users": json_users})


# This route will create a new user in the database
@user_router.route("/create", methods=["POST"])
def create_user():
    """
    Create a new user
    ---
    responses:
        201:
            description: The newly created user
            type: json
            properties:
                id:
                    type: integer
                firstName:
                    type: string
                lastName:
                    type: string
                email:
                    type: string
                password:
                    type: string
                dateCreated:
                    type: datetime
                isOwner:
                    type: boolean
        400:
            description: Missing required fields
            type: json
            properties:
                error:
                    type: string
    """
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")
    password = request.json.get("password")
    is_owner = request.json.get("isOwner")

    if not first_name or not last_name or not email or not password:
        return jsonify({"error": "Missing required fields"}), 400

    new_user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=password,
        is_owner=is_owner
    )

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    return jsonify({"user": new_user.to_json()}), 201


# This route will update a user in the database
@user_router.route("/update/<int:user_id>", methods=["PATCH"])
def update_user(user_id):
    """
    Update an existing user
    ---
    responses:
        201:
            description: The updated user
            type: json
            properties:
                id:
                    type: integer
                firstName:
                    type: string
                lastName:
                    type: string
                email:
                    type: string
                password:
                    type: string
                dateCreated:
                    type: datetime
                isOwner:
                    type: boolean
        400:
            description: Error
            type: json
            properties:
                error:
                    type: string

    """
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.json
    user.first_name = data.get("firstName", user.first_name)
    user.last_name = data.get("lastName", user.last_name)
    user.email = data.get("email", user.email)
    user.password = data.get("password", user.password)
    user.is_owner = data.get("isOwner", user.is_owner)

    try:
        db.session.commit()
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    return jsonify({"user": user.to_json()})


# This route will delete a user from the database
@user_router.route("/delete/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    """
    Create a new user
    ---
    responses:
        200:
            description: A message confirming the user was deleted
            type: json
            properties:
                message:
                    type: string
        400:
            description: Missing required fields
            type: json
            properties:
                error:
                    type: string
        404:
            description: User not found
            type: json
            properties:
                error:
                    type: string

    """
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    try:
        db.session.delete(user)
        db.session.commit()
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    return jsonify({"message": "User deleted"})
