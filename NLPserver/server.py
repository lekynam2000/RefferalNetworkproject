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
    print("called")
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
@app.route('/compare',methods=['POST'])
def compare():
    
    set1 = request.json['searching']
    set2 = request.json['content']
    
    tokens1 = nlp(set1)
    tokens2 = nlp(set2)
    
    similarity = 0
    for token1 in tokens1:
        if(not token1.has_vector)or token1.is_oov:
            continue
        local_sim = 0
        counter = 0
        for token2 in tokens2:
            if (not token2.has_vector) or token2.is_oov:
              
                continue 
            sim_2_token = token1.similarity(token2)
            if(sim_2_token>0.45):
                local_sim += sim_2_token
                counter += 1
            if(counter==5):
                break
        
        
        if(local_sim==0):
            similarity = 0
        else:
            similarity += local_sim
    # print(set1)
    # print(set2)
    return {'similarity':similarity} 
app.run(port=5002,ssl_context='adhoc')