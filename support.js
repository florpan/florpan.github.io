class Helper {
  sounds = [];

  init() {
    this.sounds.push(loadSound("shot.mp3"));
  }
  
  play(soundIndex) {
    this.sounds[soundIndex].play();
  }
}

var Support = new Helper();