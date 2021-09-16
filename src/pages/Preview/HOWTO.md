# How to get this NFT Preview working in React with HTML5 Canvas

For reference, here's the package we use for the backend code-generator:
`node-canvas`: https://www.npmjs.com/package/canvas

We need to basically recreate this as best as we can on the front-end.

As stated in the documentation for `node-canvas`, you can find the HTML5 Canvas docs here for additional reference:
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

For UI changes, DEFINITELY consult the `reactstrap` UI library documentation for some components you can use.
https://reactstrap.github.io/

There's a lot of UI examples for Forms, Tables, Modals, other UI components inside the `pages/.../` directory.
That code can be copy/pasted a lot of times.


### Suggested Implementation Steps

[ ] Figure out how to create a canvas in React
  [ ] Render the canvas in the center of the Preview Page. Nothing Else needed yet
  [ ] Place a shape or something inside of the canvas. Read over the API docs for what you can do with it
  [ ] Add state to the canvas. I.e. you have 2 images, and toggle between them using a variable

[ ] Apply Layout formatting
  [ ] See comments in `pages/Preview/index.js`. 25% for Sidebar, 75% for Canvas Preview (on right of sidebar). Toolbar can go on top or bottom.
  [ ] Definitely use the `reactstrap` UI library to implement the layout and other UI elements (like buttons, inputs, icons, etc. as needed)

---------------------------

[ ] Get the Attributes and Traits from the global state and try to actually overlay the images onto the Canvas.
  --> Note: This step probably won't happen right away. Out of scope for now.


### Reviewing Changes

1. Make sure the code can be run with the `yarn start` command. Try building with `yarn build` before submitting for review
2. Checkout your changes into a branch with Git. `git checkout -b branch-name-here`
3. Add and Commit your changes. `git add .` then `git commit -m "your message here. be descriptive but concise. 50 character max"`
4. Push changes to github. `git push`. Might need to copy/paste the `--set-upstream` command from the terminal if it pops up
5. Open Pull Request on GitHub. Go to the repository, then click the Yellow rectangle that pops up, `Create Pull Request`. The default title it generates should work, just scroll down and click `Create Request`.
6. Copy the link to the Pull Request and send it directly to Nico or post it in the Discord `core-dev` channel

I'll then review all of the changes, and either approve them and merge them into the main branch, or I'll reject them and give feedback on your code.
