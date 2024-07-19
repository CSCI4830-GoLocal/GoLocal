from flask import Blueprint, jsonify, request
from app.models.reviews import Reviews
from app.models.company import Company
from app.models.user import User
from app.config import db


reviews_router = Blueprint("reviews", __name__, url_prefix="/reviews")


# This route will return a list of all reviews in the database


@reviews_router.route("/list", methods=["GET"])
def list_reviews():
   reviews = Reviews.query.all()
   json_reviews = [reviews.to_json() for review in reviews]
   return jsonify({"reviews": json_reviews})


# This route will create a new review in the database


@reviews_router.route("/create", methods=["POST"])
def create_reviews():
   company_id = request.json.get("companyId")
   comment = request.json.get("comment")
   stars = request.json.get("stars")
   user_id = request.json.get("user_id")

   company = Company.query.get(company_id)

   if not company:
       return jsonify({"error": "Company not found"}), 404

   if not comment:
       return jsonify({"error": "Missing required fields"}), 400

   new_reviews = Reviews(
       company_id=company_id,
       comment=comment,
       stars = stars,
       user_id = user_id
   )

   try:
       db.session.add(new_reviews)
       db.session.commit()
   except Exception as e:
       return jsonify({"error": str(e)}), 400

   return jsonify({"reviews": new_reviews.to_json()}), 201


# This route will update a review in the database


@reviews_router.route("/update/<int:reviews_id>", methods=["PATCH"])
def update_reviews(reviews_id):
   reviews = Reviews.query.get(reviews_id)

   if not reviews:
       return jsonify({"error": "Review not found"}), 404

   data = request.json
   reviews.comment = data.get("comment", reviews.comment)

   try:
       db.session.commit()
   except Exception as e:
       return jsonify({"error": str(e)}), 400

   return jsonify({"reviews": reviews.to_json()})


# This route will delete a post from the database


@reviews_router.route("/delete/<int:reviews_id>", methods=["DELETE"])
def delete_reviews(reviews_id):
   reviews = Reviews.query.get(reviews_id)

   if not reviews:
       return jsonify({"error": "Review not found"}), 404

   try:
       db.session.delete(reviews)
       db.session.commit()
   except Exception as e:
       return jsonify({"error": str(e)}), 400

   return jsonify({"message": "Review deleted"})
