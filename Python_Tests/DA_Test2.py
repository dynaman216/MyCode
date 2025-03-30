from googleapiclient.discovery import build
from google.oauth2 import service_account

def get_google_doc_text(doc_id: str, credentials_file: str):
    """
    Fetches text from a Google Document and returns it as a list of lines.

    :param doc_id: The ID of the Google Document.
    :param credentials_file: Path to the Google API service account credentials JSON file.
    :return: List of strings, each representing a line of text.
    """
    # Authenticate with Google Docs API
    creds = service_account.Credentials.from_service_account_file(
        credentials_file, scopes=["https://www.googleapis.com/auth/documents.readonly"]
    )
    service = build("docs", "v1", credentials=creds)

    # Get the document content
    document = service.documents().get(documentId=doc_id).execute()
    text_lines = []

    for element in document.get("body", {}).get("content", []):
        if "paragraph" in element:
            for text_run in element["paragraph"].get("elements", []):
                if "textRun" in text_run:
                    text_lines.append(text_run["textRun"]["content"].strip())

    return text_lines

# Example usage
doc_id = "https://docs.google.com/document/d/e/2PACX-1vRMx5YQlZNa3ra8dYYxmv-QIQ3YJe8tbI3kqcuC7lQiZm-CSEznKfN_HYNSpoXcZIV3Y_O3YoUB1ecq/pub"  # Replace with actual document ID
credentials_file = "path/to/credentials.json"  # Replace with your credentials file path

lines = get_google_doc_text(doc_id, credentials_file)
print(lines)