import json
import os
import tempfile
from cloudevents.http import from_http
from flask import Flask, request

app = Flask(__name__)


# This handler is triggered by storage events
@app.route('/api/post', methods=['POST'])
def process_event():
    event = from_http(request.headers, request.data)

    print('Event contents: {}'.format(event))

    event_id = event['id']
    bucket_name = event.data['bucket']
    filepath = event.data['name']
    content_type = event.data['contentType']

    print('Event ID: {}'.format(event_id))
    print('Butcket name: {}'.format(bucket_name))
    print('Filepath: {}'.format(filepath))
    print('Content type: {}'.format(content_type))

    return ('Succeeded', 200)
