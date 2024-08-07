from app.config import db


class Reviews(db.Model):
   id = db.Column(db.Integer, primary_key=True)
   comment = db.Column(db.String(500), nullable=False)
   stars = db.Column(db.Integer, nullable=False)
   date_created = db.Column(db.DateTime, default=db.func.current_timestamp())
   user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
   company_id = db.Column(db.Integer, db.ForeignKey(
       'company.id'), nullable=False)

   def to_json(self):
       return {
           "id": self.id,
           "comment": self.comment,
           "stars": self.stars,
           "dateCreated": self.date_created,
           "user_id": self.user_id,
           "companyId": self.company_id
       }
