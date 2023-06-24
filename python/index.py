from flask import Flask,jsonify
from flask import request

app = Flask(__name__)
from app.processing import model,final_data,cosine_similarity,embeddings,pd

@app.route("/recommend",methods = ['POST'])
def home():
    course_title = request.get_json()["courseTitle"]["course"]
    q =model.encode([course_title])
    scores = []
    for i in range(len(final_data)):
        scores.append(cosine_similarity(embeddings[i].reshape(1,-1),q[0].reshape(1,-1))[0][0])

    df = pd.DataFrame(scores, columns=['Value'])

    index = df["Value"].sort_values(ascending=False).index.tolist()[0:5]
    print(":::::::::::::::::::::result::::::::::::::::::")
    print(final_data.iloc[index])
    response = final_data.iloc[index]
    json_data = response.to_json(orient='records')
    return jsonify(json_data)

print(":::::::")

# main driver function
if __name__ == '__main__':
    app.run()