import curses
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

def message_decode(doc_url):
#doc_url = "https://docs.google.com/document/d/e/2PACX-1vQGUck9HIFCyezsrBSnmENk5ieJuYwpt7YHYEzeNJkIb9OSDdx-ov2nRNReKQyey-cwJOoEKUhLmN9z/pub"
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

    def draw(stdscr):
            stdscr.clear()
            for x in range(startindex,len(outlist),3):
                stdscr.addstr(int(outlist[x+2]), int(outlist[x]), outlist[x+1])
            stdscr.refresh()
            stdscr.getch()  # Wait for key press before exiting

    curses.wrapper(draw)

message_decode("https://docs.google.com/document/d/e/2PACX-1vQGUck9HIFCyezsrBSnmENk5ieJuYwpt7YHYEzeNJkIb9OSDdx-ov2nRNReKQyey-cwJOoEKUhLmN9z/pub")