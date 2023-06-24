import numpy as np
from sentence_transformers import SentenceTransformer
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.cluster import KMeans
from sklearn.metrics.pairwise import cosine_similarity

import spacy
nlp = spacy.load("en_core_web_sm")

data = pd.read_csv("./dataset/udemy_courses.csv")

def remove_stopword(val):
    doc = nlp(val)
    tokenized_text = [token.text for token in doc if not token.is_stop]
    tokenized_text = ' '.join(tokenized_text)
    return tokenized_text

def lemitize_words(val):
    doc = nlp(val)
    lemitized_text = [token.lemma_ for token in doc]
    lemitized_text = ' '.join(lemitized_text)
    return lemitized_text



final_data = data[["course_title","subject","num_subscribers","num_reviews","level","url","content_duration"]]

final_data["course_title"] = final_data["course_title"].replace(r"[$&+,:;=?@#|'<>.^*()%!-]"," ",regex=True)
final_data["course_title"] = final_data["course_title"].apply(remove_stopword)
final_data["course_title"] = final_data["course_title"].apply(lemitize_words)

course_title_array = np.array(final_data["course_title"])

text_data = course_title_array
model = SentenceTransformer('distilbert-base-nli-mean-tokens')
embeddings = model.encode(text_data, show_progress_bar=True)

# find the similarity between all the courses
course_title_vectordata = np.array(embeddings)
cos_sim_data = pd.DataFrame(cosine_similarity(course_title_vectordata))


def give_recommendations(index,print_recommendation = False):
    
    index_recomm =cos_sim_data.loc[index].sort_values(ascending=False).index.tolist()[1:6]
  
    recomm_ =  final_data['course_title'].loc[index_recomm].values
    result = {'Courses':recomm_,'Index':index_recomm}
    
    if print_recommendation==True:
        print('The selected course is this one: %s \n'%(final_data['course_title'].loc[index]))
        k=1
        for course in recomm_:
            print('The number %i recommended course is this one: %s \n'%(k,course))
    return result

# q =model.encode(["web development course using node and angular"])
# scores = []
# for i in range(len(final_data)):
#     scores.append(cosine_similarity(embeddings[i].reshape(1,-1),q[0].reshape(1,-1))[0][0])

# df = pd.DataFrame(scores, columns=['Value'])

# index = df["Value"].sort_values(ascending=False).index.tolist()[0:5]
# print(":::::::::::::::::::::result::::::::::::::::::")
# print(final_data.iloc[index])

