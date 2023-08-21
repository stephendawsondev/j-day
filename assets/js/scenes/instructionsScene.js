import addButton from "./welcomeScene.js";

const createInstructionsScene = () => {
  // add instructions
  return scene("instructions", () => {
    const instructionsBackground = add([
      sprite("instructions-page"),
      pos(0, 0),
      origin("topleft"),
      scale(1),
      "start-game",
    ]);

    // Instructions text
    const heading = add([
      text("Instructions", {
        size: 65,
        font: "sinko",
      }),
      color(rgb(138, 43, 226)),
      pos(90, 25),
    ]);

    const controls = add([
      text("Control movement with WASD keys.\n\n"
            +"Shoot with the spacebar.\n\n"
            +"Use M to toggle music and \nESC to quit.\n\n"
            +"Killing Robots gains 50 points.\n\n"
            +"Killing The Terminator\ngains 500 points.\n\n"
            +"Beware, he'll be back!", {
        size: 30,
        font: "sinko",
      }),
      color(WHITE),
      pos(30, 100),
    ]);

    // start game button
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
  
    addButton("Go Back", vec2(60, 530), () => {
      play("menu_select", { loop: false, volume: 1.0 });
      go("welcome");
    });

  });
};

export default createInstructionsScene;
