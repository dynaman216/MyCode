import requests
from bs4 import BeautifulSoup

def get_visible_text_from_published_doc(doc_url):
    """
    Fetches and extracts only the visible text from a published Google Document.

    :param doc_url: The full URL of the published Google Document.
    :return: List of strings, each representing a visible line of text.
    """
    response = requests.get(doc_url)

    if response.status_code != 200:
        print("Failed to fetch document. Ensure it's publicly accessible.")
        return []

    # Parse the document HTML
    soup = BeautifulSoup(response.text, "html.parser")

    # Extract all visible text
    text_lines = [line.strip() for line in soup.stripped_strings]
    
    return text_lines

# Example usage
doc_url = "https://docs.google.com/document/d/e/2PACX-1vRMx5YQlZNa3ra8dYYxmv-QIQ3YJe8tbI3kqcuC7lQiZm-CSEznKfN_HYNSpoXcZIV3Y_O3YoUB1ecq/pub"
doc_url = "https://docs.google.com/document/d/e/2PACX-1vQGUck9HIFCyezsrBSnmENk5ieJuYwpt7YHYEzeNJkIb9OSDdx-ov2nRNReKQyey-cwJOoEKUhLmN9z/pub"
visible_lines = get_visible_text_from_published_doc(doc_url)

outlist = []
startindex = 0

# Print each visible line
for line in visible_lines:
    outlist.append(line)
    #print(len(outlist), " ", line)
    if startindex == 0:
        if line.isnumeric() == True:
            startindex = len(outlist)-1

#print("Start = ", startindex)
#print(outlist[startindex-3], " ", outlist[startindex-2], " ", outlist[startindex-1], " ", outlist[startindex])

for x in range(startindex,len(outlist),3):
    print(outlist[x]," ",outlist[x+1], " ",outlist[x+2])