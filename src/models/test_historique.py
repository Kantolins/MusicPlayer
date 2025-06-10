import unittest
from unittest.mock import patch, MagicMock
from historiques import get_historique, add_historique

class TestHistorique(unittest.TestCase):
    @patch('mysql.connector.connect')
    def test_get_historique_success(self, mock_connect):
        # Mock the connection and cursor
        mock_connection = MagicMock()
        mock_cursor = MagicMock()
        mock_connect.return_value = mock_connection
        mock_connection.cursor.return_value = mock_cursor

        # Mock the query result
        mock_cursor.fetchall.return_value = [
            {"id": 1, "title": "Song A", "played_at": "2023-01-01"},
            {"id": 2, "title": "Song B", "played_at": "2023-01-02"}
        ]

        # Call the function
        historique = get_historique()

        # Assert that the query was executed
        mock_cursor.execute.assert_called_once_with("SELECT * FROM historique")
        self.assertEqual(historique, [
            {"id": 1, "title": "Song A", "played_at": "2023-01-01"},
            {"id": 2, "title": "Song B", "played_at": "2023-01-02"}
        ])

    @patch('mysql.connector.connect')
    def test_add_historique_success(self, mock_connect):
        # Mock the connection and cursor
        mock_connection = MagicMock()
        mock_cursor = MagicMock()
        mock_connect.return_value = mock_connection
        mock_connection.cursor.return_value = mock_cursor

        # Call the function
        add_historique("Song C", "2023-01-03")

        # Assert that the query was executed
        mock_cursor.execute.assert_called_once_with(
            "INSERT INTO historique (title, played_at) VALUES (%s, %s)",
            ("Song C", "2023-01-03")
        )
        mock_connection.commit.assert_called_once()

if __name__ == '__main__':
    unittest.main()