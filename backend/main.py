import flask

app = flask.Flask("__main__")

@app.route("/")
def my_index():
    return flask.render_template("index.html", token="MovieMatch")

app.run(debug=True)

#!/usr/bin/env python3
from flask import Flask, request, jsonify, Response
import uuid

app = Flask(__name__)
autos = []

@app.route('/autos')
def get_autos():
  return jsonify({'gebrauchtwagen': autos})

def checkPostObjekt(post_objekt):
  regeln = [len(post_objekt) == 3,
          'modell' in post_objekt,
          'preis' in post_objekt,
          'baujahr' in post_objekt]
  if all(regeln):
    return True
  else:
    return False

@app.route('/autos', methods=['POST'])
def add_auto():
  post_content = request.get_json()
  if checkPostObjekt(post_content):
    post_content['id'] = uuid.uuid4().hex
    autos.append(post_content)
    success = Response('', status=201)
    success.headers['Location'] = '/autos/' + post_content['id']
    return success
  else:
    failure = Response('', status=400)
    return failure

@app.route('/autos/')
def auto_by_id(id):
  return_object = {}
  for auto in autos:
    if auto['id'] == id:
      return_object = auto
  if not return_object:
    failure = Response('', status=400)
    return failure
  else:
    return jsonify(return_object)

app.run(port=5000)