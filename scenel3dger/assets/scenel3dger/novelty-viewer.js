(() => {
  const root = document.querySelector("[data-novelty-viewer]");
  if (!root) return;

  const status = root.querySelector("[data-viewer-status]");
  const canvases = [...root.querySelectorAll("canvas[data-cloud]")];
  const summaryUrl = new URL(root.dataset.summary, window.location.href);
  const manifestUrl = new URL(root.dataset.manifest, window.location.href);
  const state = { yaw: -0.78, pitch: 0.48, zoom: 1.02, clouds: new Map(), raf: 0 };

  const fmtPercent = (value, digits = 1) => `${(100 * value).toFixed(digits)}%`;
  const fmtCm = value => `${(100 * value).toFixed(1)} cm`;

  function setText(selector, value) {
    const node = root.querySelector(selector);
    if (node) node.textContent = value;
  }

  function decodeCloud(buffer, bounds) {
    if (buffer.byteLength % 9 !== 0) throw new Error("invalid point-cloud payload");
    const count = buffer.byteLength / 9;
    const positions = new Float32Array(count * 3);
    const colors = new Uint8Array(count * 3);
    const view = new DataView(buffer);
    const span = bounds.max.map((value, axis) => value - bounds.min[axis]);
    for (let index = 0; index < count; index += 1) {
      const offset = index * 9;
      for (let axis = 0; axis < 3; axis += 1) {
        positions[index * 3 + axis] = bounds.min[axis]
          + view.getUint16(offset + axis * 2, true) / 65535 * span[axis];
        colors[index * 3 + axis] = view.getUint8(offset + 6 + axis);
      }
    }
    return { positions, colors, count };
  }

  function scheduleDraw() {
    if (state.raf) return;
    state.raf = requestAnimationFrame(() => {
      state.raf = 0;
      canvases.forEach(draw);
    });
  }

  function canvasSize(canvas) {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.7);
    const width = Math.max(260, Math.round(canvas.clientWidth * ratio));
    const height = Math.max(250, Math.round(canvas.clientHeight * ratio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    return { width, height, ratio };
  }

  function draw(canvas) {
    const cloud = state.clouds.get(canvas.dataset.cloud);
    if (!cloud || !state.bounds) return;
    const { width, height, ratio } = canvasSize(canvas);
    const context = canvas.getContext("2d", { alpha: false });
    context.fillStyle = "#ece8de";
    context.fillRect(0, 0, width, height);

    const minimum = state.bounds.min;
    const maximum = state.bounds.max;
    const center = minimum.map((value, axis) => (value + maximum[axis]) / 2);
    const span = Math.max(...maximum.map((value, axis) => value - minimum[axis]));
    const scale = state.zoom * Math.min(width, height) * 0.80 / span;
    const cy = Math.cos(state.yaw), sy = Math.sin(state.yaw);
    const cp = Math.cos(state.pitch), sp = Math.sin(state.pitch);
    const projected = new Float32Array(cloud.count * 3);
    let minDepth = Infinity, maxDepth = -Infinity;
    for (let index = 0; index < cloud.count; index += 1) {
      const offset = index * 3;
      const x = cloud.positions[offset] - center[0];
      const y = cloud.positions[offset + 1] - center[1];
      const z = cloud.positions[offset + 2] - center[2];
      const horizontal = cy * x - sy * y;
      const depthPlane = sy * x + cy * y;
      const vertical = cp * z - sp * depthPlane;
      const depth = sp * z + cp * depthPlane;
      projected[offset] = width / 2 + horizontal * scale;
      projected[offset + 1] = height / 2 - vertical * scale;
      projected[offset + 2] = depth;
      minDepth = Math.min(minDepth, depth);
      maxDepth = Math.max(maxDepth, depth);
    }
    const pointSize = Math.max(1.05 * ratio, Math.min(2.1 * ratio, 1.35 * ratio * state.zoom));
    const depthSpan = Math.max(maxDepth - minDepth, 1e-6);
    for (let index = 0; index < cloud.count; index += 1) {
      const offset = index * 3;
      const x = projected[offset], y = projected[offset + 1];
      if (x < 0 || x >= width || y < 0 || y >= height) continue;
      const shade = 0.70 + 0.30 * (projected[offset + 2] - minDepth) / depthSpan;
      const red = Math.round(cloud.colors[offset] * shade);
      const green = Math.round(cloud.colors[offset + 1] * shade);
      const blue = Math.round(cloud.colors[offset + 2] * shade);
      context.fillStyle = `rgb(${red},${green},${blue})`;
      context.fillRect(x, y, pointSize, pointSize);
    }
  }

  function bindInteraction(canvas) {
    let pointer = null;
    canvas.addEventListener("pointerdown", event => {
      pointer = { id: event.pointerId, x: event.clientX, y: event.clientY };
      canvas.setPointerCapture(event.pointerId);
      canvas.classList.add("dragging");
    });
    canvas.addEventListener("pointermove", event => {
      if (!pointer || event.pointerId !== pointer.id) return;
      state.yaw += (event.clientX - pointer.x) * 0.009;
      state.pitch = Math.max(-1.35, Math.min(1.35, state.pitch + (event.clientY - pointer.y) * 0.009));
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      scheduleDraw();
    });
    const release = event => {
      if (!pointer || event.pointerId !== pointer.id) return;
      pointer = null;
      canvas.classList.remove("dragging");
    };
    canvas.addEventListener("pointerup", release);
    canvas.addEventListener("pointercancel", release);
    canvas.addEventListener("wheel", event => {
      event.preventDefault();
      state.zoom = Math.max(0.55, Math.min(2.8, state.zoom * Math.exp(-event.deltaY * 0.0012)));
      scheduleDraw();
    }, { passive: false });
  }

  root.querySelectorAll("button[data-view]").forEach(button => {
    button.addEventListener("click", () => {
      const view = button.dataset.view;
      if (view === "top") {
        state.yaw = 0;
        state.pitch = 1.34;
        state.zoom = 0.96;
      } else if (view === "front") {
        state.yaw = 0;
        state.pitch = 0;
        state.zoom = 1.02;
      } else {
        state.yaw = -0.78;
        state.pitch = 0.48;
        state.zoom = 1.02;
      }
      scheduleDraw();
    });
  });

  canvases.forEach(bindInteraction);
  window.addEventListener("resize", scheduleDraw);

  Promise.all([
    fetch(summaryUrl).then(response => {
      if (!response.ok) throw new Error(`summary ${response.status}`);
      return response.json();
    }),
    fetch(manifestUrl).then(response => {
      if (!response.ok) throw new Error(`manifest ${response.status}`);
      return response.json();
    }),
  ]).then(async ([summary, manifest]) => {
    state.bounds = manifest.bounds;
    await Promise.all(Object.entries(manifest.clouds).map(async ([name, descriptor]) => {
      const url = new URL(descriptor.file, manifestUrl);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`${name} cloud ${response.status}`);
      state.clouds.set(name, decodeCloud(await response.arrayBuffer(), manifest.bounds));
    }));
    const selection = summary.selection;
    const full = summary.metrics.full_ttt3r;
    const gated = summary.metrics.novelty_gated;
    setText("[data-metric='kept']", fmtPercent(selection.kept_ratio));
    setText("[data-metric='reduction']", fmtPercent(selection.patch_reduction));
    setText("[data-metric='surface']", fmtPercent(selection.full_surface_retained_at_10cm, 3));
    setText("[data-metric='gated-fscore']", fmtPercent(gated.fscore_10cm));
    setText("[data-metric='full-fscore']", fmtPercent(full.fscore_10cm));
    setText("[data-metric='full-chamfer']", fmtCm(full.symmetric_chamfer_mean_m));
    setText("[data-metric='gated-chamfer']", fmtCm(gated.symmetric_chamfer_mean_m));
    setText("[data-metric='trajectory']", fmtCm(summary.alignment.camera_center_error_median_m));
    setText("[data-metric='frames']", `${summary.frames} RGB frames`);
    status.textContent = "Drag any panel to rotate all three · scroll to zoom";
    status.classList.add("ready");
    scheduleDraw();
  }).catch(error => {
    status.textContent = `Interactive viewer unavailable: ${error.message}`;
    status.classList.add("failed");
  });
})();
