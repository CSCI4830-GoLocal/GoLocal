from app.config import db

class Search(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    query = db.Column(db.String(255), nullable=False)
    results = db.Column(db.Text, nullable=False)  
    
    def __init__(self, query, results):
        self.query = query
        self.results = results
    
    def to_json(self):
        return {
            "id": self.id,
            "query": self.query,
            "results": self.results
        }
