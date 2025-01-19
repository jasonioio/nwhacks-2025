from pymongo import MongoClient

class DatabaseManager:
    """
    A class that manages MongoDB operations for a specified database and collection.
    """

    def __init__(
            self,
            password: str,
            db_name: str = "Journal",
            collection_name: str = "Entries"
        ):
        """
        Initialize the DatabaseManager with a MongoDB URI, database name,
        and collection name.

        :param uri: Connection string for MongoDB.
        :param db_name: Name of the database to use.
        :param collection_name: Name of the collection to use.
        """

        uri = f"mongodb+srv://nwHacks:{password}@cluster.fykxe.mongodb.net/" \
              "?retryWrites=true&w=majority&appName=Cluster"

        self.client = MongoClient(uri)
        self.db = self.client[db_name]
        self.collection = self.db[collection_name]

    def add_entry(self, date_str: str, text: str, sentiment: str) -> str:
        """
        Adds a new entry (date, text, sentiment) to the MongoDB collection.

        :param date_str: Date of the entry (e.g., "YYYY-MM-DD").
        :param text: Text associated with the entry.
        :param sentiment: Sentiment string (e.g., "positive", "negative", etc.).
        :return: The inserted document's ID as a string.
        """
        document = {
            "date": date_str,
            "text": text,
            "sentiment": sentiment
        }
        result = self.collection.insert_one(document)
        return str(result.inserted_id)

    def get_entry_by_date(self, date_str: str) -> dict:
        """
        Retrieves a single entry by its date field.

        :param date_str: The date of the entry (e.g., "YYYY-MM-DD").
        :return: The matching document as a dictionary, or None if not found.
        """
        return self.collection.find_one({"date": date_str})

    def close_connection(self) -> None:
        """
        Closes the MongoDB client connection.
        """
        self.client.close()