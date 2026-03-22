<h1 style="color:red;">ArcadeHub — Demo Gaming Portal</h1>

<h2 style="color:red;">Introduction</h2>
ArcadeHub is a lightweight static gaming portal that provides access to browser-based games.<br>
The project demonstrates basic web development concepts along with interactive games built using HTML, CSS, and JavaScript.<br><br>

The portal includes a homepage and playable games located in a separate directory.

<h2 style="color:red;">Project Structure</h2>

- index.html — Main portal homepage<br>
- game/ — Contains the browser games<br>
  - index.html — Entry point for the games<br>
  - (additional JS/CSS/assets files)

<h2 style="color:red;">Features</h2>
- Simple and clean gaming portal interface<br>
- Built-in browser games<br>
- Lightweight and fast (no external dependencies required)<br>
- Easy to run and deploy  

<h2 style="color:red;">Game Description</h2>

The portal includes a classic arcade-style game:<br><br>

<b>Snake Game</b><br>
- The player controls a snake that moves around the screen<br>
- The snake grows longer as it eats food<br>
- The objective is to survive as long as possible without colliding with walls or itself  

<h2 style="color:red;">How to Run Locally</h2>

Option 1: Directly in Browser<br>
- Open `index.html` in any modern web browser<br><br>

Option 2: Using a Local Server (Recommended)<br>

```bash
# Python
python -m http.server

# Node.js (if installed)
npx serve
