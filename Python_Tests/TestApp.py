import sys

from PySide6.QtCore import QSize, Qt
from PySide6.QtWidgets import QApplication, QMainWindow, QPushButton, QVBoxLayout, QWidget


# Subclass QMainWindow to customize your application's main window
class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("My App")
        self.setMinimumSize(400,300)
        self.setMaximumSize(1920,1080)

        layout = QVBoxLayout()
        button = QPushButton("Press Me!")
        button.clicked.connect(self.buttonClicked)
        
        button2 = QPushButton("Press Me Too!")
        button2.clicked.connect(self.buttonClicked)

        layout.addWidget(button)
        layout.addWidget(button2)

        layoutwidget = QWidget()
        layoutwidget.setLayout(layout)
        # Set the central widget of the Window.
        self.setCentralWidget(layoutwidget)  

    def buttonClicked(self):
        sender = self.sender()
        print("Button Clicked " , sender.text())

app = QApplication(sys.argv)

window = MainWindow()
window.show()

app.exec()