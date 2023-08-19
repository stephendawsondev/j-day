const createWelcomeScene = () => {
  // add welcome screen
  return scene("welcome", () => {
    const welcomeBackground = add([
      sprite("welcome_page"),
      pos(0, 0),
      origin("topleft"),
      scale(3.6),
    ]);

    const introMusic = play("intro_music", { loop: true, volume: 0.4 });

    const musicText = add([
      text("Toggle Music", {
        size: 30,
        font: "sink",
      }),
      color(YELLOW),
      pos(650, 480),
      scale(0.5),
      origin("center"),
      area(),
      "music-text",
    ]);

    const heading = add([
      text("Judgement Day", {
        size: 65,
        font: "sinko",
      }),
      color(rgb(138, 43, 226)),
      pos(40, 24),
    ]);

    function addButton(txt, p, f) {
      const btn = add([
        text(txt, {
          size: 48,
          font: "apl386o",
        }),

        pos(p),
        area({ cursor: "pointer" }),
        scale(1),
      ]);

      btn.onClick(f);

      btn.onUpdate(() => {
        if (btn.isHovering()) {
          const t = time() * 10;
          btn.color = rgb(
            wave(0, 255, t),
            wave(0, 255, t + 2),
            wave(0, 255, t + 4)
          );
          btn.scale = vec2(1.2);
        } else {
          btn.scale = vec2(1);
          btn.color = rgb(255, 255, 0);
        }
      });
    }

    addButton("Start", vec2(80, 350), () => {
      play("menu_select", { loop: false, volume: 1.0 });
      introMusic.stop();
      go("game", { score: 0, livesLeft: 3 });
    });

    addButton("How to play", vec2(80, 450), () => {
      play("menu_select", { loop: false, volume: 1.0 });
      go("instructions");
    });

    onClick("music-text", () => {
      if (introMusic.isPaused()) {
        introMusic.play();
      } else {
        introMusic.pause();
      }
    });
    // reset cursor to default at frame start for easier cursor management
    onUpdate(() => cursor("default"));

    onKeyDown("enter", () => {
      play("menu_select", { loop: false, volume: 0.5 });
      go("game", { score: 0, livesLeft: 3 });
    });
  });
};

export default createWelcomeScene;
