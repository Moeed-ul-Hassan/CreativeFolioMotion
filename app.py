import os
from flask import Flask, render_template, send_from_directory, redirect
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)
app = Flask(__name__, 
    static_folder='.',  # Serve static files from root directory
    static_url_path=''  # No prefix for static files
)
app.secret_key = os.environ.get("SESSION_SECRET")

# Configure the SQLAlchemy part
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_recycle": 300,
    "pool_pre_ping": True,
}

db.init_app(app)

@app.route('/')
def index():
    return app.send_static_file('index.html')

# Add route to serve profile image from URL
@app.route('/profile-image')
def profile_image():
    # Redirect to the image URL
    return redirect('https://i.ibb.co/jX8twLP/Whats-App-Image-2025-03-09-at-9-47-18-PM.jpg')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)