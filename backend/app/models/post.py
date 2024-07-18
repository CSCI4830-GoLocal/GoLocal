from app.config import db

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(500), nullable=False)
    date_created = db.Column(db.DateTime, default=db.func.current_timestamp())
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'), nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "comment": self.comment,
            "dateCreated": self.date_created,
            "companyId": self.company_id
        }
