from abc import ABC
from datetime import datetime


class BusinessObject(ABC):
    """
    Definition der Basisklasse aller BusinessObjects in diesem Projekt.

    Jedes BusinessObject hat drei Attribute creation_date, id und name.
    """

    def __init__(self):
        self._creation_date = datetime.now()
        self._id = 0
        self._name = ""

    def get_creation_date(self):
        """Auslesen des Erzeugungsdatum."""
        return self._creation_date

    def set_creation_date(self, date):
        """Setzen des Erzeugungsdatum"""
        self._creation_date = date

    def get_id(self):
        """Auslesen der id."""
        return self._id

    def set_id(self, id):
        """Setzen der id."""
        self._id = id

    def get_name(self):
        """Auslesen der Namen."""
        return self._name

    def set_name(self, name):
        """Setzen des Namens."""
        self._name = name
