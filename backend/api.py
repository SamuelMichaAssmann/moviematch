import flask
import time
from src.algo import matchfilm

app = flask.Flask("__main__")

@app.route("/api")
def version():
    return "Api v0.1.0"

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/api/match')
def getMovieData():
    return matchfilm()
    
if __name__ == "__main__":
    app.run(port=5000, debug=True)
