import os
import getpass
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.schema import AIMessage, HumanMessage, SystemMessage
from dotenv import load_dotenv
import urllib
from langchain_mongodb.chat_message_histories import MongoDBChatMessageHistory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from Rag import retriver
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
import time
load_dotenv()

if "GOOGLE_API_KEY" not in os.environ:
    os.environ["GOOGLE_API_KEY"] = getpass.getpass(os.getenv("GOOGLE_API_KEY"))


LLM = ChatGoogleGenerativeAI(model="gemini-1.5-flash")

def query_generator_llm( User_Name, Query):
    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", """Compose a question based on the provided user prompt and conversation log to ensure the most pertinent information is extracted from the knowledge base for the user's answer. You are instructed to follow the below instructions when generating the question:
            - Prioritize the human input at all times, giving it precedence over the conversation log.
            - Disregard any conversation log that does not directly pertain to the human input.
            - Respond only when a question has been explicitly posed.
            - Frame the question as a single sentence.
            """),
            MessagesPlaceholder(variable_name="history"),
            ("human", "{question}"),
        ]
    )

    chain = prompt | LLM
    chain_with_history = RunnableWithMessageHistory(
        chain,
        lambda session_id: MongoDBChatMessageHistory(
    session_id="test_session",
    connection_string="ENTER CONNECTION URL"
    database_name="ChatHistory",
    collection_name="Chat",
),
        input_messages_key="question",
        history_messages_key="history",
    )

    config = {"configurable": {"session_id": f"{User_Name}"}}
    result = chain_with_history.invoke({"question": Query}, config=config)
    return result.content

def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

def answer_questions(query,department, email):
    formed_question = query_generator_llm(email,query)
    chat_message_history = MongoDBChatMessageHistory(
    session_id="test_session",
     connection_string="ENTER CONNECTION URL"
    database_name="ChatHistory",
    collection_name="Chat",
    )
    template = """You are a question answering bot. You will be given 
    a QUESTION and a set of paragraphs in the CONTENT section. You need 
    to answer the question using the text present in the CONTENT section. 
    If the answer is not present in the CONTENT text then reply 
    `I don't have answer of this question`
    CONTENT: {document}
    Question: {question}
    """
    prompt = ChatPromptTemplate.from_template(template)
    qa_chain = (
            {
                "document": retriver(department) | format_docs,
                "question": RunnablePassthrough(),
            }
            | prompt
            | LLM
            | StrOutputParser()
    )
    result = qa_chain.invoke(formed_question)
    chat_message_history.add_user_message(formed_question)
    chat_message_history.add_ai_message(result)
    return result



