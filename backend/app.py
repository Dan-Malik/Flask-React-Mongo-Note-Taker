from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from bson.objectid import ObjectId
from pymongo.collection import ReturnDocument
import pymongo, datetime, credentials, json

app = Flask(__name__)
CORS(app)
client = pymongo.MongoClient(credentials.data['mongo_uri'])
db = client.note_db
collection = db.notes

def format_mongo_dict(dict):
	for key, value in dict.items():
		if(type(value)== ObjectId):
			dict[key] = str(value)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/notes', methods=['GET', 'POST'])
def get_notes():
    if(request.method == 'POST'):
        newNote = {"noteTitle":request.json['noteTitle'], "noteContent":request.json['noteContent'], "dateCreated":datetime.datetime.utcnow()}
        newCreatedNoteId = collection.insert_one(newNote).inserted_id
        print (newCreatedNoteId)
        return jsonify({'new note':str(newCreatedNoteId)}), 200
    
    if(request.method == 'GET'):
        output = []
        for note in collection.find():
        	format_mongo_dict(note)
        	output.append(note)
        
        return jsonify({'notes': output}), 200

@app.route('/notes/<note_id>', methods=['GET','DELETE','PUT'])
def get_note(note_id):
	if(not ObjectId.is_valid(note_id)):
		abort(404)
	if(request.method == 'GET'):
		note = collection.find_one({'_id':ObjectId(note_id)})
		format_mongo_dict(note)
		if(note):
			return jsonify(note), 200
		else:
			abort(404)
	if(request.method=='DELETE'):
		if(collection.delete_one({'_id':ObjectId(note_id)}).deleted_count > 0):
			return 'Note %s deleted!' % (note_id), 200
		else:
			abort(404)
	if(request.method =='PUT'):
		if(request.json['noteTitle'] and request.json['noteContent']):
			updatedNote = collection.find_one_and_update({'_id':ObjectId(note_id)}, {'$set':{'noteTitle':request.json['noteTitle'],'noteContent':request.json['noteContent']}}, return_document=ReturnDocument.AFTER)
			format_mongo_dict(updatedNote)
			return jsonify(updatedNote), 200
		else:
			abort(404)

if __name__ == '__main__':
    app.run(debug = False)
