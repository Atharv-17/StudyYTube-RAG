from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv
import os

load_dotenv()

def get_llm():
    api_key = os.getenv("GROQ_API_KEY")
    llm=ChatGroq(
        model="llama-3.1-8b-instant",
        api_key=api_key
    )
    
    return llm


def get_answer(query, retriever):

    context="\n\n".join([doc.page_content for doc in retriever.invoke(query)])

    prompt=PromptTemplate(
        template="""You are a helpful assistant that answers questions based on a YouTube video transcript.\n
        If you don't get anything related to the question just say that its not involded in the video.\n
        Context from the video:\n
        {context}\n
        User Question:\n {question} \n
        Answer:""",
        input_variables=['context', 'question']
    )
    formatted_prompt=prompt.format(context=context,question=query)
    llm=get_llm()
    result=llm.invoke(formatted_prompt)

    return result.content
