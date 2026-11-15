# 🚍 BUSSY 67! — Ghost Relics of the Solar System

### Beep beep... The adventure to rediscover forgotten space explorers begins!

**BUSSY 67!** is an interactive 3D scrollytelling educational website created for the **NASA Space Apps Challenge 2026**.

What happens to the machines we leave behind on the Moon, Mars, and beyond? Do their stories end when their missions are over?

Join BUSSY, a friendly animated school bus, on a cinematic journey across the Solar System to discover the forgotten machines that helped humanity explore space.

---

## 🌌 Project Overview

BUSSY 67! transforms the history of space exploration into a character-driven interactive adventure.

Instead of presenting visitors with disconnected facts and ordinary photographs, the project brings historic spacecraft, landers, rovers, and scientific equipment to life as friendly characters while preserving their recognizable engineering designs.

Through 3D environments, scroll-controlled animations, narration, captions, real imagery, sound effects, and embedded video portals, visitors can discover:

- What these machines were designed to do.
- Why they were sent into space.
- How they operated during their missions.
- What scientific discoveries they helped humanity make.
- Why their contributions remain important today.

**Our central idea:** These machines may have been left behind, but their stories are not forgotten.

## 🚀 The Journey

The experience unfolds through 13 interconnected cinematic scenes.

| Scene | Destination / Encounter |
|---|---|
| 01 | Landing — Meet BUSSY 67! |
| 02 | Travelling to the Moon |
| 03 | Apollo 11 Lunar Module (Eagle) |
| 04 | Lunar Roving Vehicle (LRV) |
| 05 | Apollo Lunar Surface Experiments Package (ALSEP) |
| 06 | Surveyor 3 |
| 07 | Travelling to Mars |
| 08 | Opportunity Rover |
| 09 | Spirit Rover |
| 10 | InSight Lander |
| 11 | Mars Pathfinder and Sojourner |
| 12 | Return Journey and Kepler Space Telescope |
| 13 | Final Scene — Returning Home |

Each encounter introduces a different piece of space exploration history and connects its mission to the larger story of humanity's exploration of the Solar System.

## ✨ Key Features

### Interactive 3D Scrollytelling
- Scroll-driven cinematic storytelling.
- Real-time 3D environments and camera movements.
- Transitions between Earth, the Moon, and Mars.
- Responsive experience for desktop and mobile devices.

### Living Space Explorers
- Friendly character-inspired spacecraft and robotic explorers.
- Recognizable engineering designs and distinctive personalities.
- 3D GLB models with optimized model-loading support.

### Educational Information Portals
- Mission descriptions and historical context.
- Narration and educational captions.
- Real mission imagery.
- Embedded videos and locally hosted video content.

### Immersive Audio
- Scene-specific sound effects.
- Background ambience.
- Narration synchronized with the storytelling experience.
- Travel sound effects accompanying BUSSY's journeys.

### Performance Considerations
- Optimized 3D assets using Meshopt.
- Original 3D models retained as fallback assets where implemented.
- Smooth scrolling and responsive layouts.
- Carefully designed visual transitions and readable information portals.

## 🎯 Educational Purpose and Intended Impact

BUSSY 67! is designed primarily for school-aged learners and casual space enthusiasts.

The project aims to make space exploration history more engaging and approachable by connecting scientific information with storytelling and visual experiences.

Rather than treating abandoned space hardware as ordinary equipment, we give these machines a voice and a place in a shared adventure.

We hope visitors will develop a greater appreciation for:

- Space engineering and robotics.
- Lunar and planetary exploration.
- Astronomy and scientific discoveries.
- The historical importance of space missions.
- The lasting contributions of machines that continue to shape our understanding of the Solar System.

## 🎨 Creativity and Innovation

Our distinctive approach is to turn silent machines into storytellers.

By combining animated personalities with recognizable real-world hardware, the experience creates an emotional connection between visitors and the technology that made exploration possible.

Cinematic environments, scroll-driven camera movements, transitions between planets, and interactive information portals transform a conventional educational website into an immersive journey.

The goal is not simply to teach visitors what was left behind, but to help them understand why these explorers mattered.

## 🛠️ Technologies and Tools

The website was developed using the following technologies:

| Technology | Purpose |
|---|---|
| HTML5 | Website structure and content |
| CSS3 | Styling, layouts, and responsive design |
| JavaScript | Application logic and interactions |
| Three.js | 3D rendering and environments |
| GSAP | Animation and scene transitions |
| GSAP ScrollTrigger | Scroll-controlled storytelling |
| Lenis | Smooth scrolling |
| GLTFLoader | Loading 3D GLB/GLTF models |
| Meshopt | 3D model optimization and decoding |
| YouTube IFrame Player API | Embedded video playback |

## 📁 Project Structure

The main project files are organized as follows:

```text
BUSSY-67/
│
├── index.html
├── style.css
├── script.js
├── scene3d.js
│
└── assets/
    ├── audio/
    ├── images/
    ├── models/
    ├── videos/
    └── other project assets/
```

*The actual asset directory may contain additional folders and files.*

## 💻 Running the Project Locally

You can run BUSSY 67! locally on your computer.

### Requirements
- A modern web browser.
- A local development server.
- An internet connection for externally hosted libraries and embedded videos.

### Instructions

1. Download or clone the repository.
2. Extract the project files if downloaded as a ZIP.
3. Open the project folder in a code editor.
4. Start a local development server from the project directory.
5. Open the local website address provided by your development server.

For example, if you use Visual Studio Code, you can install the Live Server extension and select **Open with Live Server** on `index.html`.

**Important:** Avoid opening `index.html` directly through the `file://` protocol. The project uses JavaScript modules and 3D model loading, which work more reliably through a local web server.

## 🌍 Compatibility

BUSSY 67! is designed to work on modern desktop and mobile browsers.

For the best experience:
- Use an updated version of Chrome, Edge, Firefox, or Safari.
- Enable JavaScript.
- Use a stable internet connection.
- Allow sufficient loading time for 3D models and media.

The experience may perform differently depending on device hardware, browser capabilities, and network conditions.

## 📚 Data, Resources, and Credits

This project combines original development work with external libraries, scientific resources, media, and creative assets.

NASA scientific and mission resources provide historical and educational context for the featured explorers. The project also incorporates externally hosted videos, locally stored media, 3D models, imagery, audio, and AI-assisted creative assets.

Individual asset creators, original sources, and applicable licenses should be credited wherever required. The use of NASA names, imagery, or resources does not imply NASA endorsement of this project.

## 👨‍🚀 About the Project

**Project Name:** BUSSY 67! — Ghost Relics of the Solar System

**Challenge:** Abandoned but not Forgotten: Storytelling about NASA's discarded equipment on the Moon and Mars.

**Event:** NASA Space Apps Challenge 2026

**Project Type:** Interactive 3D Educational Scrollytelling Website

**Intended Audience:** School-aged learners and casual space enthusiasts.

## 💡 Our Vision

We created BUSSY 67! because we believe that space exploration is not only about the destinations humanity reaches, but also about the machines, engineering, and discoveries that make those journeys possible.

Some explorers never returned to Earth. Some stopped working millions of kilometres away. Others continue to contribute to scientific knowledge long after their original missions.

But every one of them has a story worth telling.

**Beep beep... Their missions may be over, but their stories live on.** 🚍🌌

---

*Created for the NASA Space Apps Challenge 2026.*

*This is an independent educational project and is not an official NASA product or affiliated NASA website.*
