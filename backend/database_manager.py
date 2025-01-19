from pymongo import MongoClient
from datetime import date, timedelta

class DatabaseManager:
    def __init__(self, password: str, db_name: str = "Journal", collection_name: str = "Entries"):
        uri = (
            f"mongodb+srv://nwHacks:{password}@cluster.fykxe.mongodb.net/"
            "?retryWrites=true&w=majority&appName=Cluster"
        )
        self.client = MongoClient(uri)
        self.db = self.client[db_name]
        self.collection = self.db[collection_name]

    def add_entry(self, date_str: str, text: str, sentiment: str) -> str:
        document = {"date": date_str, "text": text, "sentiment": sentiment}
        result = self.collection.insert_one(document)
        return str(result.inserted_id)

    def get_entry_by_date(self, date_str: str) -> dict:
        return self.collection.find_one({"date": date_str})

    def get_entries_for_month(self, year: str, month: str) -> list:
        regex = f"^{year}-{month.zfill(2)}"
        return list(self.collection.find({"date": {"$regex": regex}}))

    def get_last_14_days_entries(self) -> list:
        today = date.today()
        result = []
        for i in range(14):
            day = today - timedelta(days=i)
            day_str = day.strftime("%Y-%m-%d")
            doc = self.collection.find_one({"date": day_str})
            if doc:
                result.append({"date": doc["date"], "text": doc["text"], "sentiment": doc["sentiment"]})
            else:
                result.append({"date": day_str, "text": "", "sentiment": "No entry"})
        return result

    def close_connection(self) -> None:
        self.client.close()
