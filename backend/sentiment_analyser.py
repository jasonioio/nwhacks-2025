from openai import OpenAI

class SentimentAnalyzer:
    def __init__(self, key):
        self.client = OpenAI(api_key=key)

    def analyze_sentiment(self, text):
        result = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": (
                        """You are a sentiment analysis assistant tasked with labeling 
                        the overall mood or feeling of a user's diary entry. Your 
                        output must strictly be **one** of the following single words:\n
                        Joyful, Sad, Productive, Tired, Okay, Angry.\n\n
                        Carefully read the user's diary entry, determine which word 
                        best reflects the overall sentiment from the available choices, 
                        and respond **only** with that single word. Provide no additional 
                        commentary or explanation."""
                    )
                },
                {
                    "role": "user",
                    "content": text
                }
            ],
            max_tokens=5,
            temperature=0
        )
        return result.choices[0].message.content
