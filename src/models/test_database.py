import unittest
from unittest.mock import patch, MagicMock
import mysql.connector
from database import get_db

class TestDatabaseConnection(unittest.TestCase):
    @patch('mysql.connector.connect')
    def test_get_db_connection_success(self, mock_connect):
        # Mock the connection object
        mock_connection = MagicMock()
        mock_connect.return_value = mock_connection

        # Call the function
        connection = get_db()

        # Assert that the connection was established
        mock_connect.assert_called_once_with(
            host="localhost",
            user="root",
            password="1",
            database="musique",
            charset='utf8mb4',
            collation='utf8mb4_general_ci'
        )
        self.assertEqual(connection, mock_connection)

    @patch('mysql.connector.connect')
    def test_get_db_connection_failure(self, mock_connect):
        # Simulate an exception being raised
        mock_connect.side_effect = mysql.connector.Error("Connection failed")

        with self.assertRaises(mysql.connector.Error):
            get_db()

if __name__ == '__main__':
    unittest.main()