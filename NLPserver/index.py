import sys
import spacy
from collections import Counter
from string import punctuation


nlp = spacy.load("en_core_web_md")


def key_words(raw_content):
    
    result = []
    pos_tag = ['PROPN', 'NOUN'] # 1
    doc = nlp(raw_content.lower()) # 2
    for token in doc:
        # 3
        if(token.text in nlp.Defaults.stop_words or token.text in punctuation):
            continue
        # 4
        if(token.pos_ in pos_tag):
            result.append(token.text)
    return result
print((',').join(key_words(sys.argv[1])))