import os
import unittest
from app.main import create_app

from flask import Flask
from flask_script import Manager
from app.main.service.startup_service import save_user_up

# Create a Flask app instance
app = create_app(os.getenv('APP_ENV') or 'dev')

# Import your blueprint
from app import blueprint

# Register the blueprint with the Flask app
app.register_blueprint(blueprint)

manager = Manager(app)

# Define your before_first_request function here
@app.before_first_request
def before_first_request():
    save_user_up()

# Define your manager commands here (run and test)

@manager.command
def run():
    app.run(debug=True)

@manager.command
def test():
    """Runs the unit tests."""
    tests = unittest.TestLoader().discover('app/test', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    return 1

if __name__ == '__main__':
    manager.run()
