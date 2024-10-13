from django.test import TestCase
from ninja import NinjaAPI

class APITestCase(TestCase):

    def setUp(self):
        # Clear the user list before each test (if using in-memory list)
        global users
        users = []  # Reset users list to avoid conflicts

    def test_account_create(self):
        response = self.client.post('/api/accountCreate', {'username': 'testuser', 'password': 'testpassword'}, content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertIn('Account created successfully', response.json().get('message'))

    def test_username_check(self):
        # First create a user to test against
        self.client.post('/api/accountCreate', {'username': 'testuser', 'password': 'testpassword'}, content_type="application/json")
        
        # Now check if the username 'testuser' is available, it should return False
        response = self.client.get('/api/username', {'username': 'testuser'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get('available'), False)
        
        # Check for a non-existing username, it should return True
        response = self.client.get('/api/username', {'username': 'newuser'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get('available'), True)
