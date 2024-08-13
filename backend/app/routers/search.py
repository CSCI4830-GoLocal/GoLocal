from flask import Blueprint, jsonify, request
from app.models.user import User
from app.models.post import Post
from app.models.company import Company
from app.config import db

search_router = Blueprint("search", __name__, url_prefix="/search")

@search_router.route("/", methods=["GET"])
def search():
    query = request.args.get("query", "")
    search_type = request.args.get("type", "users")
    
    results = {
        "users": [],
        "posts": [],
        "businesses": []
    }
    
    if query:
        if search_type == "users":
            users = User.query.filter(
                (User.first_name.ilike(f"%{query}%")) |
                (User.last_name.ilike(f"%{query}%")) |
                (User.email.ilike(f"%{query}%"))
            ).all()
            results["users"] = [user.to_json() for user in users]
        
        elif search_type == "posts":
            posts = Post.query.filter(
                Post.comment.ilike(f"%{query}%")
            ).all()
            results["posts"] = [post.to_json() for post in posts]
        
        elif search_type == "businesses":
            businesses = Company.query.filter(
                (Company.name.ilike(f"%{query}%")) |
                (Company.description.ilike(f"%{query}%"))
            ).all()
            results["businesses"] = [company.to_json() for company in businesses]
    
    return jsonify(results)
