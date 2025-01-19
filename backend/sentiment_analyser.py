from secret_manager import SecretManager
from openai import OpenAI

import argparse
import sys

import database_manager


secret_manager = SecretManager()
secret_manager.init_secret("OpenAI")
secret_manager.init_secret("MongoDB_nwHacks")


class SentimentAnalyser:
    def __init__(self):
        key = secret_manager.get_secret("OpenAI")
        self.client = OpenAI(api_key=key)

    def analyse_sentiment(self, prompt):
        response = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a sentiment analysis assistant tasked with labeling "
                        "the overall mood or feeling of a user's diary entry. Your "
                        "output must strictly be **one** of the following single words:\n"
                        "Joyful, Sad, Productive, Tired, Okay, Angry.\n\n"
                        "Carefully read the user's diary entry, determine which word "
                        "best reflects the overall sentiment from the available choices, "
                        "and respond **only** with that single word. Provide no additional "
                        "commentary or explanation."
                    )
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            max_tokens=5,
            temperature=0
        )

        return response.choices[0].message.content


def main():
    parser = argparse.ArgumentParser(
        description="Analyse the sentiment of the provided text."
    )

    parser.add_argument(
        "text",
        metavar="TEXT",
        type=str,
        help="Text to be analysed."
    )

    args = parser.parse_args()
    if not args.text.strip():
        parser.error("No non-whitespace text provided.")

    try:
        analyser = SentimentAnalyser()
        result = analyser.analyse_sentiment(args.text)
        print(result)
    except Exception as e:
        print(f"Error occurred during sentiment analysis: {e}", file=sys.stderr)
        sys.exit(1)

    mongodb_key = secret_manager.get_secret("MongoDB_nwHacks")
    dbm = database_manager.DatabaseManager(mongodb_key)
    dbm.add_entry("2022-02-22", args.text, result)
    dbm.close_connection()


if __name__ == "__main__":
    main()