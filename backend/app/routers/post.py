from flask import Blueprint, jsonify, request
from app.models.post import Post
from app.models.company import Company
from app.config import db

post_router = Blueprint("post", __name__, url_prefix="/post")

# This route will return a list of all posts in the database
@post_router.route("/list", methods=["GET"])
def list_posts():
    """
    List all posts
    ---
    responses:
        200:
            description: a list of posts
            type: json
            properties:
                id:
                    type: integer
                comment:
                    type: string
                dateCreated:
                    type: datetime
                companyId:
                    type: integer
    """
    posts = Post.query.all()
    json_posts = [post.to_json() for post in posts]
    return jsonify({"posts": json_posts})

# This route will create a new post in the database
@post_router.route("/create", methods=["POST"])
def create_post():
    """
    Create a new post
    ---
    responses:
        201:
            description: The newly created post
            type: json
            properties:
                id:
                    type: integer
                comment:
                    type: string
                dateCreated:
                    type: datetime
                companyId:
                    type: integer
        404:
            description: Company not found
            schema:
            type: json
            properties:
                error:
                    type: string
        400:
            description: Missing required fields
            schema:
            type: json
            properties:
                error:
                    type: string
    """
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
    """
    Update a post
    ---
    responses:
        201:
            description: The newly updated post
            type: json
            properties:
                id:
                    type: integer
                comment:
                    type: string
                dateCreated:
                    type: datetime
                companyId:
                    type: integer
        400:
            description: Error
            type: json
            properties:
                error:
                    type: string
        404:
            description: Post not found
            type: json
            properties:
                error:
                    type: string
    """
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
    """
    Delete a post
    ---
    responses:
        201:
            description: A message indicating the post was deleted
            type: json
            properties:
                message:
                    type: string
        400:
            description: Error
            type: json
            properties:
                error:
                    type: string
        404:
            description: Post not found
            type: json
            properties:
                error:
                    type: string
    """
    post = Post.query.get(post_id)

    if not post:
        return jsonify({"error": "Post not found"}), 404

    try:
        db.session.delete(post)
        db.session.commit()
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    return jsonify({"message": "Post deleted"})
