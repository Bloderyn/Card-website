export function initializeEffects() {
  const canvas = document.getElementById("particles");
  if (!canvas) return undefined;

  const ctx = canvas.getContext("2d");
  const colors = [
    [170, 80, 60],
    [190, 120, 50],
    [140, 70, 100],
    [100, 60, 150],
  ];
  const count = 24;
  const points = [];
  let width = 0;
  let height = 0;
  let rafId;

  const random = (min, max) => Math.random() * (max - min) + min;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const sprites = colors.map(([red, green, blue]) => {
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = 32;
    const spriteContext = sprite.getContext("2d");
    const gradient = spriteContext.createRadialGradient(16, 16, 0, 16, 16, 16);

    gradient.addColorStop(0, `rgba(${red}, ${green}, ${blue}, 1)`);
    gradient.addColorStop(0.15, `rgba(${red}, ${green}, ${blue}, 0.9)`);
    gradient.addColorStop(1, `rgba(${red}, ${green}, ${blue}, 0)`);
    spriteContext.fillStyle = gradient;
    spriteContext.fillRect(0, 0, 32, 32);

    return sprite;
  });

  function makePoint(scatter) {
    const index = Math.floor(Math.random() * colors.length);
    const maxLife = random(300, 700);

    return {
      x: random(0, width || 1),
      y: scatter ? random(0, height || 1) : (height || 600) + 5,
      vx: random(-0.12, 0.12),
      vy: random(-0.55, -0.2),
      size: random(1, 2.2),
      life: scatter ? random(0, maxLife) : 0,
      maxLife,
      maxOpacity: random(0.2, 0.38),
      sprite: sprites[index],
    };
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    for (const point of points) {
      if (point.x > width) point.x = random(0, width);
      if (point.y > height) point.y = random(0, height);
    }
  }

  function drawFrame() {
    ctx.clearRect(0, 0, width, height);

    for (const point of points) {
      point.life += 1;
      point.x += point.vx;
      point.y += point.vy;

      const halfLife = point.maxLife / 2;
      const opacity =
        point.life < halfLife
          ? (point.life / halfLife) * point.maxOpacity
          : ((point.maxLife - point.life) / halfLife) * point.maxOpacity;

      if (point.life >= point.maxLife) Object.assign(point, makePoint(false));

      ctx.globalAlpha = Math.max(0, opacity);
      const diameter = point.size * 12;
      ctx.drawImage(
        point.sprite,
        point.x - diameter / 2,
        point.y - diameter / 2,
        diameter,
        diameter,
      );
    }

    ctx.globalAlpha = 1;
    rafId = requestAnimationFrame(drawFrame);
  }

  const avatar = canvas.closest(".page")?.querySelector(".avatar-frame");
  function tiltAvatar(event) {
    const {
      left,
      top,
      width: avatarWidth,
      height: avatarHeight,
    } = avatar.getBoundingClientRect();
    const x = (event.clientX - left) / avatarWidth - 0.5;
    const y = (event.clientY - top) / avatarHeight - 0.5;

    avatar.style.transition = "none";
    avatar.style.transform = `perspective(500px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
  }

  function resetAvatar() {
    avatar.style.transition = "transform 0.4s cubic-bezier(0.2, 0, 0.2, 1)";
    avatar.getBoundingClientRect();
    avatar.style.transform = "";
  }

  if (avatar && !reducedMotion) {
    avatar.addEventListener("mousemove", tiltAvatar);
    avatar.addEventListener("mouseleave", resetAvatar);
  }

  function onVisibilityChange() {
    if (document.hidden) cancelAnimationFrame(rafId);
    else rafId = requestAnimationFrame(drawFrame);
  }

  if (!reducedMotion) {
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("resize", resize);
    resize();
    for (let index = 0; index < count; index += 1) {
      points.push(makePoint(true));
    }
    drawFrame();
  }

  return () => {
    cancelAnimationFrame(rafId);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    window.removeEventListener("resize", resize);
    avatar?.removeEventListener("mousemove", tiltAvatar);
    avatar?.removeEventListener("mouseleave", resetAvatar);
  };
}
