from pinecone import Pinecone
import os
import getpass
from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from PDF_Reader import Reader
from uuid import uuid4
from langchain_core.documents import Document
from langchain_pinecone import PineconeVectorStore
from langchain.text_splitter import RecursiveCharacterTextSplitter

load_dotenv()

if not os.getenv("PINECONE_API_KEY"):
    os.environ["PINECONE_API_KEY"] = getpass.getpass(os.getenv("GOOGLE_API_KEY"))

pinecone_api_key = os.environ.get("PINECONE_API_KEY")
pc = Pinecone(api_key=pinecone_api_key)
index_name = "study-helper"
index = pc.Index(index_name)
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
vector_store = PineconeVectorStore(index=index, embedding=embeddings)

def insert(docs, department, book_Name, email):
    try:
        Pages = []
        for i, doc in enumerate(docs):
            page = RecursiveCharacterTextSplitter(doc, chunk_size=1000, chunk_overlap=200)
            document = Document(
            page_content=doc,
            metadata={"Source": department, "Book_Name": book_Name, "Email": email, "Page_no": i+1})
            Pages.append(document)
        uuids = [department+str(uuid4()) for _ in range(len(Pages))]
        vector_store.add_documents(documents=Pages, ids=uuids)
        return "Errorless"
    except:
        return "Error"

def retriver(department):
    return vector_store.as_retriever(search_type="mmr",
    search_kwargs={ 'k': 2,
        'filter': {"Source": department}
})



