# app.py
from flask import Flask
from flasgger import Swagger, LazyJSONEncoder
from app.models import db
from app.routes import scales_bp
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
app.json_encoder = LazyJSONEncoder

# DB config
app.config['SQLALCHEMY_DATABASE_URI'] = (
    f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}"
    f"@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Swagger/OpenAPI template
swagger_template = {
    "openapi": "3.0.0",
    "info": {
        "title": "Scales Service API",
        "version": "1.0.0",
        "description": "Swagger docs for Scales Service"
    },
    "servers": [
        {"url": "http://localhost:5001/api", "description": "Local QA"}
    ],
    "components": {
        "schemas": {
            "Scale": {
                "type": "object",
                "required": ["id","name","type","notes"],
                "properties": {
                    "id": {
                        "type": "integer",
                        "description": "Unique identifier",
                        "example": 1
                    },
                    "name": {
                        "type": "string",
                        "description": "Scale name",
                        "example": "Major Scale"
                    },
                    "type": {
                        "type": "string",
                        "description": "Scale type",
                        "example": "major"
                    },
                    "notes": {
                        "type": "string",
                        "description": "Comma-separated notes",
                        "example": "C,D,E,F,G,A,B"
                    }
                }
            }
        }
    }
}

# Initialize extensions
db.init_app(app)
swagger = Swagger(app, template=swagger_template)

# Register blueprint under /api
app.register_blueprint(scales_bp, url_prefix="/api/scales")

@app.route('/')
def index():
    return "Scales Service Running"

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5001)
