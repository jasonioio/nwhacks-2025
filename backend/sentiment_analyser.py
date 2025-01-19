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
                {"role": "user", "content": text}
            ],
            max_tokens=5,
            temperature=0
        )
        return result.choices[0].message.content

    def analyze_lifestyle_adjustment(self, entries):
        days_summary = []
        for e in entries:
            days_summary.append(
                f"Date: {e['date']}, Sentiment: {e['sentiment'] if e['sentiment'] != 'No entry' else 'Missing'}, Text: {e['text']}"
            )
        context = "\n".join(days_summary)
        messages = [
            {
                "role": "system",
                "content": (
                    "You are a lifestyle suggestion assistant. The user has provided "
                    "their diary entries (or missing days) from the past 14 days. "
                    "Craft a concise sentence of one lifestyle adjustment hint "
                    "based on these patterns."
                )
            },
            {
                "role": "user",
                "content": context
            }
        ]
        result = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            max_tokens=100,
            temperature=0.7
        )

        return result.choices[0].message.content
