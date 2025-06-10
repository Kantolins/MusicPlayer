import unittest
from unittest.mock import patch, MagicMock
from bottle import template, redirect
from music_controller import historique, delete_historique, ajouter_historique
from src.models.historiques import get_historiques_by_user, delete_historique_by_id, insert_historique
from src.controllers.auth_controller import session

class TestMusicController(unittest.TestCase):
    @patch('src.models.historiques.get_historiques_by_user')
    @patch('src.controllers.auth_controller.session', {'user': {'id_util': 1}})
    def test_historique_success(self, mock_get_historiques_by_user):
        # Mock the database response
        mock_get_historiques_by_user.return_value = [
            {'daterecherche': datetime(2023, 1, 1), 'heurerecherche': MagicMock(seconds=3600)},
            {'daterecherche': datetime(2023, 1, 2), 'heurerecherche': MagicMock(seconds=7200)}
        ]

        # Call the function
        result = historique()

        # Assert that the template is rendered with formatted data
        self.assertIn('historiques', result)
        self.assertEqual(result['historiques'][0]['daterecherche'], '01/01/2023')
        self.assertEqual(result['historiques'][0]['heurerecherche'], '01:00')
        self.assertEqual(result['historiques'][1]['daterecherche'], '02/01/2023')
        self.assertEqual(result['historiques'][1]['heurerecherche'], '02:00')

    @patch('src.models.historiques.delete_historique_by_id')
    @patch('src.controllers.auth_controller.session', {'user': {'id_util': 1}})
    def test_delete_historique_success(self, mock_delete_historique_by_id):
        # Call the function
        result = delete_historique(1)

        # Assert that the deletion was called and redirection occurred
        mock_delete_historique_by_id.assert_called_once_with(1, 1)
        self.assertEqual(result.status_code, 303)  # Redirect status code

    @patch('src.models.historiques.insert_historique')
    @patch('src.controllers.auth_controller.session', {'user': {'id_util': 1}})
    @patch('bottle.request.forms.get')
    def test_ajouter_historique_success(self, mock_request_forms_get, mock_insert_historique):
        # Mock form data
        mock_request_forms_get.side_effect = lambda key: {'titre': 'Song A', 'artiste': 'Artist A'}.get(key)

        # Call the function
        result = ajouter_historique()

        # Assert that the insertion was called and success response returned
        mock_insert_historique.assert_called_once()
        self.assertEqual(result, {"status": "success"})

if __name__ == '__main__':
    unittest.main()