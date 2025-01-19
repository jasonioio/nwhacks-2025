from sentiment_analyser import SentimentAnalyzer
from database_manager import DatabaseManager
from secret_manager import SecretManager

def main():
    secrets = SecretManager()
    secrets.init_secret("OpenRouter")
    secrets.init_secret("MongoDB_nwHacks")

    db_key = secrets.get_secret("MongoDB_nwHacks")
    db_manager = DatabaseManager(db_key)
    entries = db_manager.get_last_14_days_entries()
    db_manager.close_connection()

    analyzer = SentimentAnalyzer(secrets.get_secret("OpenRouter"))
    lifestyle_advice = analyzer.analyze_lifestyle_adjustment(entries)
    print(lifestyle_advice)

if __name__ == "__main__":
    main()
