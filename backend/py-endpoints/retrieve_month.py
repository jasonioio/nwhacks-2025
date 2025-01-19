from database_manager import DatabaseManager
from secret_manager import SecretManager

import argparse
import sys


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("year", type=str)
    parser.add_argument("month", type=str)
    return parser.parse_args()

def main():
    args = parse_args()

    secrets = SecretManager()
    secrets.init_secret("MongoDB_nwHacks")

    db_key = secrets.get_secret("MongoDB_nwHacks")
    db_manager = DatabaseManager(db_key)
    entries = db_manager.get_entries_for_month(args.year, args.month)
    db_manager.close_connection()

    print({entry["date"].split("-")[-1]: entry["sentiment"] for entry in entries})
    sys.exit(0)

if __name__ == "__main__":
    main()
