import unittest
from unittest.mock import patch, MagicMock
from bottle import template, redirect
from auth_controller import signup, login, logout, session
from src.models.utilisateurs import get_user_by_email, get_user_by_credentials, create_user

class TestAuthController(unittest.TestCase):
    @patch('src.models.utilisateurs.get_user_by_email')
    @patch('src.models.utilisateurs.create_user')
    @patch('bottle.request.forms.get')
    def test_signup_success(self, mock_request_forms_get, mock_create_user, mock_get_user_by_email):
        # Mock form data
        mock_request_forms_get.side_effect = lambda key: {'nom_util': 'John', 'email_util': 'john@example.com', 'mdp': 'password123'}.get(key)
        mock_get_user_by_email.return_value = None  # Email does not exist

        # Call the function
        result = signup()

        # Assert that the user was created and redirected
        mock_create_user.assert_called_once_with('John', 'john@example.com', unittest.mock.ANY)
        self.assertEqual(result.status_code, 303)  # Redirect status code

    @patch('src.models.utilisateurs.get_user_by_email')
    @patch('bottle.request.forms.get')
    def test_signup_email_exists(self, mock_request_forms_get, mock_get_user_by_email):
        # Mock form data
        mock_request_forms_get.side_effect = lambda key: {'nom_util': 'John', 'email_util': 'john@example.com', 'mdp': 'password123'}.get(key)
        mock_get_user_by_email.return_value = {'id': 1, 'email': 'john@example.com'}  # Email exists

        # Call the function
        result = signup()

        # Assert that the error template is returned
        self.assertIn('Email déjà utilisé', result)

    @patch('src.models.utilisateurs.get_user_by_credentials')
    @patch('bottle.request.forms.get')
    def test_login_success(self, mock_request_forms_get, mock_get_user_by_credentials):
        # Mock form data
        mock_request_forms_get.side_effect = lambda key: {'username': 'John', 'password': 'password123'}.get(key)
        mock_get_user_by_credentials.return_value = {'id_util': 1, 'nom_util': 'John'}  # Valid credentials

        # Call the function
        result = login()

        # Assert that the user was logged in and redirected
        self.assertEqual(session['user'], {'id_util': 1, 'nom_util': 'John'})
        self.assertEqual(result.status_code, 303)  # Redirect status code

    @patch('src.models.utilisateurs.get_user_by_credentials')
    @patch('bottle.request.forms.get')
    def test_login_invalid_credentials(self, mock_request_forms_get, mock_get_user_by_credentials):
        # Mock form data
        mock_request_forms_get.side_effect = lambda key: {'username': 'John', 'password': 'wrongpassword'}.get(key)
        mock_get_user_by_credentials.return_value = None  # Invalid credentials

        # Call the function
        result = login()

        # Assert that the error template is returned
        self.assertIn('Identifiants incorrects', result)

    def test_logout(self):
        # Set a user in session
        session['user'] = {'id_util': 1, 'nom_util': 'John'}

        # Call the function
        result = logout()

        # Assert that the session was cleared and redirected
        self.assertIsNone(session['user'])
        self.assertEqual(result.status_code, 303)  # Redirect status code

if __name__ == '__main__':
    unittest.main()