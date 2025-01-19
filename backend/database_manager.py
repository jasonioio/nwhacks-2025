from pymongo import MongoClient

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
        documents = self.collection.find({"date": {"$regex": regex}})
        return list(documents)

    def close_connection(self) -> None:
        self.client.close()
