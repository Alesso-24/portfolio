# Brand Positioning — Alessandro Reyes

Single source of truth for copy across the website, LinkedIn, and any future
collateral (CV, posts, talks). If new copy disagrees with this file, this file
wins — update it deliberately, don't drift.

## Identity

- **Public / professional brand:** Alessandro Reyes (site, LinkedIn display,
  GitHub handle `Alesso-24`, social handles).
- **Legal / academic name (papers, citations, IEEE record):** Jordi Alessandro
  Reyes Martínez. Use the full legal name only where authorship must match
  the published record (paper citations, BibTeX, "Authors" field on paper
  pages). Never mix the two on the same page without an explicit link
  ("publishes as Jordi Alessandro Reyes Martínez").
- Any leftover bare "Jordi" in UI strings (404 page, email CC line, old
  copyright text) is a bug, not a brand decision — remove it.

## Audience (priority order — confirmed by Alessandro, 2026-06-15)

1. **Technical recruiters / hiring managers** — embedded systems, robotics,
   edge AI, hardware-adjacent software roles. Primary conversion: contact /
   internship inquiry (Summer 2026).
2. **Research contacts / international programs** — labs, conference
   attendees, potential collaborators. Secondary conversion: credibility →
   networking → funded research stays, not a career destination by itself.
3. **Freelance/project clients** — lowest priority, not designed for, but
   shouldn't be actively excluded by the copy.

Decision rule when these pull in different directions: **optimize for #1,
let #2 ride along as proof, never let academic framing crowd out the "I ship
working systems" message.**

## Positioning statement

Alessandro is a mechatronics engineering student who builds machine learning
systems that have to survive contact with real, physical hardware — not just
a simulator or a clean dataset. His IEEE-published research exists because he
went looking for where the theory breaks (a model with a "perfect" software
score that silently failed on real silicon), not because research is the
goal in itself. The work is the proof; the goal is a real engineering role.

**JTBD framing:** Companies building embedded/robotics/edge-AI products need
someone who can sit at the hardware/software boundary and not get it wrong —
better than a "notebook data scientist" who never touches a chip, and better
than a "maker" who never validates against a real failure mode or measures
the cost. Alessandro lives at that boundary and has the published, hardware-
benchmarked evidence to back it up.

## The one-liner

**Primary (site hero, LinkedIn headline hook):**
> Mechatronics engineer building AI that survives contact with real hardware.

**Alternates (use for variety across CV / talks / about-page intro, not as
competing taglines on the same page):**
- "I make edge AI survive contact with real silicon."
- "Bridging physical systems and intelligent algorithms — and proving it on
  the hardware, not just in the simulator."

## Narrative arc (use to structure About sections / paper intros)

1. **Problem:** Industry trusts ML benchmarks that were only ever validated
   in simulation or on a laptop.
2. **Tension / discovery:** On real ESP32 hardware, a model with a perfect
   software-side AUC score (SVM) silently failed — a single-precision
   floating-point bug in the chip's FPU flipped its decision boundary right
   at the threshold. Simulation never would have caught it.
3. **Response:** Built a stage-aware framework that switches to a model
   that's 126× faster and just as accurate once the failure is obvious,
   while keeping a more sensitive model for the hard-to-detect early stage.
4. **Proof:** Two IEEE conference papers (CASE 2026, BDAI 2026), LARC 2025
   competitive robotics, all hardware-validated, not simulated.
5. **Invitation:** Open to Summer 2026 internships in embedded
   systems/robotics/applied ML, and to international research
   collaborations that don't pull him off the applied/hardware track.

## Proof points (the numbers — use these verbatim, don't paraphrase loosely)

- **126× faster inference** on real ESP32 hardware: Logistic Regression
  184 ns vs. Random Forest 23.3 µs (measured via Xtensa cycle-counter,
  n=10,000 runs/model). [CASE 2026]
- **SVM disqualified on real hardware** — misclassified at 96.5 µs due to a
  single-precision FPU bug in `expf()`, despite a perfect AUC=1.000 in
  software. A finding simulation-only benchmarks would have missed. [CASE
  2026]
- **5.89× separability increase** (Fisher Discriminant Ratio) from incipient
  to advanced fault stage; ~9 hours of advance warning before failure
  (56 cycles × 10 min/cycle). [CASE 2026]
- **99.85% accuracy, 0 false positives / 0 false negatives** — Random
  Forest on NASA IMS bearing dataset (984 files), test set n=197. [BDAI 2026]
- **98.4% estimated energy savings** running inference at the edge (ESP32)
  vs. streaming raw data to the cloud. [BDAI 2026]
- **Near-zero false-alarm rate** on an independent bearing channel
  (cross-bearing validation): RF 1.8%, SVM/LR 0.0%. [CASE 2026]

Use 3 of these (126×, 99.85%/0 false alarms, 98.4%) as the homepage "proof
bar" anchor stats — the rest live on the paper detail pages.

## Conference facts (verified — do not state physical attendance)

| | IEEE CASE 2026 | IEEE BDAI 2026 |
|---|---|---|
| Full name | 22nd IEEE Int'l Conf. on Automation Science and Engineering | 9th Int'l Conf. on Big Data and Artificial Intelligence |
| Dates | Aug 17–21, 2026 | Jul 3–5, 2026 |
| Location | Shenyang, China | Chongqing, China |
| Status | **Accepted, camera-ready submitted, fees paid** | **Accepted, camera-ready submitted, fees paid** |
| Presentation | **Remote / virtual** (not attending in person) | **Remote / virtual** (not attending in person) |
| Indexing | IEEE Xplore | IEEE Xplore + Ei Compendex + Scopus |
| Source | 2026.ieeecase.org | bdai.net / iconf.org |

**Copy rule:** always say "Accepted to IEEE CASE 2026 (Shenyang, China) —
presenting remotely" / "Accepted to IEEE BDAI 2026 (Chongqing, China) —
presenting remotely." Never imply physical travel/attendance. The current
site's "Presentation: May 2026" on the BDAI page is wrong and must be fixed
to July 3–5, 2026.

## Voice & tone

- Precise, sober, evidence-led. The numbers are the hook — never need hype
  adjectives on top of them.
- English first (international audience is the priority); Spanish toggle
  stays as a secondary, fully-translated option, not an afterthought.
- Describe outcomes/impact before listing the tech stack used to get there.
- Never claim something the papers don't say. When in doubt, check this
  file's proof-points section for the exact, citable number.

## Do / Don't

- **Do** lead every project/paper summary with the result, then the method.
- **Do** keep the "real hardware, not simulation" thread visible across
  hero, projects, and paper pages — it's the differentiator.
- **Don't** let "student" read as "still learning" — frame as "engineer who
  already publishes hardware-validated results."
- **Don't** oversell conference attendance as travel/in-person presence.
- **Don't** mix legal name and brand name on the same line without context.
