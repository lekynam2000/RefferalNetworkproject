import flask
import spacy
from collections import Counter
from string import punctuation
from flask import request
app = flask.Flask(__name__)
app.config["DEBUG"] = True
nlp = spacy.load("en_core_web_lg")

@app.route('/key_words', methods=['POST'])
def key_words():
    raw_content = request.json['content']
    result = []
    pos_tag = ['PROPN','NOUN'] # 1
    doc = nlp(raw_content.lower()) # 2
    for token in doc:
        # 3
        if(token.text in nlp.Defaults.stop_words or token.text in punctuation):
            continue
        # 4
        if(token.pos_ in pos_tag):
            result.append(token.text)
    return {'data':list(set(result))}

app.run(port=5002,ssl_context='adhoc')