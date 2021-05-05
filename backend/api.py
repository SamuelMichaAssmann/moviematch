import flask
import time

app = flask.Flask("__main__")

@app.route("/api")
def version():
    return "Api v0.1.0"

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}
    
if __name__ == "__main__":
    app.run(port=5000, debug=True)
