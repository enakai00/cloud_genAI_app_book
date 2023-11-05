import json
import os
from flask import Flask, request
from vertexai.preview.language_models import TextGenerationModel

app = Flask(__name__)

generation_model = TextGenerationModel.from_pretrained('text-bison@001')


def get_response(prompt, temperature=0.2):
    response = generation_model.predict(
         prompt, temperature=temperature, max_output_tokens=1024)
    return response.text


@app.route('/api/correction', methods=['POST'])
def grammar_correction():
    json_data = request.get_json()
    text = json_data['text']
    # Join multple lines into a single line.
    text = ' '.join(text.splitlines())

    prompt = '''\
「text:」以下の英文を正しい英文法の文章に書き直してください。

text: {}
'''.format(text)
    corrected = get_response(prompt)

    prompt = '''\
「text:」以下の英文をより自然で洗練された英文に書き直した例を３つ示してください。

回答例
text: I went to school yesterday. I ate an apple for lunch. I like eat apple.
answer:
- I went to school yesterday. I had an apple for lunch. I love apples.
- Yesterday, I went to school. I had an apple for lunch. I really enjoy eating apples.
- Yesterday, I went to school. I had an apple for lunch. Apples are my favorite fruit.

次が本当の質問です。これに回答してください。
text: {}
answer:
'''.format(text)
    samples = get_response(prompt, temperature=0.4)

    resp = {
        'corrected': corrected,
        'samples': samples
    }

    return resp, 200


if __name__ == '__main__':
    # PORT is automatically set by Cloud Run service
    port = int(os.environ.get('PORT', 8080))
    debug = int(os.environ.get('DEBUG', 0))
    app.run(host='0.0.0.0', port=port, debug=debug)
