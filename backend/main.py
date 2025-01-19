from sentiment_analyser import SentimentAnalyzer
from database_manager import DatabaseManager
from secret_manager import SecretManager

import argparse
import sys


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("date_str", metavar="DATE", type=str)
    parser.add_argument("text", metavar="TEXT", type=str)
    return parser.parse_args()


def validate_text(text):
    if not text.strip():
        sys.exit(1)


def main():
    args = parse_args()
    validate_text(args.text)

    secrets = SecretManager()
    secrets.init_secret("OpenAI")
    secrets.init_secret("MongoDB_nwHacks")

    analyzer = SentimentAnalyzer(secrets.get_secret("OpenAI"))
    sentiment = analyzer.analyze_sentiment(args.text)

    db_key = secrets.get_secret("MongoDB_nwHacks")
    db_manager = DatabaseManager(db_key)
    db_manager.add_entry(args.date_str, args.text, sentiment)
    db_manager.close_connection()


if __name__ == "__main__":
    main()
