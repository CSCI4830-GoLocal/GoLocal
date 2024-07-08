from flask import Blueprint


user_router = Blueprint("user", __name__, url_prefix="/user")


@user_router.route("/")
def users_main():
    return "users"
