from fastapi import FastAPI, File, UploadFile,Depends,Request
from typing import Annotated
from pydantic import BaseModel
from PDF_Reader import Reader
from pathlib import Path
import os
from Rag import insert
from pydantic import BaseModel
from fastapi.responses import JSONResponse
import jwt
from Database import chat, find
import json
import time
app = FastAPI()




path = Path('.')
@app.middleware("http")
async def Check_auth(request: Request, call_next):
    return await call_next(request)

@app.get("/")
async def root(s):
    return {"message": "Hello World"}
@app.get("/try")
async def root(s,user_agent:Request):
    return {"message": "Hello World", "user_agent": user_agent.headers}


@app.get("/query_chat")
async def query_(Query:str,Department:str,Email:str,Key:str, user_agent:Request):
    if(Query != ""):
        chat(Query, Email, Key,Department)
    a = find(Key)
    return a


@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile, Department:str, Email:str, Book_Name:str):
    os.makedirs("uploads", exist_ok=True)
    Path = os.getcwd()+f"/uploads/{file.filename}"
    with open(Path, "wb") as gf:
        gf.write(file.file.read())
    result = Reader(Path)
    insert(result, Department, Book_Name, Email)
    return Department



