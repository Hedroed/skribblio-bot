<template>
    <div id="app" class="main">
        <h1 class="title" >Skribbl.io Ruin The Fun</h1>
        <div class="container">
            <div class="pannel">
                <Debug :messages="debugs"/>
                <div class="word-suggestions">
                </div>
                <form class="change-room">
                    <input class="change-room--input" type="text" placeholder="Room ID or URL">
                    <input class="change-room--submit" type="submit" value=">">
                </form>
                <form class="votekick">
                    <input class="votekick--submit" type="submit" value="Votekick">
                </form>
            </div>
            <div class="center draw">
                <h2 class="draw--guess-word">{{ guess_word }}</h2>
                <canvas class="canvas" ref="canvas" width="800" height="600"></canvas>
                <!-- <img :src="makeIcon(24,5,11)" alt="icon">
                <img :src="makeIcon(9,30,7)" alt="icon">
                <img :src="makeIcon(12,12,2)" alt="icon">
                <img :src="makeIcon(14,3,17)" alt="icon">
                <img :src="makeIcon(1,18,0)" alt="icon"> -->
            </div>
            <div class="pannel chat">
                <div class="chat-display">
                    <div class="chat-message">
                        <span class="chat-message--name">INFO</span>
                        <span class="chat-message--message">Type !help to list available commands.</span>
                    </div>
                </div>
                <form id="chat-form" class="chat-input">
                    <input type="text" name="chat-input" placeholder="Say something here...">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import suggest from "../suggest";
import { makeIcon } from "../icons";
import { Drawer } from "../drawer";
import io from 'socket.io-client';
 

import Debug from "./Debug";

export default {
  name: "Main",
  components: {
    Debug
  },
  props: {
    username: String,
    skin: Array
  },
  data() {
    return {
      guess_word: "???",
      makeIcon,
      drawer: undefined,
      debugs: []
    };
  },
  methods: {
    debug() {
      // Debug
      const args = Array.from(arguments).join(" ");
      console.log("debug", args);
      this.debugs.push(args);

      // Scroll to the bottom of the debug column
      // debugColumn.scrollTo(0, debugColumn.scrollHeight);
    }
  },
  mounted() {
    // Test
    suggest("___________o_").then(w => (this.guess_word = w.pop()));

    // Canvas

    const canvas = this.$refs.canvas;
    console.log(canvas);

    canvas.width = 800;
    canvas.height = 600;

    this.drawer = new Drawer(canvas);

    //tmp
    let players = []

    // Socket

    const socket = io('https://skribbl.io');

    socket.on("connect", () => {
      this.debug("Connected");

      const name = this.username
      this.debug("Je m'appelle", name);

      socket.emit("userData", {
        name: name,
        code: "",
        avatar: [...this.skin, -1],
        join: "skgVXxaIJu12CFgevHAL",
        language: "French",
        createPrivate: false
      });
    });

    socket.on("login", () => {
      this.debug("Logged");
    });

    socket.on("lobbyConnected", t => {
      this.debug("Players", t.players.length, t.players.map(e => e.name).join(", "));

      players = t.players;

      this.drawer.drawCommands(t.drawCommands);

      // setTimeout(() => {
      //     socket.emit('chat', hello[Math.floor(Math.random() * hello.length)])
      // }, 1000)

      // clearInterval(intId)
      // intId = setInterval(() => {
      //     socket.emit('chat', words[Math.floor(Math.random() * words.length)])
      // }, 15000)
    });

    socket.on("kicked", () => {
      this.debug("Sorry Kicked");
    });

    socket.on("chat", t => {
      const p = players.find(e => e.id === t.id);
      this.debug(p.name, t.message);
      // addMessage(p.name, t.message);
      if (
        t.message.toUpperCase().includes("BOT") &&
        t.message != "Je suis pas un bot..."
      ) {
        setTimeout(() => {
          socket.emit("chat", "Je suis pas un bot...");
        }, 2500);
      }
      // this.debug("Chat", p.name, t);
    });

    socket.on("lobbyCurrentWord", t => {
      this.debug("new word", t);
      // document.querySelector(".draw--guess-word").innerHTML = t;
      // suggest(t).then(w => {
      //   updateSuggestions(w);
      // });
    });

    socket.on("lobbyReveal", t => {
      this.debug("Reveal", t.word);
      // fs.appendFile('words.txt', t.word + '\n', err => {
      //     if (err) console.error(err)
      // })
    });

    socket.on("lobbyChooseWord", t => {
      this.debug("Choose word", t);
      if (t.words) {
        this.debug(t.words.map(w => w + "\n").join(""));
        socket.emit("lobbyChooseWord", 0);
        // fs.appendFile('words.txt', t.words.map(w => w + '\n').join(''), err => {
        //     if (err) console.error(err)
        // })
        // socket.close();
      }
    });

    socket.on("lobbyState", t => {
      this.debug("State", t);
    });

    socket.on("lobbyPlayerConnected", t => {
      this.debug("+ New player", t.name);
      players.push(t);
    });

    socket.on("drawCommands", t => this.drawer.drawCommands(t));

    socket.on("canvasClear", this.drawer.clearCanvas);

    socket.on("lobbyPlayerDisconnected", t => {
      const p = players.find(e => e.id === t);
      this.debug("- Player", p.name, "leave");
      players = players.filter(e => e.id !== t.id);
    });

    socket.on("lobbyPlayerGuessedWord", t => {
      const p = players.find(e => e.id === t);
      this.debug(p.name, "find the word");
    });

    socket.on("lobbyGuessClose", t => {
      this.debug("Hint:", t);
    });

    socket.on("disconnect", reason => {
      this.debug("Disconnected", reason);
      if (reason === "io server disconnect") {
        this.debug("Force reco in 10s");
        // the disconnection was initiated by the server, you need to reconnect manually
        setTimeout(() => socket.connect(), 10000);
      } else if (reason === "io client disconnect") {
        this.debug("Client deco in 10s");
        setTimeout(() => socket.connect(), 10000);
      }
    });

    socket.on("error", err => console.error("Error::", err));

    socket.on("reconnect_error", error => {
      this.debug("reco error", error);
    });

    socket.on("reconnecting", attemptNumber => {
      this.debug("reco", attemptNumber);
    });
  }
};
</script>

<style scoped>
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.title {
  margin: 0;
}

/* Left pannel */

.pannel {
  display: flex;
  flex-direction: column;
  flex: 1 50px;
}

.center {
  flex: 3 50px;
}

.debug {
  overflow-y: scroll;
  padding: 10px;
  height: 200px;
  background-color: #333;
  font-size: 13px;
  line-height: 20px;
  word-wrap: break-word;
}

.word-suggestions {
  border-top: 1px solid white;
  overflow-y: scroll;
  flex: 1;
  padding: 10px;
  background-color: #333;
  word-wrap: break-word;
}

.word-suggestions--word {
  display: inline-block;
  margin: 2px;
  padding: 6px;
  background-color: #262626;
  cursor: pointer;
  font-size: 14px;
}

change-room--input {
  width: 100%;
}
/* .change-room {
  display: flex;
}

.change-room--input {
  flex: 1;
  padding: 15px 10px;
  color: #fff;
  background-color: #2c2c2c;
  border: 0;
}


.change-room--submit {
  width: 50px;
  color: #fff;
  background-color: #333;
  cursor: pointer;
  border: 0;
}

.change-room--submit:hover {
  background-color: #373737;
} */

.votekick--submit {
  width: 100%;
  padding: 15px 10px;
  color: #fff;
  background-color: #333;
  cursor: pointer;
  border: 0;
}

.votekick--submit:hover {
  background-color: #373737;
}

/* Draw */

.draw {
  background-color: #3d3d3d;
  text-align: center;
}

.draw--guess-word {
  margin: 25px 0;
  text-align: center;
  letter-spacing: 10px;
}

.canvas {
  margin: 0 auto;
  background-color: #fff;
  width: 90%;
}

/* Chat */

.chat {
  display: flex;
  flex-direction: column;
  /* min-width: 400px;
  width: 400px; */
  padding-top: 5px;
  background-color: #333;
}

.chat-display {
  flex: 1;
  overflow-y: scroll;
  padding: 0 5px;
}

.chat-message {
  padding: 7px;
  font-size: 14px;
  word-wrap: break-word;
}

.chat-message:nth-child(odd) {
  background-color: #393939;
}

.chat-message:nth-child(even) {
  background-color: #363636;
}

.chat-message--name {
  font-weight: bold;
}

.chat-message--name::after {
  content: ": ";
}

.chat-input {
  padding: 8px;
  background-color: #2c2c2c;
}
.chat-input input {
  box-sizing: border-box;
  margin-top: 5px;
  padding: 10px;
  width: 100%;
  color: #fff;
  background-color: #2c2c2c;
  border: 0;
}
</style>
