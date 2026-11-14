/*
============================================================
BUSSY 67! — SCROLLTELLING ENGINE
------------------------------------------------------------
1. DATA
2. DOM ELEMENTS
3. AUDIO MANAGER
4. LENIS INITIALIZATION
5. SCENE MANAGEMENT
6. CHARACTER ANIMATIONS
7. INFORMATION MODAL
8. SCROLLTRIGGER
9. BUTTON EVENTS
10. RESPONSIVE BEHAVIOR
============================================================
*/

"use strict";

/* ============================================================
   PUBLIC GITHUB REPOSITORY LINK
   ============================================================ */
const GITHUB_REPO_URL = "";

/* ============================================================
   1. DATA


   Every object uses the same structure, which lets one reusable
   modal and one reusable scene system power all object scenes.


   ============================================================ */

const objects = {
  eagle: {
    name: "Apollo 11 Eagle Descent Stage",
    subtitle: "THE MOON • APOLLO 11",
    intro: "The cartoon character represents the Apollo 11 Eagle descent stage, a historic piece of hardware left on the lunar surface.",

    // ========================================================
    // ========================================================
    characterImage: "assets/images/eagle-cartoon.png",

    // ========================================================
    // ========================================================
    realImage: "assets/images/eagle-real.jpg",

    // ========================================================
    // ========================================================
    audio: "assets/audio/eagle-narration.mp3",

    mission: "Apollo 11 (Lunar Module LM-5, Eagle)",
    landingYear: "1969 (20 July)",
    purpose: "Carried the two astronauts to the lunar surface; the descent stage provided the landing platform and launch base for the ascent stage.",
    location: "Tranquility Base, Mare Tranquillitatis (Sea of Tranquility), Moon",
    latitude: "0.67416° N",
    longitude: "23.47314° E",
    mass: "2,034 kg (dry mass of the descent stage)",
    instruments: "No dedicated science suite on the descent stage; the crew deployed a TV camera and separate EASEP experiments nearby.",
    science: "Supported the first crewed lunar landing and the first close-up human observations and sampling of the Moon’s surface.",
    contribution: "Made the first human landing on another world possible. Its descent stage remains at Tranquility Base as a historic lunar artifact.",
  },

  lrv: {
    name: "Apollo Lunar Roving Vehicle",
    subtitle: "THE MOON • LUNAR ROVER",
    intro: "The cartoon character represents the Apollo Lunar Roving Vehicle, remembered here through the science and exploration story you provide.",
    characterImage: "assets/images/lrv-cartoon.png",
    realImage: "assets/images/lrv-real.jpg",
    audio: "assets/audio/lrv-narration.mp3",

    mission: "Apollo 15, Apollo 16 and Apollo 17",
    landingYear: "1971–1972",
    purpose: "Battery-powered two-person transport that extended astronaut traverses and carried tools, communications equipment and lunar samples.",
    location: "Hadley–Apennine (Apollo 15); Descartes Highlands (Apollo 16); Taurus–Littrow (Apollo 17), Moon",
    latitude: "Landing-site references: 26.13239° N (Apollo 15); 8.9734° S (Apollo 16); 20.1911° N (Apollo 17)",
    longitude: "Landing-site references: 3.63330° E (Apollo 15); 15.5011° E (Apollo 16); 30.7723° E (Apollo 17)",
    mass: "About 210 kg (empty vehicle)",
    instruments: "No dedicated science instrument suite; carried astronaut geology tools, cameras, communications equipment and collected samples.",
    science: "Enabled crews to investigate a much wider range of lunar geology than they could reach on foot, including distant craters, hills and valley terrain.",
    contribution: "Three LRVs supported Apollo 15, 16 and 17, travelling about 90 km in total and greatly expanding the scientific return of the final lunar landing missions.",
  },

  alsep: {
    name: "ALSEP Science Stations",
    subtitle: "THE MOON • APOLLO LUNAR SURFACE EXPERIMENTS",
    intro: "The cartoon character represents the Apollo Lunar Surface Experiments Package / ALSEP science stations deployed on the Moon.",
    characterImage: "assets/images/alsep-cartoon.png",
    realImage: "assets/images/alsep-real.jpg",
    audio: "assets/audio/alsep-narration.mp3",

    mission: "Apollo 12, Apollo 14, Apollo 15, Apollo 16 and Apollo 17",
    landingYear: "1969–1972 (deployed November 1969–December 1972)",
    purpose: "A network of self-contained, remotely operated lunar science stations that collected measurements and transmitted data to Earth for years after the astronauts departed.",
    location: "Five lunar sites: Oceanus Procellarum; Fra Mauro; Hadley–Apennine; Descartes; Taurus–Littrow",
    latitude: "3.0098° S (Apollo 12); 3.6442° S (Apollo 14); 26.1341° N (Apollo 15); 8.9759° S (Apollo 16); 20.1923° N (Apollo 17)",
    longitude: "23.4249° W (Apollo 12); 17.4777° W (Apollo 14); 3.6299° E (Apollo 15); 15.4986° E (Apollo 16); 30.7655° E (Apollo 17)",
    mass: "25 kg for the central station; total package mass varied by mission and instrument set",
    instruments: "Mission-dependent: passive and active seismometers, heat-flow probes, lunar surface magnetometers, solar-wind and ion detectors, dust detectors and other experiments.",
    science: "Measured moonquakes and impacts, heat flow, magnetic fields, solar-wind interactions, dust and the Moon’s extremely thin atmosphere.",
    contribution: "Created the first long-running lunar surface science network. Data from the stations continued until 30 September 1977, improving knowledge of the Moon’s interior and environment.",
  },

  opportunity: {
    name: "Opportunity Rover",
    subtitle: "MARS • MARS EXPLORATION ROVER",
    intro: "The cartoon character represents NASA's Opportunity rover, remembered here as a curious explorer on another world.",
    characterImage: "assets/images/opportunity-cartoon.png",
    realImage: "assets/images/opportunity-real.jpg",
    audio: "assets/audio/opportunity-narration.mp3",

    mission: "Mars Exploration Rover mission (MER-B / Opportunity)",
    landingYear: "2004 (25 January UTC; 24 January local time at JPL)",
    purpose: "Explore Martian rocks and soils to reconstruct the planet’s geological history and test evidence for ancient liquid water and potentially habitable environments.",
    location: "Meridiani Planum, inside Eagle Crater; Challenger Memorial Station, Mars",
    latitude: "1.9483° S",
    longitude: "354.47417° E",
    mass: "About 185 kg (rover)",
    instruments: "Panoramic and navigation cameras (Pancam, Navcam), Mini-TES, Mössbauer spectrometer, Alpha Particle X-ray Spectrometer (APXS), microscopic imager, rock abrasion tool and magnets.",
    science: "Found hematite-rich spherules, water-altered sedimentary rocks and later gypsum veins, showing that liquid water had affected the region in Mars’ ancient past.",
    contribution: "Operated for nearly 15 years instead of its planned 90 sols, travelled 45.16 km and supplied compelling evidence that ancient Mars had wet environments that could have been habitable.",
  },

  spirit: {
    name: "Spirit Rover",
    subtitle: "MARS • MARS EXPLORATION ROVER",
    intro: "The cartoon character represents NASA's Spirit rover, presented as a determined explorer whose scientific story you can reveal.",
    characterImage: "assets/images/spirit-cartoon.png",
    realImage: "assets/images/spirit-real.jpg",
    audio: "assets/audio/spirit-narration.mp3",

    mission: "Mars Exploration Rover mission (MER-A / Spirit)",
    landingYear: "2004 (3 January PST; 4 January UTC)",
    purpose: "Investigate Martian rocks and soils for clues to past water activity, environmental change and conditions that may once have been suitable for life.",
    location: "Gusev Crater; Columbia Memorial Station, Mars",
    latitude: "14.5692° S",
    longitude: "175.4729° E",
    mass: "About 185 kg (rover)",
    instruments: "Panoramic and navigation cameras (Pancam, Navcam), Mini-TES, Mössbauer spectrometer, Alpha Particle X-ray Spectrometer (APXS), microscopic imager, rock abrasion tool and magnets.",
    science: "Found water-altered rocks and nearly pure silica deposits consistent with ancient hot-spring or steam-vent activity, evidence that parts of Mars were once much wetter.",
    contribution: "Worked for more than six years—far beyond its 90-sol design life—travelled about 7.73 km and revealed evidence of ancient wet and potentially habitable environments.",
  },

  surveyor3: {
    name: "Surveyor 3",
    subtitle: "THE MOON • SURVEYOR PROGRAM",
    intro: "NASA's Surveyor 3 was a robotic lunar lander that tested the Moon's surface and returned images before Apollo 12 visited the site.",
    characterImage: "assets/images/surveyor-3-cartoon.png",
    realImage: "assets/images/surveyor-3-real.jpg",
    audio: "assets/audio/surveyor-3-narration.mp3",
    mission: "Surveyor 3 lunar soft-landing mission",
    landingYear: "1967 (20 April)",
    purpose: "Demonstrate a controlled soft landing, photograph the lunar surface, and use a surface sampler to investigate soil strength and texture.",
    location: "Southeastern Oceanus Procellarum (Ocean of Storms), Moon",
    latitude: "About 3.0° S",
    longitude: "About 23.4° W",
    mass: "About 998 kg at launch",
    instruments: "Television camera and surface-sampling scoop",
    science: "Returned 6,326 television images and performed trenching, bearing, and impact tests that helped characterize the mechanical properties of lunar soil.",
    contribution: "Its findings helped establish that the lunar surface could support an Apollo Lunar Module. Apollo 12 astronauts later visited the lander and recovered components for examination after nearly two and a half years on the Moon.",
  },

  pathfinderSojourner: {
    name: "Mars Pathfinder and Sojourner",
    subtitle: "MARS • PATHFINDER LANDER + SOJOURNER ROVER",
    intro: "Mars Pathfinder delivered the Sojourner rover to Mars, demonstrating a new landing system and a practical way to explore the Martian surface with a small mobile robot.",
    characterImage: "assets/images/pathfinder-sojourner-cartoon.png",
    realImage: "assets/images/pathfinder-sojourner-real.jpg",
    audio: "assets/audio/pathfinder-sojourner-narration.mp3",
    mission: "Mars Pathfinder (Carl Sagan Memorial Station) and Sojourner rover",
    landingYear: "1997 (4 July)",
    purpose: "Demonstrate a low-cost Mars landing system and deploy a free-ranging rover to investigate nearby rocks, soil, and the Martian environment.",
    location: "Ares Vallis, Mars",
    latitude: "About 19.1° N",
    longitude: "About 33.2° W",
    mass: "Sojourner rover: about 10.6 kg (23 lb)",
    instruments: "Pathfinder: Imager for Mars Pathfinder and atmospheric sensors. Sojourner: cameras, Alpha Proton X-ray Spectrometer, and engineering sensors.",
    science: "Returned thousands of lander images, rover images, atmospheric measurements, and chemical analyses of Martian rocks and soil. Sojourner travelled about 100 metres.",
    contribution: "Demonstrated airbag-assisted landing and rover deployment on Mars. Its technologies and results helped establish the path for later Mars landers and rovers.",
  },

  insight: {
    name: "InSight Robotic Arm",
    subtitle: "MARS • NASA INSIGHT LANDER",
    intro: "The cartoon character represents the InSight lander / robotic arm story, focused on the scientific work performed on Mars.",
    characterImage: "assets/images/insight-cartoon.png",
    realImage: "assets/images/insight-real.jpg",
    audio: "assets/audio/insight-narration.mp3",

    mission: "Interior Exploration using Seismic Investigations, Geodesy and Heat Transport (InSight)",
    landingYear: "2018 (26 November)",
    purpose: "Study Mars’ deep interior and measure its seismic activity, internal heat flow and planetary wobble to understand how rocky planets form and evolve.",
    location: "Western Elysium Planitia, Mars",
    latitude: "About 4.5° N",
    longitude: "About 135.9° E",
    mass: "358 kg (lander; full spacecraft at launch was about 694 kg)",
    instruments: "SEIS seismometer; HP³ heat-flow probe; RISE radio-science experiment; APSS weather sensors; robotic arm and cameras for deployment and imaging.",
    science: "Detected marsquakes and meteorite impacts, and used seismic and radio-science data to constrain the thickness and layering of the crust, mantle and core.",
    contribution: "Delivered the first detailed measurements of Mars’ internal structure and seismic activity, providing new evidence about how Mars—and other rocky planets—formed and evolved.",
  }
};

/* ============================================================
   AUDIO PATHS

   These files are not preloaded all at once.
   ============================================================ */

const audioPaths = {
  busEngine: "assets/audio/bus-engine.mp3",
  marsAmbient: "assets/audio/mars-ambience.mp3",
  returnHome: "assets/audio/return-home.mp3",
  keplerAppearance: "assets/audio/kepler-appearance.mp3",
  finalNarration: "assets/audio/final-narration.mp3"
};

/* ============================================================
   2. DOM ELEMENTS
   ============================================================ */

const elements = {
  body: document.body,
  story: document.getElementById("story"),
  startButton: document.getElementById("startButton"),

  progressBar: document.getElementById("progressBar"),
  currentChapter: document.getElementById("currentChapter"),
  currentLocation: document.getElementById("currentLocation"),

  infoModal: document.getElementById("infoModal"),
  modalPanel: document.querySelector(".modal-panel"),
  modalClose: document.getElementById("modalClose"),
  modalBackdrop: document.querySelector("[data-close-modal]"),

  modalImage: document.getElementById("modalImage"),
  modalImageWrap: document.querySelector(".modal-image-wrap"),
  surveyor3VideoBlock: document.getElementById("surveyor3VideoBlock"),
  surveyor3VideoMount: document.getElementById("surveyor3VideoMount"),
  eagleVideoBlock: document.getElementById("eagleVideoBlock"),
  eagleVideoMount: document.getElementById("eagleVideoMount"),
  opportunityVideoBlock: document.getElementById("opportunityVideoBlock"),
  opportunityVideoMount: document.getElementById("opportunityVideoMount"),
  insightVideoBlock: document.getElementById("insightVideoBlock"),
  insightVideoMount: document.getElementById("insightVideoMount"),
  spiritVideoBlock: document.getElementById("spiritVideoBlock"),
  spiritVideoMount: document.getElementById("spiritVideoMount"),
  lrvVideoBlock: document.getElementById("lrvVideoBlock"),
  lrvVideoMount: document.getElementById("lrvVideoMount"),
  alsepVideoBlock: document.getElementById("alsepVideoBlock"),
  alsepMissionVideo: document.getElementById("alsepMissionVideo"),
  pathfinderSojournerVideoBlock: document.getElementById("pathfinderSojournerVideoBlock"),
  pathfinderSojournerVideoMount: document.getElementById("pathfinderSojournerVideoMount"),
  modalImageFallback: document.getElementById("modalImageFallback"),
  modalSubtitle: document.getElementById("modalSubtitle"),
  modalTitle: document.getElementById("modalTitle"),
  modalIntro: document.getElementById("modalIntro"),
  modalFacts: document.getElementById("modalFacts"),
  modalScience: document.getElementById("modalScience"),
  modalContribution: document.getElementById("modalContribution"),

  assetNotice: document.getElementById("assetNotice")
};

/* ============================================================
   GLOBAL STATE
   ============================================================ */

let isAudioUnlocked = false;
let isModalOpen = false;
let activeSceneNumber = 1;
let activeObjectKey = null;

let lastFocusedElement = null;
let audioRequestId = 0;

/* ============================================================
   3. AUDIO MANAGER

   Only one narration is allowed at a time.

   Browsers generally require a real user interaction before
   audio can start. The START button calls unlock() first.
   ============================================================ */

const AudioManager = {
  narration: null,
  ambient: null,
  ambientType: null,
  engine: null,
  keplerCue: null,
  keplerCuePlayed: false,
  currentNarrationPath: null,

  createAudio(path, loop = false) {
    if (!path) return null;

    const audio = new Audio();
    audio.preload = "none";
    audio.loop = loop;
    audio.playsInline = true;
    audio.src = path;

    audio.addEventListener("error", () => {
      showAssetNotice(`Audio file could not be loaded: ${path}`);
    }, { once: true });

    return audio;
  },

  unlock() {
    if (isAudioUnlocked) return;

    isAudioUnlocked = true;

    /*
      We do NOT play narration here.
      The unlock happens because this function is called from
      the user's button click.
    */
  },

  stopAudioInstance(audio, reset = true) {
    if (!audio) return;

    audio.pause();

    if (reset) {
      try {
        audio.currentTime = 0;
      } catch (error) {
        // Some browsers may reject currentTime before metadata loads.
      }
    }
  },

  async playNarration(path) {
    if (!isAudioUnlocked || !path) return;

    /*
      Every new narration gets a new request ID. If the visitor
      scrolls quickly, an older play() promise cannot accidentally
      bring an outdated narration back to life.
    */
    const requestId = ++audioRequestId;

    this.stopNarration();

    this.currentNarrationPath = path;
    this.narration = this.createAudio(path, false);

    if (!this.narration) return;

    const narrationAudio = this.narration;
    narrationAudio.volume = 1;

    try {
      await narrationAudio.play();

      if (requestId !== audioRequestId || narrationAudio !== this.narration) {
        this.stopAudioInstance(narrationAudio, true);
      }
    } catch (error) {
      /*
        Missing files and browser playback restrictions are both
        handled gracefully. Clearing the reference is important so
        a later scene can retry instead of getting stuck.
      */
      if (narrationAudio === this.narration) {
        this.narration = null;
        this.currentNarrationPath = null;
      }

      showAssetNotice("Narration could not start. Check the audio file path.");
    }
  },

  stopNarration() {
    this.stopAudioInstance(this.narration, true);
    this.narration = null;
    this.currentNarrationPath = null;
  },

  async playAmbient(type, path, volume = 0.08) {
    if (!isAudioUnlocked || !path) return;

    if (this.ambientType === type && this.ambient && !this.ambient.paused) return;

    this.stopAmbient();

    this.ambientType = type;
    this.ambient = this.createAudio(path, true);

    if (!this.ambient) return;

    const ambientAudio = this.ambient;
    ambientAudio.volume = volume;

    try {
      await ambientAudio.play();
    } catch (error) {
      if (ambientAudio === this.ambient) {
        this.ambient = null;
        this.ambientType = null;
      }
      showAssetNotice("Ambient audio could not start. Check the audio file path.");
    }
  },

  stopAmbient() {
    this.stopAudioInstance(this.ambient, true);
    this.ambient = null;
    this.ambientType = null;
  },

  async playEngine() {
    if (!isAudioUnlocked || !audioPaths.busEngine) return;

    /* Do not restart the same engine loop every time a ScrollTrigger
       callback fires near a scene boundary. */
    if (this.engine && !this.engine.paused) return;

    this.stopAudioInstance(this.engine, true);
    this.engine = this.createAudio(audioPaths.busEngine, true);

    if (!this.engine) return;

    const engineAudio = this.engine;
    engineAudio.volume = 0.17;

    try {
      await engineAudio.play();
    } catch (error) {
      if (engineAudio === this.engine) {
        this.engine = null;
      }
      showAssetNotice("Bus engine audio could not start. Check the audio file path.");
    }
  },

  stopEngine() {
    this.stopAudioInstance(this.engine, true);
    this.engine = null;
  },

  async playKeplerCue() {
    if (!isAudioUnlocked || !audioPaths.keplerAppearance || this.keplerCuePlayed) return;

    // This cue is intentionally one-shot for the lifetime of the page.
    this.keplerCuePlayed = true;
    this.keplerCue = this.createAudio(audioPaths.keplerAppearance, false);
    if (!this.keplerCue) return;

    const cue = this.keplerCue;
    cue.volume = 0.48;
    try {
      await cue.play();
    } catch (error) {
      if (cue === this.keplerCue) this.keplerCue = null;
      showAssetNotice("Kepler appearance audio could not start. Check the audio file path.");
    }
  },

  stopKeplerCue() {
    this.stopAudioInstance(this.keplerCue, true);
    this.keplerCue = null;
  },

  stopAll() {
    this.stopNarration();
    this.stopAmbient();
    this.stopEngine();
    this.stopKeplerCue();
  }
};

/* ============================================================
   4. LENIS INITIALIZATION

   We connect Lenis to GSAP's ticker so ScrollTrigger and smooth
   scrolling stay synchronized.
   ============================================================ */

let lenis = null;

function initializeLenis() {
  if (!window.Lenis) {
    console.warn("Lenis did not load. Native scrolling will continue.");
    return;
  }

  lenis = new Lenis({
    autoRaf: false,
    duration: 1.15,
    smoothWheel: true,
    syncTouch: false
  });

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  lenis.on("scroll", ScrollTrigger.update);
}

function setupModalWheelIsolation() {
  /*
    The main story uses Lenis for smooth scrolling. Lenis can
    otherwise see the mouse wheel even while the information
    portal is open. The portal is therefore explicitly marked
    with data-lenis-prevent in the HTML above.

    This wheel listener is a second safety layer: while the
    portal is open, wheel events are kept inside the portal
    instead of being allowed to reach the page behind it.
  */
  if (!elements.modalPanel) return;

  elements.modalPanel.addEventListener("wheel", (event) => {
    if (!isModalOpen) return;

    const panel = elements.modalPanel;
    const canScroll = panel.scrollHeight > panel.clientHeight;

    if (!canScroll) {
      event.preventDefault();
      return;
    }

    const atTop = panel.scrollTop <= 0;
    const atBottom =
      Math.ceil(panel.scrollTop + panel.clientHeight) >= panel.scrollHeight;

    /*
      Stop scroll chaining at the portal's boundaries. This keeps
      the main Bussy 67 page behind the portal completely still.
    */
    if ((event.deltaY < 0 && atTop) || (event.deltaY > 0 && atBottom)) {
      event.preventDefault();
    }
  }, { passive: false });
}

/* ============================================================
   5. SCENE MANAGEMENT
   ============================================================ */

const sceneList = Array.from(document.querySelectorAll(".story-scene"));

function scrollToScene(sceneElement) {
  if (!sceneElement) return;

  if (lenis) {
    lenis.scrollTo(sceneElement, {
      offset: 0,
      duration: 1.45
    });
  } else {
    sceneElement.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function updateChapterIndicator(sceneElement) {
  if (!sceneElement) return;

  const sceneNumber = sceneElement.dataset.scene || "1";
  const location = sceneElement.dataset.location || "EARTH";

  activeSceneNumber = Number(sceneNumber);
  elements.currentChapter.textContent = sceneNumber.padStart(2, "0");
  elements.currentLocation.textContent = location;
}

function getObjectKeyFromScene(sceneElement) {
  return sceneElement?.dataset?.objectKey || null;
}

function resetNarrationCaption(captionId) {
  document.querySelectorAll(`#${captionId} [data-caption-line]`).forEach((line) => {
    line.classList.remove("is-revealed");
  });
}

function connectNarrationCaptionToAudio(audio, captionId, revealAt) {
  if (!audio) return;
  const lines = Array.from(document.querySelectorAll(`#${captionId} [data-caption-line]`));
  const updateCaption = () => {
    if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
    const progress = audio.currentTime / audio.duration;
    lines.forEach((line, index) => {
      if (progress >= revealAt[index]) line.classList.add("is-revealed");
    });
  };
  audio.addEventListener("loadedmetadata", updateCaption);
  audio.addEventListener("timeupdate", updateCaption);
  audio.addEventListener("ended", () => {
    lines.forEach((line) => line.classList.add("is-revealed"));
  }, { once: true });
  updateCaption();
}

function handleSceneEnter(sceneElement) {
  if (!sceneElement) return;

  updateChapterIndicator(sceneElement);

  // Chapters 3 and 7 reveal their narration UI only after their own
  // section reaches the top of the viewport.
  if (["scene-03", "scene-06", "scene-08", "scene-11"].includes(sceneElement.id)) {
    sceneElement.classList.add("chapter-activated");
  }

  const objectKey = getObjectKeyFromScene(sceneElement);
  activeObjectKey = objectKey;

  const sceneId = sceneElement.id;

  /*
    Audio is controlled by the chapter itself.

    Chapter 2, 6, 10:
      - Bus engine only.

    Chapters 3, 4, 5:
      - Object narration only.
      - NO moon ambience.

    Chapters 7, 8, 9:
      - Object narration + quiet Mars ambience.

    Chapter 11:
      - Final narration only.
  */

  // Stop audio layers from the previous chapter before starting
  // the audio appropriate for the new chapter.
  AudioManager.stopNarration();
  AudioManager.stopAmbient();
  AudioManager.stopEngine();

  if (objectKey) {
    const objectData = objects[objectKey];

    if (objectData) {
      AudioManager.playNarration(objectData.audio);
      if (objectKey === "eagle") {
        resetNarrationCaption("eagleCaption");
        connectNarrationCaptionToAudio(AudioManager.narration, "eagleCaption", [0.02, 0.22, 0.46, 0.68, 0.82]);
      } else if (objectKey === "lrv") {
        resetNarrationCaption("lrvCaption");
        connectNarrationCaptionToAudio(AudioManager.narration, "lrvCaption", [0.02, 0.20, 0.68, 0.84, 0.92]);
      } else if (objectKey === "alsep") {
        resetNarrationCaption("alsepCaption");
        connectNarrationCaptionToAudio(AudioManager.narration, "alsepCaption", [0.02, 0.20, 0.48, 0.68, 0.86]);
      } else if (objectKey === "opportunity") {
        resetNarrationCaption("opportunityCaption");
        connectNarrationCaptionToAudio(AudioManager.narration, "opportunityCaption", [0.02, 0.20, 0.43, 0.68, 0.86]);
      } else if (objectKey === "spirit") {
        resetNarrationCaption("spiritCaption");
        connectNarrationCaptionToAudio(AudioManager.narration, "spiritCaption", [0.02, 0.22, 0.48, 0.72, 0.90]);
      } else if (objectKey === "surveyor3") {
        resetNarrationCaption("surveyor3Caption");
        connectNarrationCaptionToAudio(AudioManager.narration, "surveyor3Caption", [0.02, 0.20, 0.48, 0.66, 0.84]);
      } else if (objectKey === "pathfinderSojourner") {
        resetNarrationCaption("pathfinderSojournerCaption");
        connectNarrationCaptionToAudio(AudioManager.narration, "pathfinderSojournerCaption", [0.02, 0.20, 0.48, 0.67, 0.82]);
      } else if (objectKey === "insight") {
        resetNarrationCaption("insightCaption");
        connectNarrationCaptionToAudio(AudioManager.narration, "insightCaption", [0.02, 0.28, 0.66, 0.88]);
      }
    }

    const isMars = ["scene-08", "scene-09", "scene-10", "scene-11"].includes(sceneId);

    if (isMars) {
      AudioManager.playAmbient("mars", audioPaths.marsAmbient, 0.08);
    }

    return;
  }

  // Bus engine plays ONLY on Chapters 2, 6, and 10.
  if (
    sceneId === "scene-02" ||
    sceneId === "scene-07" ||
    sceneId === "scene-12"
  ) {
    AudioManager.playEngine();
    if (sceneId === "scene-12") {
      AudioManager.playKeplerCue();
    }
    activeObjectKey = null;
    return;
  }

  if (sceneId === "scene-13") {
    activeObjectKey = null;
    resetNarrationCaption("finalCaption");

    if (isAudioUnlocked && audioPaths.finalNarration) {
      AudioManager.playNarration(audioPaths.finalNarration);
      connectNarrationCaptionToAudio(AudioManager.narration, "finalCaption", [0.02, 0.30, 0.66, 0.84]);
    }
  }
}

function handleSceneLeave(sceneElement, leavingBack = false) {
  if (!sceneElement) return;

  const sceneId = sceneElement.id;
  const boundaryCaptions = {
    "scene-03": "eagleCaption",
    "scene-06": "surveyor3Caption",
    "scene-08": "opportunityCaption",
    "scene-11": "pathfinderSojournerCaption"
  };
  const isBoundarySyncedScene = Object.prototype.hasOwnProperty.call(boundaryCaptions, sceneId);

  if (isBoundarySyncedScene) {
    sceneElement.classList.remove("chapter-activated");
    resetNarrationCaption(boundaryCaptions[sceneId]);
  }

  /*
    The active scene normally takes over the audio. We explicitly
    stop narration when leaving Chapters 3 or 7 backwards into their
    preceding travel chapters. Forward transitions to another object
    chapter are handled by that next chapter's own enter callback.
  */
  if (isBoundarySyncedScene && leavingBack && !isModalOpen) {
    AudioManager.stopNarration();
    return;
  }

  if (getObjectKeyFromScene(sceneElement) && !isModalOpen) {
    const nextScene = sceneElement.nextElementSibling;

    if (nextScene && !nextScene.dataset.objectKey) {
      AudioManager.stopNarration();
    }
  }
}

/* ============================================================
   6. CHARACTER ANIMATIONS
   ============================================================ */

function createCharacterEntrance(sceneElement) {
  const character = sceneElement.querySelector(".character-wrap");
  const copyItems = sceneElement.querySelectorAll(".object-copy > *");

  if (!character) return;

  const entranceTimeline = gsap.timeline({
    defaults: {
      ease: "power3.out"
    }
  });

  entranceTimeline.fromTo(
    character,
    {
      autoAlpha: 0,
      y: 70,
      scale: 0.92
    },
    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 1.05
    }
  );

  entranceTimeline.fromTo(
    copyItems,
    {
      autoAlpha: 0,
      y: 26
    },
    {
      autoAlpha: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.55
    },
    "-=0.65"
  );

  /*
    Floating character motion.
    It is a small continuous loop rather than a large animation.
  */
  const intensity = Number(character.dataset.float || 1);

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.to(character, {
      y: `-=${8 * intensity}`,
      duration: 2.8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });
  }
}

function createTravelAnimation(sceneElement) {
  const bus = sceneElement.querySelector("[data-travel-bus]");
  const title = sceneElement.querySelector(".scene-title");
  const copy = sceneElement.querySelector(".scene-copy");
  const status = sceneElement.querySelector(".travel-status");
  const earth = sceneElement.querySelector(".earth-orb, .home-earth-orb");
  const mars = sceneElement.querySelector(".mars-orb");

  if (bus) {
    const isReturn = sceneElement.dataset.scene === "10";

    gsap.fromTo(
      bus,
      {
        xPercent: isReturn ? 90 : -85,
        y: 35,
        scale: isReturn ? 0.8 : 0.64,
        autoAlpha: 0
      },
      {
        xPercent: isReturn ? -40 : 35,
        y: -30,
        scale: 1,
        autoAlpha: 1,
        duration: 2.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sceneElement,
          start: "top 85%",
          end: "bottom 15%",
          scrub: 1.1
        }
      }
    );
  }

  if (title) {
    gsap.fromTo(
      title,
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sceneElement,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }

  if (copy) {
    gsap.fromTo(
      copy,
      { autoAlpha: 0, y: 22 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        delay: 0.12,
        scrollTrigger: {
          trigger: sceneElement,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }

  if (status) {
    gsap.fromTo(
      status,
      { autoAlpha: 0, y: 15 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        delay: 0.25,
        scrollTrigger: {
          trigger: sceneElement,
          start: "top 65%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }

  /*
    Parallax on the destination planet makes the trip feel
    physically deeper without requiring a 3D engine.
  */
  if (earth) {
    gsap.to(earth, {
      y: -50,
      x: -25,
      scrollTrigger: {
        trigger: sceneElement,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2
      }
    });
  }

  if (mars) {
    gsap.to(mars, {
      y: -60,
      x: -20,
      scale: 1.07,
      scrollTrigger: {
        trigger: sceneElement,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2
      }
    });
  }
}

/* ============================================================
   7. INFORMATION MODAL
   ============================================================ */

function renderModalFacts(data) {
  const factItems = [
    ["Mission", data.mission],
    ["Landing / Deployment Year", data.landingYear],
    ["Purpose", data.purpose],
    ["Location", data.location],
    ["Latitude", data.latitude],
    ["Longitude", data.longitude],
    ["Mass", data.mass],
    ["Instruments", data.instruments]
  ];

  elements.modalFacts.innerHTML = factItems
    .map(([label, value]) => {
      return `
        <div class="fact-item">
          <div class="fact-label">${escapeHtml(label)}</div>
          <div class="fact-value">${escapeHtml(value)}</div>
        </div>
      `;
    })
    .join("");
}

let modalYoutubePlayer = null;
let youtubeApiPromise = null;
let modalVideoRequestId = 0;

function loadYouTubeIframeApi() {
  if (window.YT && window.YT.Player) {
    return Promise.resolve(window.YT);
  }

  if (youtubeApiPromise) {
    return youtubeApiPromise;
  }

  youtubeApiPromise = new Promise((resolve, reject) => {
    const previousReadyCallback = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousReadyCallback === "function") {
        previousReadyCallback();
      }
      resolve(window.YT);
    };

    const apiScript = document.createElement("script");
    apiScript.src = "https://www.youtube.com/iframe_api";
    apiScript.async = true;
    apiScript.onerror = () => {
      youtubeApiPromise = null;
      reject(new Error("YouTube Player API could not be loaded."));
    };

    document.head.appendChild(apiScript);
  });

  return youtubeApiPromise;
}

const modalVideoConfigs = {
  surveyor3: { videoId: "FOWNrvvTIZM", startSeconds: 100, endSeconds: 115, mount: elements.surveyor3VideoMount, title: "Fifteen-second Surveyor 3 mission video clip", label: "Surveyor 3" },
  eagle: { videoId: "YKXw_3Pblh8", startSeconds: 215, endSeconds: 225, mount: elements.eagleVideoMount, title: "Ten-second Apollo 11 Eagle descent stage video clip", label: "Eagle Descent Stage" },
  opportunity: { videoId: "1Ll-VHYxWXU", startSeconds: 75, endSeconds: 85, mount: elements.opportunityVideoMount, title: "Ten-second Opportunity rover video clip", label: "Opportunity" },
  insight: { videoId: "yT50Q_Zbf3s", startSeconds: 82, endSeconds: 92, mount: elements.insightVideoMount, title: "Ten-second InSight lander video clip", label: "InSight" },
  spirit: { videoId: "SwxVgCGmOjQ", startSeconds: 249, endSeconds: 259, mount: elements.spiritVideoMount, title: "Ten-second Spirit rover video clip", label: "Spirit" },
  lrv: { videoId: "S8VtL54iuWc", startSeconds: 0, endSeconds: 8, mount: elements.lrvVideoMount, title: "Eight-second Lunar Roving Vehicle video clip", label: "Lunar Roving Vehicle" },
  pathfinderSojourner: { videoId: "9HGRReKUzfU", mount: elements.pathfinderSojournerVideoMount, title: "NASA Mars Pathfinder and Sojourner rover interactive 360-degree view", label: "Mars Pathfinder + Sojourner", fullLength360: true }
};

function configureModalVideo(objectKey) {
  const config = modalVideoConfigs[objectKey];
  elements.modalImageWrap.classList.toggle("has-surveyor-video", objectKey === "surveyor3");
  elements.modalImageWrap.classList.toggle("has-eagle-video", objectKey === "eagle");
  elements.modalImageWrap.classList.toggle("has-opportunity-video", objectKey === "opportunity");
  elements.modalImageWrap.classList.toggle("has-insight-video", objectKey === "insight");
  elements.modalImageWrap.classList.toggle("has-spirit-video", objectKey === "spirit");
  elements.modalImageWrap.classList.toggle("has-lrv-video", objectKey === "lrv");
  elements.modalImageWrap.classList.toggle("has-alsep-video", objectKey === "alsep");
  elements.modalImageWrap.classList.toggle("has-pathfinder-video", objectKey === "pathfinderSojourner");
  elements.surveyor3VideoBlock.hidden = objectKey !== "surveyor3";
  elements.eagleVideoBlock.hidden = objectKey !== "eagle";
  elements.opportunityVideoBlock.hidden = objectKey !== "opportunity";
  elements.insightVideoBlock.hidden = objectKey !== "insight";
  elements.spiritVideoBlock.hidden = objectKey !== "spirit";
  elements.lrvVideoBlock.hidden = objectKey !== "lrv";
  elements.alsepVideoBlock.hidden = objectKey !== "alsep";
  elements.pathfinderSojournerVideoBlock.hidden = objectKey !== "pathfinderSojourner";
  stopModalVideo();
  if (objectKey === "alsep" || !config) return;

  const requestId = modalVideoRequestId;
  const playerMount = document.createElement("div");
  playerMount.id = objectKey + "VideoPlayer";
  config.mount.appendChild(playerMount);

  loadYouTubeIframeApi().then((YT) => {
    if (requestId !== modalVideoRequestId || !isModalOpen || activeObjectKey !== objectKey) return;
    modalYoutubePlayer = new YT.Player(playerMount, {
      videoId: config.videoId,
      playerVars: {
        autoplay: 0,
        controls: config.fullLength360 ? 1 : 0,
        playsinline: 1,
        rel: 0,
        fs: 1,
        origin: window.location.origin
      },
      events: {
        onReady: (event) => {
          if (requestId !== modalVideoRequestId || !isModalOpen || activeObjectKey !== objectKey) {
            event.target.destroy();
            return;
          }
          const iframe = event.target.getIframe();
          iframe.title = config.title;
          if (config.fullLength360) {
            iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
            iframe.setAttribute("allowfullscreen", "");
          } else {
            event.target.mute();
            event.target.loadVideoById({ videoId: config.videoId, startSeconds: config.startSeconds, endSeconds: config.endSeconds });
          }
        },
        onStateChange: (event) => {
          if (requestId !== modalVideoRequestId || !isModalOpen || activeObjectKey !== objectKey) return;
          if (!config.fullLength360 && event.data === YT.PlayerState.PLAYING) event.target.mute();
          if (!config.fullLength360 && event.data === YT.PlayerState.ENDED) {
            event.target.mute();
            event.target.loadVideoById({ videoId: config.videoId, startSeconds: config.startSeconds, endSeconds: config.endSeconds });
          }
        }
      }
    });
  }).catch((error) => console.warn(config.label + " video could not be loaded.", error));
}

function stopModalVideo() {
  modalVideoRequestId += 1;
  if (modalYoutubePlayer) {
    modalYoutubePlayer.destroy();
    modalYoutubePlayer = null;
  }
  elements.surveyor3VideoMount.replaceChildren();
  elements.eagleVideoMount.replaceChildren();
  elements.opportunityVideoMount.replaceChildren();
  elements.insightVideoMount.replaceChildren();
  elements.spiritVideoMount.replaceChildren();
  elements.lrvVideoMount.replaceChildren();
  elements.pathfinderSojournerVideoMount.replaceChildren();
  elements.alsepMissionVideo.pause();
  elements.alsepMissionVideo.currentTime = 0;
}

function openInfoModal(objectKey, triggerElement) {
  const data = objects[objectKey];

  if (!data) return;

  lastFocusedElement = triggerElement || document.activeElement;
  activeObjectKey = objectKey;
  isModalOpen = true;

  elements.modalSubtitle.textContent = data.subtitle;
  elements.modalTitle.textContent = data.name;
  elements.modalIntro.textContent = data.intro;

  /*
    CHANGE REAL NASA IMAGE HERE:
    The image source is taken from the DATA section above.
  */
  elements.modalImage.src = data.realImage;
  elements.modalImage.alt = `Real NASA photograph of ${data.name}`;
  configureModalVideo(objectKey);

  elements.modalImageFallback.textContent = "NASA IMAGE PLACEHOLDER";
  elements.modalImageFallback.style.display = "none";
  elements.modalImage.style.display = "block";

  renderModalFacts(data);

  elements.modalScience.textContent = data.science;
  elements.modalContribution.textContent = data.contribution;

  elements.infoModal.setAttribute("aria-hidden", "false");
  elements.body.classList.add("modal-open");

  gsap.killTweensOf(elements.infoModal);
  gsap.killTweensOf(elements.modalPanel);

  gsap.set(elements.infoModal, {
    visibility: "visible"
  });

  if (objectKey === "alsep") {
    const playAttempt = elements.alsepMissionVideo.play();
    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch((error) => console.warn("ALSEP video autoplay was blocked by the browser.", error));
    }
  }

  gsap.timeline()
    .to(elements.infoModal, {
      autoAlpha: 1,
      duration: 0.45,
      ease: "power2.out"
    })
    .fromTo(
      elements.modalPanel,
      {
        y: 26,
        scale: 0.97
      },
      {
        y: 0,
        scale: 1,
        duration: 0.55,
        ease: "power3.out"
      },
      "-=0.28"
    );

  requestAnimationFrame(() => elements.modalClose.focus());

  if (lenis) {
    lenis.stop();
  }
}

function closeInfoModal() {
  if (!isModalOpen) return;

  isModalOpen = false;
  stopModalVideo();

  gsap.timeline({
    onComplete: () => {
      elements.infoModal.setAttribute("aria-hidden", "true");
      elements.body.classList.remove("modal-open");

      if (lenis) {
        lenis.start();
      }

      if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
      }

      lastFocusedElement = null;
    }
  })
    .to(elements.modalPanel, {
      y: 15,
      scale: 0.985,
      duration: 0.25,
      ease: "power2.in"
    })
    .to(elements.infoModal, {
      autoAlpha: 0,
      duration: 0.28,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(elements.infoModal, { visibility: "hidden" });
      }
    }, "-=0.16");
}

function setupModalImageFallback() {
  elements.modalImage.addEventListener("error", () => {
    elements.modalImage.style.display = "none";
    elements.modalImageFallback.style.display = "grid";
  });
}

function keepFocusInsideModal(event) {
  if (!isModalOpen || event.key !== "Tab") return;

  const focusable = Array.from(
    elements.infoModal.querySelectorAll(
      'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute("disabled"));

  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return String(value).replaceAll('"', "&quot;");
}

/* ============================================================
   8. SCROLLTRIGGER
   ============================================================ */

function initializeScrollTrigger() {
  gsap.registerPlugin(ScrollTrigger);

  /*
    Scene entrance detection.
    This is intentionally a reusable system:
    no duplicated ScrollTrigger code for individual characters.
  */
  sceneList.forEach((sceneElement) => {
    const isBoundarySyncedScene =
      ["scene-03", "scene-06", "scene-08", "scene-11"].includes(sceneElement.id);

    ScrollTrigger.create({
      trigger: sceneElement,
      // Object chapters with delayed caption activation wait until their
      // own page reaches the top; all other chapters retain existing timing.
      start: isBoundarySyncedScene ? "top top" : "top 62%",
      end: isBoundarySyncedScene ? "bottom top" : "bottom 38%",

      onEnter: () => {
        handleSceneEnter(sceneElement);
      },

      onEnterBack: () => {
        handleSceneEnter(sceneElement);
      },

      onLeave: () => {
        handleSceneLeave(sceneElement);
      },

      onLeaveBack: () => {
        handleSceneLeave(sceneElement, true);
      }
    });

    /*
      Background parallax.
    */
    const background = sceneElement.querySelector(".background-base");

    if (background) {
      gsap.fromTo(
        background,
        { scale: 1.06, y: 0 },
        {
          scale: 1.14,
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: sceneElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        }
      );
    }

    /*
      Stars move at a different speed for subtle depth.
    */
    sceneElement.querySelectorAll(".stars-a, .stars-b").forEach((starLayer, index) => {
      gsap.to(starLayer, {
        y: index === 0 ? -42 : -70,
        x: index === 0 ? 18 : -15,
        ease: "none",
        scrollTrigger: {
          trigger: sceneElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.1
        }
      });
    });

    /*
      Object scenes get a reusable character entrance.
    */
    if (sceneElement.classList.contains("object-scene")) {
      createCharacterEntrance(sceneElement);
    }

    /*
      Travel scenes get a reusable travel animation.
    */
    if (sceneElement.classList.contains("scene-space")) {
      createTravelAnimation(sceneElement);
    }
  });

  /*
    Progress bar for the whole story.
  */
  ScrollTrigger.create({
    trigger: elements.story,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      gsap.set(elements.progressBar, {
        scaleX: self.progress
      });
    }
  });

  ScrollTrigger.refresh();
}

/* ============================================================
   9. BUTTON EVENTS
   ============================================================ */

function setupButtonEvents() {
  /*
    START BUTTON:
    1. Unlock audio.
    2. Scroll to Chapter 2.
    3. Chapter 2's scene-enter handler starts the bus engine.
  */
  elements.startButton.addEventListener("click", () => {
    AudioManager.unlock();

    const sceneTwo = document.getElementById("scene-02");
    scrollToScene(sceneTwo);
  });

  /*
    READ ABOUT ME:
    The data attribute tells the reusable modal which object
    to display.
  */
  document.querySelectorAll("[data-open-object]").forEach((button) => {
    button.addEventListener("click", () => {
      const objectKey = button.dataset.openObject;
      openInfoModal(objectKey, button);
    });
  });

  /*
    Modal close button.
  */
  elements.modalClose.addEventListener("click", closeInfoModal);

  /*
    Clicking the dark backdrop closes the modal.
  */
  elements.modalBackdrop.addEventListener("click", closeInfoModal);

  /*
    Escape closes the modal.
  */
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isModalOpen) {
      closeInfoModal();
      return;
    }

    keepFocusInsideModal(event);
  });
}

/* ============================================================
   10. RESPONSIVE BEHAVIOR + ASSET FALLBACKS
   ============================================================ */

function setupPageVisibilityAudio() {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      AudioManager.narration?.pause();
      AudioManager.ambient?.pause();
      AudioManager.engine?.pause();
      return;
    }

    if (!isAudioUnlocked) return;

    const isEngineChapter =
      activeSceneNumber === 2 ||
      activeSceneNumber === 7 ||
      activeSceneNumber === 12;

    const isMarsChapter =
      activeSceneNumber === 8 ||
      activeSceneNumber === 9 ||
      activeSceneNumber === 10 ||
      activeSceneNumber === 11;

    if (isEngineChapter && AudioManager.engine && AudioManager.engine.paused) {
      AudioManager.engine.play().catch(() => {});
    }

    if (isMarsChapter && AudioManager.ambient && AudioManager.ambient.paused) {
      AudioManager.ambient.play().catch(() => {});
    }

    /* Narration resumes only for the currently active object or
       final narration scene. */
    if (
      AudioManager.narration &&
      AudioManager.narration.paused &&
      (activeObjectKey || activeSceneNumber === 13)
    ) {
      AudioManager.narration.play().catch(() => {});
    }
  });
}

function setupResponsiveBehavior() {
  /*
    ScrollTrigger already reacts to viewport changes.
    This refresh keeps the scene boundaries correct after a
    device rotation or resize.
  */
  let resizeTimer = null;

  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);

    resizeTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
  });
}

/*
  ============================================================
  IMAGE FALLBACK
  ------------------------------------------------------------
  Every placeholder image can fail without breaking the page.
  Instead, the surrounding .character-fallback is revealed.
  ============================================================
*/

function showImageFallback(imageElement) {
  if (!imageElement) return;

  imageElement.style.display = "none";

  const fallback = imageElement.parentElement?.querySelector(".character-fallback");

  if (fallback) {
    fallback.style.display = "grid";
  }

  if (imageElement.closest(".modal-image-wrap")) {
    const modalFallback = document.getElementById("modalImageFallback");

    if (modalFallback) {
      modalFallback.style.display = "grid";
    }
  }

  showAssetNotice(`Image placeholder missing: ${imageElement.getAttribute("src") || "unknown image"}`);
}

/*
  Small temporary notice for missing developer placeholders.
*/
function showAssetNotice(message) {
  if (!elements.assetNotice) return;

  elements.assetNotice.textContent = message;

  gsap.killTweensOf(elements.assetNotice);

  gsap.timeline()
    .set(elements.assetNotice, {
      autoAlpha: 1,
      y: 0
    })
    .to(elements.assetNotice, {
      autoAlpha: 0,
      y: 10,
      delay: 2.2,
      duration: 0.35,
      ease: "power2.in"
    });
}

/* ============================================================
   INITIALIZATION
   ============================================================ */

/* Activate the footer link. */
function setupGithubRepoLink() {
  const link = document.querySelector("[data-github-repo-link]");
  if (!link) return;

  const repositoryUrl = GITHUB_REPO_URL.trim();
  if (!repositoryUrl) return;

  link.href = repositoryUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.classList.remove("is-placeholder");
  link.removeAttribute("aria-disabled");
  link.removeAttribute("tabindex");
}

function initialize() {
  /*
    GSAP and ScrollTrigger are loaded with defer before this
    script executes, but this guard makes failures easier to
    diagnose if the CDN is unavailable.
  */
  if (!window.gsap || !window.ScrollTrigger) {
    console.error("GSAP or ScrollTrigger did not load.");
    return;
  }

  initializeLenis();
  setupModalWheelIsolation();
  setupModalImageFallback();
  setupButtonEvents();
  setupGithubRepoLink();
  setupResponsiveBehavior();
  setupPageVisibilityAudio();
  initializeScrollTrigger();

  /*
    The first scene is active before the user clicks START.
    No narration is started here because modern browsers may
    block it before user interaction.
  */
  updateChapterIndicator(document.getElementById("scene-01"));

  /*
    Start with subtle landing-page entrance effects.
  */
  const landingItems = document.querySelectorAll("#scene-01 .reveal-item, #scene-01 .hero-title, #scene-01 .hero-subtitle, #scene-01 .primary-button, #scene-01 .landing-note, #scene-01 .landing-bus");

  gsap.fromTo(
    landingItems,
    {
      autoAlpha: 0,
      y: 28
    },
    {
      autoAlpha: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.15
    }
  );

  /* Start optional 3D layer; failure preserves the original 2D scene. */
  initialize3DExperience();

  /*
    Gentle floating motion for the school bus.
  */
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".landing-bus, .final-bus").forEach((bus) => {
      gsap.to(bus, {
        y: -8,
        rotation: 0.6,
        duration: 2.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });
    });
  }
}

/*
  The script is loaded with defer in index.html. This guard also
  keeps initialization safe if the file is moved or loaded through
  another HTML host where DOMContentLoaded has already fired.
*/
if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", initialize, { once: true });
} else {
  initialize();
}

/* Shared Three.js world for the continuous Earth-to-Moon journey.
   The existing audio manager and chapter audio triggers remain independent. */
let scene3DController = null;
async function initialize3DExperience() {
  const landingScene = document.getElementById("scene-01");
  const travelScene = document.getElementById("scene-02");
  const marsTravelScene = document.getElementById("scene-07");
  const surfaceScene = document.getElementById("scene-03");
  const lrvScene = document.getElementById("scene-04");
  const alsepScene = document.getElementById("scene-05");
  const surveyorScene = document.getElementById("scene-06");
  const opportunityScene = document.getElementById("scene-08");
  const spiritScene = document.getElementById("scene-09");
  const insightScene = document.getElementById("scene-10");
  const pathfinderScene = document.getElementById("scene-11");
  const returnScene = document.getElementById("scene-12");
  const finalScene = document.getElementById("scene-13");
  const mount = document.getElementById("scene3d-root");

  if (!landingScene || !travelScene || !marsTravelScene || !surfaceScene || !lrvScene || !alsepScene || !surveyorScene || !opportunityScene || !spiritScene || !insightScene || !pathfinderScene || !returnScene || !finalScene || !mount || !window.gsap || !window.ScrollTrigger) return;

  try {
    const module = await import("./scene3d.js");
    scene3DController = await module.createStoryExperience({
      mount,
      landingScene,
      travelScene,
      marsTravelScene,
      surfaceScene,
      lrvScene,
      alsepScene,
      surveyorScene,
      opportunityScene,
      spiritScene,
      insightScene,
      pathfinderScene,
      returnScene,
      finalScene,
      gsap: window.gsap,
      ScrollTrigger: window.ScrollTrigger
    });

    if (scene3DController) {
      landingScene.classList.add("scene3d-ready");
      travelScene.classList.add("scene3d-ready");
      marsTravelScene.classList.add("scene3d-ready");
      returnScene.classList.add("scene3d-ready");
      finalScene.classList.add("scene3d-ready");
      // Chapter 3 is marked ready only after its GLB has actually loaded.
      document.body.classList.add("story3d-ready");
    }
  } catch (error) {
    landingScene.classList.add("scene3d-failed");
    travelScene.classList.add("scene3d-failed");
    marsTravelScene.classList.add("scene3d-failed");
    surfaceScene.classList.add("scene3d-failed");
    lrvScene.classList.add("scene3d-failed");
    alsepScene.classList.add("scene3d-failed");
    surveyorScene.classList.add("scene3d-failed");
    opportunityScene.classList.add("scene3d-failed");
    spiritScene.classList.add("scene3d-failed");
    insightScene.classList.add("scene3d-failed");
    pathfinderScene.classList.add("scene3d-failed");
    returnScene.classList.add("scene3d-failed");
    finalScene.classList.add("scene3d-failed");
    document.body.classList.add("story3d-failed");
    console.warn("Shared 3D experience unavailable; retaining the original 2D scenes.", error);
  }
}
