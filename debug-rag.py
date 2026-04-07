import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'chatbot'))

from chatbot.rag_pipeline import ask_rag

# Test questions
test_questions = [
    "What services do you offer?",
    "How can you help with import-export business?",
    "What is T-imoexo?",
]

print("Debugging RAG pipeline:")
print("=" * 50)

for question in test_questions:
    print(f"\nQuestion: {question}")
    print("-" * 30)
    response = ask_rag(question)
    print(f"Response: {response}")
    print("=" * 50)