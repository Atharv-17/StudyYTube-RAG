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
    template="""
You are an AI assistant that helps students understand and take notes from a YouTube video.

STRICT RULES:
1. Answer ONLY using the provided context.
2. If the answer is not present in the context, say:
   "This topic is not covered in the video."
3. Do NOT make up information.

RESPONSE STYLE (VERY IMPORTANT):
- Write in a way that students can take notes easily
- Use clear headings
- Use bullet points wherever possible
- Keep explanations simple and structured
- Highlight key concepts

CONTEXT:
{context}

QUESTION:
{question}

ANSWER FORMAT:

### 📌 Answer
(Direct answer in simple terms)

### 🧠 Key Points
- Point 1
- Point 2
- Point 3

### 📖 Explanation
(Short explanation based only on context)

### ✍️ Quick Notes (for revision)
- Important takeaway 1
- Important takeaway 2

""",
    input_variables=["context", "question"]
)
    formatted_prompt=prompt.format(context=context,question=query)
    llm=get_llm()
    result=llm.invoke(formatted_prompt)

    return result.content
