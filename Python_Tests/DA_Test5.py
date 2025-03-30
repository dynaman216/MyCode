import curses

def print_unicode_at(y, x, char):
    """
    Displays a Unicode character at a specific screen coordinate using curses.

    :param y: Row coordinate (0-based)
    :param x: Column coordinate (0-based)
    :param char: Unicode character to print
    """
    def draw(stdscr):
        stdscr.clear()
        stdscr.addstr(y, x, char)
        stdscr.refresh()
        stdscr.getch()  # Wait for key press before exiting

    curses.wrapper(draw)

# Example usage
print_unicode_at(5, 10, "★")  # Print a star at row 5, column 10