import requests
import json

# Test the improved chatbot
url = "http://127.0.0.1:5000/chat"

test_questions = [
    "What services do you offer?",
    "How can you help with import-export business?",
    "What is T-imoexo?",
    "Tell me about documentation services",
    "What are your core services?"
]

print("Testing improved chatbot responses:\n")

for question in test_questions:
    print(f"Question: {question}")
    
    payload = {
        "message": question
    }
    
    try:
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            data = response.json()
            answer = data.get("response", "No response")
            print(f"Answer: {answer}")
        else:
            print(f"Error: Status code {response.status_code}")
    except Exception as e:
        print(f"Error: {str(e)}")
    
    print("-" * 50)