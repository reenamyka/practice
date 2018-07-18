= Tanda Code Challenges - Pings =

This task is a challenge for back end engineers and developers.

Every Tanda customer gets a time clock - a piece of hardware of that staff use to clock in and out of work. The time clock is designed to work without an internet connection for extended periods, as long as it can sometimes come online and sync up with the main Tanda system. While online, the time clock attempts to ping Tanda regularly, and we can use a record of these pings to paint a picture of the device's reliability (as well as other interesting things, like 3G reliability in different parts of the country).

Your challenge is to build a small server that acts as an API for time clock pings. You should be able to make a POST to the server to record a time clock communicating to Tanda, and you should be able to GET data about past pings for specific time clocks.

This is a feature that already exists in Tanda. We have provided most of the existing server's API - your task is to write the underlying code.

- I used JavaScript with Node.js as its environment to make the server. Ruby was used to run tests against the server.

= How to setup =
1. Open command prompt
2. Go to the directory of the folder
3. Run main.js by typing node main.js on the command prompt
NOTE: Make sure that you have downloaded the node.js.
If node.js is not yet installed you can download it on this link https://nodejs.org/en/
4. Open another command prompt
5. Go to the directory of the folder where you save the pings.rb
6. Run pings.rb by typing ruby pings.rb

= Development =
- JavaScript
- Ruby (for running the tests on the server)

= Environment =
- Node.js

= Framework =
- Express.js

= Editor =
- Visual Studio Code
- Sublime Text