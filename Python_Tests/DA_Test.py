import webbrowser

def open_google_doc(doc_url: str):
    """
    Opens a Google Document in the default web browser.
    
    :param doc_url: The URL of the Google Document.
    """
    if doc_url.startswith("https://docs.google.com/document/"):
        webbrowser.open(doc_url)
    else:
        print("Invalid Google Docs URL")

# Example usage
open_google_doc("https://docs.google.com/document/d/e/2PACX-1vRMx5YQlZNa3ra8dYYxmv-QIQ3YJe8tbI3kqcuC7lQiZm-CSEznKfN_HYNSpoXcZIV3Y_O3YoUB1ecq/pub")