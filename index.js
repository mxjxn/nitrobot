'use strict';

// load environment variables;
const nconf = require('nconf');
const PlugAPI = require('plug-dj-api');

nconf.env();
const USER = nconf.get("PLUG_USER");
const PASS = nconf.get("PLUG_PASS");
const ROOM = nconf.get("PLUG_ROOM");

const platforms = { 1: "Youtube", 2: "Soundcloud" };

const plugApi = new PlugAPI();

(async () => {
  try {

    await plugApi.connect({
      username: USER,
      password: PASS,
      roomId: ROOM
    });

    console.log('connected to room ' + ROOM);

    // Handle CHAT events
    plugApi.on('CHAT', data => {
      console.log(data);
    });

    // Handle song ADVANCE
    plugApi.on('ADVANCE', data => {
      const { dj: { username }, media: { title, author, format }} = data;
      plugApi.sendChat(username + ' started playing:\n' + title + " by " + author + " on " + platforms[format]);
    });

  } catch (err) {
    console.log ('oops', err)
  }
})();

