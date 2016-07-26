#HW 3 of CS52
## by Jean Zhou

---
####App url: cs52-jeanzhou-hw3-firebase.surge.sh

###General Comments (part 2):

I used React to create an application that can create, edit, and delete notes. I have three main components: the entry bar, the notes, and the app. These components work together by passing necessary information to dynamically render the page. In part 2 of this assignment, I implemented Firebase for storing information.

I completed all the requirements of the assignment. The app can add notes to the board, and the notes are draggable, editable, and deletable. It persists data to Firebase and updates from changes in Firebase.

For extra credit, I made the notes pretty, have them snap to grid, deal with zIndex sorting, have resizable notes (drag bottom right corner), and implemented an undo feature. To make the notes pretty, I customized with fonts and have notes width resize to accomodate longer title lengths. Also, I have notes generate in random colors based on a list of six pre-selected colors. Please create many notes to test this, on the chance that the same color is generated a few times in a row. Additionally, since part 1, I've figured out how to add a background without receiving the image processing error

Converting all the functionalities from part 1 of the homework into Firebase took more effort than expected. For instance, I had to create a new value in Firebase to record the current maximum ZIndex, otherwise the ZIndex would be too low every time the page reloads with pre-existing notes.
