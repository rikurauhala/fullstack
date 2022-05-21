# Part 0

This directory contains the exercise files for part 0.

## Hours

Time spent: `4 hours`

## Exercises

Exercises completed: `6 / 6`

### Exercise 0.1

Tutorial reviewed on 19 May 2022.

### Exercise 0.2

Tutorial reviewed on 19 May 2022.

### Exercise 0.3

Tutorial reviewed on 19 May 2022.

### Exercise 0.4

```mermaid
sequenceDiagram
    participant browser
    participant server
    browser->>server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
    note over browser: the browser sends the contents of the form to the server
    server-->>browser: HTTP status code 302 (Found)
    note over server: the server sends a redirect request and the browser reloads the page
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
    server-->>browser: HTML code
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->>browser: main.css
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
    server-->>browser: main.js
    note over browser: the browser starts executing main.js and requests the json data from server 
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->>browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]
    note over browser: the browser executes the event handler that renders the notes on the screen
```

### Exercise 0.5

```mermaid
sequenceDiagram
    participant browser
    participant server
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
    server-->>browser: HTML code
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->>browser: main.css
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    server-->>browser: spa.js
    note over browser: the browser starts executing spa.js and requests the json data from server 
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->>browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]
    note over browser: the browser executes the event handler that renders the notes on the screen
```

### Exercise 0.6

```mermaid
sequenceDiagram
    participant browser
    participant server
    browser->>server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    note over browser: the browser sends the contents of the form to the server
    server-->>browser: HTTP status code 201 (Created)
    note over browser: the browser displays the new note without reloading the page
```
