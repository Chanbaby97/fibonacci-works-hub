/* Concrete EXAMPLES + blueprints lifted from WS01–WS14 Blocks packs / fact-pass.
 Do not invent cultivars, cut lengths, or Cape Breton / Mi'kmaq facts beyond sources. */

import { normPoint } from "./slide-enrich.js";

/**
 * Per-workshop teaching cards.
 * points[label] → examples shown under Key learning answer when that point is open.
 * blueprint → Hands-On plan card (dimensions / cut list / assembly / diagram).
 * handsOn.examples / handsOn.tryThis → Hands-On section cards.
 * takeHome.tryThis → Take-Home redo with the same specs as the room.
 * gaps → honest placeholders where sources lack a named example.
 */
export const WORKSHOP_EXAMPLES = {
 "01": {
 summary: "Soil feel-test · cool-crop seed types · tray plant steps",
 points: {
 "Soil Health": {
 examples: [
 "Feel-test: moisten a pinch — gritty = sand, sticky ribbon = clay, crumbly workable = loam",
 "Finished compost: dark, crumbly, earthy — not hot or sour (use finished only)",
 "Compost feeds soil life; it does not turn sand into loam in one season",
 "Session samples: sand / clay / loam beside a bag of potting mix",
 ],
 },
 "Seed Selection": {
 examples: [
 "Cool crops that fit a short season: greens, roots, peas, brassicas, potatoes",
 "Read days-to-maturity on the packet — from seed or from transplant",
 "Direct-sow many cool crops before tomatoes go out",
 "Right seed beats fancy seed — start with reliable local staples",
 ],
 gaps: ["Named seed cultivars: confirm locally from packets you stock — Blocks list crop types, not variety names"],
 },
 "Planting Schedule": {
 examples: [
 "Start long crops indoors while frost is still outside",
 "Use your Cape Breton planting calendar for indoor start vs outdoor plant-out",
 "Succession keeps harvest steady — plant in waves, not one dump",
 "Tender crops go out only after the local forecast is past frost; cool crops can go earlier",
 ],
 },
 "Growing Techniques": {
 examples: [
 "Fill cells loosely with moist mix — do not pack rock-hard",
 "Sow at the depth printed on the packet (or set a seedling no deeper than it grew)",
 "Label variety and date every tray; bright light; water until moist, not puddled",
 "Space for air and easy harvest; match sun hours to each crop",
 ],
 },
 "Frost Awareness": {
 examples: [
 "Do not teach one frost date for all of Unama'ki — Sydney-area averages often late May; highlands/inland differ",
 "Check the forecast: cover rows or bring pots in; wind steals heat",
 "Later: short fall winterizing card — spring care stays the focus today",
 ],
 },
 },
 handsOn: {
 examples: [
 "Soil feel-test with sand / clay / loam samples",
 "Plant pots or starter trays with potting mix + seeds or seedlings suited to Cape Breton",
 "Hand out seasonal planting calendar + soil quick card",
 ],
 tryThis: [
 "Moisten mix → fill cells loose → sow at packet depth → label variety + date → bright light",
 "Write what your home soil feels like on the soil card before you leave",
 ],
 },
 takeHome: {
 tryThis: [
 "Same kit specs as class: soil bag · pots · shovel · gloves · seeds · tray",
 "Start a second tray the same way; track frost on your Cape Breton calendar before plant-out",
 ],
 },
 },

 "02": {
 summary: "Reach-width bed blueprint · untreated lumber · cardboard + compost/topsoil layers",
 points: {
 "Lumber Selection": {
 examples: [
 "Prefer untreated wood for food beds — never creosote, old CCA, or scrap you cannot name",
 "Cedar resists rot; spruce is cheaper and fails sooner when wet",
 "Mark the cut list before any saw starts",
 ],
 },
 "Tool Safety": {
 examples: [
 "Tape and square first — then saw or drill",
 "Eyes on; sleeves and hair tied; steady feet",
 "One tool at a time; unplug to change a blade",
 ],
 },
 "Bed Assembly": {
 examples: [
 "Width you can reach: about 1.2 m (4 ft) from both sides — never step in the bed",
 "One side only: stay inside an arm's reach (narrower bed)",
 "Square the corners; fasten; level the ground; leave a path you can walk",
 ],
 },
 "Soil Layering": {
 examples: [
 "On grass: plain cardboard only — no tape, no glossy ink",
 "Do not fill the root zone with fresh branches (they settle and can tie up nitrogen)",
 "Topsoil plus finished compost — then stop; about 20–30 cm of mix for most vegetables",
 "Water, let it settle, top up before you plant",
 ],
 },
 "Planting Layout": {
 examples: [
 "Plant to the packet spacing — not companion-planting folklore as fact",
 "Do not step in the bed; label the rows",
 "Your finished bed goes home planted",
 ],
 gaps: ["Specific crop layout map: use packet spacing from class; Blocks do not fix a companion grid"],
 },
 },
 blueprint: {
 title: "Simple raised bed plan (from Blocks)",
 dimensions: [
 "Width (both sides): about 1.2 m / 4 ft — never step in",
 "Width (one side only): stay inside an arm's reach",
 "Soil mix depth: about 20–30 cm for most vegetables",
 "Length: follows the yard and the lumber you have",
 "Site: level the ground, then leave a path you can walk",
 ],
 cutList: [
 "Untreated lumber cut to your marked plan (cedar preferred; spruce cheaper, rots sooner)",
 "Exterior screws / fasteners; corner brackets if used",
 "Mark every cut on the cut list before any saw starts — do not invent board lengths here; use what you measured",
 ],
 assembly: [
 "1. Mark width you can reach; level the ground",
 "2. Cut untreated lumber you can name; square corners; fasten (eyes on)",
 "3. On grass: lay plain cardboard (no tape, no gloss)",
 "4. Add topsoil + finished compost; water; settle; top up to ~20–30 cm",
 "5. Plant to packet spacing; label rows; do not step in",
 ],
 layers: [
 "Weed barrier: plain cardboard only",
 "Fill: topsoil + finished compost (no fresh-branch root-zone fill)",
 "Plant into settled mix — fluff sinks later",
 ],
 diagram: [
 " PATH PATH",
 " ┌──────────────────────────────┐",
 " │ ~1.2 m (4 ft) reach width │ ← never step in",
 " │ mix depth ~20–30 cm │",
 " │ length = yard + lumber │",
 " └──────────────────────────────┘",
 " base: plain cardboard on grass",
 " fill: topsoil + finished compost",
 ].join("\n"),
 },
 handsOn: {
 examples: [
 "Cut list + reach-test demo while marking boards",
 "Supervised cut → fasten → layer → plant",
 "Materials: untreated lumber, exterior screws, cardboard, compost + topsoil, PPE",
 ],
 tryThis: [
 "Build to the blueprint card — same width/depth rules at home as in the room",
 ],
 },
 takeHome: {
 tryThis: [
 "Same specs: ~1.2 m reach width · 20–30 cm mix · untreated wood · cardboard + compost/topsoil",
 "Top up or build a second bed from the soil mix guide; note lumber/soil/time costs for WS03",
 ],
 },
 },

 "03": {
 summary: "Keep/share/preserve/sell columns · fair-price worksheet · surplus plan",
 points: {
 "Surplus Management": {
 examples: [
 "Four columns: keep / share / preserve / sell — plan before harvest peaks",
 "Household food security first; income second",
 ],
 },
 "Pricing Produce": {
 examples: [
 "List seed, soil, and water you actually pay",
 "Check one local market or store price; update your fair-price line",
 "Worksheet with local produce price examples (farmers' market / store)",
 ],
 gaps: ["Dollar prices for produce: use today's local list — Blocks do not freeze a price sheet"],
 },
 "Preservation Intro": {
 examples: [
 "Canning is not basic — tested recipes only (pointer to WS05)",
 "Optional jar/label on the table for the preservation talk",
 ],
 },
 "Food Networks": {
 examples: [
 "Map buyers/traders and who you'll offer surplus to this week",
 "Share the pricing sheet with a neighbour grower if helpful",
 ],
 },
 "Food Sovereignty": {
 examples: [
 "Honour Mi'kmaq territory — do not speak for the Nation",
 "Sovereignty — not charity: skills and food stay in community",
 ],
 },
 },
 handsOn: {
 examples: [
 "Cost-benefit worksheet + market pricing worksheet + surplus plan template",
 "Sample local produce price list for the room",
 ],
 tryThis: [
 "Fill keep/share/preserve/sell for your expected harvest; write one fair price you checked",
 ],
 },
 takeHome: {
 tryThis: [
 "Same worksheets: re-run with real seed/soil/time notes; update after each harvest week",
 ],
 },
 },

 "04": {
 summary: "Paper greenhouse plan · hoop/poly/glass/DIY compare · proposal outline",
 points: {
 "Site Selection": {
 examples: [
 "Track sun — fruiting crops want a full day",
 "Cape Breton wind: shelter the site, skip the ridge",
 "Plan water, materials, and winter access to clear snow",
 "Drainage matters — do not site a house in a puddle",
 ],
 },
 "Structure Types": {
 examples: [
 "Hoop: extends the season — it is not snow-proof",
 "Rigid poly: costs more and still needs vents",
 "Glass: heavy, costly, and must carry snow",
 "Any DIY frame needs a wind plan and a snow plan",
 ],
 },
 "Climate Control": {
 examples: [
 "Sun can overheat a closed house on a cool day — vent",
 "Frost still happens; a cover is not a heater",
 "Wet leaves invite disease — vent, don't soak foliage",
 "Read a thermometer; write the high and the low",
 ],
 },
 "Year-Round Growing": {
 examples: [
 "Replant short crops — do not promise a winter tomato",
 "Cool greens are the honest shoulder-season crop under cover",
 "You can start seeds under cover — still harden them",
 ],
 },
 "Funding Pathways": {
 examples: [
 "One page: who eats, who maintains, quote line blank",
 "Do not invent a grant name or a dollar ask",
 "Check current AAFC and NS program pages yourself; MSGAM can point — you confirm",
 ],
 },
 },
 blueprint: {
 title: "Paper greenhouse layout (design day — not a full build)",
 dimensions: [
 "Today is design-on-paper — build later after quotes and approvals",
 "Sketch beds, path width, water source, and vent/heat ideas on graph/layout paper",
 "Pick one structure type that matches budget and Cape Breton wind/snow",
 ],
 cutList: [
 "Planning kit only: site checklist · layout paper · sun/wind notes · structure comparison · proposal outline",
 "Later build quotes: DIY small hoop confirm locally (not today's build)",
 ],
 assembly: [
 "1. Walk site morning and afternoon — sun, wind, drainage, access",
 "2. Redraw layout with beds, paths, water, vents",
 "3. Choose hoop / poly / glass / DIY with wind + snow plan",
 "4. Fill proposal: need, community benefit, rough materials, ask amount (quote blank until local price)",
 "5. Confirm one local supplier quote before presenting to council or funders",
 ],
 layers: [],
 diagram: [
 " WIND BREAK / SHELTER ← skip the ridge",
 " ┌─────────────────────────────┐",
 " │ beds │ path │ beds │ ← path width you can walk",
 " │ │ │ │",
 " │ water source · vents │",
 " └─────────────────────────────┘",
 " sun track · drainage · winter snow access",
 ].join("\n"),
 },
 handsOn: {
 examples: [
 "Site assessment checklist + layout sketch + draft proposal outline",
 "Structure comparison card: hoop / polycarbonate / glass / DIY",
 ],
 tryThis: [
 "Complete the paper plan card with your real site notes before any materials buy",
 ],
 },
 takeHome: {
 tryThis: [
 "Same paper specs: re-walk with a neighbour; tighten cost column; list three funding contacts; confirm one quote",
 ],
 },
 },

 "05": {
 summary: "Tested brine/ferment rules · 5% pickling vinegar · fridge vs pressure",
 points: {
 "Canning & Pickling": {
 examples: [
 "Boiling-water canner: high-acid only (pH 4.6 or lower)",
 "Tomatoes are borderline — tested recipes add acid",
 "Low-acid veg, meat, seafood, soup: pressure canner only",
 "A mentor does not replace a current tested recipe",
 ],
 },
 "Fermentation": {
 examples: [
 "Use a tested salt ferment — do not invent the salt",
 "Keep vegetables under the brine the whole time",
 "One jar until the habit is easy — then repeat it",
 "Fuzzy mould or a bad smell: discard — do not taste",
 ],
 },
 "Vinegar & Mead": {
 examples: [
 "Pickling vinegar is 5% acid — dilute only if the card says",
 "Follow the tested card — this deck has no homemade recipe",
 "Mead is alcohol: personal use, not for sale, not for minors — no brew today",
 "No garlic or herbs in oil in this class",
 ],
 },
 "Food Traditions": {
 examples: [
 "Honour knowledge keepers — we do not teach Mi'kmaq food knowledge",
 "Knowledge keepers speak for themselves, if they choose",
 ],
 },
 "Garden to Jar": {
 examples: [
 "Pack a fridge pickle or a tested ferment start in session",
 "Label food, date, and fridge or ferment",
 "Pointer to Bernardin and Health Canada — no invented recipe in the app",
 ],
 },
 },
 handsOn: {
 examples: [
 "One starter Mason jar per person · salt/vinegar/brine fixings · produce · labels",
 "Safety quick-reference card + tested recipe sheet only",
 ],
 tryThis: [
 "Wash jars → follow tested card exactly → food under liquid → wipe rim → lid → label food/date/fridge-or-ferment",
 ],
 },
 takeHome: {
 tryThis: [
 "Same specs: finish starter jar per care card; second small batch from the same tested sheet only",
 ],
 },
 },

 "06": {
 summary: "Ground-level inspection checklist · asphalt/metal samples · contractor questions",
 points: {
 "Inspection Basics": {
 examples: [
 "From the ground only — optional binoculars; safe attic access only for leak signs",
 "Never climb steep or icy roofs in this workshop",
 ],
 },
 "Damage ID": {
 examples: [
 "Photo examples: leaks, missing shingles, ice dams, rot, sagging gutters",
 "Note stains and attic signs of leaks on the checklist",
 ],
 },
 "Materials Overview": {
 examples: [
 "Touch samples when available: asphalt shingle, metal panel/scrap, underlayment/flashing",
 "ID your roof type using the material card",
 ],
 },
 "Repair vs Replace": {
 examples: [
 "Cost estimation basics using anonymized sample quotes",
 "Actual repair/replace: get local quotes — varies widely; confirm locally",
 ],
 },
 "Working with Contractors": {
 examples: [
 "Fill the contractor questions sheet before you call anyone",
 "Quotes, red flags, fair questions — empowerment, not risky roof DIY",
 ],
 },
 },
 handsOn: {
 examples: [
 "Inspection checklist · damage photo set · material samples · sample quotes · contractor questions sheet",
 ],
 tryThis: [
 "Walk the demo photos with the checklist; write three contractor questions you will actually ask",
 ],
 },
 takeHome: {
 tryThis: [
 "Same checklist: ground-level walk of your home; ID roof type; fill contractor sheet — no climbing",
 ],
 },
 },

 "07": {
 summary: "Weatherstrip starter · shutoff tags · seasonal calendar · outage checklist",
 points: {
 "Seasonal Prep": {
 examples: [
 "Spring after thaw; fall seal before hard freeze",
 "Sydney-area first fall frost typically mid-October; harder freezes common in November — forecast-check, not a fixed week",
 ],
 },
 "Weatherproofing": {
 examples: [
 "Demo: weatherstripping, door sweep, caulk tube, utility knife",
 "Take-home weatherstrip starter pieces (strip/sweep as stocked)",
 "DIY follow-up kit confirm locally (stripping, sweep, caulk)",
 ],
 },
 "Plumbing Awareness": {
 examples: [
 "Find and label water shutoff; shutoff valve tags in the kit",
 "Call a pro for gas lines beyond simple awareness",
 ],
 },
 "Electrical Safety": {
 examples: [
 "Know where the electrical panel is — awareness only",
 "Call a pro for electrical work beyond simple awareness",
 ],
 },
 "Winterization": {
 examples: [
 "Cape Breton winterization: ice and wet-snow load awareness, coastal wind, salt air (road and near-shore spray), outage readiness",
 "Pack emergency/outage checklist; flashlight/batteries confirm locally if you need them",
 ],
 },
 },
 handsOn: {
 examples: [
 "Seal a draft demo · tag a shutoff · fill seasonal calendar · pack outage checklist",
 ],
 tryThis: [
 "Label shutoff → check one door/window draft → add strip/sweep as needed → fill fall/winter calendar tasks",
 ],
 },
 takeHome: {
 tryThis: [
 "Same starter specs: weatherstrip sample + calendar + outage checklist; seal before hard freeze (often late Oct–Nov — check forecast)",
 ],
 },
 },

 "08": {
 summary: "PPE · measure/square · small supervised build (shelf cleat / planter brace)",
 points: {
 "Hand Tools": {
 examples: [
 "Hammer, tape measure, speed square, level, clamps",
 ],
 },
 "Power Tool Safety": {
 examples: [
 "Facilitator-supervised drill and/or saw as planned",
 "PPE: safety glasses; hearing protection; gloves as needed",
 "One person operates; unplug when changing bits",
 ],
 },
 "Measuring True": {
 examples: [
 "Measure and mark using the cheat sheet; square your lines",
 "Tape and square before you cut",
 ],
 },
 "Cutting & Fastening": {
 examples: [
 "Fasten with the screw/nail choice you practiced",
 "Clear tidy workspace; eye protection before cutting",
 ],
 },
 "Framing Basics": {
 examples: [
 "Simple framing concepts beginners can use at home",
 "Second small project examples from class: shelf cleat, planter brace — only if you can work safely with PPE",
 ],
 gaps: ["Exact small-build cut list: follows facilitator scrap plan that day — Blocks do not freeze one size"],
 },
 },
 blueprint: {
 title: "Small supervised build pattern",
 dimensions: [
 "Project size follows the scrap lumber plan for the session (item costs — confirm locally)",
 "Redo only with proper PPE",
 ],
 cutList: [
 "Scrap lumber + fasteners for practice and one small build",
 "Hand tools: hammer, tape, speed square, level, clamps",
 "PPE required before any cut",
 ],
 assembly: [
 "1. Clear workspace; put on eye protection",
 "2. Measure and mark; square your lines (cheat sheet)",
 "3. Cut scrap only under the rules you practiced",
 "4. Fasten with the screw/nail choice from class",
 "5. At home: second small build (shelf cleat / planter brace) only if safe",
 ],
 layers: [],
 diagram: [
 " measure → square → mark",
 " ↓",
 " cut (PPE on) → fasten",
 " ↓",
 " small build leaves with you",
 ].join("\n"),
 },
 handsOn: {
 examples: [
 "Supervised stations: measure, mark, cut scrap, complete small build, PPE check",
 ],
 tryThis: [
 "Complete one small build in session with eyes on and one tool at a time",
 ],
 },
 takeHome: {
 tryThis: [
 "Same pattern + PPE: second small build only if you can work safely; beginner tool set later confirm locally",
 ],
 },
 },

 "09": {
 summary: "Name brainstorm · one-page plan · sample invoice · resource directory",
 points: {
 "Sole Prop Basics": {
 examples: [
 "One-page business plan template filled in class",
 "Name brainstorm worksheet",
 ],
 },
 "Registration & Banking": {
 examples: [
 "Optional look-up of registry pages on phone/laptop",
 "Registration/banking fees = confirm officially — not set by this workshop",
 ],
 },
 "Invoicing": {
 examples: [
 "Walk a sample invoice together; take-home invoice template",
 "Fill a sample invoice for a pretend first sale at home",
 ],
 },
 "Reserve-Connected Biz": {
 examples: [
 "Section 87 awareness only — not legal or tax advice",
 "Keep Section 87 / tax questions for qualified advisors",
 ],
 },
 "Indigenous Resources": {
 examples: [
 "Printed Indigenous business resource directory",
 "Circle three resources to contact this month",
 ],
 },
 },
 handsOn: {
 examples: [
 "Name brainstorm · one-page plan · invoice template · resource directory",
 ],
 tryThis: [
 "Draft the one-page plan with real customers/prices; complete one sample invoice line",
 ],
 },
 takeHome: {
 tryThis: [
 "Same packet: soften plan, sample invoice, circle three directory contacts, talk to a mentor before paying fees",
 ],
 },
 },

 "10": {
 summary: "Free-tier setup checklist · live invoice · log one sale + one expense",
 points: {
 "Square Payments": {
 examples: [
 "High-level: accept cards, track sales — free tiers first",
 "Optional card reader hardware confirm locally (promo/model)",
 ],
 gaps: ["Exact product screens: do not invent UI that may change — follow in-app checklist"],
 },
 "QuickBooks Basics": {
 examples: [
 "Income/expenses at a high level",
 "Log one sample income and one expense in session or redo",
 ],
 },
 "Google Workspace": {
 examples: [
 "Drive, Docs, Sheets, Gmail — phone-friendly workflows",
 "Backup: email yourself a PDF of the invoice template",
 ],
 },
 "Invoicing Live": {
 examples: [
 "Create a basic invoice live on your device (or shared)",
 "Sample sale/expense numbers for practice",
 ],
 },
 "Tech Confidence": {
 examples: [
 "Passwords in a safe place; turn on 2-step verification if you can",
 "Setup checklist (printed) + digital tools quick-start card",
 ],
 },
 },
 handsOn: {
 examples: [
 "Login/setup checklist · create invoice · log sale & expense · quick-start card",
 ],
 tryThis: [
 "Finish checklist → one invoice → one income + one expense → backup PDF to yourself",
 ],
 },
 takeHome: {
 tryThis: [
 "Same checklist specs: recreate one invoice for a real or practice customer; keep free tiers first",
 ],
 },
 },

 "11": {
 summary: "Profile audit · 30-day content plan · one live draft post",
 points: {
 "Platforms": {
 examples: [
 "Facebook / Instagram app or browser on your phone",
 "organic posting (confirm locally) — boosts/ads only if/when you choose",
 ],
 },
 "Branding Basics": {
 examples: [
 "Profile photo, about text, and contact info from the audit sheet",
 ],
 },
 "Posting Habits": {
 examples: [
 "Posting tips quick card",
 "Daylight photos of your product/service",
 ],
 },
 "Community Marketing": {
 examples: [
 "Tone: community-warm — truthful, local, not pushy",
 "Peer tone feedback on a live draft post",
 ],
 },
 "Content Plan": {
 examples: [
 "30-day content plan template started in class",
 "Schedule or draft three posts from the plan at home",
 ],
 },
 },
 handsOn: {
 examples: [
 "Profile audit worksheet · 30-day plan · draft a live post · optional product props",
 ],
 tryThis: [
 "Finish audit fields → draft one post → get peer tone feedback before you publish",
 ],
 },
 takeHome: {
 tryThis: [
 "Same plan specs: three posts from the 30-day plan; review insights after two weeks",
 ],
 },
 },

 "12": {
 summary: "CBRM/Inverness sorting rules · rinse · bag limits · compost streams",
 points: {
 "Composting Basics": {
 examples: [
 "Curbside green cart ≠ backyard bin — different lists",
 "CBRM green cart: food scraps including meat and dairy — no plastic bags",
 "Backyard bin: plant scraps and grounds, plus leaves or shredded paper",
 "Keep meat and oil out of an open backyard pile; sharps → pharmacy container",
 ],
 },
 "Sorting Waste": {
 examples: [
 "Write your community down before you sort",
 "CBRM: bag 1 containers and plastics; bag 2 paper — never mix",
 "Inverness County flips those numbers — use their guide",
 "Victoria, Richmond, and First Nations: their sheet, not a neighbour's",
 ],
 },
 "Clean Recycling": {
 examples: [
 "Empty, then rinse until no food film",
 "Lids off when your community guide says so",
 "Paper and cardboard stay dry in their own bag",
 "CBRM: transparent blue bags only — a clear bag of recyclables can be left",
 ],
 },
 "Bag and Store": {
 examples: [
 "CBRM: up to 5 clear garbage bags a week; one may be dark — confirm the page",
 "Each bag 12 kg (25 lb) or less",
 "Do not put garbage bags inside the green cart",
 "Seal organics so animals cannot open them; hazardous waste never in garbage/blue bag/cart",
 ],
 },
 "To the Centre": {
 examples: [
 "CBRM guide: cbrm.ns.ca/sorting — hotline 902-567-1337",
 "Inverness: invernesscounty.ca/sortitout — 1-866-258-0223 option 1",
 "Refundables to an ENVIRO-DEPOT, not the curb",
 "First Nation pickup may differ — ask the band, do not assume",
 ],
 },
 },
 blueprint: {
 title: "Home sort & compost setup",
 dimensions: [
 "Kitchen bin/box + outdoor store location you will actually use",
 "Sorting card posted at eye level",
 ],
 cutList: [
 "Garbage box/bin · recycling bin(s) · optional organics pail",
 "Bags · rinse access · gloves · sorting card · compost starter guide",
 "Kit redo confirm locally when buying new — reuse containers when possible",
 ],
 assembly: [
 "1. Place bins where you'll use them (kitchen + outdoor store)",
 "2. Post the sorting card for YOUR community",
 "3. Rinse recyclables; keep streams separate",
 "4. Add scraps to compost per starter guide — balance greens/browns",
 "5. Note pickup vs drop-off; get clean recycling to the centre",
 ],
 layers: [
 "Stream A: garbage (sealed, weight limits)",
 "Stream B: recycling (rinsed; community bag rules)",
 "Stream C: organics / backyard compost (correct list for cart vs pile)",
 ],
 diagram: [
 " KITCHEN OUTDOOR",
 " ┌────────┐ ┌────────┐ ┌──────────┐",
 " │ garbage│ │ recycle│ → store →│ sealed │",
 " │ box │ │ bin(s) │ │ bags/bins│",
 " └────────┘ └────────┘ └──────────┘",
 " ┌────────────────┐",
 " │ organics pail /│ → green cart OR backyard bin",
 " │ compost scraps │ (different lists!)",
 " └────────────────┘",
 ].join("\n"),
 },
 handsOn: {
 examples: [
 "Sort mixed sample materials · rinse-and-bag · start small compost demo",
 ],
 tryThis: [
 "Sort one mixed pile using YOUR community card; rinse one container until no food film",
 ],
 },
 takeHome: {
 tryThis: [
 "Same setup: bins placed, card posted, full rinse-and-sort one day this week; teach one household member",
 ],
 },
 },

 "13": {
 summary: "Hive site sketch · startup cost sheet · safety first (model/video if needed)",
 points: {
 "Hive Setup": {
 examples: [
 "Observation hive, model, or video if live is unsafe",
 "You won't take a full hive home today — leave ready to budget one",
 ],
 },
 "Bee Safety": {
 examples: [
 "Veil/suit and gloves for demo (facilitator)",
 "Safety & hive-site quick card",
 ],
 },
 "Seasonal Care": {
 examples: [
 "Seasonal calendar for Cape Breton winter prep realities",
 "Find a local mentor or association before ordering bees",
 ],
 },
 "Honey Harvest": {
 examples: [
 "Honey tasting samples in session (spoons + water for palate)",
 "Share honey and knowledge without overharvesting",
 ],
 },
 "Bees & Food Systems": {
 examples: [
 "Bees support gardens and food security goals",
 "First-year starter setup (hive, bees, basic gear): confirm locally",
 ],
 },
 },
 blueprint: {
 title: "Hive site sketch checklist",
 dimensions: [
 "Morning sun · wind shelter · water · neighbour safety",
 "Note fence / pet / people paths on the sketch",
 ],
 cutList: [
 "Startup cost breakdown worksheet · seasonal calendar · site sketch paper · safety card",
 "Do not buy bees until site, mentor, and budget are clear",
 ],
 assembly: [
 "1. Re-fill startup cost sheet with real supplier quotes",
 "2. Walk a possible hive site (sun, wind, water, neighbours)",
 "3. Sketch site; mark paths and fences",
 "4. Call a mentor or association before ordering",
 "5. Review seasonal calendar for winter prep",
 ],
 layers: [],
 diagram: [
 " wind shelter",
 " ↓",
 " [ hive ] ← morning sun",
 " ↓",
 " water nearby",
 " paths for people/pets marked clear",
 ].join("\n"),
 },
 handsOn: {
 examples: [
 "Hive demo · honey tasting · cost sheet · site sketch",
 ],
 tryThis: [
 "Complete cost sheet blanks you can; sketch one possible site before you leave",
 ],
 },
 takeHome: {
 tryThis: [
 "Same worksheets: real quotes + site walk + mentor call — no bee order until those three are clear",
 ],
 },
 },

 "14": {
 summary: "Property assessment · rain barrel / compost options · 30-day actions",
 points: {
 "Land & Water": {
 examples: [
 "Mi'kmaq land & water relationships — existing hub wording only; do not invent cultural claims or speak for Mi'kmaq people",
 ],
 },
 "Rainwater": {
 examples: [
 "If collecting rain: barrel on stable base with overflow plan",
 "Basic rain barrel confirm locally",
 ],
 },
 "Composting & Soil": {
 examples: [
 "Start or improve compost using the quick guide (and WS12 habits)",
 "DIY compost bin from reclaimed materials confirm locally",
 ],
 },
 "Energy Awareness": {
 examples: [
 "Energy actions (LED/draft) confirm locally to start",
 ],
 },
 "Property Actions": {
 examples: [
 "Property stewardship assessment room-by-room / yard zones",
 "Pick three actions for the next 30 days — small beats perfect",
 "Share one tool or tip with a neighbour this month",
 ],
 },
 },
 blueprint: {
 title: "30-day stewardship action card",
 dimensions: [
 "Assess: rooms + yard zones on the worksheet",
 "Choose three actions you can finish in 30 days",
 ],
 cutList: [
 "Assessment worksheet · composting & rainwater quick guide · 30-day action list",
 "Optional: spare barrels, lumber, or compost wire shared in community",
 ],
 assembly: [
 "1. Finish property assessment by zone",
 "2. Start/improve compost (WS12 habits)",
 "3. If rain: place barrel on stable base + overflow plan",
 "4. Do three 30-day actions",
 "5. Share one tip or tool with a neighbour",
 ],
 layers: [],
 diagram: [
 " HOUSE zones YARD zones",
 " □ drafts/LED □ compost",
 " □ water habits □ rain barrel base",
 " □ □ share tool/tip",
 " → three 30-day actions →",
 ].join("\n"),
 },
 handsOn: {
 examples: [
 "Property assessment · composting & rainwater guide · pick three 30-day actions",
 ],
 tryThis: [
 "Write three actions and one neighbour share on the action list before you leave",
 ],
 },
 takeHome: {
 tryThis: [
 "Same list specs: finish assessment; do the three actions; keep cost labels as confirm locally",
 ],
 },
 },
};

export function examplesForPoint(number, label) {
 const pack = WORKSHOP_EXAMPLES[String(number).padStart(2, "0")];
 if (!pack?.points) return null;
 const n = normPoint(label);
 for (const [key, val] of Object.entries(pack.points)) {
 if (normPoint(key) === n) return { label: key, ...val };
 }
 // soft match: all words present
 for (const [key, val] of Object.entries(pack.points)) {
 const kn = normPoint(key).split(" ");
 const words = n.split(" ").filter((w) => w.length > 2);
 if (words.length && words.every((w) => kn.includes(w))) return { label: key, ...val };
 }
 return null;
}

export function workshopExamplePack(number) {
 return WORKSHOP_EXAMPLES[String(number).padStart(2, "0")] || null;
}
