import pymongo
import urllib
from Chat_bot import answer_questions
from datetime import datetime
Client = "ENTER CONNECTION URL"
DB = Client["ChatHistory"]
Collection = DB["AI_USER_CONVO"]

def chat(query, email,Key,department):
        response = answer_questions(query, department, email)
        if(collection.find({"Email":email}).to_list()==[]):
                dict = {
                        "Email": f"{email}",
                        "Chat_Date": [
                                {
                                        "Key": f"{Key}",
                                        "message": [{
                                                "Human": f"{query}",
                                                "AI": f"{response}"

                                        }
                                        ]
                                }
                        ]

                }
                collection.insert_one(dict)
        elif(collection.find({"Chat_Date": {"$elemMatch": {"Key": f"{Key}"}}}).to_list()==[]):
            Query = {"Key": f"{Key}", "message": [{"Human": f"{query}","AI": f"{response}"}]}
            collection.update_many({"Email": email},
                                  {"$push": {"Chat_Date": Query}})
        else:
            collection.update_many({"Chat_Date": {"$elemMatch": {"Key": f"{Key}"}}},
                                       {"$push": {"Chat_Date.$.message": {
                                               "Human": f"{query}",
                                               "AI": f"{response}"
                                       }}})

        return

def find(Key):
    try:
        response = collection.find({"Chat_Date": {"$elemMatch": {"Key": f"{Key}"}}}, {"Chat_Date.message.$": 1, "_id": 0})
        return  (response[0]['Chat_Date'][0]['message'])
    except:
        return[]

