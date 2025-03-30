import requests

def get_published_google_doc_text(doc_url):
    """
    Fetches text from a publicly published Google Document using its URL.

    :param doc_url: The full URL of the published Google Document.
    :return: List of strings, each representing a line of text.
    """
    if "/pub" not in doc_url:
        print("Invalid published Google Docs URL")
        return []

    text_url = doc_url + "?format=txt"  # Get plain text version
    response = requests.get(text_url)

    if response.status_code == 200:
        return response.text.strip().split("\n")  # Split into lines
    else:
        print("Failed to fetch document. Ensure it's publicly accessible.")
        return []

# Example usage
doc_url = "https://docs.google.com/document/d/e/2PACX-1vRMx5YQlZNa3ra8dYYxmv-QIQ3YJe8tbI3kqcuC7lQiZm-CSEznKfN_HYNSpoXcZIV3Y_O3YoUB1ecq/pub"
lines = get_published_google_doc_text(doc_url)
print(lines)