import mysql.connector as connector
import os
from contextlib import AbstractContextManager
from abc import ABC, abstractmethod


class Mapper (AbstractContextManager, ABC):
    """Abstrakte Basisklasse aller Mapper-Klassen"""

    def __init__(self):
        self._cnx = None

    def __enter__(self):

        """Was soll geschehen, wenn wir beginnen, mit dem Mapper zu arbeiten?"""

        """Wir testen, ob der Code im Kontext der lokalen Entwicklungsumgebung oder in der Cloud ausgeführt wird.
        Dies ist erforderlich, da die Modalitäten für den Verbindungsaufbau mit der Datenbank kontextabhängig sind."""

        if os.getenv('GAE_ENV', '').startswith('standard'):
            """Landen wir in diesem Zweig, so haben wir festgestellt, dass der Code in der Cloud abläuft.
            Die App befindet sich somit im **Production Mode** und zwar im *Standard Environment*.
            Hierbei handelt es sich also um die Verbindung zwischen Google App Engine und Cloud SQL."""

            self._cnx = connector.connect(user='demo', password='demo',
                                          unix_socket='/cloudsql/just-aura-284011:europe-west3:best-db-ss20-team5',
                                          database='best_db')
        else:
            """Wenn wir hier ankommen, dann handelt sich offenbar um die Ausführung des Codes in einer lokalen Umgebung,
            also auf einem Local Development Server. Hierbei stellen wir eine einfache Verbindung zu einer lokal
            installierten mySQL-Datenbank her."""

            self._cnx = connector.connect(user='ssls_root', password='root',
                                      host='127.0.0.1',
                                      auth_plugin='mysql_native_password',
                                      database='ssls')

        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        """Was soll geschehen, wenn wir (evtl. vorübergehend) aufhören, mit dem Mapper zu arbeiten?"""
        self._cnx.close()

    """Formuliere nachfolgend sämtliche Auflagen, die instanzierbare Mapper-Subklassen mid. nerfüllen müssen."""

    @abstractmethod
    def build_bo(self, tuples):
        """Vereinfacht den Bau der bo's in den jeweiligen Mapper"""
        pass

    @abstractmethod
    def find_all(self):
        """Lies alle Tupel aus und gib sie als Objekte zurück."""
        pass

    @abstractmethod
    def find_by_id(self, id):
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus."""
        pass

    @abstractmethod
    def insert(self, object):
        """Füge das folgende Objekt als Datensatz in die DB ein."""
        pass

    @abstractmethod
    def update(self, object):
        """Ein Objekt auf einen bereits in der DB enthaltenen Datensatz abbilden."""
        pass

    @abstractmethod
    def delete(self, object):
        """Den Datensatz, der das gegebene Objekt in der DB repräsentiert löschen."""
        pass

