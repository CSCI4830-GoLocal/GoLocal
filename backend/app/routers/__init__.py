from .user import user_router
from .company import company_router
from .post import post_router
from .search import search_router  
from .reviews import reviews_router
from flask import Blueprint

# Main Router Blueprint
router = Blueprint("router", __name__, url_prefix="/api/v1")

# Registering the different routers
router.register_blueprint(user_router)
router.register_blueprint(company_router)
router.register_blueprint(post_router)
router.register_blueprint(search_router)  
router.register_blueprint(reviews_router)
