import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    # 1. Lee credenciales de MySQL de variables de entorno
    DB_USER = os.getenv("DB_USER")
    DB_PASS = os.getenv("DB_PASS")
    DB_HOST = os.getenv("DB_HOST")
    DB_PORT = os.getenv("DB_PORT")
    DB_NAME = os.getenv("DB_NAME")

    # 2. Configura SQLAlchemy para MySQL remoto
    app.config["SQLALCHEMY_DATABASE_URI"] = (
        f"mysql+pymysql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # 3. Inicializa la extensión
    db.init_app(app)

    # 4. Registra tu blueprint de rutas
    from app.routes.glossary_routes import glossary_bp
    app.register_blueprint(glossary_bp, url_prefix="/api/glossary")

    return app
