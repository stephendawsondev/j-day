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
        go("welcome");
      });

  });
};

export default createInstructionsScene;
