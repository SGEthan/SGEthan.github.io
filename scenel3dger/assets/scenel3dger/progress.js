(() => {
  "use strict";

  const validation = {
    step: [16000,17000,18000,19000,20000,21000,22000,23000,24000,25000,26000,27000,28000,29000,30000,31000,32000,33000,34000,35000,36000,37000,38000,39000,40000,41000,42000,43000,44000,45000,46000,47000,48000,49000,50000,51000,52000,53000,54000,55000,56000,57000,58000,59000,60000,61000,62000,63000,64000,65000,66000,67000,68000],
    total: [3.1039,2.9437,3.1995,2.9323,3.4399,3.28,2.9298,3.2258,3.0032,3.3445,3.3412,3.3159,3.5493,3.3483,3.3838,3.8002,3.685,3.8078,3.6857,3.7008,3.613,3.5346,3.7518,3.5966,3.962,3.8119,3.9998,3.3935,3.1956,3.2468,3.2629,3.2441,3.3103,3.2426,3.187,3.2059,3.2395,3.2686,3.2682,3.1267,3.1429,3.2357,3.1917,3.3593,3.3342,3.3482,3.3398,3.3863,3.4509,3.361,3.4341,3.2,3.4859],
    qa: [0.6161,0.5943,0.6242,0.6108,0.5955,0.632,0.606,0.6043,0.6016,0.596,0.594,0.5909,0.6091,0.5981,0.5975,0.612,0.6037,0.6049,0.6073,0.6096,0.5916,0.5995,0.607,0.6057,0.6195,0.6121,0.6158,0.6154,0.6073,0.6072,0.6028,0.6062,0.5949,0.6079,0.5961,0.5971,0.6078,0.6079,0.6056,0.5983,0.5955,0.6025,0.594,0.6038,0.6107,0.5958,0.6447,0.6978,0.6449,0.7054,0.6969,0.5941,0.6493],
    memory: [0.0717,0.0704,0.0699,0.071,0.0735,0.0684,0.0716,0.0746,0.0725,0.072,0.0711,0.0716,0.073,0.0698,0.0728,0.0727,0.0701,0.0727,0.0731,0.0762,0.0733,0.0701,0.073,0.0725,0.0704,0.0723,0.0713,0.0707,0.0711,0.0707,0.07,0.073,0.0714,0.0722,0.0722,0.0692,0.0704,0.0715,0.071,0.0701,0.0716,0.0738,0.0714,0.0761,0.0765,0.071,0.0794,0.0813,0.0771,0.0774,0.0832,0.0734,0.0705],
    object: [1.9038,1.7582,1.9839,1.7169,2.2557,2.0387,1.737,2.0213,1.8165,2.156,2.1359,2.1063,2.3251,2.1528,2.182,2.5898,2.4555,2.5584,2.4561,2.4797,2.4043,2.3135,2.5433,2.3964,2.7253,2.5947,2.8071,2.0644,1.9889,1.9862,2.0457,2.0175,2.0189,2.0277,1.9953,1.9936,2.0273,2.0441,2.0202,1.9045,1.9653,2.0186,2.0037,2.1545,2.121,2.1549,2.0884,2.0724,2.1971,2.0425,2.1198,2.0099,2.2337],
    pose: [0.4654,0.479,0.474,0.4897,0.4769,0.491,0.4734,0.4839,0.4708,0.4805,0.5012,0.5079,0.497,0.4861,0.4884,0.4795,0.5154,0.5306,0.506,0.4941,0.5027,0.5106,0.4848,0.4819,0.5064,0.4914,0.4645,0.6001,0.4847,0.541,0.5029,0.5075,0.5845,0.494,0.4831,0.5041,0.4911,0.5033,0.5295,0.514,0.47,0.5001,0.482,0.4839,0.4806,0.4855,0.4786,0.4793,0.4813,0.4802,0.4804,0.482,0.4831],
    numeric: [0.0469,0.0418,0.0474,0.0439,0.0382,0.0499,0.0418,0.0417,0.0418,0.0401,0.039,0.0391,0.0451,0.0415,0.0432,0.0461,0.0402,0.0412,0.0432,0.0413,0.041,0.0409,0.0437,0.0401,0.0405,0.0413,0.0411,0.043,0.0437,0.0417,0.0414,0.0399,0.0405,0.0408,0.0403,0.042,0.0429,0.0419,0.0418,0.0398,0.0405,0.0407,0.0407,0.0411,0.0454,0.0409,0.0488,0.0554,0.0504,0.0555,0.0538,0.0407,0.0493]
  };

  const training = {
    step: [15990,16990,17990,18990,19990,20990,21990,22990,23990,24990,25990,26990,27990,28990,29990,30990,31990,32990,33990,34990,35990,36990,37990,38990,39990,40990,41990,42990,43990,44990,45990,46990,47990,48990,49990,50990,51990,52990,53990,54990,55990,56990,57990,58990,59990,60990,61990,62990,63990,64990,65990,66990,67990,68670],
    total: [1.5662,1.6034,1.5599,1.49,1.4697,1.3769,1.4065,1.3512,1.4115,1.3944,1.4799,1.4707,1.5224,1.4061,1.4459,1.4657,1.4481,1.5199,1.6296,1.5713,1.7018,1.814,2.0094,1.935,2.1671,2.0459,1.9369,2.4459,2.4795,2.4511,2.3981,2.3358,2.4972,2.4092,2.3347,2.3352,2.3167,2.3602,2.3234,2.3186,2.3425,2.3827,2.3654,2.3533,2.4277,2.3727,2.4591,1.9798,1.7547,1.5042,1.4265,1.5604,1.4787,1.4988],
    finiteWriter: [100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,7,73,100,100,100,100,100,100,99,100,60,99,98,77,2,0,0,0,0,0,0,0]
  };

  // Raw, unweighted held-out geometry terms from the same R2 -> R3 -> R4
  // recovery chain used by the aggregate plots above.
  const geometryValidation = {
    step: [16000,17000,18000,19000,20000,21000,22000,23000,24000,25000,26000,27000,28000,29000,30000,31000,32000,33000,34000,35000,36000,37000,38000,39000,40000,41000,42000,43000,44000,45000,46000,47000,48000,49000,50000,51000,52000,53000,54000,55000,56000,57000,58000,59000,60000,61000,62000,63000,64000,65000,66000,67000,68000,69000],
    pose: [1.8618,1.9162,1.8959,1.9588,1.9077,1.9641,1.8936,1.9356,1.8831,1.9219,2.0048,2.0317,1.988,1.9446,1.9537,1.918,2.0616,2.1222,2.024,1.9764,2.0108,2.0425,1.9393,1.9278,2.0254,1.9656,1.8578,2.4002,1.9387,2.1642,2.0117,2.0298,2.3382,1.976,1.9325,2.0163,1.9644,2.0131,2.118,2.0559,1.8798,2.0003,1.9278,1.9355,1.9222,1.9419,1.9143,1.9171,1.9253,1.921,1.9218,1.928,1.9323,1.9314],
    poseIdentity: [1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481,1.8481],
    poseTranslation: [0.616,0.6319,0.6265,0.6517,0.6737,0.6522,0.6355,0.677,0.6232,0.6502,0.7072,0.7648,0.632,0.6187,0.6416,0.6261,0.682,0.7448,0.7436,0.66,0.6935,0.7038,0.673,0.6395,0.6268,0.665,0.6378,1.1729,0.6994,0.8812,0.767,0.8104,1.1107,0.7507,0.7168,0.7996,0.7588,0.7777,0.8334,0.7636,0.6397,0.7507,0.6674,0.6767,0.6757,0.6609,0.6551,0.653,0.6511,0.6561,0.6531,0.6565,0.6576,0.6532],
    poseRotation: [1.2458,1.2842,1.2694,1.3072,1.2339,1.3119,1.2581,1.2586,1.2599,1.2716,1.2976,1.2669,1.356,1.3259,1.3121,1.2919,1.3797,1.3774,1.2805,1.3164,1.3173,1.3386,1.2663,1.2883,1.3986,1.3006,1.2201,1.2274,1.2393,1.283,1.2446,1.2194,1.2275,1.2253,1.2157,1.2168,1.2057,1.2355,1.2846,1.2924,1.2402,1.2496,1.2604,1.2588,1.2465,1.281,1.2592,1.2641,1.2741,1.2649,1.2687,1.2714,1.2747,1.2783],
    objectCenter: [1.15,1.0898,1.1463,1.1199,1.2899,1.1902,1.0806,1.1427,1.1352,1.1898,1.2203,1.2093,1.1507,1.1581,1.1186,1.1628,1.2164,1.4442,1.1962,1.1479,1.1302,1.1304,1.1861,1.0461,1.207,1.1403,1.3476,1.3429,1.1859,1.3133,1.1186,1.1712,1.2778,1.1531,1.2489,1.1929,1.1663,1.1715,1.1627,1.0915,1.0866,1.0644,1.0642,1.4799,1.1155,1.26,1.2192,1.3373,1.5988,1.2503,1.2982,1.1625,1.3211,1.381],
    objectExtent: [0.2977,0.2961,0.3095,0.3047,0.3423,0.305,0.3102,0.3142,0.3138,0.2961,0.3289,0.309,0.3757,0.3269,0.3205,0.3227,0.3078,0.3184,0.3095,0.3253,0.3054,0.3081,0.299,0.3221,0.3959,0.4453,0.3156,0.2858,0.298,0.2996,0.2996,0.2941,0.2888,0.3003,0.3069,0.3008,0.2923,0.3007,0.2977,0.3012,0.2992,0.2916,0.3005,0.3083,0.3109,0.2997,0.3014,0.3014,0.3001,0.3093,0.3265,0.3089,0.3391,0.3396],
    objectRotation: [1.2046,1.157,1.2255,1.213,1.1962,1.2242,1.1735,1.1297,1.1545,1.1648,1.1664,1.0951,1.1736,1.1521,1.0833,1.1985,1.2085,1.146,1.1731,1.1541,1.1329,1.0881,1.0851,1.107,1.0649,1.0229,1.0675,0.9454,0.9906,0.9606,0.9686,0.9351,1.0002,0.9916,1.005,0.9662,1.0074,0.9873,0.9653,0.9799,1.0009,1.0274,1.0077,1.0353,1.0494,1.1763,1.231,1.2545,1.2605,1.2239,1.2699,1.2716,1.2575,1.2548]
  };

  const NS = "http://www.w3.org/2000/svg";
  const make = (name, attrs = {}) => {
    const node = document.createElementNS(NS, name);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
    return node;
  };

  function renderLineChart(target, series, options = {}) {
    if (!target) return;
    const width = 760;
    const height = 300;
    const margin = { top: 16, right: 18, bottom: 35, left: 45 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;
    const allX = series.flatMap(item => item.x);
    const allY = series.flatMap(item => item.y).filter(Number.isFinite);
    const xMin = options.xMin ?? Math.min(...allX);
    const xMax = options.xMax ?? Math.max(...allX);
    let yMin = options.yMin ?? Math.min(...allY);
    let yMax = options.yMax ?? Math.max(...allY);
    if (options.yMin === undefined || options.yMax === undefined) {
      const pad = Math.max((yMax - yMin) * 0.12, 0.02);
      if (options.yMin === undefined) yMin -= pad;
      if (options.yMax === undefined) yMax += pad;
    }
    const xScale = value => margin.left + ((value - xMin) / (xMax - xMin || 1)) * plotWidth;
    const yScale = value => margin.top + (1 - (value - yMin) / (yMax - yMin || 1)) * plotHeight;
    const svg = make("svg", { viewBox: `0 0 ${width} ${height}`, role: "img" });
    const title = make("title");
    title.textContent = options.title || "Training curve";
    svg.appendChild(title);

    for (let index = 0; index <= 4; index += 1) {
      const value = yMin + (index / 4) * (yMax - yMin);
      const y = yScale(value);
      svg.appendChild(make("line", { x1: margin.left, x2: width - margin.right, y1: y, y2: y, class: "grid-line" }));
      const label = make("text", { x: margin.left - 8, y: y + 3, "text-anchor": "end" });
      label.textContent = options.percent ? `${Math.round(value)}%` : value.toFixed(options.precision ?? 1);
      svg.appendChild(label);
    }

    [0, 0.33, 0.66, 1].forEach(fraction => {
      const value = xMin + fraction * (xMax - xMin);
      const x = xScale(value);
      const label = make("text", { x, y: height - 11, "text-anchor": fraction === 0 ? "start" : fraction === 1 ? "end" : "middle" });
      label.textContent = `${Math.round(value / 1000)}k`;
      svg.appendChild(label);
    });
    svg.appendChild(make("line", { x1: margin.left, x2: width - margin.right, y1: margin.top + plotHeight, y2: margin.top + plotHeight, class: "axis-line" }));

    (options.markers || []).forEach(marker => {
      if (marker.x < xMin || marker.x > xMax) return;
      const x = xScale(marker.x);
      svg.appendChild(make("line", { x1: x, x2: x, y1: margin.top, y2: margin.top + plotHeight, class: "resume-line" }));
      const label = make("text", { x: x + 4, y: margin.top + 10, class: "resume-label" });
      label.textContent = marker.label;
      svg.appendChild(label);
    });

    series.forEach(item => {
      const points = item.x.map((x, index) => [xScale(x), yScale(item.y[index])]);
      const path = make("path", {
        d: points.map((point, index) => `${index ? "L" : "M"}${point[0].toFixed(2)},${point[1].toFixed(2)}`).join(" "),
        fill: "none",
        stroke: item.color,
        "stroke-width": item.width || 2.4,
        "stroke-linejoin": "round",
        "stroke-linecap": "round",
        "stroke-dasharray": item.dash || "none"
      });
      svg.appendChild(path);
      points.forEach((point, index) => {
        const hover = make("circle", { cx: point[0], cy: point[1], r: 7, class: "hover-dot" });
        const hoverTitle = make("title");
        const value = options.percent ? `${item.y[index].toFixed(1)}%` : item.y[index].toFixed(4);
        hoverTitle.textContent = `${item.name} · step ${item.x[index].toLocaleString()} · ${value}`;
        hover.appendChild(hoverTitle);
        svg.appendChild(hover);
      });
      const last = points[points.length - 1];
      svg.appendChild(make("circle", { cx: last[0], cy: last[1], r: 3.5, fill: item.color, stroke: "#fbfaf6", "stroke-width": 2 }));
    });

    target.replaceChildren(svg);
    const legend = document.createElement("div");
    legend.className = "chart-legend";
    series.forEach(item => {
      const entry = document.createElement("span");
      entry.className = "legend-item";
      entry.innerHTML = `<i style="background:${item.color}"></i>${item.name}`;
      legend.appendChild(entry);
    });
    target.appendChild(legend);
  }

  renderLineChart(document.getElementById("loss-chart"), [
    { name: "train · 1k mean", x: training.step, y: training.total, color: "#557a43" },
    { name: "fixed-panel validation", x: validation.step, y: validation.total, color: "#a35346" }
  ], {
    title: "Total training and validation loss from step 16k to 68k",
    yMin: 1.0,
    yMax: 4.2,
    precision: 1,
    markers: [{ x: 60000, label: "R3 resume" }, { x: 65000, label: "R4 resume" }]
  });

  renderLineChart(document.getElementById("component-chart"), [
    { name: "object × 0.25", x: validation.step, y: validation.object, color: "#80637c" },
    { name: "QA", x: validation.step, y: validation.qa, color: "#557a43" },
    { name: "pose × 0.25", x: validation.step, y: validation.pose, color: "#a87731" },
    { name: "memory margin", x: validation.step, y: validation.memory, color: "#587c9b" },
    { name: "numeric × 0.25", x: validation.step, y: validation.numeric, color: "#9a958b" }
  ], {
    title: "Weighted validation loss composition",
    yMin: 0,
    yMax: 3.0,
    precision: 1,
    markers: [{ x: 60000, label: "R3" }, { x: 65000, label: "R4" }]
  });

  renderLineChart(document.getElementById("pose-geometry-chart"), [
    { name: "pose total", x: geometryValidation.step, y: geometryValidation.pose, color: "#a87731", width: 2.8 },
    { name: "identity baseline", x: geometryValidation.step, y: geometryValidation.poseIdentity, color: "#a35346", dash: "6 4" },
    { name: "translation SmoothL1", x: geometryValidation.step, y: geometryValidation.poseTranslation, color: "#587c9b" },
    { name: "rotation radians", x: geometryValidation.step, y: geometryValidation.poseRotation, color: "#80637c" }
  ], {
    title: "Raw held-out camera pose losses",
    yMin: 0.5,
    yMax: 2.5,
    precision: 1,
    markers: [{ x: 60000, label: "R3" }, { x: 65000, label: "R4" }]
  });

  renderLineChart(document.getElementById("object-geometry-chart"), [
    { name: "center SmoothL1", x: geometryValidation.step, y: geometryValidation.objectCenter, color: "#587c9b", width: 2.8 },
    { name: "extent SmoothL1", x: geometryValidation.step, y: geometryValidation.objectExtent, color: "#557a43" },
    { name: "orientation 1 - cos", x: geometryValidation.step, y: geometryValidation.objectRotation, color: "#80637c" }
  ], {
    title: "Raw held-out 3D object geometry losses",
    yMin: 0.2,
    yMax: 1.7,
    precision: 1,
    markers: [{ x: 60000, label: "R3" }, { x: 65000, label: "R4" }]
  });

  renderLineChart(document.getElementById("gradient-chart"), [
    { name: "finite writer-gradient batches", x: training.step, y: training.finiteWriter, color: "#a35346", width: 2.8 }
  ], {
    title: "Finite writer gradient percentage by 1,000-step window",
    yMin: 0,
    yMax: 100,
    percent: true,
    markers: [{ x: 60000, label: "R3" }, { x: 65000, label: "R4" }]
  });

  document.querySelectorAll(".eval-cell[data-current]").forEach(cell => {
    const current = Number(cell.dataset.current);
    const baseline = Number(cell.dataset.baseline);
    const bars = cell.querySelector(".dual-bar");
    bars.innerHTML = `
      <div class="bar-track"><i class="bar-current" style="width:${current}%"></i></div>
      <div class="bar-track"><i class="bar-baseline" style="width:${baseline}%"></i></div>
      <div class="eval-values"><span>ours ${current.toFixed(2)}</span><span>base ${baseline.toFixed(2)}</span></div>`;
  });
})();
