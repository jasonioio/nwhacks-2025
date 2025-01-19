from database_manager import DatabaseManager
from secret_manager import SecretManager

import argparse
import sys

def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("date_str", metavar="DATE", type=str)
    return parser.parse_args()

def main():
    args = parse_args()

    secrets = SecretManager()
    secrets.init_secret("MongoDB_nwHacks")

    db_key = secrets.get_secret("MongoDB_nwHacks")
    db_manager = DatabaseManager(db_key)
    entry = db_manager.get_entry_by_date(args.date_str)
    db_manager.close_connection()

    # Print only the "text" if found, otherwise print nothing
    if entry and "text" in entry:
        print(entry["text"])
    else:
        print("")

    sys.exit(0)

if __name__ == "__main__":
    main()
