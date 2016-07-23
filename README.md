#HW 3 of CS52
## by Jean Zhou

---
####App url: cs52-jeanzhou-hw3.surge.sh

###General Comments:

I used React to create an application that can create, edit, and delete notes. I have three main components: the entry bar, the notes, and the app. These components work together by passing necessary information to dynamically render the page.

I completed all the requirements of the assignment. The app can add notes to the board, and the notes are draggable, editable, and deletable.

For extra credit, I made the notes pretty, have them snap to grid, deal with zIndex sorting, have resizable notes (drag bottom right corner), and implemented an undo feature. To make the notes pretty, I customized with fonts and have them generate in random colors based on a list of six pre-selected colors. Please create many notes to test this, on the chance that the same color is generated a few times in a row. 

Another thing I spent a lot of time trying to do was add an image as the background of the page. I wanted to have a corkboard background, but there was an issue with SASS reading the image file. Every time, I would receive this error: 

client?cd17:47 ./img/corkboard.jpg
Module parse failed: /Users/jeanzhou/Documents/School/15-16/16X/COSC 52/Github/HW3/js-react-starter/img/corkboard.jpg Unexpected character '�' (1:0)
You may need an appropriate loader to handle this file type.

I verified that this is due to a processing error, not because the file is not found. I tried to debug this, but could not figure it out in the end. 