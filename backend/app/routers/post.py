from flask import Blueprint, jsonify, request
from app.models.post import Post
from app.models.company import Company
from app.config import db

post_router = Blueprint("post", __name__, url_prefix="/post")

# This route will return a list of all posts in the database


@post_router.route("/list", methods=["GET"])
def list_posts():
    posts = Post.query.all()
    json_posts = [post.to_json() for post in posts]
    return jsonify({"posts": json_posts})

# This route will create a new post in the database


@post_router.route("/create", methods=["POST"])
def create_post():
    company_id = request.json.get("companyId")
    comment = request.json.get("comment")

    company = Company.query.get(company_id)

    if not company:
        return jsonify({"error": "Company not found"}), 404

    if not comment:
        return jsonify({"error": "Missing required fields"}), 400

    new_post = Post(
        company_id=company_id,
        comment=comment
    )

    try:
        db.session.add(new_post)
        db.session.commit()
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    return jsonify({"post": new_post.to_json()}), 201

# This route will update a post in the database


@post_router.route("/update/<int:post_id>", methods=["PATCH"])
def update_post(post_id):
    post = Post.query.get(post_id)

    if not post:
        return jsonify({"error": "Post not found"}), 404

    data = request.json
    post.comment = data.get("comment", post.comment)

    try:
        db.session.commit()
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    return jsonify({"post": post.to_json()})

# This route will delete a post from the database


@post_router.route("/delete/<int:post_id>", methods=["DELETE"])
def delete_post(post_id):
    post = Post.query.get(post_id)

    if not post:
        return jsonify({"error": "Post not found"}), 404

    try:
        db.session.delete(post)
        db.session.commit()
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    return jsonify({"message": "Post deleted"})
