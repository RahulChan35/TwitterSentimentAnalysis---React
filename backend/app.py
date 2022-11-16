from nntplib import ArticleInfo
from attr import field
from flask import Flask, jsonify, request,redirect, url_for,json
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import datetime


from textblob import TextBlob
import sys
import tweepy
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import os
import nltk
import re
import string
from PIL import Image
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.stem import SnowballStemmer
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from sklearn.feature_extraction.text import CountVectorizer


app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:20rahul02@localhost/twittersentimentanalysis'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50))
    password = db.Column(db.String(20))
    date = db.Column(db.DateTime, default=datetime.datetime.now)

    def __init__(self, email, password):
        self.email = email
        self.password = password


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'email', 'password', 'date')


user_schema = UserSchema()
users_schema = UserSchema(many=True)


consumerKey = "4FYAGbJvrWYfPa7qt1W5tf9aG"
consumerSecret = "uPlGkjdjxBf7Nys0p2RlY1LwPEM84sKyZDLZt0I7Mp5B8IxwTV"
accessToken = "1556649440320311296-GkYXAUHhJbQgC5co0Bxy5eIkMaxbWv"
accessTokenSecret = "MEP8KJikDpVPmU440N5faVy4AV6ff1FSFbxhCgjtLgRmT"
auth = tweepy.OAuthHandler(consumerKey, consumerSecret)
auth.set_access_token(accessToken, accessTokenSecret)
api = tweepy.API(auth)


def percentage(part, whole):
    return 100 * float(part)/float(whole)



@app.route("/data",methods=["POST"])
def get_data():
    if request.method=='POST':
        keyword=request.json['keyword']
        noOfTweet=int(request.json['nooftweets'])

        tweets = tweepy.Cursor(api.search_tweets, q=keyword).items(noOfTweet)
        positive = 0
        negative = 0
        neutral = 0
        polarity = 0
        tweet_list = []
        neutral_list = []
        negative_list = []
        positive_list = []

        for tweet in tweets:
            tweet_list.append(tweet.text)
            analysis = TextBlob(tweet.text)
            score = SentimentIntensityAnalyzer().polarity_scores(tweet.text)
            neg = score['neg']
            neu = score['neu']
            pos = score['pos']
            comp = score['compound']
            polarity += analysis.sentiment.polarity

            if neg > pos:
                negative_list.append(tweet.text)
                negative += 1

            elif pos > neg:
                positive_list.append(tweet.text)
                positive += 1

            elif pos == neg:
                neutral_list.append(tweet.text)
                neutral += 1

        positive = percentage(positive, noOfTweet)
        negative = percentage(negative, noOfTweet)
        neutral = percentage(neutral, noOfTweet)
        polarity = percentage(polarity, noOfTweet)
        positive = format(positive, '.1f')
        negative = format(negative, '.1f')
        neutral = format(neutral, '.1f')

        tweet_list = pd.DataFrame(tweet_list)
        neutral_list = pd.DataFrame(neutral_list)
        negative_list = pd.DataFrame(negative_list)
        positive_list = pd.DataFrame(positive_list)
        # print("total number: ", len(tweet_list))
        # print("positive number: ", len(positive_list))
        # print("negative number: ", len(negative_list))
        # print("neutral number: ", len(neutral_list))

        labels = ['Positive ['+str(positive)+'%]', 'Neutral [' +
          str(neutral)+'%]', 'Negative ['+str(negative)+'%]']
        sizes = [positive, neutral, negative]
        colors = ['yellowgreen', 'blue', 'red']
        patches, texts = plt.pie(sizes, colors=colors, startangle=90)
        plt.style.use('default')
        plt.legend(labels)
        plt.title("Sentiment Analysis Result for keyword= "+keyword+"")
        plt.axis('equal')
        return jsonify({"positive":len(positive_list),"negative":len(negative_list),"neutral":len(neutral_list),"pos_percent":positive,"neg_percent":negative})
    else:
        return 0;
    

# @app.route("/get/<id>/",methods=["GET"])
# def get_user_by_id(id):
#     user=User.query.get(id)
#     return user_schema.jsonify(user)


# @app.route("/add",methods=["POST"])
# def add_user():
#     email=request.json['email']
#     password=request.json['password']
#     user=User(email,password)
#     db.session.add(user)
#     db.session.commit()
#     return user_schema.jsonify(user)


# @app.route("/update/<id>/",methods=["PUT"])
# def update(id):
#     user=User.query.get(id);

#     email=request.json['email']
#     password=request.json['password']

#     user.email=email
#     user.password=password

#     db.session.commit()
#     return user_schema.jsonify(user)


# @app.route("/delete/<id>/",methods=["DELETE"])
# def delete(id):
#     user=User.query.get(id)
#     db.session.delete(user)
#     db.session.commit()
#     return user_schema.jsonify(user)


if __name__ == "__main__":
    app.run(debug=True)
