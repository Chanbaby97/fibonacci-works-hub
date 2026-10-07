import { useState, useEffect, useMemo, useCallback } from "react";
import { renderSVG } from "uqr";
import { SLIDE_ENRICH, learningPointAnswer } from "./slide-enrich.js";
import { examplesForPoint, workshopExamplePack } from "./workshop-examples.js";

/* ─────────────────────────────────────────────────────────────
   THE FIBONACCI WORKS™ — WORKSHOP HUB
   Phone-first everyday teach hub for all 14 workshops — facilitator runbook + student path.
   Streams: Food · Trades · Business & Digital · Land & Stewardship
   Canon: WS04 Greenhouse Design & Management · WS12 Waste, Recycling & Composting
   ───────────────────────────────────────────────────────────── */

const STREAMS = [
  { name: "Food Sovereignty & Gardening", color: "#4a7c3f", accent: "#7ab648", dark: "#2d4a25", range: "01 – 05" },
  { name: "Trades",                        color: "#3f5f7c", accent: "#6f9fc4", dark: "#25364a", range: "06 – 08" },
  { name: "Business & Digital",            color: "#1f6e6a", accent: "#34b3a8", dark: "#143f3c", range: "09 – 11" },
  { name: "Land & Stewardship",            color: "#3f5a32", accent: "#7a9e3f", dark: "#243619", range: "12 – 14" },
];

const streamMeta = (name) => STREAMS.find((s) => s.name === name) || STREAMS[0];

const WORKSHOPS = [
    {
    number: "01",
    stream: "Food Sovereignty & Gardening",
    title: "Introduction to Gardening",
    duration: "2.5 Hours",
    color: "#4a7c3f",
    accent: "#7ab648",
    dark: "#2d4a25",
    emoji: "🌱",
    about:
      "A foundational workshop covering soil health, seed selection, planting schedules, and basic growing techniques suited to Cape Breton's climate and growing season.",
    sections: [
      { id: "welcome", label: "Welcome & Opening", icon: "🤝", image: "placeholders/ws01-welcome.svg", content: "This session is on Mi'kmaq territory in Unama'ki (Cape Breton). Short land acknowledgement: honour the territory; thank MSGAM hosts. Do not speak for Mi'kmaq people. Brief introductions and a clear session overview. This is hands-on-while-talking: printouts and a QR for phone follow-along sit on the table while you dig in. Preview today's physical kit — bag of soil, pots, shovel, gloves, seeds, starter trays/seedlings, seasonal calendar, soil quick card — before you get hands dirty." },
      { id: "knowledge", label: "The Knowledge", icon: "📋", image: "placeholders/ws01-knowledge.svg", content: "Talk through the core points while people work with soil and trays — not a lecture then a lab. Lead with spring planting: soil health, seed selection for Cape Breton, planting schedules, and growing basics (spacing, watering, sunlight). Cover frost dates / short season / wind, with only a short later-in-the-year fall care card for winterizing. Keep each point plain and practical. Point to printouts and the QR so people can follow on their phone while their hands stay busy." },
      { id: "activity", label: "Hands-On Activity", icon: "🪴", image: "placeholders/ws01-activity.svg", content: "• Facilitator talks while you plant — hands stay busy\n• Plant into pots / starter trays; soil feel-test\n• Use printouts + QR on your phone\n• Receive your seasonal planting chart handout\n• Ask questions while your hands are in the soil\n\nRedo path: after class, open Take-Home for numbered at-home steps — materials and costs below stay here for the DIY rebuild.\n\n🧰 Materials needed (session):\n• Bag of soil / potting mix\n• Pots and starter trays (cell packs or small pots)\n• Small shovel / trowel; gloves\n• Seeds or young seedlings suited to Cape Breton\n• Soil samples (sand / clay / loam) for feel test\n• Watering can or spray bottle; labels & marker\n• Printed seasonal planting calendar + soil quick card\n• QR card for phone follow-along\n\n🧰 Take-home kit (physical — what leaves with you):\n• Bag of soil · pots · shovel · gloves · seeds\n• Seedlings / starter tray · seasonal calendar · soil quick card · Certificate of Completion\n\n💵 Rough cost (CAD, Cape Breton/local — estimate — confirm locally):\n• Session materials per person: about $20–45 (included in MSGAM session materials when booked)\n• At-home DIY redo of one kit: about $25–50 (soil bag $8–15, pots $5–12, shovel $5–10, gloves $3–8, seeds $3–10)\n\n🏠 At-home redo guide:\n1. Fill pots/tray cells with moist mix — don't pack rock-hard.\n2. Sow seeds at packet depth (or transplant seedlings gently). Wear gloves; use your shovel/trowel.\n3. Label variety + date; place in bright light; keep evenly moist.\n4. Use your Cape Breton planting calendar for indoor start vs outdoor plant-out.\n5. Harden off before planting out after frost risk passes." },
      { id: "discussion", label: "Community Discussion", icon: "💬", image: "placeholders/ws01-discussion.svg", content: "Open floor for community-specific questions:\n• What have you tried to grow before?\n• What grows well in your yard or community?\n• What challenges have you faced?\n• How can local growing support household food security here?\n• Where do you buy trays, mix, and seeds locally — and what's a fair price?\n• Could neighbours share bulk soil mix or start trays together?\n\n📌 Takeaway to write down:\n• Write one crop you will try and one local place to buy trays, mix, or seeds — plus whether neighbours could share bulk mix." },
      { id: "takehome", label: "Take-Home", icon: "🎁", image: "placeholders/ws01-takehome.svg", content: "Every participant leaves with a physical kit:\n✓ Bag of soil · pots · shovel · gloves · seeds\n✓ Seedlings / starter tray planted today\n✓ Seasonal planting calendar for Cape Breton\n✓ Soil health quick reference card\n✓ Certificate of Completion\n\n📦 What you need:\n• Bag of soil · pots · shovel · gloves · seeds\n• Seedlings / starter tray planted today\n• Seasonal planting calendar for Cape Breton\n• Soil health quick reference card\n• Cape Breton planting calendar (in kit)\n• Bright window or light for trays\n\n✅ Done looks like:\n• A second tray started with your soil, pots, shovel, and gloves — labeled, watered evenly, and frost dates tracked on your Cape Breton planting calendar.\n\n🏠 At-home redo (after class):\n1. Use your soil bag, pots, shovel, and gloves to start a second tray the same way.\n2. Water when the top feels dry; don't let trays sit in standing water.\n3. Track frost dates on your calendar before moving plants outside.\n4. Later in the year: use the short fall winterizing card; spring care stays the focus.\n5. Share surplus seedlings with neighbours if you have extras." },
      { id: "next", label: "What's Next", icon: "➡️", image: "placeholders/ws01-next.svg", content: "Ready to go further? The next workshop in the series:\n\n🔨 Building Raised Garden Beds — 5 Hour Session\n\nYou'll build a complete raised garden bed from scratch and take it home, ready to plant what you started today.\n\nBook through MSGAM. This is one of 14 workshops that run on repeat for new cohorts. Before Workshop 02, redo a tray at home so your seedlings are ready to plant into a raised bed. Printouts / QR stay available for booking info.\n\nAt-home first: finish the Take-Home redo steps before or beside booking the next session — Hands-On has materials and cost notes if you need to rebuild the kit." },
    ],
    keypoints: [
      { label: "Soil Health", detail: "Learn what your soil needs and how to build it naturally" },
      { label: "Seed Selection", detail: "Choose varieties that thrive in Cape Breton's unique climate" },
      { label: "Planting Schedule", detail: "Know exactly when to start seeds and when to plant outside" },
      { label: "Growing Techniques", detail: "Spacing, watering, sunlight — the fundamentals done right" },
      { label: "Frost Awareness", detail: "Understand Cape Breton's frost dates and how to work around them" },
      { label: "Materials & Cost", detail: "Session kit about $20–45; at-home DIY redo about $25–50 CAD (estimate — confirm locally)" },
      { label: "At-Home Redo", detail: "Refill a tray, sow or transplant, label, water evenly, follow your Cape Breton planting calendar" },
    ],
  },
    {
    number: "02",
    stream: "Food Sovereignty & Gardening",
    title: "Building Raised Garden Beds",
    duration: "5 Hours",
    color: "#5a3e2b",
    accent: "#c4843a",
    dark: "#2d1f12",
    emoji: "🔨",
    about:
      "Hands-on construction workshop where participants build a raised garden bed from start to finish. Covers lumber selection, tool safety, bed assembly, soil layering, and planting.",
    sections: [
      { id: "welcome", label: "Welcome & Opening", icon: "🤝", image: "placeholders/ws02-welcome.svg", content: "This session is on Mi'kmaq territory in Unama'ki (Cape Breton). Short land acknowledgement: honour the territory; thank MSGAM hosts. Do not speak for Mi'kmaq people. Brief introductions and a clear session overview. This is hands-on-while-talking: printouts and a QR for phone follow-along sit on the table while you build. Preview today's physical kit — untreated lumber, fasteners, soil layers, supervised tools — before you lift a saw." },
      { id: "knowledge", label: "The Knowledge", icon: "📋", image: "placeholders/ws02-knowledge.svg", content: "Talk through the core points while people measure, cut, and assemble — not a lecture then a lab. Cover lumber selection (untreated for food beds), tool safety, bed dimensions you can reach, soil layering, and planting layout. Keep each point plain and practical. Point to printouts and the QR so people can follow on their phone while their hands stay busy." },
      { id: "activity", label: "Hands-On Activity", icon: "🪵", image: "placeholders/ws02-activity.svg", content: "• Facilitator talks while you build — hands stay busy\n• Cut, fasten, assemble your bed; supervised tools\n• Layer soil together; plant seeds or seedlings\n• Use printouts + QR on your phone\n• Your finished bed goes HOME planted\n\nRedo path: after class, open Take-Home for numbered at-home steps — materials and costs below stay here for the DIY rebuild.\n\n🧰 Materials needed (session):\n• Untreated lumber cut to plan (cedar or spruce preferred for Cape Breton)\n• Exterior screws / fasteners; corner brackets if used\n• Measuring tape, square, saw, drill (shared/supervised)\n• PPE — eye protection; gloves as needed\n• Plain cardboard weed barrier (no tape, no glossy ink); finished compost + topsoil — no fresh-branch fill\n• Seeds or seedlings for first planting\n• Printed soil mix guide + tool safety card\n• QR card for phone follow-along\n\n🧰 Take-home kit (physical — what leaves with you):\n• Fully built, planted raised garden bed\n• Soil mix & layering guide · tool safety quick card · Certificate of Completion\n• (Shared tools stay with facilitator unless you own them)\n\n💵 Rough cost (CAD, Cape Breton/local — estimate — confirm locally):\n• Session materials per person: about $80–220 for a small household bed (included in MSGAM session materials when booked)\n• At-home DIY redo of one bed: about $80–220 (lumber $40–120, soil fill $30–80, fasteners $10–20)\n\n🏠 At-home redo guide:\n1. Mark a width you can reach — about 1.2 m (4 ft) from both sides; narrower from one side. Level the ground.\n2. Cut untreated lumber; assemble square corners; fasten securely.\n3. On grass: plain cardboard only (no tape, no gloss). Add topsoil + finished compost; water to settle; top up to about 20–30 cm.\n4. Plant with spacing from class; mulch edges if windy.\n5. Follow tool-safety card — no rushing with saws or drills." },
      { id: "discussion", label: "Community Discussion", icon: "💬", image: "placeholders/ws02-discussion.svg", content: "Open floor for community-specific questions:\n• Where will you put your bed at home?\n• What do you want to grow first?\n• How can neighbours share garden tips or surplus starts?\n• Ideas for a community garden space?\n• Who has a lumber yard or scrap-wood source nearby?\n• What would a shared community bed cost if we pooled materials?\n\n📌 Takeaway to write down:\n• Write where your bed will sit, what you will grow first, and one lumber or scrap-wood source nearby." },
      { id: "takehome", label: "Take-Home", icon: "🎁", image: "placeholders/ws02-takehome.svg", content: "Every participant leaves with a physical kit:\n✓ Fully built, planted raised garden bed\n✓ Soil mix & layering guide\n✓ Tool safety quick card\n✓ Certificate of Completion\n\n📦 What you need:\n• Fully built, planted raised garden bed\n• Soil mix & layering guide\n• Tool safety quick card\n• Soil mix & layering guide (in kit)\n• Tool-safety card — supervised tools if cutting\n\n✅ Done looks like:\n• A square, level untreated bed topped up or built, planted with spacing from class, and cost notes ready for Workshop 03.\n\n🏠 At-home redo (after class):\n1. Use your soil mix guide to top up or build a second bed.\n2. Re-check square and level before filling with soil.\n3. Keep untreated wood only for food beds.\n4. Plant next succession using skills from Workshop 01.\n5. Note what it cost to fill and plant — bring numbers to Workshop 03." },
      { id: "next", label: "What's Next", icon: "➡️", image: "placeholders/ws02-next.svg", content: "Ready to go further? The next workshop in the series:\n\n💰 Crop Monetization & Food Sovereignty — 2.5 Hour Session\n\nLearn how to turn your garden into both a food security system and a source of income.\n\nBook through MSGAM. This is one of 14 workshops that run on repeat for new cohorts. At home, note what it cost to fill and plant your bed — bring those numbers to Workshop 03. Printouts / QR stay available for booking info.\n\nAt-home first: finish the Take-Home redo steps before or beside booking the next session — Hands-On has materials and cost notes if you need to rebuild the kit." },
    ],
    keypoints: [
      { label: "Lumber Selection", detail: "Choose the right wood — safe, durable, and long-lasting for food growing" },
      { label: "Tool Safety", detail: "Proper use of saws, drills, squares, and hand tools from start to finish" },
      { label: "Bed Assembly", detail: "Cut, fasten, and assemble a complete raised bed ready for your yard" },
      { label: "Soil Layering", detail: "Layer your bed correctly for maximum drainage, nutrients, and growth" },
      { label: "Planting Layout", detail: "Maximize your new bed with smart spacing and companion planting basics" },
      { label: "Materials & Cost", detail: "Untreated lumber, fasteners, soil layers, shared tools/PPE; DIY bed ~$80–220 CAD (estimate — confirm locally)" },
      { label: "At-Home Redo", detail: "Level site, assemble untreated frame, layer soil, plant, follow tool-safety card for a second bed" },
    ],
  },
    {
    number: "03",
    stream: "Food Sovereignty & Gardening",
    title: "Crop Monetization & Food Sovereignty",
    duration: "2.5 Hours",
    color: "#8a6420",
    accent: "#d4a83a",
    dark: "#3d2a0e",
    emoji: "💰",
    about:
      "How to turn a garden into a food security system and a revenue stream. Covers surplus management, preservation basics, pricing produce, and building local food networks for Cape Breton households and MSGAM-connected communities.",
    sections: [
      { id: "welcome", label: "Welcome & Opening", icon: "🤝", image: "placeholders/ws03-welcome.svg", content: "This session is on Mi'kmaq territory in Unama'ki (Cape Breton). Short land acknowledgement: honour the territory; thank MSGAM hosts. Do not speak for Mi'kmaq people. Brief introductions and a clear session overview. This is hands-on-while-talking: printouts and a QR for phone follow-along sit on the table while you work worksheets. Preview today's kit — pricing sheets, surplus templates, local price examples — before you calculate." },
      { id: "knowledge", label: "The Knowledge", icon: "📋", image: "placeholders/ws03-knowledge.svg", content: "Talk through the core points while people fill worksheets — not a lecture then a lab. Cover surplus management (keep / share / preserve / sell), fair pricing, a short preservation intro pointing to Workshop 05, community food networks, and food sovereignty — household security first, income second. Keep each point plain and practical. Point to printouts and the QR so people can follow on their phone while their hands stay busy." },
      { id: "activity", label: "Hands-On Activity", icon: "📝", image: "placeholders/ws03-activity.svg", content: "• Facilitator talks while you work — hands stay busy\n• Cost-benefit for a typical Cape Breton harvest\n• Market pricing worksheet with local examples\n• Draft a simple surplus plan; map buyers/traders\n• Use printouts + QR on your phone\n\nRedo path: after class, open Take-Home for numbered at-home steps — materials and costs below stay here for the DIY rebuild.\n\n🧰 Materials needed (session):\n• Cost-benefit / market pricing worksheets (printed)\n• Pens or pencils; calculator or phone calculator\n• Sample local produce price list (farmers' market / store examples)\n• Surplus plan template\n• Optional jar/label for preservation talk\n• QR card for phone follow-along\n\n🧰 Take-home kit (physical — what leaves with you):\n• Completed cost-benefit & pricing worksheets\n• Surplus management plan template\n• Preservation quick-start card · Certificate of Completion\n\n💵 Rough cost (CAD, Cape Breton/local — estimate — confirm locally):\n• Session materials per person: about $2–5 print packet (included in MSGAM session materials when booked)\n• At-home DIY redo of one packet: about $2–5; optional scale or spare jars $0–20\n\n🏠 At-home redo guide:\n1. List what you grew (or expect) and split keep / share / preserve / sell.\n2. Re-run the cost-benefit sheet with your real seed, soil, and time notes.\n3. Check one local market or store price; update your fair-price line.\n4. Write who you'll offer surplus to this week.\n5. Pick one preservation method from the quick-start card to try next." },
      { id: "discussion", label: "Community Discussion", icon: "💬", image: "placeholders/ws03-discussion.svg", content: "Open floor for community-specific questions:\n• What surplus do you already have — or expect this season?\n• Where do people buy or trade food in your community?\n• How do we keep food affordable while valuing growers' labour?\n• How can MSGAM-connected communities support each other's harvests?\n• What do seeds, soil, and time really cost you each season?\n• Where can we post fair community prices without racing to the bottom?\n\n📌 Takeaway to write down:\n• Write your keep / share / preserve / sell split for this season and one fair price you checked locally." },
      { id: "takehome", label: "Take-Home", icon: "🎁", image: "placeholders/ws03-takehome.svg", content: "Every participant leaves with a physical kit:\n✓ Cost-benefit and pricing worksheet (completed)\n✓ Surplus management plan template\n✓ Preservation quick-start card\n✓ Certificate of Completion\n\n📦 What you need:\n• Cost-benefit and pricing worksheet (completed)\n• Surplus management plan template\n• Preservation quick-start card\n• Your real seed / soil / time notes\n• One local market or store price check\n\n✅ Done looks like:\n• Surplus plan updated after harvest, one crop's true cost tracked, and one method tried from the preservation quick-start card.\n\n🏠 At-home redo (after class):\n1. Update your surplus plan after each harvest week.\n2. Track one crop's true cost vs what you charged or traded.\n3. Share the pricing sheet with a neighbour grower if helpful.\n4. Try one method from the preservation quick-start card.\n5. Bring cost and benefit notes to Workshop 04 greenhouse planning." },
      { id: "next", label: "What's Next", icon: "➡️", image: "placeholders/ws03-next.svg", content: "Ready to go further? The next workshop in the series:\n\n🌿 Greenhouse Design & Management — 5 Hour Session\n\nPlan a home or community greenhouse — site, structure, climate control, and a proposal ready for band council or funders.\n\nBook through MSGAM. This is one of 14 workshops that run on repeat for new cohorts. Bring your cost notes — funders and councils like clear benefit and budget thinking. Printouts / QR stay available for booking info.\n\nAt-home first: finish the Take-Home redo steps before or beside booking the next session — Hands-On has materials and cost notes if you need to rebuild the kit." },
    ],
    keypoints: [
      { label: "Surplus Management", detail: "Decide what to keep, share, preserve, and sell from every harvest" },
      { label: "Pricing Produce", detail: "Set fair prices that work for your household and your community" },
      { label: "Preservation Intro", detail: "Stretch the growing season with canning, freezing, and drying basics" },
      { label: "Food Networks", detail: "Connect growers, buyers, and sharers across MSGAM communities" },
      { label: "Food Sovereignty", detail: "Put household food security first — income follows" },
      { label: "Materials & Cost", detail: "Printed pricing & surplus worksheets, pens, local price examples; print redo ~$2–5 CAD (estimate — confirm locally)" },
      { label: "At-Home Redo", detail: "Re-run cost-benefit with real harvest numbers, update fair prices, refresh your surplus map" },
    ],
  },
    {
    number: "04",
    stream: "Food Sovereignty & Gardening",
    title: "Greenhouse Design & Management",
    duration: "5 Hours",
    color: "#3d6b4a",
    accent: "#6bb87a",
    dark: "#1e3525",
    emoji: "🌿",
    about:
      "Design, build planning, and operational management of a community or home greenhouse. Covers site selection, structure types, climate control, year-round growing, and funding pathways for community greenhouse projects in Cape Breton.",
    sections: [
      { id: "welcome", label: "Welcome & Opening", icon: "🤝", image: "placeholders/ws04-welcome.svg", content: "This session is on Mi'kmaq territory in Unama'ki (Cape Breton). Short land acknowledgement: honour the territory; thank MSGAM hosts. Do not speak for Mi'kmaq people. Brief introductions and a clear session overview. This is hands-on-while-talking: printouts and a QR for phone follow-along sit on the table while you design on paper. Preview today's planning kit — site checklist, layout sheets, funding outline — not a full build day." },
      { id: "knowledge", label: "The Knowledge", icon: "📋", image: "placeholders/ws04-knowledge.svg", content: "Talk through the core points while people assess sites and sketch layouts — not a lecture then a lab. Cover site selection (sun, wind, drainage, access), structure types (hoop / poly / glass / DIY), climate control, year-round crops under cover, and funding pathways. Today is design-on-paper — not a full build. Keep each point plain and practical. Point to printouts and the QR so people can follow on their phone while their hands stay busy." },
      { id: "activity", label: "Hands-On Activity", icon: "📐", image: "placeholders/ws04-activity.svg", content: "• Facilitator talks while you plan — hands stay busy\n• Site assessment; layout on paper (not a full build)\n• Funding research; draft proposal bones\n• Use printouts + QR on your phone\n• Ask questions while you sketch\n\nRedo path: after class, open Take-Home for numbered at-home steps — materials and costs below stay here for the DIY rebuild.\n\n🧰 Materials needed (session):\n• Site assessment checklist; graph / layout paper; pencils & scale ruler or tape measure\n• Sun / wind notes sheet; funding pathway handout\n• Sample structure comparison (hoop / polycarbonate / glass / DIY)\n• Draft proposal outline template\n• QR card for phone follow-along\n\n🧰 Take-home kit (physical — what leaves with you):\n• Completed site assessment worksheet\n• Greenhouse layout sketch\n• Draft proposal outline · Certificate of Completion\n\n💵 Rough cost (CAD, Cape Breton/local — estimate — confirm locally):\n• Session materials per person: about $5–15 planning packet (included in MSGAM session materials when booked)\n• At-home DIY planning redo: about $5–15; DIY small hoop house later (not today): often about $200–800+ — get local quotes before any proposal\n\n🏠 At-home redo guide:\n1. Walk your real site at morning and afternoon; note sun, wind, drainage, access.\n2. Redraw layout with beds, path width, water source, and vent/heat ideas.\n3. Pick one structure type that matches budget and Cape Breton wind/snow.\n4. Fill proposal outline: need, community benefit, rough materials list, ask amount.\n5. Confirm prices at a local supplier before you present to council or funders." },
      { id: "discussion", label: "Community Discussion", icon: "💬", image: "placeholders/ws04-discussion.svg", content: "Open floor for community-specific questions:\n• Where could a greenhouse live in your community?\n• Who would use it — households, a school, a food program?\n• What barriers (space, cost, skills) need solutions first?\n• How do we keep a shared greenhouse cared for long-term?\n• Who can help quote lumber, poly, or a kit locally?\n• What shared greenhouse budget feels realistic this year?\n\n📌 Takeaway to write down:\n• Write one possible greenhouse site, who would use it, and one realistic shared budget question for your community." },
      { id: "takehome", label: "Take-Home", icon: "🎁", image: "placeholders/ws04-takehome.svg", content: "Every participant leaves with a physical kit:\n✓ Site assessment worksheet\n✓ Greenhouse layout sketch\n✓ Draft proposal outline suitable for band council or funders\n✓ Certificate of Completion\n\nToday was design-on-paper — build comes later after quotes and approvals.\n\n📦 What you need:\n• Site assessment worksheet\n• Greenhouse layout sketch\n• Draft proposal outline suitable for band council or funders\n• Site assessment + layout sketch (in kit)\n• Local supplier quote before any proposal\n\n✅ Done looks like:\n• Site re-walked with a second pair of eyes, proposal costs tightened, one local quote confirmed, and three funding contacts listed.\n\n🏠 At-home redo (after class):\n1. Re-do the site walk with a neighbour for a second pair of eyes.\n2. Tighten your materials list and cost column on the proposal.\n3. List three funding or partnership contacts from class research.\n4. Confirm one local quote before presenting.\n5. While you refine the proposal, Workshop 05 helps preserve what cover (or garden) produces." },
      { id: "next", label: "What's Next", icon: "➡️", image: "placeholders/ws04-next.svg", content: "Ready to go further? The next workshop in the series:\n\n🪴 Preservation, Mead & Fermentation — 2.5 Hour Session\n\nClose the loop from garden to jar — canning, pickling, fermentation, and Mi'kmaq food traditions.\n\nBook through MSGAM. This is one of 14 workshops that run on repeat for new cohorts. While you refine the proposal at home, Workshop 05 helps you preserve what a greenhouse (or garden) produces. Printouts / QR stay available for booking info.\n\nAt-home first: finish the Take-Home redo steps before or beside booking the next session — Hands-On has materials and cost notes if you need to rebuild the kit." },
    ],
    keypoints: [
      { label: "Site Selection", detail: "Choose sun, wind, drainage, and access that set a greenhouse up to succeed" },
      { label: "Structure Types", detail: "Compare hoop houses, kits, and DIY builds for Cape Breton conditions" },
      { label: "Climate Control", detail: "Manage heat, air, and moisture so plants thrive year-round" },
      { label: "Year-Round Growing", detail: "Plan crops by season under cover — not just summer" },
      { label: "Funding Pathways", detail: "Build a proposal ready for band council, grants, or partners" },
      { label: "Materials & Cost", detail: "Checklists, layout paper, funding handouts; planning ~$5–15; DIY hoop build later ~$200–800+ CAD (estimates — confirm locally)" },
      { label: "At-Home Redo", detail: "Re-assess sun/wind/drainage, redraw layout, update proposal costs with local quotes" },
    ],
  },
    {
    number: "05",
    stream: "Food Sovereignty & Gardening",
    title: "Preservation, Mead & Fermentation",
    duration: "2.5 Hours",
    color: "#6b4a3d",
    accent: "#c4845a",
    dark: "#35251e",
    emoji: "🪴",
    about:
      "Traditional and modern food preservation methods including canning, pickling, vinegar production, mead making, and fermentation basics — connected to Mi'kmaq food traditions and Cape Breton harvest cycles.",
    sections: [
      { id: "welcome", label: "Welcome & Opening", icon: "🤝", image: "placeholders/ws05-welcome.svg", content: "This session is on Mi'kmaq territory in Unama'ki (Cape Breton). Short land acknowledgement: honour the territory; thank MSGAM hosts. Do not speak for Mi'kmaq people. Brief introductions and a clear session overview. This is hands-on-while-talking: printouts and a QR for phone follow-along sit on the table while you pack jars. Preview today's physical kit — jars, lids, brine fixings, produce for demo, labels — before you pack. Food safety first." },
      { id: "knowledge", label: "The Knowledge", icon: "📋", image: "placeholders/ws05-knowledge.svg", content: "Talk through the core points while people pack starter jars — not a lecture then a lab. Cover canning & pickling (safe methods; botulism awareness for low-acid canning), fermentation basics, vinegar & mead intro, and Mi'kmaq food traditions using existing hub wording only — honour knowledge keepers; do not invent cultural claims or speak for Mi'kmaq people. Keep each point plain and practical. Point to printouts and the QR so people can follow on their phone while their hands stay busy." },
      { id: "activity", label: "Hands-On Activity", icon: "🫙", image: "placeholders/ws05-activity.svg", content: "• Facilitator talks while you pack — hands stay busy\n• Pickling / fermentation demo; pack a starter jar\n• Label contents + date; taste samples if available\n• Use printouts + QR on your phone\n• Food safety / botulism awareness for canning\n\nRedo path: after class, open Take-Home for numbered at-home steps — materials and costs below stay here for the DIY rebuild.\n\n🧰 Materials needed (session):\n• Mason jars with lids (one starter jar per person)\n• Salt, vinegar, and/or brine ingredients; clean cutting board & knives\n• Fresh vegetables for packing; labels & permanent marker\n• Tasting spoons/cups as available; hand-washing station\n• Preservation safety quick-reference card + recipe sheet\n• QR card for phone follow-along\n\n🧰 Take-home kit (physical — what leaves with you):\n• Starter jar (pickle or ferment) ready to finish at home\n• Process quick card · recipe sheet · safety/labelling tips\n• Certificate of Completion\n\n💵 Rough cost (CAD, Cape Breton/local — estimate — confirm locally):\n• Session materials per person: about $8–20 starter jar kit (included in MSGAM session materials when booked)\n• At-home DIY redo of one kit: about $8–20 (jars $4–10, salt/vinegar $3–6, produce $2–8)\n\n🏠 At-home redo guide:\n1. Wash jars and lids in hot soapy water; rinse well.\n2. Follow your recipe sheet for brine strength and pack style.\n3. Leave headspace; wipe rims; lid on; label contents + date.\n4. Ferments: burp or follow card; keep out of hot direct sun.\n5. Refrigerate or process only as your safety card directs — low-acid canning needs tested pressure methods; when unsure, ask a trusted preserve mentor." },
      { id: "discussion", label: "Community Discussion", icon: "💬", image: "placeholders/ws05-discussion.svg", content: "Open floor for community-specific questions:\n• What did your family or elders preserve?\n• What surplus do you wish you could save each fall?\n• How do we share recipes and jars across the community?\n• Where does honey and mead fit in the local food system?\n• Where do people buy jars in bulk locally?\n• Who already preserves — can we share salt weights and safe recipes?\n\n📌 Takeaway to write down:\n• Write one preservation method you will redo at home this week and the safety-card rule you will not skip." },
      { id: "takehome", label: "Take-Home", icon: "🎁", image: "placeholders/ws05-takehome.svg", content: "Every participant leaves with a physical kit:\n✓ A starter jar (pickle or ferment) ready to finish at home\n✓ Preservation safety quick-reference card\n✓ Recipe sheet for basic brine and canning\n✓ Certificate of Completion\n\nFollow the safety card — botulism awareness for low-acid canning.\n\n📦 What you need:\n• A starter jar (pickle or ferment) ready to finish at home\n• Preservation safety quick-reference card\n• Recipe sheet for basic brine and canning\n• Safety / recipe cards (in kit)\n• Clean jars, lids, and produce for a small batch\n\n✅ Done looks like:\n• Starter jar finished per the care card, and a second small batch ready from the same recipe sheet when you're confident.\n\n🏠 At-home redo (after class):\n1. Finish watching your starter jar per the care card.\n2. Make a second small batch using the same recipe sheet.\n3. Share labelled jars only when you're confident in the process.\n4. For low-acid canning, use tested pressure methods or ask a trusted mentor — do not invent shortcuts.\n5. Food stream complete — redo a jar this week, then join Trades 06 when ready." },
      { id: "next", label: "What's Next", icon: "➡️", image: "placeholders/ws05-next.svg", content: "Food Sovereignty stream complete — next up is Trades:\n\n🔧 Basic Roofing for Homeowners — 2.5 Hour Session\n\nLearn to inspect your roof, spot damage early, and make informed repair decisions.\n\nBook through MSGAM. This is one of 14 workshops that run on repeat for new cohorts. Redo a jar at home this week, then join Trades 06 when you're ready. Printouts / QR stay available for booking info.\n\nAt-home first: finish the Take-Home redo steps before or beside booking the next session — Hands-On has materials and cost notes if you need to rebuild the kit." },
    ],
    keypoints: [
      { label: "Canning & Pickling", detail: "Preserve harvest safely so summer food lasts through winter" },
      { label: "Fermentation", detail: "Use living cultures to transform surplus into lasting, nutritious food" },
      { label: "Vinegar & Mead", detail: "Turn scraps and honey into value-added pantry staples" },
      { label: "Food Traditions", detail: "Honour knowledge keepers; do not invent or teach Nation knowledge" },
      { label: "Garden to Jar", detail: "Close the full cycle from growing to preserved food" },
      { label: "Materials & Cost", detail: "Jars, lids, salt/vinegar, produce, labels; DIY starter redo ~$8–20 CAD (estimate — confirm locally)" },
      { label: "At-Home Redo", detail: "Clean jar, mix brine from recipe sheet, pack, label/date, follow safety card for storage" },
    ],
  },
    {
    number: "06",
    stream: "Trades",
    title: "Basic Roofing for Homeowners",
    duration: "2.5 Hours",
    color: "#3f5f7c",
    accent: "#6f9fc4",
    dark: "#25364a",
    emoji: "🔧",
    about:
      "What every homeowner should know about their roof. Covers inspection, identifying damage, understanding materials, when to repair vs replace, and how to work with contractors — practical skills for Cape Breton weather.",
    sections: [
      { id: "welcome", label: "Welcome & Opening", icon: "🤝", image: "placeholders/ws06-welcome.svg", content: "This session is on Mi'kmaq territory in Unama'ki (Cape Breton). Short land acknowledgement: honour the territory; thank MSGAM hosts. Do not speak for Mi'kmaq people. Brief introductions and a clear session overview. This is hands-on-while-talking: printouts and a QR for phone follow-along sit on the table while you work the checklist. Preview today's physical kit — inspection checklist, material samples, sample quotes, contractor questions sheet — before you dig in. Today is inspect-and-decide — empowerment, not risky roof DIY. Height work stays with qualified people." },
      { id: "knowledge", label: "The Knowledge", icon: "📋", image: "placeholders/ws06-knowledge.svg", content: "Talk through the core points while people work checklists and handle samples — not a lecture then a lab. Lead with ground-level and safe-attic inspection, damage ID (leaks, missing shingles, ice dams, rot), materials suited to Cape Breton winters, repair vs replace judgment, and working with contractors (quotes, red flags, fair questions). Keep each point plain and practical. Point to printouts and the QR so people can follow on their phone while their hands stay busy. Never coach climbing steep or icy roofs." },
      { id: "activity", label: "Hands-On Activity", icon: "🏠", image: "placeholders/ws06-activity.svg", content: "• Facilitator talks while you work — hands stay busy\n• Visual inspection checklist with photos and samples\n• Material ID exercise — touch and compare roofing types\n• Cost estimation basics using sample quotes\n• Practice writing contractor questions\n• Use printouts + QR on your phone\n\nRedo path: after class, open Take-Home for numbered at-home steps — materials and costs below stay here for the DIY rebuild.\n\n🧰 Materials needed (session):\n• Roof inspection checklist (printed); photo examples of damage\n• Material samples: asphalt shingle, metal panel/scrap, underlayment/flashing examples if available\n• Sample contractor quote sheets (anonymized); pens\n• Optional binoculars for ground-level looking only\n• Printed contractor questions sheet\n• QR card for phone follow-along\n\n🧰 Take-home kit (physical — what leaves with you):\n• Roof inspection checklist · material ID quick card · contractor questions sheet · Certificate of Completion\n\n💵 Rough cost (CAD, Cape Breton/local — estimate — confirm locally):\n• Session materials / print packet per person: about $2–5 (included in MSGAM session materials when booked)\n• Homeowner ground-level lookover: $0 (no climbing in this workshop)\n• At-home DIY redo of print kit: about $2–5\n• Actual repair/replace: get local quotes — varies widely; estimate — confirm locally\n\n🏠 At-home redo guide:\n1. From the ground only, walk around your home with the checklist.\n2. Note missing shingles, stains, sagging gutters; attic signs of leaks (safe attic access only).\n3. ID your roof type using the material card.\n4. Fill the contractor questions sheet before you call anyone.\n5. Do not climb steep or icy roofs — hire qualified help for height work." },
      { id: "discussion", label: "Community Discussion", icon: "💬", image: "placeholders/ws06-discussion.svg", content: "Open floor for community-specific questions:\n• What roof issues are common in your community?\n• Who do people trust for roofing work locally?\n• How do we support elders and neighbours who can't climb?\n• What winter problems show up every year on Unama'ki?\n• What are people paying for patch vs full reroof around here lately?\n• How do we help elders get safe inspections without anyone taking risks?\n\n📌 Takeaway to write down:\n• Write three ground-level checklist items you will photo this season and one question you will ask a contractor." },
      { id: "takehome", label: "Take-Home", icon: "🎁", image: "placeholders/ws06-takehome.svg", content: "Every participant leaves with a physical kit:\n✓ Roof inspection checklist\n✓ Material ID quick card\n✓ Contractor questions sheet\n✓ Certificate of Completion\n\n📦 What you need:\n• Roof inspection checklist\n• Material ID quick card\n• Contractor questions sheet\n• Inspection checklist + material ID card (in kit)\n• Phone camera for ground-level photos only\n\n✅ Done looks like:\n• Seasonal ground-level inspection done with dated photos on file, and the contractor questions sheet ready if the checklist flags more than a minor issue.\n\n🏠 At-home redo (after class):\n1. Do a seasonal ground-level inspection each spring and fall.\n2. File photos with your checklist dates.\n3. Call a contractor when checklist flags more than a minor issue.\n4. Keep the contractor questions sheet by the phone before you hire.\n5. Never climb steep or icy roofs — hire qualified help for height work." },
      { id: "next", label: "What's Next", icon: "➡️", image: "placeholders/ws06-next.svg", content: "Ready to go further? The next workshop in the series:\n\n🪚 Home Maintenance Fundamentals — 5 Hour Session\n\nSeasonal prep, weatherproofing, plumbing awareness, electrical safety, and Cape Breton winterization.\n\nBook through MSGAM. This is one of 14 workshops that run on repeat for new cohorts. Use your checklist at home this month, then deepen seasonal skills in Workshop 07. Printouts / QR stay available for booking info.\n\nAt-home first: finish the Take-Home redo steps before or beside booking the next session — Hands-On has materials and cost notes if you need to rebuild the kit." },
    ],
    keypoints: [
      { label: "Inspection", detail: "Spot roof problems early from the ground and the attic" },
      { label: "Damage ID", detail: "Recognize leaks, missing shingles, ice dams, and rot" },
      { label: "Materials", detail: "Know which roofing types hold up in Cape Breton weather" },
      { label: "Repair vs Replace", detail: "Decide when a fix is enough and when it's time for a new roof" },
      { label: "Contractors", detail: "Read quotes, ask smart questions, and avoid common pitfalls" },
      { label: "Materials & Cost", detail: "Checklist, roofing samples, sample quotes; print ~$2–5 CAD; real roof work = local quotes (estimate — confirm locally)" },
      { label: "At-Home Redo", detail: "Ground-level checklist walk, ID materials, prep contractor questions — no risky climbing" },
    ],
  },
    {
    number: "07",
    stream: "Trades",
    title: "Home Maintenance Fundamentals",
    duration: "5 Hours",
    color: "#3d5668",
    accent: "#8fb4c4",
    dark: "#1e2c36",
    emoji: "🪚",
    about:
      "Practical home maintenance covering seasonal preparation, weatherproofing, basic plumbing awareness, electrical safety, and winterization specific to Cape Breton conditions — so your home stays warm, dry, and safe.",
    sections: [
      { id: "welcome", label: "Welcome & Opening", icon: "🤝", image: "placeholders/ws07-welcome.svg", content: "This session is on Mi'kmaq territory in Unama'ki (Cape Breton). Short land acknowledgement: honour the territory; thank MSGAM hosts. Do not speak for Mi'kmaq people. Brief introductions and a clear session overview. This is hands-on-while-talking: printouts and a QR for phone follow-along sit on the table while you seal and label. Preview today's physical kit — weatherstripping/caulk demos and a take-home weatherstrip starter, shutoff tags, seasonal calendar, emergency/outage checklist — before you dig in. Hands-On lists materials and a modest DIY weatherproofing budget." },
      { id: "knowledge", label: "The Knowledge", icon: "📋", image: "placeholders/ws07-knowledge.svg", content: "Talk through the core points while people seal drafts, tag shutoffs, and fill calendars — not a lecture then a lab. Lead with seasonal prep (spring after thaw; fall seal before hard freeze), weatherproofing, plumbing awareness, electrical safety limits, and Cape Breton winterization for the home: ice and wet-snow load awareness, coastal wind, salt air (road spray and near-shore spray), and outage readiness. Sydney-area first fall frost is typically mid-October; harder freezes become common in November — teach forecast-check, not a single fixed week. Keep each point plain and practical. Point to printouts and the QR so people can follow on their phone while their hands stay busy." },
      { id: "activity", label: "Hands-On Activity", icon: "🧰", image: "placeholders/ws07-activity.svg", content: "• Facilitator talks while you work — hands stay busy\n• Hands-on walkthroughs with real tools and materials\n• Practice locating shutoffs and checking weatherstripping\n• Build your household seasonal maintenance calendar\n• Pack a simple emergency / outage kit checklist\n• Use printouts + QR on your phone\n\nRedo path: after class, open Take-Home for numbered at-home steps — materials and costs below stay here for the DIY rebuild.\n\n🧰 Materials needed (session):\n• Demo weatherstripping, door sweep, caulk tube (demo), utility knife\n• Shutoff valve tags / labels; flashlight; notebook\n• Seasonal maintenance calendar template; emergency/outage checklist\n• Sample tools for walkthrough (facilitator set)\n• Take-home weatherstrip starter pieces (strip/sweep as stocked)\n• QR card for phone follow-along\n\n🧰 Take-home kit (physical — what leaves with you):\n• Seasonal maintenance calendar · weatherproofing & shutoff quick cards\n• Weatherstrip starter kit (strip/sweep sample as stocked)\n• Emergency / outage checklist · Certificate of Completion\n\n💵 Rough cost (CAD, Cape Breton/local — estimate — confirm locally):\n• Session demos/handouts included when materials provided through MSGAM\n• Basic DIY weatherproofing follow-up kit: about $15–40 (stripping, sweep, caulk)\n• Outage basics you may already own: flashlight/batteries $0–25\n• At-home DIY redo of weatherproofing kit: about $15–40 (estimate — confirm locally)\n\n🏠 At-home redo guide:\n1. Find and label water shutoff; know where the electrical panel is.\n2. Check windows/doors for drafts; add stripping or sweeps as needed.\n3. Fill your seasonal calendar for Cape Breton fall/winter tasks (seal before hard freeze — often late October into November; check the forecast).\n4. Assemble outage kit items from the checklist.\n5. Call a pro for gas lines or electrical work beyond simple awareness." },
      { id: "discussion", label: "Community Discussion", icon: "💬", image: "placeholders/ws07-discussion.svg", content: "Open floor while hands stay on calendars and kits if people want — neighbourly talk, not a lecture:\n• What breaks most often each winter?\n• How do neighbours help with maintenance?\n• What is hard to get fixed on reserve or in rural areas?\n• How do skills pass to youth and elders?\n• What are the cheapest weatherproofing wins?\n• Could bulk-buy or tool-share ideas help?\n\nPrintouts/QR stay available. Practical and plain — share what you know, no jargon.\n\n📌 Takeaway to write down:\n• Write the winter break that hits your home most, one cheap weatherproofing win, and whether a tool-share would help." },
      { id: "takehome", label: "Take-Home", icon: "🎁", image: "placeholders/ws07-takehome.svg", content: "Every participant leaves with a physical kit:\n✓ Seasonal home maintenance calendar\n✓ Weatherproofing and shutoff quick cards\n✓ Weatherstrip starter kit (as stocked)\n✓ Emergency / outage checklist\n✓ Certificate of Completion\n\n📦 What you need:\n• Seasonal home maintenance calendar\n• Weatherproofing and shutoff quick cards\n• Weatherstrip starter kit (as stocked)\n• Emergency / outage checklist\n• Seasonal calendar + shutoff / outage cards (in kit)\n• Weatherstrip leftovers from class if stocked\n\n✅ Done looks like:\n• One calendar task done this week, shutoff photo taped in a cupboard, and outage checklist reviewed before the first hard freeze.\n\n🏠 At-home redo (after class):\n1. Complete one calendar task this week (e.g., draft check or shutoff label).\n2. Photo your shutoffs and tape the photo inside a cupboard.\n3. Review the outage checklist before first hard freeze.\n4. Install leftover weatherstrip/sweep pieces where drafts remain.\n5. Call a pro for gas or wiring beyond simple awareness." },
      { id: "next", label: "What's Next", icon: "➡️", image: "placeholders/ws07-next.svg", content: "Ready to go further? The next workshop in the series:\n\n⚡ Tool Safety & Basic Construction — 2.5 Hour Session\n\nSafe use of hand and power tools, measuring, cutting, fastening, and a small build project.\n\nBook through MSGAM. This is one of 14 workshops that run on repeat for new cohorts. Bring questions about tools you used at home to Workshop 08. Printouts / QR stay available for booking info.\n\nAt-home first: finish the Take-Home redo steps before or beside booking the next session — Hands-On has materials and cost notes if you need to rebuild the kit." },
    ],
    keypoints: [
      { label: "Seasonal Prep", detail: "Follow a year-round checklist so nothing gets missed" },
      { label: "Weatherproofing", detail: "Stop drafts and moisture before they cost you heat and repairs" },
      { label: "Plumbing Awareness", detail: "Find shutoffs, spot leaks, and prevent freeze damage" },
      { label: "Electrical Safety", detail: "Know your limits — stay safe and call a pro when needed" },
      { label: "Winterization", detail: "Prepare for Cape Breton ice, wind, and outages" },
      { label: "Materials & Cost", detail: "Weatherstripping/caulk demos, shutoff tags, calendar & outage sheets; DIY kit ~$15–40 CAD (estimate — confirm locally)" },
      { label: "At-Home Redo", detail: "Label shutoffs, seal drafts, fill seasonal calendar, pack outage basics — call pros when needed" },
    ],
  },
    {
    number: "08",
    stream: "Trades",
    title: "Tool Safety & Basic Construction",
    duration: "2.5 Hours",
    color: "#5a4a3f",
    accent: "#c4a06f",
    dark: "#2f261e",
    emoji: "⚡",
    about:
      "Safe use of common hand and power tools. Reading a tape measure, basic cutting, fastening, and framing concepts — designed for beginners with no prior experience, with supervised hands-on practice.",
    sections: [
      { id: "welcome", label: "Welcome & Opening", icon: "🤝", image: "placeholders/ws08-welcome.svg", content: "This session is on Mi'kmaq territory in Unama'ki (Cape Breton). Short land acknowledgement: honour the territory; thank MSGAM hosts. Do not speak for Mi'kmaq people. Brief introductions and a clear session overview. This is hands-on-while-talking: printouts and a QR for phone follow-along sit on the table while you measure and build. Preview today's physical kit — shared hand/power tools, scrap lumber, fasteners, PPE, safety card, measuring/fastening cheat sheet, and a small take-home build. Safety rules are non-negotiable — all tool use is supervised; redo only with proper PPE." },
      { id: "knowledge", label: "The Knowledge", icon: "📋", image: "placeholders/ws08-knowledge.svg", content: "Talk through the core points while people handle tools at supervised stations — not a lecture then a lab. Lead with hand tools (hammers, squares, levels), power tool safety with non-negotiable PPE rules, accurate measuring, cutting and fastening, and simple framing concepts beginners can use at home. Keep each point plain and practical. Point to printouts and the QR so people can follow on their phone while their hands stay busy. One person operates power tools; coach feedback in real time." },
      { id: "activity", label: "Hands-On Activity", icon: "🔨", image: "placeholders/ws08-activity.svg", content: "• Facilitator talks while you build — hands stay busy\n• Supervised hands-on tool use at every station\n• Practice measuring, marking, and cutting scrap safely\n• Complete a small build project in session\n• PPE check — glasses, gloves, hearing protection as needed\n• Use printouts + QR on your phone\n\nRedo path: after class, open Take-Home for numbered at-home steps — materials and costs below stay here for the DIY rebuild.\n\n🧰 Materials needed (session):\n• Hand tools: hammer, tape measure, speed square, level, clamps\n• Power tools (facilitator-supervised): drill and/or saw as planned\n• Scrap lumber and fasteners for practice + small build\n• PPE: safety glasses; hearing protection; gloves as needed\n• Tool safety quick-reference card; measuring & fastening cheat sheet\n• QR card for phone follow-along\n\n🧰 Take-home kit (physical — what leaves with you):\n• Completed small build project\n• Tool safety / PPE quick-reference card\n• Measuring & fastening cheat sheet\n• Certificate of Completion\n\n💵 Rough cost (CAD, Cape Breton/local — estimate — confirm locally):\n• Small project materials: about $10–35\n• If buying a beginner home tool starter set later: about $40–120 (estimate — confirm locally)\n• Session tools are shared; materials included when provided through MSGAM\n• At-home DIY redo of a second small build: about $10–35 in materials (PPE required)\n\n🏠 At-home redo guide:\n1. Clear a tidy workspace; put on eye protection before cutting.\n2. Measure and mark using the cheat sheet; square your lines.\n3. Fasten with the screw/nail choice you practiced.\n4. Build a second small project (shelf cleat, planter brace, etc.) only if you can work safely.\n5. Unplug power tools when changing bits; ask for help if unsure — redo only with proper PPE." },
      { id: "discussion", label: "Community Discussion", icon: "💬", image: "placeholders/ws08-discussion.svg", content: "Open floor for community-specific questions:\n• What do you want to build or fix at home?\n• Where can people borrow or share tools in the community?\n• How do we teach tool safety to youth responsibly?\n• What projects would help elders and neighbours most?\n• Who has tools we can share or borrow in community?\n• What small builds would help elders most for under $35 in materials?\n\n📌 Takeaway to write down:\n• Write one PPE habit you will keep, one measuring tip to teach, and whether a community tool-share is realistic." },
      { id: "takehome", label: "Take-Home", icon: "🎁", image: "placeholders/ws08-takehome.svg", content: "Every participant leaves with a physical kit:\n✓ Your completed small build project\n✓ Tool safety / PPE quick-reference card\n✓ Measuring & fastening cheat sheet\n✓ Certificate of Completion\n\n📦 What you need:\n• Your completed small build project\n• Tool safety / PPE quick-reference card\n• Measuring & fastening cheat sheet\n• PPE + measuring cheat sheet (in kit)\n• Scrap wood for practice measurements\n\n✅ Done looks like:\n• Safety / PPE card re-read, three accurate tape readings practiced on scrap, and one measuring tip shared with safety first.\n\n🏠 At-home redo (after class):\n1. Re-read the safety / PPE card before any power tool use.\n2. Practice three accurate tape readings on scrap.\n3. Teach one measuring tip to a youth or neighbour — safety first.\n4. Attempt a second small build only if you can work safely with PPE.\n5. Unplug power tools when changing bits; ask for help if unsure." },
      { id: "next", label: "What's Next", icon: "➡️", image: "placeholders/ws08-next.svg", content: "Trades stream complete — next up is Business & Digital:\n\n💻 Starting a Business in Your Community — 2.5 Hour Session\n\nSole prop basics, registration, banking, invoicing, and Indigenous business resources.\n\nBook through MSGAM. This is one of 14 workshops that run on repeat for new cohorts. Use your build confidence at home, then join Business 09 when ready. Printouts / QR stay available for booking info.\n\nAt-home first: finish the Take-Home redo steps before or beside booking the next session — Hands-On has materials and cost notes if you need to rebuild the kit." },
    ],
    keypoints: [
      { label: "Hand Tools", detail: "Use hammers, squares, and levels with confidence and control" },
      { label: "Power Tool Safety", detail: "Follow non-negotiable rules for drills, saws, and PPE" },
      { label: "Measuring", detail: "Read a tape measure accurately so cuts fit the first time" },
      { label: "Cutting & Fastening", detail: "Make clean cuts and choose the right fastener for the job" },
      { label: "Framing Basics", detail: "Understand simple construction concepts you can use at home" },
      { label: "Materials & Cost", detail: "Shared tools/PPE, scrap lumber, fasteners; small build ~$10–35 CAD (estimate — confirm locally)" },
      { label: "At-Home Redo", detail: "PPE on, measure/mark/cut scrap safely, fasten true — only redo when you can work safely" },
    ],
  },
    {
    number: "09",
    stream: "Business & Digital",
    title: "Starting a Business in Your Community",
    duration: "2.5 Hours",
    color: "#1f6e6a",
    accent: "#34b3a8",
    dark: "#143f3c",
    emoji: "💻",
    about:
      "Practical introduction to sole proprietorship, business registration, banking, invoicing, and operating a legitimate business on or connected to reserve. Covers Section 87 awareness and Indigenous business resources relevant in Cape Breton / Unama'ki.",
    sections: [
      { id: "welcome", label: "Welcome & Opening", icon: "🤝", image: "placeholders/ws09-welcome.svg", content: "This session is on Mi'kmaq territory in Unama'ki (Cape Breton). Short land acknowledgement: honour the territory; thank MSGAM hosts. Do not speak for Mi'kmaq people. Brief introductions and a clear session overview. This is hands-on-while-talking: printouts and a QR for phone follow-along sit on the table while you work. Preview today's physical kit — name brainstorm worksheet, one-page plan, invoice template, Indigenous business resource directory — before pens hit paper." },
      { id: "knowledge", label: "The Knowledge", icon: "📋", image: "placeholders/ws09-knowledge.svg", content: "Talk through the core points while people fill worksheets — not a lecture then a lab. Sole proprietorship basics, registration & banking, invoicing, reserve-connected business, and Section 87 awareness plus Indigenous business resources. Section 87 is awareness only — not legal or tax advice. Keep each point plain and practical for social/welfare audiences. Point to printouts and the QR so people can follow on their phone while their hands stay busy." },
      { id: "activity", label: "Hands-On Activity", icon: "📋", image: "placeholders/ws09-activity.svg", content: "• Facilitator talks while you draft — hands stay busy\n• Business name brainstorm; one-page plan\n• Walk a sample invoice together\n• Use printouts + QR on your phone\n• Ask questions while pens are moving\n\nRedo path: after class, open Take-Home for numbered at-home steps — materials and costs below stay here for the DIY rebuild.\n\n🧰 Materials needed (session):\n• One-page business plan template; invoice template\n• Indigenous business resource directory (printed)\n• Pens; optional laptop/phone for looking up registry pages\n• Name brainstorm worksheet\n• Printed session overview + QR card for phone follow-along\n\n🧰 Take-home kit (physical — what leaves with you):\n• Drafted one-page plan · invoice template · resource directory\n• Name brainstorm notes · Certificate of Completion\n\n💵 Rough cost (CAD, Cape Breton/local — estimate — confirm locally):\n• Session materials per person: about $2–5 print (included in MSGAM session materials when booked)\n• At-home DIY redo of one packet: about $2–5 (print); registration/banking fees = confirm officially — not set by this workshop\n\n🏠 At-home redo guide:\n1. Soften your one-page plan with real customers and prices.\n2. Fill a sample invoice for a pretend first sale.\n3. Circle three resources in the directory to contact this month.\n4. Talk with a trusted mentor before paying any registration fees.\n5. Keep Section 87 / tax questions for qualified advisors — this session is awareness, not legal advice." },
      { id: "discussion", label: "Community Discussion", icon: "💬", image: "placeholders/ws09-discussion.svg", content: "Open floor for community-specific questions:\n• What businesses does your community need more of?\n• What barriers stop people from starting?\n• How do we keep business local and fair to neighbours?\n• Who can help with paperwork, funding, or mentoring?\n• What startup costs feel scariest — and which are actually optional at first?\n• Who in community already registered a business and can share lessons?\n\n📌 Takeaway to write down:\n• Write your one-sentence offer, one customer to talk with, and one directory contact to book — fees only after mentor advice." },
      { id: "takehome", label: "Take-Home", icon: "🎁", image: "placeholders/ws09-takehome.svg", content: "Every participant leaves with a physical kit:\n✓ One-page business plan (drafted)\n✓ Invoice template\n✓ Indigenous business resource directory\n✓ Name brainstorm notes\n✓ Certificate of Completion\n\n📦 What you need:\n• One-page business plan (drafted)\n• Invoice template\n• Indigenous business resource directory\n• Name brainstorm notes\n• One-page plan + invoice template (in kit)\n\n✅ Done looks like:\n• One-page plan updated after a real customer conversation, invoice template saved, and one directory contact booked — mentor talk before fees.\n\n🏠 At-home redo (after class):\n1. Update the plan after one real customer conversation.\n2. Save the invoice template on paper and/or your phone.\n3. Book a follow-up with one directory contact.\n4. Talk with a trusted mentor before paying registration fees.\n5. Keep tax / Section 87 questions for qualified advisors." },
      { id: "next", label: "What's Next", icon: "➡️", image: "placeholders/ws09-next.svg", content: "Ready to go further? The next workshop in the series:\n\n📊 Digital Tools for Everyday Business — 2.5 Hour Session\n\nSquare, QuickBooks basics, Google Workspace — no prior tech experience required.\n\nBook through MSGAM. This is one of 14 workshops that run on repeat for new cohorts. Before Workshop 10, bring your invoice draft so digital tools build on today's paper. Printouts / QR stay available for booking info.\n\nAt-home first: finish the Take-Home redo steps before or beside booking the next session — Hands-On has materials and cost notes if you need to rebuild the kit." },
    ],
    keypoints: [
      { label: "Sole Prop Basics", detail: "Understand the simplest way to start a legitimate business" },
      { label: "Registration & Banking", detail: "Get set up to look professional and receive payment" },
      { label: "Invoicing", detail: "Bill clearly for your goods or services every time" },
      { label: "Reserve-Connected Biz", detail: "Know what operating on or connected to reserve involves" },
      { label: "Indigenous Resources", detail: "Find Section 87 awareness and Indigenous business supports" },
      { label: "Materials & Cost", detail: "Plan & invoice templates, resource directory; print ~$2–5 CAD; registry fees separate (confirm locally)" },
      { label: "At-Home Redo", detail: "Refine one-page plan, practice an invoice, contact three directory supports" },
    ],
  },
    {
    number: "10",
    stream: "Business & Digital",
    title: "Digital Tools for Everyday Business",
    duration: "2.5 Hours",
    color: "#2a5f6e",
    accent: "#4aabb8",
    dark: "#163640",
    emoji: "📊",
    about:
      "Introduction to Square payments, QuickBooks basics, Google Workspace, and simple tech tools that make running a small business easier. No prior tech experience required — we set things up together live.",
    sections: [
      { id: "welcome", label: "Welcome & Opening", icon: "🤝", image: "placeholders/ws10-welcome.svg", content: "This session is on Mi'kmaq territory in Unama'ki (Cape Breton). Short land acknowledgement: honour the territory; thank MSGAM hosts. Do not speak for Mi'kmaq people. Brief introductions and a clear session overview. This is hands-on-while-talking: printouts and a QR for phone follow-along sit on the table while you set up. Bring a phone or use a shared device. Preview today's kit — setup checklists and an invoice you'll create live. Software free tiers first; hardware optional. High-level teachable steps — we don't invent product screens that may change." },
      { id: "knowledge", label: "The Knowledge", icon: "📋", image: "placeholders/ws10-knowledge.svg", content: "Talk through the core points while people follow setup checklists on their devices — not a lecture then a lab. Lead with Square payments at a high level (accept cards, track sales), QuickBooks basics (income/expenses), and Google Workspace (Drive, Docs, Sheets, Gmail). Cover simple tech habits — passwords, backups, phone-friendly workflows. No prior experience needed. Keep steps high-level and teachable — do not invent product UI that may be wrong. Point to printouts and the QR so people can follow on their phone while their hands stay busy." },
      { id: "activity", label: "Hands-On Activity", icon: "📱", image: "placeholders/ws10-activity.svg", content: "• Facilitator talks while you set up — hands stay busy\n• Live setup on your device (or shared)\n• Create a basic invoice; log sale & expense\n• Use printouts + QR on your phone\n• High-level steps — no invented product UI\n\nRedo path: after class, open Take-Home for numbered at-home steps — materials and costs below stay here for the DIY rebuild.\n\n🧰 Materials needed (session):\n• Smartphone or laptop (shared devices available if needed)\n• Email login for Google / payment app signup\n• Digital tools quick-start card; login/setup checklist (printed)\n• Sample sale/expense numbers for practice\n• QR card for phone follow-along\n\n🧰 Take-home kit (physical — what leaves with you):\n• Invoice you created · quick-start card · setup checklist · Certificate of Completion\n\n💵 Rough cost (CAD, Cape Breton/local — estimate — confirm locally):\n• App/software free tiers: $0 to start\n• Optional card reader hardware: often about $0–60 depending on promo/model — confirm locally\n• Print checklist: about $1–3\n• Data/wifi access: use venue wifi when possible\n\n🏠 At-home redo guide:\n1. Finish any account setup steps left on your checklist.\n2. Recreate one invoice for a real or practice customer.\n3. Log one sample income and one expense.\n4. Write down passwords in a safe place; turn on 2-step verification if you can.\n5. Backup: email yourself a PDF of the invoice template." },
      { id: "discussion", label: "Community Discussion", icon: "💬", image: "placeholders/ws10-discussion.svg", content: "Open floor for community-specific questions:\n• What digital tools do you already use — or avoid?\n• Where is internet or device access a barrier?\n• How do we help each other learn tech without shame?\n• What would make invoicing and payments easier locally?\n• Who needs help with wifi or a shared device after class?\n• Is a card reader worth it yet, or is invoicing + e-transfer enough?\n\n📌 Takeaway to write down:\n• Write which free-tier tool you will finish setting up in 48 hours and where your test invoice PDF will live." },
      { id: "takehome", label: "Take-Home", icon: "🎁", image: "placeholders/ws10-takehome.svg", content: "Every participant leaves with a physical kit:\n✓ A basic invoice you created in session\n✓ Digital tools quick-start card\n✓ Login / setup checklist for home follow-up\n✓ Certificate of Completion\n\n📦 What you need:\n• A basic invoice you created in session\n• Digital tools quick-start card\n• Login / setup checklist for home follow-up\n• Setup checklist + quick-start card (in kit)\n• Phone or computer for free-tier tools\n\n✅ Done looks like:\n• Setup checklist finished within 48 hours, a test invoice PDF sent to yourself, and one sale entry practiced before Workshop 11.\n\n🏠 At-home redo (after class):\n1. Complete the setup checklist within 48 hours while it's fresh.\n2. Send yourself a test invoice PDF.\n3. Practice one sale entry before Workshop 11.\n4. Turn on 2-step verification if you can.\n5. Bring tech confidence (and a phone) to Workshop 11." },
      { id: "next", label: "What's Next", icon: "➡️", image: "placeholders/ws10-next.svg", content: "Ready to go further? The next workshop in the series:\n\n🌐 Social Media for Local Business — 2.5 Hour Session\n\nFacebook, Instagram, branding, and a 30-day content plan that fits community values.\n\nBook through MSGAM. This is one of 14 workshops that run on repeat for new cohorts. With invoicing started, Workshop 11 helps you share your business story online respectfully. Printouts / QR stay available for booking info.\n\nAt-home first: finish the Take-Home redo steps before or beside booking the next session — Hands-On has materials and cost notes if you need to rebuild the kit." },
    ],
    keypoints: [
      { label: "Square Payments", detail: "Accept cards and track sales without complicated software" },
      { label: "QuickBooks Basics", detail: "Log income and expenses so your business stays clear" },
      { label: "Google Workspace", detail: "Use Drive, Docs, and Sheets for everyday business work" },
      { label: "Invoicing Live", detail: "Create a real invoice before you leave the room" },
      { label: "Tech Confidence", detail: "Build habits that work even if you're new to tech" },
      { label: "Materials & Cost", detail: "Phone/laptop, free app tiers, setup checklist; optional reader ~$0–60 CAD (estimate — confirm locally)" },
      { label: "At-Home Redo", detail: "Finish checklist, recreate an invoice, log a sale/expense, secure logins" },
    ],
  },
    {
    number: "11",
    stream: "Business & Digital",
    title: "Social Media for Local Business",
    duration: "2.5 Hours",
    color: "#245a78",
    accent: "#5eb0d4",
    dark: "#123048",
    emoji: "🌐",
    about:
      "How to use Facebook, Instagram, and basic content creation to promote a local business. Covers branding basics, consistent posting, and respectful marketing suited to Cape Breton / MSGAM contexts.",
    sections: [
      { id: "welcome", label: "Welcome & Opening", icon: "🤝", image: "placeholders/ws11-welcome.svg", content: "This session is on Mi'kmaq territory in Unama'ki (Cape Breton). Short land acknowledgement: honour the territory; thank MSGAM hosts. Do not speak for Mi'kmaq people. Brief introductions and a clear session overview. This is hands-on-while-talking: printouts and a QR for phone follow-along sit on the table while you post. Bring a phone for photos and posting. Preview today's kit — profile audit sheet and 30-day content plan — before phones come out." },
      { id: "knowledge", label: "The Knowledge", icon: "📋", image: "placeholders/ws11-knowledge.svg", content: "Talk through the core points while people audit profiles and draft posts — not a lecture then a lab. Platforms, branding basics, posting habits, community-appropriate marketing, and a 30-day content plan. Keep marketing respectful, local, and true. Keep each point plain and practical. Point to printouts and the QR so people can follow on their phone while their hands stay busy." },
      { id: "activity", label: "Hands-On Activity", icon: "📸", image: "placeholders/ws11-activity.svg", content: "• Facilitator talks while you post — hands stay busy\n• Profile audit; fill 30-day content plan\n• Draft a live post; peer tone feedback\n• Use printouts + QR on your phone\n• Ask questions while phones are open\n\nRedo path: after class, open Take-Home for numbered at-home steps — materials and costs below stay here for the DIY rebuild.\n\n🧰 Materials needed (session):\n• Smartphone with camera; Facebook/Instagram app or browser\n• Profile audit worksheet; 30-day content plan template\n• Posting tips quick card; pens\n• Optional simple props or product samples for photos\n• QR card for phone follow-along\n\n🧰 Take-home kit (physical — what leaves with you):\n• Audit notes + started 30-day plan + posting tips card\n• Certificate of Completion\n\n💵 Rough cost (CAD, Cape Breton/local — estimate — confirm locally):\n• Session materials per person: about $2–5 print (included in MSGAM session materials when booked); organic posting $0\n• At-home DIY redo: platforms $0 organic; print templates ~$2–5; optional boosts/ads only if/when you choose — confirm budgets locally\n\n🏠 At-home redo guide:\n1. Finish profile photo, about text, and contact info from your audit.\n2. Schedule or draft three posts from your 30-day plan.\n3. Take daylight photos of your product/service this week.\n4. Keep tone respectful and local — truthful, not pushy.\n5. Review insights after two weeks; adjust the plan, don't quit." },
      { id: "discussion", label: "Community Discussion", icon: "💬", image: "placeholders/ws11-discussion.svg", content: "Open floor for community-specific questions:\n• What feels respectful vs. pushy in local marketing?\n• How do we promote without competing against neighbours unfairly?\n• Who in community already has a strong online presence to learn from?\n• How do we include people who aren't on social media?\n• What's a fair time budget for posting each week?\n• How do we help businesses that aren't online stay visible offline too?\n\n📌 Takeaway to write down:\n• Write your next post idea, one daylight photo to take this week, and one friend who can check tone." },
      { id: "takehome", label: "Take-Home", icon: "🎁", image: "placeholders/ws11-takehome.svg", content: "Every participant leaves with a physical kit:\n✓ Profile audit notes or new draft profile\n✓ 30-day content plan template (started)\n✓ Posting tips quick card\n✓ Draft post from today's session\n✓ Certificate of Completion\n\n📦 What you need:\n• Profile audit notes or new draft profile\n• 30-day content plan template (started)\n• Posting tips quick card\n• Draft post from today's session\n• Audit notes + 30-day plan + posting tips (in kit)\n• Smartphone with camera; daylight for photos\n\n✅ Done looks like:\n• One post drafted or posted while feedback is fresh, the 30-day grid filling with simple photo ideas, and local, respectful tone kept.\n\n🏠 At-home redo (after class):\n1. Post (or draft) once early this week while feedback is fresh.\n2. Fill the rest of the 30-day grid with simple photo ideas.\n3. Ask a trusted friend to review tone before big promotions.\n4. Take daylight photos of product/service this week.\n5. Keep tone respectful and local — truthful, not pushy." },
      { id: "next", label: "What's Next", icon: "➡️", image: "placeholders/ws11-next.svg", content: "Business & Digital stream complete — next up is Land & Stewardship:\n\n♻️ Waste, Recycling & Composting — 2.5 Hour Session\n\nEveryday habits for composting, sorting, and getting recycling where it belongs.\n\nBook through MSGAM. This is one of 14 workshops that run on repeat for new cohorts. Before Workshop 12, redo three posts at home. Printouts / QR stay available for booking info.\n\nAt-home first: finish the Take-Home redo steps before or beside booking the next session — Hands-On has materials and cost notes if you need to rebuild the kit." },
    ],
    keypoints: [
      { label: "Platforms", detail: "Choose Facebook and Instagram strategies that fit your customers" },
      { label: "Branding Basics", detail: "Keep your name, look, and voice consistent and recognizable" },
      { label: "Posting Habits", detail: "Share regularly without burning out or overselling" },
      { label: "Community Marketing", detail: "Promote in ways that respect local values and relationships" },
      { label: "Content Plan", detail: "Leave with a 30-day plan you can actually follow" },
      { label: "Materials & Cost", detail: "Phone, audit & 30-day templates, tips card; print ~$2–5 CAD; organic posts $0" },
      { label: "At-Home Redo", detail: "Finish profile, draft three posts, shoot simple daylight photos, keep community-respectful tone" },
    ],
  },
    {
    number: "12",
    stream: "Land & Stewardship",
    title: "Waste, Recycling & Composting",
    duration: "2.5 Hours",
    color: "#46603a",
    accent: "#84a84f",
    dark: "#222f1a",
    emoji: "♻️",
    about:
      "A practical workshop on caring for the land through everyday waste habits — composting organics, sorting and rinsing recyclables, bagging and storing waste cleanly, and getting it to the recycling centre. You'll set up your own garbage box and recycling bins and take the whole system home.",
    sections: [
      { id: "welcome", label: "Welcome & Opening", icon: "🤝", image: "placeholders/ws12-welcome.svg", content: "This session is on Mi'kmaq territory in Unama'ki (Cape Breton). Short land acknowledgement: honour the territory; thank MSGAM hosts. Do not speak for Mi'kmaq people. Brief introductions and a clear session overview. This is hands-on-while-talking: printouts and a QR for phone follow-along sit on the table while you sort. Preview today's physical kit — garbage box, recycling bins, bags, sorting card, compost starter scraps — before hands get busy." },
      { id: "knowledge", label: "The Knowledge", icon: "📋", image: "placeholders/ws12-knowledge.svg", content: "Talk through the core points while people sort, rinse, and set up bins — not a lecture then a lab. Composting basics, sorting waste, rinsing recyclables, bagging & storing, and getting it to the recycling centre. Keep each point plain and practical for social/welfare audiences. Point to printouts and the QR so people can follow on their phone while their hands stay busy." },
      { id: "activity", label: "Hands-On Activity", icon: "🗑️", image: "placeholders/ws12-activity.svg", content: "• Facilitator talks while you sort — hands stay busy\n• Set up garbage box & recycling bins\n• Sort, rinse-and-bag, start small compost\n• Use printouts + QR on your phone\n• Ask questions while hands are in materials\n\nRedo path: after class, open Take-Home for numbered at-home steps — materials and costs below stay here for the DIY rebuild.\n\n🧰 Materials needed (session):\n• Garbage box / bin; recycling bin(s); optional organics pail\n• Bags for garbage; rinse tub or sink access; gloves\n• Mixed sample materials for sorting practice\n• Compost starter scraps + small compost container or pile demo\n• Sorting quick-reference card; composting starter guide; QR card\n\n🧰 Take-home kit (physical — what leaves with you):\n• Your bin/box setup + sorting card + composting guide\n• Certificate of Completion\n\n💵 Rough cost (CAD, Cape Breton/local — estimate — confirm locally):\n• Session materials per person: about $15–50 bin/box setup when included via MSGAM; scraps/cards included when materials provided\n• At-home DIY redo of one kit: about $15–50 (reuse containers when possible); bags/gloves ongoing ~$5–15/month — estimate — confirm locally\n\n🏠 At-home redo guide:\n1. Place bins where you'll actually use them (kitchen + outdoor store).\n2. Post the sorting card at eye level.\n3. Rinse recyclables; keep bags sealed and pest-safe.\n4. Add scraps to compost per the starter guide — balance greens/browns.\n5. Note pickup vs drop-off day; get clean recycling to the centre." },
      { id: "discussion", label: "Community Discussion", icon: "💬", image: "placeholders/ws12-discussion.svg", content: "Open floor for community-specific questions:\n• What does waste pickup look like where you live?\n• Where's the nearest recycling centre, and how do we get there?\n• How can we cut down what we send to the landfill?\n• Could we run a shared compost or community drop-off?\n• What do bins and bags cost at the nearest store?\n• Could we bulk-buy bins or run a shared compost drop-off?\n\n📌 Takeaway to write down:\n• Write your bin placement plan, pickup vs drop-off day, and one sorting tip to teach at home." },
      { id: "takehome", label: "Take-Home", icon: "🎁", image: "placeholders/ws12-takehome.svg", content: "Every participant leaves with a physical kit:\n✓ Garbage box & recycling bin setup\n✓ Sorting quick-reference card\n✓ Composting starter guide\n✓ Bags/gloves starter set (as provided)\n✓ Certificate of Completion\n\n📦 What you need:\n• Garbage box & recycling bin setup\n• Sorting quick-reference card\n• Composting starter guide\n• Bags/gloves starter set (as provided)\n• Sorting card + composting guide (in kit)\n• Bins where the household will actually use them\n\n✅ Done looks like:\n• One household member taught the sorting card, one day's recyclables rinsed and sorted, and compost checked per the starter guide.\n\n🏠 At-home redo (after class):\n1. Teach one household member the sorting card this week.\n2. Do a full rinse-and-sort of one day's recyclables.\n3. Turn or check your compost per the starter guide.\n4. Note pickup vs drop-off day on the card.\n5. Share a spare sorting tip with a neighbour." },
      { id: "next", label: "What's Next", icon: "➡️", image: "placeholders/ws12-next.svg", content: "Ready to go further? The next workshop in the series:\n\n🐝 Beekeeping Basics — 2.5 Hour Session\n\nHive setup, safety, seasonal care, and a startup cost worksheet — so you can decide if bees fit your land and community.\n\nBook through MSGAM. This is one of 14 workshops that run on repeat for new cohorts. Keep the sorting habit going at home, then bring your garden plans to Beekeeping (13). Printouts / QR stay available for booking info.\n\nAt-home first: finish the Take-Home redo steps before or beside booking the next session — Hands-On has materials and cost notes if you need to rebuild the kit." },
    ],
    keypoints: [
      { label: "Composting", detail: "Turn food scraps and yard waste into healthy soil instead of landfill" },
      { label: "Sorting Waste", detail: "Know what's garbage, what's recycling, and what can be composted" },
      { label: "Clean Recycling", detail: "Rinse and prep recyclables so they actually get recycled" },
      { label: "Bag & Store", detail: "Keep waste sealed, tidy, and pest-free until it goes out" },
      { label: "To the Centre", detail: "Get your recycling to drop-off or pickup the right way" },
      { label: "Materials & Cost", detail: "Garbage box, recycling bins, bags, compost scraps/guide; setup ~$15–50 CAD (estimate — confirm locally)" },
      { label: "At-Home Redo", detail: "Stage bins, follow sorting card, rinse/bag, tend small compost, use local drop-off/pickup" },
    ],
  },
    {
    number: "13",
    stream: "Land & Stewardship",
    title: "Beekeeping Basics",
    duration: "2.5 Hours",
    color: "#6b5a2b",
    accent: "#d4a84a",
    dark: "#3a3015",
    emoji: "🐝",
    about:
      "Introduction to beekeeping, honey production, and the role of bees in local food systems. Covers hive setup, safety, seasonal management, and honey harvest basics — connecting pollinators to gardens and household food security on Unama'ki.",
    sections: [
      { id: "welcome", label: "Welcome & Opening", icon: "🤝", image: "placeholders/ws13-welcome.svg", content: "This session is on Mi'kmaq territory in Unama'ki (Cape Breton). Short land acknowledgement: honour the territory; thank MSGAM hosts. Do not speak for Mi'kmaq people. Brief introductions and a clear session overview. This is hands-on-while-talking: printouts and a QR for phone follow-along sit on the table while you learn. Preview today's kit — hive demo (live, model, or video if live is unsafe), honey tasting, startup cost worksheet, site sketch. You won't take a full hive home today — you'll leave ready to budget one. Safety first." },
      { id: "knowledge", label: "The Knowledge", icon: "📋", image: "placeholders/ws13-knowledge.svg", content: "Talk through the core points while people sketch sites and fill cost sheets — not a lecture then a lab. Hive setup, bee safety, seasonal management, honey harvest basics, and bees in food systems. Safety first — no live hive if unsafe (use model/video). Keep each point plain and practical. Point to printouts and the QR so people can follow on their phone while their hands stay busy." },
      { id: "activity", label: "Hands-On Activity", icon: "🐝", image: "placeholders/ws13-activity.svg", content: "• Facilitator talks while you learn — hands stay busy\n• Hive demo (live / model / video if unsafe)\n• Honey tasting; cost sheet; site sketch\n• Use printouts + QR on your phone\n• Ask questions while worksheets fill\n\nRedo path: after class, open Take-Home for numbered at-home steps — materials and costs below stay here for the DIY rebuild.\n\n🧰 Materials needed (session):\n• Observation hive, model, or video + projector/smartboard\n• Veil/suit and gloves for demo (facilitator)\n• Honey tasting samples & spoons; water for palate\n• Startup cost breakdown worksheet; seasonal calendar; site sketch paper\n• Safety & hive-site quick card; QR card for phone follow-along\n\n🧰 Take-home kit (physical — what leaves with you):\n• Cost sheet + seasonal calendar + safety & hive-site quick card\n• Certificate of Completion\n\n💵 Rough cost (CAD, Cape Breton/local — estimate — confirm locally):\n• Session packet/tasting: low / included with MSGAM materials when provided\n• First-year starter setup (hive, bees, basic gear): often about $400–900+ — estimate — confirm locally with suppliers and mentors; do not buy bees until site, mentor, and budget are clear\n\n🏠 At-home redo guide:\n1. Re-fill the startup cost sheet with quotes from a real supplier.\n2. Walk a possible hive site — morning sun, wind shelter, water, neighbour safety.\n3. Sketch the site; note fence/pet/people paths.\n4. Find a local mentor or association before ordering bees.\n5. Review seasonal calendar for Cape Breton winter prep realities." },
      { id: "discussion", label: "Community Discussion", icon: "💬", image: "placeholders/ws13-discussion.svg", content: "Open floor for community-specific questions:\n• Who already keeps bees nearby, and what can we learn?\n• Where could community hives live safely?\n• How do we share honey and knowledge without overharvesting?\n• How do bees support gardens and food security here?\n• Who nearby already keeps bees and what did year-one really cost?\n• Could a community share one hive's mentorship costs?\n\n📌 Takeaway to write down:\n• Write your possible hive site, one mentor or association to call, and whether this season or next is the right start." },
      { id: "takehome", label: "Take-Home", icon: "🎁", image: "placeholders/ws13-takehome.svg", content: "Every participant leaves with a physical kit:\n✓ Startup cost breakdown sheet\n✓ Seasonal beekeeping calendar\n✓ Safety & hive-site quick card\n✓ Site sketch from today\n✓ Certificate of Completion\n\n📦 What you need:\n• Startup cost breakdown sheet\n• Seasonal beekeeping calendar\n• Safety & hive-site quick card\n• Site sketch from today\n• Cost sheet + seasonal calendar + safety card (in kit)\n• Mentor contact before buying bees\n\n✅ Done looks like:\n• Cost sheet updated with two supplier quotes, one experienced beekeeper spoken with, and site re-sketched before ordering anything.\n\n🏠 At-home redo (after class):\n1. Update costs with two supplier quotes.\n2. Talk to one experienced beekeeper this month.\n3. Only then decide if this season or next is the right start.\n4. Re-sketch site with neighbour/pet paths marked.\n5. Review seasonal calendar before ordering anything." },
      { id: "next", label: "What's Next", icon: "➡️", image: "placeholders/ws13-next.svg", content: "Ready to go further? The next workshop in the series:\n\n🏞️ Water, Energy & Land Stewardship — 2.5 Hour Session\n\nConnect Mi'kmaq land and water relationships to rainwater, composting, energy awareness, and property stewardship.\n\nBook through MSGAM. This is one of 14 workshops that run on repeat for new cohorts. Park your hive budget sheet with your garden plans — Workshop 14 ties pollinators to wider land and water care. Printouts / QR stay available for booking info.\n\nAt-home first: finish the Take-Home redo steps before or beside booking the next session — Hands-On has materials and cost notes if you need to rebuild the kit." },
    ],
    keypoints: [
      { label: "Hive Setup", detail: "Know the equipment, site, and first steps to start small-scale" },
      { label: "Bee Safety", detail: "Handle hives calmly with the right gear and respect" },
      { label: "Seasonal Care", detail: "Manage colonies through Cape Breton's seasons" },
      { label: "Honey Harvest", detail: "Take honey responsibly — leave enough for the bees" },
      { label: "Food Systems", detail: "Connect bees to gardens, pollination, and local food" },
      { label: "Materials & Cost", detail: "Demo hive/gear, tasting, cost worksheet; full starter often ~$400–900+ CAD (estimate — confirm locally)" },
      { label: "At-Home Redo", detail: "Re-quote gear, sketch a safe site, find a mentor, follow seasonal calendar before buying bees" },
    ],
  },
    {
    number: "14",
    stream: "Land & Stewardship",
    title: "Water, Energy & Land Stewardship",
    duration: "2.5 Hours",
    color: "#2f5a48",
    accent: "#5aaf7a",
    dark: "#163528",
    emoji: "🏞️",
    about:
      "Practical land and water stewardship for Cape Breton households, with respectful mention of Mi'kmaq territory (Unama'ki) — without inventing teachings or speaking for the Nation. Covers rainwater collection, composting, energy awareness, and sustainable property management.",
    sections: [
      { id: "welcome", label: "Welcome & Opening", icon: "🤝", image: "placeholders/ws14-welcome.svg", content: "This session is on Mi'kmaq territory in Unama'ki (Cape Breton). Short land acknowledgement: honour the territory; thank MSGAM hosts. Do not speak for Mi'kmaq people. Brief introductions and a clear session overview. This is hands-on-while-talking: printouts and a QR for phone follow-along sit on the table while you assess. Preview today's kit — property assessment sheet, composting & rainwater quick guide, 30-day action list — before pens hit paper. Series closer — take these skills home." },
      { id: "knowledge", label: "The Knowledge", icon: "📋", image: "placeholders/ws14-knowledge.svg", content: "Talk through the core points while people fill assessments — not a lecture then a lab. Mi'kmaq land & water relationships (existing hub wording only), rainwater collection, composting & soil care, energy awareness, and property stewardship actions. Keep stewardship practical. Do not invent cultural claims or speak for Mi'kmaq people. Point to printouts and the QR so people can follow on their phone while their hands stay busy." },
      { id: "activity", label: "Hands-On Activity", icon: "🗺️", image: "placeholders/ws14-activity.svg", content: "• Facilitator talks while you assess — hands stay busy\n• Property stewardship assessment\n• Composting & rainwater guide; 30-day actions\n• Use printouts + QR on your phone\n• Ask questions while worksheets fill\n\nRedo path: after class, open Take-Home for numbered at-home steps — materials and costs below stay here for the DIY rebuild.\n\n🧰 Materials needed (session):\n• Property stewardship assessment worksheet\n• Composting & rainwater quick guide (printed)\n• 30-day action list template; pens; optional site photos\n• Demo notes for rain barrel / compost options (photos or sample fittings)\n• QR card for phone follow-along\n\n🧰 Take-home kit (physical — what leaves with you):\n• Started assessment + quick guide + 30-day action list\n• Certificate of Completion\n\n💵 Rough cost (CAD, Cape Breton/local — estimate — confirm locally):\n• Session materials per person: about $2–5 print (included in MSGAM session materials when booked)\n• At-home DIY redo: print ~$2–5; DIY compost bin from reclaimed materials ~$0–60; basic rain barrel often ~$40–120; energy actions (LED/draft) often ~$5–40 to start — estimates — confirm locally\n\n🏠 At-home redo guide:\n1. Finish the property assessment room-by-room / yard zones.\n2. Start or improve compost using the quick guide (and WS12 habits).\n3. If collecting rain, place barrel on stable base with overflow plan.\n4. Do three 30-day actions — small beats perfect.\n5. Share one tool or tip with a neighbour this month." },
      { id: "discussion", label: "Community Discussion", icon: "💬", image: "placeholders/ws14-discussion.svg", content: "Open floor for community-specific questions:\n• What stewardship practices already live in your community?\n• Where is water quality or access a concern?\n• How do we share tools, knowledge, and labour across households?\n• What does good land care look like over the long term?\n• Who has spare barrels, lumber, or compost wire to share?\n• What stewardship fix gives the most benefit for under $50?\n\n📌 Takeaway to write down:\n• Write three 30-day stewardship actions and one tip or tool you will share with a neighbour." },
      { id: "takehome", label: "Take-Home", icon: "🎁", image: "placeholders/ws14-takehome.svg", content: "Every participant leaves with a physical kit:\n✓ Property stewardship assessment (started)\n✓ Composting & rainwater quick guide\n✓ 30-day action list\n✓ Demo notes for barrel / compost options\n✓ Certificate of Completion\n\n📦 What you need:\n• Property stewardship assessment (started)\n• Composting & rainwater quick guide\n• 30-day action list\n• Demo notes for barrel / compost options\n• Assessment + quick guide + 30-day list (in kit)\n• Stable base if staging a rain barrel\n\n✅ Done looks like:\n• Assessment finished within a week, action #1 ticked within 48 hours, and compost or rain barrel step started from the quick guide.\n\n🏠 At-home redo (after class):\n1. Complete the assessment within a week.\n2. Tick off action #1 within 48 hours.\n3. Recheck actions on day 30 and set three more.\n4. Start or improve compost; stage rain barrel if collecting.\n5. Share one tool or tip with a neighbour this month." },
      { id: "next", label: "What's Next", icon: "➡️", image: "placeholders/ws14-next.svg", content: "Land & Stewardship stream complete — and the full 14-workshop series.\n\n🌱 New cohorts loop to Introduction to Gardening — Workshop 01.\n\nReturn to other streams anytime, deepen skills you've started, or book the next community visit through MSGAM / your community program coordinator.\n\nUse your at-home guides (materials, cost estimates, redo steps) anytime — take these skills home. Printouts / QR stay available for booking info.\n\nWela'lin — thank you for learning with The Fibonacci Works™.\n\nAt-home first: finish the Take-Home redo steps before or beside booking the next session — Hands-On has materials and cost notes if you need to rebuild the kit." },
    ],
    keypoints: [
      { label: "Land & Water", detail: "Honour Mi'kmaq territory; keep stewardship practical" },
      { label: "Rainwater", detail: "Collect and use rain simply for gardens and household needs" },
      { label: "Composting", detail: "Turn scraps into soil right on your own property" },
      { label: "Energy Awareness", detail: "Cut waste in heat and light without adding hardship" },
      { label: "Property Actions", detail: "Leave with concrete steps you can take this month" },
      { label: "Materials & Cost", detail: "Assessment & guides; compost $0–60; rain barrel often ~$40–120 CAD (estimates — confirm locally)" },
      { label: "At-Home Redo", detail: "Finish assessment, start compost/rain action, complete three 30-day steps, share one tip" },
    ],
  },
];


/* ── Teach decks (local PDF primary + Canva secondary) ──
   PDFs live in public/decks/ (and offline package decks/).
   Open → local PDF in new tab; Download → same path with download attr.
   Canva edit URL kept as secondary link. */
const DECKS = {
  "01": { title: "Introduction to Gardening", pdf: "./decks/01-introduction-to-gardening.pdf", canvaUrl: "https://www.canva.com/d/Lml2vJJzKeqDDL5" },
  "02": { title: "Building Raised Garden Beds", pdf: "./decks/02-building-raised-garden-beds.pdf", canvaUrl: "https://www.canva.com/d/feKR8GAM-RThlF3" },
  "03": { title: "Crop Monetization & Food Sovereignty", pdf: "./decks/03-crop-monetization-food-sovereignty.pdf", canvaUrl: "https://www.canva.com/d/5eNkgdiR65uG3ye" },
  "04": { title: "Greenhouse Design & Management", pdf: "./decks/04-greenhouse-design-management.pdf", canvaUrl: "https://www.canva.com/d/YjX4dQnV6dXgcIw" },
  "05": { title: "Preservation, Mead & Fermentation", pdf: "./decks/05-preservation-mead-fermentation.pdf", canvaUrl: "https://www.canva.com/d/FWbD1SAWk_cLzoq" },
  "06": { title: "Basic Roofing for Homeowners", pdf: "./decks/06-basic-roofing-for-homeowners.pdf", canvaUrl: "https://www.canva.com/d/3Pugw-ivq6PC8A-" },
  "07": { title: "Home Maintenance Fundamentals", pdf: "./decks/07-home-maintenance-fundamentals.pdf", canvaUrl: "https://www.canva.com/d/KWWIJrPIz5Ei6jb" },
  "08": { title: "Tool Safety & Basic Construction", pdf: "./decks/08-tool-safety-basic-construction.pdf", canvaUrl: "https://www.canva.com/d/RGIvgVY87k677Dm" },
  "09": { title: "Starting a Business in Your Community", pdf: "./decks/09-starting-a-business-in-your-community.pdf", canvaUrl: "https://www.canva.com/d/G8RB3JcEEvKElT8" },
  "10": { title: "Digital Tools for Everyday Business", pdf: "./decks/10-digital-tools-for-everyday-business.pdf", canvaUrl: "https://www.canva.com/d/c4Xe9uRqcn11VSp" },
  "11": { title: "Social Media for Local Business", pdf: "./decks/11-social-media-for-local-business.pdf", canvaUrl: "https://www.canva.com/d/GKNK3XeQ4MdFD3h" },
  "12": { title: "Waste, Recycling & Composting", pdf: "./decks/12-waste-recycling-composting.pdf", canvaUrl: "https://www.canva.com/d/O4sY85vsSl4SzzQ" },
  "13": { title: "Beekeeping Basics", pdf: "./decks/13-beekeeping-basics.pdf", canvaUrl: "https://www.canva.com/d/0FJRTaupRg92lVt" },
  "14": { title: "Water, Energy & Land Stewardship", pdf: "./decks/14-water-energy-land-stewardship.pdf", canvaUrl: "https://www.canva.com/d/cn9UZV-gHe1GeOh" },
};

function DeckActions({ number, color }) {
  const deck = DECKS[number];
  if (!deck?.pdf && !deck?.canvaUrl) return null;
  const hasPdf = Boolean(deck.pdf);
  const openHref = hasPdf ? deck.pdf : deck.canvaUrl;
  const accent = color || "#4a7c3f";
  const btnBase = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "10px 18px",
    borderRadius: "12px",
    fontSize: "13.5px",
    fontWeight: 600,
    letterSpacing: "-0.01em",
    fontFamily: FW_SANS,
    textDecoration: "none",
    cursor: "pointer",
    border: "none",
    lineHeight: 1.25,
    WebkitFontSmoothing: "antialiased",
  };
  const stop = (e) => { e.stopPropagation(); };
  return (
    <div
      onClick={stop}
      onKeyDown={stop}
      style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", marginTop: "18px" }}
    >
      <a
        className="fw-link"
        href={openHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={stop}
        style={{ ...btnBase, background: accent, color: "#fff" }}
      >
        {hasPdf ? "📄 Open" : "↗ Open"}
      </a>
      {hasPdf ? (
        <a
          className="fw-link"
          href={deck.pdf}
          download
          onClick={stop}
          style={{ ...btnBase, background: "#fff", color: accent, border: `1.5px solid ${accent}` }}
        >
          ↓ Download
        </a>
      ) : null}
      {hasPdf && deck.canvaUrl ? (
        <a
          className="fw-link"
          href={deck.canvaUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={stop}
          title="Open Canva teach deck (online edit)"
          style={{ ...btnBase, background: "transparent", color: "#666", border: "1.5px solid #ccc", fontWeight: 500, fontSize: "12px", padding: "8px 14px" }}
        >
          Canva
        </a>
      ) : !hasPdf ? (
        <span className="fw-caption" style={{ color: "#999" }}>
          Opens Canva teach deck
        </span>
      ) : null}
    </div>
  );
}

const isComplete = (w) => Boolean(w.about && w.sections?.length && w.keypoints?.length);

/* ── Progress (localStorage) ─────────────────────────────────
   Key: fw-hub-progress = { lastOpened: "01", completed: ["01", …] }
   - On open of a workshop → set lastOpened AND mark that workshop completed
     (opening the detail counts as progress; keypoint checks are bonus UI only)
   - Hub "Continue" → next unfinished after lastOpened, else first incomplete, else "01";
     if all 14 completed → reopen lastOpened (or "14")
   ───────────────────────────────────────────────────────────── */
const PROGRESS_KEY = "fw-hub-progress";

/* ── Premium type tokens (iOS glass lettering) ─────────────── */
const FW_SANS = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Segoe UI", Inter, system-ui, sans-serif';
const FW_DISPLAY = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Inter, system-ui, sans-serif';
const FW_MONO = 'ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';
const fwLabel = {
  fontFamily: FW_SANS,
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  WebkitFontSmoothing: "antialiased",
};


const defaultProgress = () => ({ lastOpened: null, completed: [] });

const loadProgress = () => {
  if (typeof window === "undefined") return defaultProgress();
  try {
    const raw = window.localStorage.getItem(PROGRESS_KEY);
    if (!raw) return defaultProgress();
    const parsed = JSON.parse(raw);
    const completed = Array.isArray(parsed?.completed)
      ? parsed.completed.filter((n) => typeof n === "string")
      : [];
    const lastOpened = typeof parsed?.lastOpened === "string" ? parsed.lastOpened : null;
    return { lastOpened, completed };
  } catch {
    return defaultProgress();
  }
};

const saveProgress = (progress) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch { /* ignore quota / private mode */ }
};

/** Mark workshop opened: set lastOpened + add to completed. Returns updated progress. */
const markOpened = (number) => {
  const prev = loadProgress();
  const completed = prev.completed.includes(number)
    ? prev.completed
    : [...prev.completed, number];
  const next = { lastOpened: number, completed };
  saveProgress(next);
  return next;
};

/** Resolve which workshop the Hub Continue button should open. */
const resolveContinueTarget = (progress) => {
  const nums = WORKSHOPS.map((w) => w.number);
  const done = new Set(progress.completed || []);
  const allDone = nums.every((n) => done.has(n));
  if (allDone) {
    return progress.lastOpened && nums.includes(progress.lastOpened)
      ? progress.lastOpened
      : "14";
  }
  if (progress.lastOpened && nums.includes(progress.lastOpened)) {
    const i = nums.indexOf(progress.lastOpened);
    for (let j = i + 1; j < nums.length; j++) {
      if (!done.has(nums[j])) return nums[j];
    }
  }
  const firstIncomplete = nums.find((n) => !done.has(n));
  return firstIncomplete || "01";
};

const STYLE = `
  /* Self-hosted Inter — ensures sans on Linux/Windows verification (no Times/serif) */
  @font-face {
    font-family: Inter;
    font-style: normal;
    font-weight: 100 900;
    font-display: swap;
    src: url("./fonts/Inter-Variable.woff2?v=20261007") format("woff2-variations"),
         url("./fonts/Inter-Variable.woff2?v=20261007") format("woff2");
  }
  :root {
    --fw-safe-b: env(safe-area-inset-bottom, 0px);
    --fw-safe-t: env(safe-area-inset-top, 0px);
    --fw-ink: #241c16;
    --fw-ink-soft: #5c5148;
    --fw-muted: #9a8b78;
    --fw-paper: #f6f0e6;
    --fw-card: #fffaf3;
    --fw-line: rgba(70, 48, 32, 0.1);
    --fw-color: #4a7c3f;
    --fw-accent: #c4a06a;
    --fw-glass: rgba(255, 252, 248, 0.52);
    --fw-glass-strong: rgba(255, 250, 243, 0.68);
    --fw-glass-border: rgba(255, 255, 255, 0.62);
    --fw-glass-edge: rgba(70, 48, 32, 0.08);
    --fw-glass-blur: blur(24px) saturate(1.4);
    --fw-glass-shadow:
      0 14px 36px rgba(28, 16, 40, 0.09),
      inset 0 1px 0 rgba(255, 255, 255, 0.78),
      inset 0 -1px 0 rgba(255, 255, 255, 0.14);
    --fw-specular: linear-gradient(155deg, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.14) 38%, transparent 58%);
    --fw-sans: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Segoe UI", Inter, system-ui, sans-serif;
    --fw-display: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Inter, system-ui, sans-serif;
    --fw-mono: ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
    --fw-fs-hero: clamp(1.85rem, 7.2vw, 2.35rem);
    --fw-fs-title: clamp(1.45rem, 5.5vw, 1.85rem);
    --fw-fs-section: 1.0625rem;
    --fw-fs-body: 0.96875rem;
    --fw-fs-caption: 0.75rem;
    --fw-fs-label: 0.6875rem;
    --fw-lh-tight: 1.18;
    --fw-lh-body: 1.58;
    --fw-track-display: -0.028em;
    --fw-track-label: 0.14em;
  }
  .fw-app {
    max-width: 440px;
    margin: 0 auto;
    min-height: 100vh;
    min-height: 100dvh;
    position: relative;
    color: var(--fw-ink);
    font-family: var(--fw-sans);
    font-size: var(--fw-fs-body);
    line-height: var(--fw-lh-body);
    letter-spacing: -0.011em;
    font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    background:
      radial-gradient(120% 72% at 110% -12%, color-mix(in srgb, var(--fw-accent) 28%, transparent), transparent 48%),
      radial-gradient(80% 48% at -10% 108%, rgba(92, 64, 148, 0.08), transparent 54%),
      linear-gradient(180deg, rgba(255, 252, 248, 0.76) 0%, rgba(246, 240, 230, 0.82) 46%, rgba(241, 232, 218, 0.86) 100%);
    -webkit-backdrop-filter: blur(30px) saturate(1.3);
    backdrop-filter: blur(30px) saturate(1.3);
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.26),
      0 28px 80px rgba(16, 10, 28, 0.38),
      inset 0 1px 0 rgba(255,255,255,0.62);
    overflow: hidden;
  }
  .fw-display {
    font-family: var(--fw-display);
    font-optical-sizing: auto;
    font-weight: 600;
    letter-spacing: var(--fw-track-display);
    line-height: var(--fw-lh-tight);
    font-feature-settings: "kern" 1, "liga" 1;
    -webkit-font-smoothing: antialiased;
  }
  .fw-label {
    font-family: var(--fw-sans);
    font-size: var(--fw-fs-label);
    font-weight: 600;
    letter-spacing: var(--fw-track-label);
    text-transform: uppercase;
    line-height: 1.3;
    -webkit-font-smoothing: antialiased;
  }
  .fw-caption {
    font-family: var(--fw-sans);
    font-size: var(--fw-fs-caption);
    font-weight: 500;
    letter-spacing: 0.02em;
    line-height: 1.45;
    color: var(--fw-muted);
  }
  .fw-mono {
    font-family: var(--fw-mono);
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.02em;
  }
  .fw-type-glass {
    text-shadow: 0 0.5px 0 rgba(255,255,255,0.35);
  }
  .fw-type-hero {
    text-shadow: 0 1px 2px rgba(12, 8, 24, 0.28), 0 0 40px rgba(255, 236, 206, 0.12);
  }
  .fw-app::before {
    content: "";
    pointer-events: none;
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(80, 52, 28, 0.035) 0.7px, transparent 0.7px);
    background-size: 3px 3px;
    mix-blend-mode: multiply;
    opacity: 0.42;
    z-index: 0;
  }
  .fw-app::after {
    content: "";
    pointer-events: none;
    position: absolute;
    inset: 0;
    background: var(--fw-specular);
    opacity: 0.55;
    z-index: 0;
  }
  .fw-app > * { position: relative; z-index: 1; }
  @media (min-width: 521px) {
    .fw-app {
      margin: 18px auto;
      min-height: calc(100vh - 36px);
      min-height: calc(100dvh - 36px);
      border-radius: 28px;
      border: 1px solid rgba(255,255,255,0.28);
    }
  }
  @media (max-width: 520px) {
    .fw-app { max-width: 100%; box-shadow: none; border-radius: 0; }
  }
  @keyframes fw-rise {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: none; }
  }
  .fw-rise { animation: fw-rise .38s ease; }
  .fw-sec-panel {
    overflow: hidden;
    animation: fw-rise .38s ease;
  }
  .fw-glass {
    background: var(--fw-glass);
    -webkit-backdrop-filter: var(--fw-glass-blur);
    backdrop-filter: var(--fw-glass-blur);
    border: 1px solid var(--fw-glass-border);
    box-shadow: var(--fw-glass-shadow);
  }
  .fw-glass .fw-display,
  .fw-glass h1, .fw-glass h2, .fw-glass h3 {
    text-shadow: 0 0.5px 0 rgba(255,255,255,0.4);
  }
  .fw-glass-chip {
    background: rgba(255, 255, 255, 0.42);
    -webkit-backdrop-filter: blur(14px) saturate(1.25);
    backdrop-filter: blur(14px) saturate(1.25);
    border: 1px solid rgba(255, 255, 255, 0.55);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.65), 0 6px 16px rgba(28,16,40,0.05);
  }
  .fw-block {
    background: rgba(255, 252, 248, 0.55);
    -webkit-backdrop-filter: blur(20px) saturate(1.35);
    backdrop-filter: blur(20px) saturate(1.35);
    border: 1px solid rgba(255, 255, 255, 0.62);
    border-radius: 16px;
    padding: 13px 13px;
    margin: 0 0 10px;
    box-shadow: var(--fw-glass-shadow);
  }
  .fw-block-title {
    font-family: var(--fw-sans);
    font-size: var(--fw-fs-label);
    letter-spacing: var(--fw-track-label);
    text-transform: uppercase;
    font-weight: 650;
    margin: 0 0 8px;
    color: var(--fw-ink-soft);
  }
  .fw-block ul, .fw-block ol {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .fw-block li {
    display: flex;
    gap: 8px;
    align-items: flex-start;
    font-size: var(--fw-fs-body);
    line-height: var(--fw-lh-body);
    letter-spacing: -0.01em;
    color: #3a3128;
  }
  .fw-block .fw-n {
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 11px;
    font-weight: 700;
    font-family: var(--fw-sans);
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.02em;
    color: #fff;
  }
  .fw-home-path {
    border-radius: 18px;
    padding: 14px 14px;
    margin: 0 0 14px;
    background: rgba(255, 252, 248, 0.48);
    -webkit-backdrop-filter: blur(18px) saturate(1.3);
    backdrop-filter: blur(18px) saturate(1.3);
    box-shadow: var(--fw-glass-shadow);
  }
  .fw-card {
    transition: transform .28s ease, box-shadow .28s ease, border-color .28s ease;
    -webkit-backdrop-filter: blur(16px) saturate(1.25);
    backdrop-filter: blur(16px) saturate(1.25);
    box-shadow: var(--fw-glass-shadow);
  }
  .fw-card:hover { transform: translateY(-2px); box-shadow: 0 18px 36px rgba(48, 28, 64, 0.1), inset 0 1px 0 rgba(255,255,255,0.75); }
  .fw-tap:focus-visible, .fw-card:focus-visible { outline: 2px solid var(--fw-color); outline-offset: 3px; border-radius: 14px; }
  .fw-link:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; border-radius: 8px; }
  .fw-cta {
    position: relative;
    font-family: var(--fw-sans);
    letter-spacing: -0.01em;
    box-shadow:
      0 10px 24px rgba(28, 16, 40, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.42),
      inset 0 -1px 0 rgba(0, 0, 0, 0.06);
  }
  .fw-cta:hover { filter: brightness(1.05); }
  .fw-tint-card { background: linear-gradient(135deg, var(--fw-tint, rgba(255,255,255,0.35)) 0%, rgba(255,250,243,0.55) 48%); }
  .fw-cta, .fw-tap, .fw-row { min-height: 44px; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
  .fw-figure { margin: 0 0 16px; }
  .fw-figure img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 18px;
    box-shadow: 0 18px 40px rgba(28, 16, 40, 0.16);
  }
  .fw-hero-still {
    width: 100%;
    margin-top: 18px;
    border-radius: 20px;
    display: block;
    border: 1px solid rgba(255,255,255,0.32);
    box-shadow: 0 18px 40px rgba(12, 8, 24, 0.28), inset 0 1px 0 rgba(255,255,255,0.35);
  }
  .fw-pill {
    background: rgba(255,255,255,0.14);
    -webkit-backdrop-filter: blur(12px) saturate(1.2);
    backdrop-filter: blur(12px) saturate(1.2);
    border: 1px solid rgba(255,255,255,0.28);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.35);
  }
  .fw-teach-bar {
    position: sticky; bottom: 0; z-index: 40;
    padding: 10px 12px calc(12px + var(--fw-safe-b));
    background: rgba(255, 250, 243, 0.55);
    -webkit-backdrop-filter: blur(22px) saturate(1.35);
    backdrop-filter: blur(22px) saturate(1.35);
    border-top: 1px solid rgba(255,255,255,0.45);
    display: flex; align-items: center; gap: 8px;
    box-shadow: 0 -16px 36px rgba(40, 24, 60, 0.08), inset 0 1px 0 rgba(255,255,255,0.55);
  }
  .fw-menu-panel {
    position: absolute; top: calc(100% + 8px); right: 0; left: 0;
    background: rgba(255, 250, 243, 0.72);
    -webkit-backdrop-filter: blur(24px) saturate(1.35);
    backdrop-filter: blur(24px) saturate(1.35);
    border: 1px solid rgba(255, 255, 255, 0.55);
    border-radius: 18px;
    box-shadow: 0 22px 50px rgba(24, 14, 36, 0.18), inset 0 1px 0 rgba(255,255,255,0.7);
    z-index: 50; max-height: 70vh; overflow: auto;
  }

  .fw-sheet-scrim {
    position: fixed;
    inset: 0;
    z-index: 80;
    background: rgba(18, 12, 28, 0.42);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 10px 10px calc(10px + var(--fw-safe-b));
  }
  .fw-sheet {
    width: min(440px, 100%);
    max-height: min(84dvh, 680px);
    overflow: auto;
    background:
      radial-gradient(120% 80% at 100% 0%, rgba(196, 160, 106, 0.16), transparent 46%),
      linear-gradient(180deg, rgba(255, 252, 248, 0.72) 0%, rgba(244, 236, 223, 0.78) 100%);
    -webkit-backdrop-filter: blur(28px) saturate(1.4);
    backdrop-filter: blur(28px) saturate(1.4);
    color: #241c16;
    border-radius: 26px;
    border: 1px solid rgba(255, 255, 255, 0.58);
    box-shadow: 0 28px 70px rgba(12, 8, 22, 0.38), inset 0 1px 0 rgba(255,255,255,0.75);
    padding: 8px 16px 16px;
  }
  .fw-sheet-handle {
    width: 42px;
    height: 4px;
    border-radius: 99px;
    background: rgba(70, 48, 32, 0.18);
    margin: 6px auto 12px;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.35);
  }
  .fw-answer-line {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    background: rgba(255, 255, 255, 0.48);
    -webkit-backdrop-filter: blur(14px) saturate(1.25);
    backdrop-filter: blur(14px) saturate(1.25);
    border: 1px solid rgba(255, 255, 255, 0.62);
    border-radius: 14px;
    padding: 11px 13px;
    font-size: 1rem;
    line-height: var(--fw-lh-body);
    letter-spacing: -0.012em;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.72), 0 8px 20px rgba(28,16,40,0.05);
  }

  .fw-prep {
    border-radius: 18px;
    border: 1.5px solid rgba(255,255,255,0.52);
    padding: 15px 15px;
    margin: 0 0 4px;
    -webkit-backdrop-filter: blur(22px) saturate(1.35);
    backdrop-filter: blur(22px) saturate(1.35);
    box-shadow: var(--fw-glass-shadow);
  }
  .fw-prep-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .fw-prep-chip {
    background: rgba(255, 255, 255, 0.4);
    -webkit-backdrop-filter: blur(12px) saturate(1.2);
    backdrop-filter: blur(12px) saturate(1.2);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 14px;
    padding: 10px 12px;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.65);
  }
  .fw-prep-k {
    font-family: var(--fw-sans);
    font-size: 10px;
    letter-spacing: var(--fw-track-label);
    text-transform: uppercase;
    font-weight: 600;
    color: #9a8b78;
    margin-bottom: 5px;
  }
  .fw-prep-v { font-size: 0.9375rem; font-weight: 600; color: #241c16; line-height: 1.38; letter-spacing: -0.014em; }
  .fw-prep-order {
    margin: 0; padding: 0; list-style: none;
    display: flex; flex-direction: column; gap: 6px;
  }
  .fw-prep-order li {
    display: flex; gap: 8px; align-items: flex-start;
    font-size: var(--fw-fs-body); line-height: 1.5; letter-spacing: -0.01em; color: #3a3128;
  }
  .fw-prep-check {
    display: flex; gap: 12px; align-items: flex-start;
    border: 1.5px solid rgba(255,255,255,0.45);
    border-radius: 14px;
    padding: 12px 12px;
    margin: 0 0 10px;
    cursor: pointer;
    background: rgba(255,255,255,0.28);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
  }
  .fw-prep-check input {
    width: 22px; height: 22px; margin-top: 2px; flex-shrink: 0; accent-color: var(--fw-color);
  }
  .fw-qr {
    flex-shrink: 0;
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
    border: 1px solid rgba(70,48,32,0.1);
    box-shadow: 0 8px 18px rgba(40,24,16,0.06), inset 0 1px 0 rgba(255,255,255,0.8);
  }
  .fw-qr svg { width: 100%; height: 100%; display: block; }
  .fw-qr-fallback {
    border: 1.5px dashed rgba(70,48,32,0.25);
    border-radius: 12px;
    padding: 12px;
    background: rgba(255,255,255,0.85);
    max-width: 220px;
  }
  .fw-print-only { display: none; }
  .fw-print-card { break-inside: avoid; page-break-inside: avoid; }
  @media (prefers-reduced-motion: reduce) {
    * { transition: none !important; }
    .fw-rise, .fw-sec-panel { animation: none; }
    .fw-card:hover { transform: none; }
  }
  @media print {
    body * { visibility: hidden !important; }
    .fw-print-sheet, .fw-print-sheet * { visibility: visible !important; }
    .fw-print-sheet {
      display: block !important; position: absolute; left: 0; top: 0; width: 100%;
      background: #fff !important; color: #000 !important; padding: 18px !important;
      box-shadow: none !important; border: none !important;
      -webkit-backdrop-filter: none !important; backdrop-filter: none !important;
    }
    .fw-print-card {
      border: 1.5px solid #333 !important;
      page-break-inside: avoid;
      break-inside: avoid;
      margin-bottom: 14px !important;
      background: #fff !important;
      -webkit-backdrop-filter: none !important; backdrop-filter: none !important;
      box-shadow: none !important;
    }
    .fw-no-print, .fw-teach-bar, .fw-app-chrome, .fw-app::before, .fw-app::after { display: none !important; visibility: hidden !important; }
  }
`;

const keyActivate = (fn) => (e) => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fn(); }
};

const Footer = () => (
  <div style={{ borderTop: "1px solid rgba(70,48,32,0.08)", padding: "28px 22px calc(28px + env(safe-area-inset-bottom, 0px))", textAlign: "center", background: "transparent" }}>
    <div className="fw-caption" style={{ marginBottom: "8px", letterSpacing: "0.06em" }}>Workshop Series · Cape Breton · Unama'ki · MSGAM</div>
    <div style={{ fontSize: "12px", color: "#8a7b68", letterSpacing: "-0.01em", marginBottom: "6px", fontWeight: 500 }}>© 2026 Isaiah Chandler</div>
    <div className="fw-display" style={{ fontSize: "15px", color: "#4a7c3f", letterSpacing: "-0.02em", marginBottom: "4px", fontWeight: 600 }}>The Fibonacci Works™</div>
    <div className="fw-label" style={{ fontSize: "10px", color: "#b3a494", letterSpacing: "0.12em" }}>All rights reserved.</div>
  </div>
);

const ctaBtn = (bg, color, border) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  padding: "12px 16px",
  minHeight: 44,
  borderRadius: "14px",
  fontSize: "14.5px",
  fontWeight: 600,
  letterSpacing: "-0.012em",
  fontFamily: FW_SANS,
  cursor: "pointer",
  border: border || "none",
  background: bg,
  color,
  lineHeight: 1.25,
  textAlign: "center",
  WebkitFontSmoothing: "antialiased",
  boxShadow: "0 10px 24px rgba(28, 16, 40, 0.12), inset 0 1px 0 rgba(255,255,255,0.42)",
});

const AppShell = ({ children, tone }) => (
  <div className="fw-app" style={{ fontFamily: FW_SANS, color: "#241c16", ...tone }}>
    {children}
  </div>
);

/* ── Parse section copy into student-clear blocks (existing text only) ── */
const MARKERS = [
  { key: "materials", match: "🧰 Materials needed", title: "Materials needed" },
  { key: "kit", match: "🧰 Take-home kit", title: "Take-home kit" },
  { key: "cost", match: "💵 Rough cost", title: "Rough cost" },
  { key: "redo", match: "🏠 At-home redo", title: "At-home redo" },
  { key: "need", match: "📦 What you need", title: "What you need" },
  { key: "done", match: "✅ Done looks like", title: "Done looks like" },
  { key: "takeaway", match: "📌 Takeaway", title: "Takeaway to write down" },
  { key: "redopath", match: "Redo path:", title: "Redo path" },
];

function cleanItem(line) {
  return String(line || "")
    .replace(/^[\s•✓✔\-–—]+/, "")
    .replace(/^\d+\.\s*/, "")
    .trim();
}

function parseSectionContent(content) {
  const text = String(content || "");
  const hits = [];
  for (const m of MARKERS) {
    const at = text.indexOf(m.match);
    if (at >= 0) hits.push({ ...m, at });
  }
  hits.sort((a, b) => a.at - b.at);
  const lead = hits.length ? text.slice(0, hits[0].at).trim() : text.trim();
  const blocks = hits.map((h, i) => {
    const end = i + 1 < hits.length ? hits[i + 1].at : text.length;
    const chunk = text.slice(h.at, end);
    const nl = chunk.indexOf("\n");
    const sameLineRaw = chunk.slice(h.match.length, nl >= 0 ? nl : chunk.length).replace(/^[:\s]+/, "").trim();
    // Keep same-line text only for short leads (e.g. Redo path: …). Skip title suffixes like "(after class):".
    const sameLine = (h.key === "redopath" && sameLineRaw && !/^\(.*\):?$/.test(sameLineRaw))
      ? sameLineRaw
      : "";
    const body = nl >= 0 ? chunk.slice(nl + 1) : "";
    const items = [sameLine, ...body.split("\n")]
      .map(cleanItem)
      .filter((line) => line && !MARKERS.some((m) => line.startsWith(m.match)));
    return { key: h.key, title: h.title, items };
  });
  const leadItems = lead
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => ({
      kind: /^[•✓✔\-–—]/.test(l) || /^\d+\./.test(l) ? "item" : "p",
      text: cleanItem(l) || l.replace(/^[•✓✔]\s*/, "").trim(),
      raw: l,
    }))
    .filter((x) => x.text);
  return { leadItems, blocks };
}


function stickyTakeaway(w) {
  const disc = (w.sections || []).find((s) => s.id === "discussion");
  const { blocks } = parseSectionContent(disc?.content || "");
  const items = blocks.find((b) => b.key === "takeaway")?.items || [];
  return items[0] || "";
}

/* ── Deep links + facilitator prep (existing materials only) ──
   Canonical live QR target: GitHub Pages base + ?ws=NN
   Also accept #wsNN / #ws=NN on any host for local preview.
   ───────────────────────────────────────────────────────────── */
const LIVE_HUB_BASE = "https://chanbaby97.github.io/fibonacci-works-hub/";
const WS_NUMS = new Set(WORKSHOPS.map((w) => w.number));

function normalizeWs(raw) {
  if (raw == null) return null;
  const digits = String(raw).replace(/\D/g, "");
  if (!digits) return null;
  const n = digits.padStart(2, "0").slice(-2);
  return WS_NUMS.has(n) ? n : null;
}

function readDeepLinkWs() {
  if (typeof window === "undefined") return null;
  try {
    const params = new URLSearchParams(window.location.search || "");
    const fromQ = normalizeWs(params.get("ws") || params.get("workshop"));
    if (fromQ) return fromQ;
    const hash = (window.location.hash || "").replace(/^#/, "");
    const hm = hash.match(/^ws=?(\d{1,2})$/i);
    if (hm) return normalizeWs(hm[1]);
  } catch { /* ignore */ }
  return null;
}

function workshopDeepUrl(number) {
  const n = normalizeWs(number) || "01";
  return `${LIVE_HUB_BASE}?ws=${n}`;
}

function syncDeepLink(number) {
  if (typeof window === "undefined" || !window.history?.replaceState) return;
  try {
    const url = new URL(window.location.href);
    if (number) {
      url.searchParams.set("ws", normalizeWs(number) || number);
    } else {
      url.searchParams.delete("ws");
      url.searchParams.delete("workshop");
    }
    // Prefer query over hash for GitHub Pages reliability
    if (url.hash && /^#ws=?/i.test(url.hash)) url.hash = "";
    const next = url.pathname + url.search + url.hash;
    const cur = window.location.pathname + window.location.search + window.location.hash;
    if (next !== cur) window.history.replaceState(null, "", next);
  } catch { /* ignore */ }
}

const SHARED_MAT_RE = /shared|demo|facilitator|sample|supervised|projector|smartboard|hand-washing|observation hive|model, or video|venue wifi/i;
const LATER_COST_RE = /later|starter setup|hoop house|repair\/replace|registry|banking fees|card reader|tool starter set|boosts\/ads|full starter|first-year/i;
const SESSION_COST_RE = /session materials|print packet|print checklist|small project materials|weatherproofing follow-up|bin\/box setup|starter jar kit|planning packet/i;

function parseMoneyRange(line) {
  const m = String(line || "").match(/\$(\d+)\s*[–-]\s*\$?(\d+)/);
  if (!m) return null;
  return { lo: Number(m[1]), hi: Number(m[2]) };
}

function extractFacilitatorPrep(w) {
  const activity = (w.sections || []).find((s) => s.id === "activity");
  const { blocks } = parseSectionContent(activity?.content || "");
  const byKey = Object.fromEntries(blocks.map((b) => [b.key, b]));
  const materials = byKey.materials?.items || [];
  const kit = byKey.kit?.items || [];
  const costLines = byKey.cost?.items || [];
  const scalable = [];
  const shared = [];
  for (const item of materials) {
    if (SHARED_MAT_RE.test(item)) shared.push(item);
    else scalable.push(item);
  }
  // QR / print cards are always per-person for table use
  const hasQr = materials.some((m) => /QR/i.test(m));
  if (!hasQr) scalable.push("QR card for phone follow-along");

  let sessionRange = null;
  let sessionLabel = "";
  let laterNotes = [];
  for (const line of costLines) {
    if (LATER_COST_RE.test(line) && !SESSION_COST_RE.test(line)) {
      laterNotes.push(line);
      continue;
    }
    const range = parseMoneyRange(line);
    if (!range) continue;
    if (!sessionRange && (SESSION_COST_RE.test(line) || /per person/i.test(line))) {
      sessionRange = range;
      sessionLabel = line;
    }
  }
  // Fallbacks from known workshop patterns (still from existing cost lines only)
  if (!sessionRange) {
    for (const line of costLines) {
      if (LATER_COST_RE.test(line)) continue;
      const range = parseMoneyRange(line);
      if (range) {
        sessionRange = range;
        sessionLabel = line;
        break;
      }
    }
  }
  // WS13 etc: session may be "low / included" with no $ — keep note, don't invent
  if (!sessionRange) {
    const soft = costLines.find((l) => /included|low\s*\/\s*included|packet\/tasting/i.test(l));
    if (soft) sessionLabel = soft;
  }

  const sectionOrder = (w.sections || []).map((s) => s.label);
  const sticky = stickyTakeaway(w);
  return {
    materials,
    scalable,
    shared,
    kit,
    costLines,
    sessionRange,
    sessionLabel,
    laterNotes,
    sectionOrder,
    sticky,
  };
}

function WorkshopQr({ url, color, size = 148 }) {
  const svg = useMemo(() => {
    try {
      return renderSVG(url, { border: 2, ecc: "M" });
    } catch {
      return null;
    }
  }, [url]);
  if (!svg) {
    return (
      <div className="fw-qr-fallback" style={{ borderColor: `${color}55` }}>
        <div className="fw-label" style={{ fontSize: 10.5, letterSpacing: "0.12em", color, fontWeight: 700, marginBottom: 6 }}>Print-ready QR placeholder</div>
        <div style={{ fontSize: 13, lineHeight: 1.4, wordBreak: "break-all", color: "#241c16", fontWeight: 600 }}>{url}</div>
      </div>
    );
  }
  return (
    <div
      className="fw-qr"
      style={{ width: size, height: size }}
      title={url}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

function FacilitatorPrepCard({ w, onPrint }) {
  const prep = useMemo(() => extractFacilitatorPrep(w), [w]);
  const [headcount, setHeadcount] = useState(10);
  const [practiced, setPracticed] = useState(false);
  const [copied, setCopied] = useState(false);
  const deepUrl = workshopDeepUrl(w.number);
  const n = Math.max(1, Math.min(60, Number(headcount) || 1));

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(`fw-prep-practiced-${w.number}`);
      setPracticed(raw === "1");
    } catch { /* ignore */ }
  }, [w.number]);

  const setPracticedPersist = (v) => {
    setPracticed(v);
    try { window.localStorage.setItem(`fw-prep-practiced-${w.number}`, v ? "1" : "0"); } catch { /* ignore */ }
  };

  const copyUrl = async () => {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(deepUrl);
      else {
        const ta = document.createElement("textarea");
        ta.value = deepUrl;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { setCopied(false); }
  };

  const totalLo = prep.sessionRange ? prep.sessionRange.lo * n : null;
  const totalHi = prep.sessionRange ? prep.sessionRange.hi * n : null;
  const color = w.color || "#4a7c3f";

  return (
    <div className="fw-prep fw-glass" style={{ borderColor: `${color}44`, background: `linear-gradient(145deg, ${color}22 0%, rgba(255,250,243,0.42) 55%)` }}>
      <div className="fw-label" style={{ fontSize: 11, letterSpacing: "0.16em", color, fontWeight: 700, marginBottom: 6 }}>FACILITATOR PREP</div>
      <div style={{ fontSize: 17, fontWeight: 600, color: "#241c16", marginBottom: 4 }}>Pro runbook · before anyone sits down</div>
      <p style={{ margin: "0 0 12px", fontSize: 13, lineHeight: 1.5, color: "#6d5e50" }}>
        You stay on hub + slides. Participants follow on phone (QR) or printouts — they need nothing else if cards are on the table.
      </p>

      <div className="fw-prep-grid">
        <div className="fw-prep-chip" style={{ borderColor: `${color}33` }}>
          <div className="fw-prep-k">Duration</div>
          <div className="fw-prep-v">{w.duration}</div>
        </div>
        <div className="fw-prep-chip" style={{ borderColor: `${color}33` }}>
          <div className="fw-prep-k">Talk each section</div>
          <div className="fw-prep-v">~{w.duration?.includes("5") ? "40–50" : "20–25"} min · slides open</div>
        </div>
      </div>

      <div className="fw-block" style={{ borderColor: `${color}33`, marginTop: 10, background: "rgba(255,252,248,0.38)" }}>
        <div className="fw-block-title" style={{ color }}>Section run order</div>
        <ol className="fw-prep-order">
          {prep.sectionOrder.map((label, i) => (
            <li key={label}><span className="fw-n" style={{ background: color }}>{i + 1}</span><span>{label}</span></li>
          ))}
        </ol>
      </div>

      <div className="fw-block" style={{ borderColor: `${color}33`, background: "rgba(255,252,248,0.38)" }}>
        <div className="fw-block-title" style={{ color }}>Headcount · kit scale</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <button type="button" className="fw-tap fw-cta" aria-label="Fewer people" onClick={() => setHeadcount((h) => Math.max(1, (Number(h) || 1) - 1))} style={{ ...ctaBtn("#fff", color, `1.5px solid ${color}`), width: 44, height: 44, padding: 0 }}>−</button>
          <label style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
            <span className="fw-label" style={{ fontSize: 10.5, letterSpacing: "0.14em", color: "#9a8b78" }}>PEOPLE</span>
            <input
              type="number"
              min={1}
              max={60}
              value={n}
              onChange={(e) => setHeadcount(e.target.value)}
              style={{ width: "100%", fontSize: 22, fontWeight: 700, padding: "8px 10px", borderRadius: 12, border: `1.5px solid ${color}55`, background: "rgba(255,255,255,0.72)", color: "#241c16", fontFamily: FW_SANS, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}
            />
          </label>
          <button type="button" className="fw-tap fw-cta" aria-label="More people" onClick={() => setHeadcount((h) => Math.min(60, (Number(h) || 1) + 1))} style={{ ...ctaBtn("#fff", color, `1.5px solid ${color}`), width: 44, height: 44, padding: 0 }}>+</button>
        </div>
        {prep.scalable.length > 0 && (
          <>
            <div className="fw-label" style={{ fontSize: 10.5, letterSpacing: "0.12em", color: "#9a8b78", marginBottom: 6 }}>Take-home / per-person × {n}</div>
            <ul>
              {prep.scalable.map((item) => (
                <li key={item}>
                  <span aria-hidden="true" style={{ color, fontWeight: 700 }}>·</span>
                  <span><strong style={{ fontFamily: FW_SANS, color, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>{n}×</strong> {item}</span>
                </li>
              ))}
            </ul>
          </>
        )}
        {prep.shared.length > 0 && (
          <>
            <div className="fw-label" style={{ fontSize: 10.5, letterSpacing: "0.12em", color: "#9a8b78", margin: "10px 0 6px" }}>Room / shared (not × headcount)</div>
            <ul>
              {prep.shared.map((item) => (
                <li key={item}>
                  <span aria-hidden="true" style={{ color, fontWeight: 700 }}>·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </>
        )}
        {prep.sessionRange ? (
          <p style={{ margin: "12px 0 0", fontSize: 14.5, lineHeight: 1.5, color: "#3a3128" }}>
            <strong style={{ color }}>Rough session materials CAD for {n}:</strong>{" "}
            ${totalLo}–${totalHi}{" "}
            <span style={{ color: "#7a6b5c" }}>(${prep.sessionRange.lo}–${prep.sessionRange.hi} per person × {n})</span>
            <br />
            <span className="fw-caption">estimate — confirm locally</span>
          </p>
        ) : (
          <p style={{ margin: "12px 0 0", fontSize: 13.5, lineHeight: 1.5, color: "#6d5e50" }}>
            No clear per-person session $ to multiply in the existing cost notes
            {prep.sessionLabel ? <> — {prep.sessionLabel}</> : null}.
            Scale the printable / kit lines above; confirm locally.
          </p>
        )}
        {prep.laterNotes.length > 0 && (
          <p style={{ margin: "8px 0 0", fontSize: 12.5, lineHeight: 1.45, color: "#7a6b5c" }}>
            Not multiplied for class: {prep.laterNotes[0]}
          </p>
        )}
      </div>

      <div className="fw-block" style={{ borderColor: `${color}33`, background: "rgba(255,252,248,0.38)" }}>
        <div className="fw-block-title" style={{ color }}>Room setup</div>
        <ul>
          <li><span aria-hidden="true" style={{ color, fontWeight: 700 }}>·</span><span>Facilitator: hub open + slides (Canva/PDF). Talk each section while hands stay busy.</span></li>
          <li><span aria-hidden="true" style={{ color, fontWeight: 700 }}>·</span><span>Table: print outdoor / take-home cards + one QR card pointing at this workshop’s deep link.</span></li>
          <li><span aria-hidden="true" style={{ color, fontWeight: 700 }}>·</span><span>Shared tools stay with you; take-home kit leaves with each person (from Hands-On notes).</span></li>
        </ul>
        {prep.kit.length > 0 && (
          <p style={{ margin: "8px 0 0", fontSize: 12.5, lineHeight: 1.45, color: "#7a6b5c" }}>
            Leaves with them: {prep.kit.slice(0, 3).join(" · ")}{prep.kit.length > 3 ? " …" : ""}
          </p>
        )}
      </div>

      <div className="fw-block fw-print-card" style={{ borderColor: `${color}44`, background: `linear-gradient(135deg, ${color}18 0%, rgba(255,252,248,0.4) 70%)` }}>
        <div className="fw-block-title" style={{ color }}>QR · this workshop alone</div>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start", flexWrap: "wrap" }}>
          <WorkshopQr url={deepUrl} color={color} size={132} />
          <div style={{ flex: 1, minWidth: 160 }}>
            <p style={{ margin: "0 0 8px", fontSize: 12.5, lineHeight: 1.45, color: "#5c5148", wordBreak: "break-all", fontFamily: FW_MONO }}>{deepUrl}</p>
            <button type="button" className="fw-tap fw-cta" onClick={copyUrl} style={{ ...ctaBtn(color, "#fffaf3"), width: "100%", marginBottom: 8, fontSize: 13 }}>
              {copied ? "Copied ✓" : "Copy QR target URL"}
            </button>
            <button type="button" className="fw-tap fw-cta" onClick={onPrint} style={{ ...ctaBtn("#fff", color, `1.5px solid ${color}`), width: "100%", fontSize: 13 }}>
              🖨 Print outdoor cards + QR sheet
            </button>
          </div>
        </div>
      </div>

      <label className="fw-prep-check" style={{ borderColor: practiced ? color : `${color}33`, background: practiced ? `${color}1c` : "rgba(255,255,255,0.32)" }}>
        <input type="checkbox" checked={practiced} onChange={(e) => setPracticedPersist(e.target.checked)} />
        <span>
          <strong style={{ color }}>Practice at home first</strong>
          <span style={{ display: "block", fontSize: 13, lineHeight: 1.45, color: "#5c5148", marginTop: 2 }}>Solo redo the Take-Home path before teaching {n} people for {w.duration}.</span>
        </span>
      </label>

      {prep.sticky && (
        <div className="fw-block" style={{ borderColor: `${color}44`, background: `linear-gradient(135deg, ${color}1c 0%, rgba(255,250,243,0.4) 60%)`, marginBottom: 0 }}>
          <div className="fw-block-title" style={{ color }}>📌 Sticky takeaway</div>
          <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5, color: "#3a3128" }}>{prep.sticky}</p>
        </div>
      )}
    </div>
  );
}


function BlockCard({ color, title, icon, items, numbered }) {
  if (!items?.length) return null;
  return (
    <div className="fw-block" style={{ borderColor: `${color}33` }}>
      <div className="fw-block-title" style={{ color }}>{icon ? `${icon} ` : ""}{title}</div>
      <ul>
        {items.map((item, i) => (
          <li key={`${title}-${i}`}>
            {numbered ? (
              <span className="fw-n" style={{ background: color }}>{i + 1}</span>
            ) : (
              <span aria-hidden="true" style={{ color, fontWeight: 700, marginTop: 1 }}>·</span>
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}


function ExampleCards({ color, pointExamples, pack, slot }) {
  /* slot: "point" | "activity" | "takehome" */
  const cards = [];
  if (slot === "point" && pointExamples?.examples?.length) {
    cards.push({ icon: "🔎", title: "Examples", items: pointExamples.examples });
  }
  if (slot === "point" && pointExamples?.gaps?.length) {
    cards.push({ icon: "📝", title: "Confirm locally", items: pointExamples.gaps });
  }
  if ((slot === "activity" || slot === "takehome") && pack) {
    if (slot === "activity" && pack.blueprint) {
      const bp = pack.blueprint;
      cards.push({
        icon: "📐",
        title: "Blueprint · " + bp.title,
        items: [
          ...(bp.dimensions || []).map((d) => "Size: " + d),
          ...(bp.cutList || []).map((d) => "Materials: " + d),
          ...(bp.layers || []).map((d) => "Layer: " + d),
          ...(bp.assembly || []),
        ],
        pre: bp.diagram || "",
      });
    }
    if (slot === "activity" && pack.handsOn?.examples?.length) {
      cards.push({ icon: "🔎", title: "Examples", items: pack.handsOn.examples });
    }
    if (slot === "activity" && pack.handsOn?.tryThis?.length) {
      cards.push({ icon: "✋", title: "Try this", items: pack.handsOn.tryThis });
    }
    if (slot === "takehome" && pack.takeHome?.tryThis?.length) {
      cards.push({ icon: "✋", title: "Try this · same specs as class", items: pack.takeHome.tryThis });
    }
    if (slot === "takehome" && pack.blueprint?.dimensions?.length) {
      cards.push({
        icon: "📐",
        title: "Blueprint specs (match the room)",
        items: pack.blueprint.dimensions,
      });
    }
  }
  if (!cards.length) return null;
  return (
    <>
      {cards.map((c) => (
        <div key={c.title} className="fw-block" style={{ borderColor: `${color}33`, background: "rgba(255,252,248,0.38)" }}>
          <div className="fw-block-title" style={{ color }}>{c.icon} {c.title}</div>
          {c.pre ? (
            <pre className="fw-blueprint" style={{ margin: "0 0 10px", padding: "10px 12px", background: "rgba(36,28,22,0.04)", borderRadius: 10, fontSize: 11.5, lineHeight: 1.35, overflowX: "auto", color: "#3a3128", fontFamily: FW_MONO, whiteSpace: "pre" }}>{c.pre}</pre>
          ) : null}
          <ul>
            {c.items.map((item, i) => (
              <li key={`${c.title}-${i}`}>
                <span aria-hidden="true" style={{ color, fontWeight: 700, marginTop: 1 }}>·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

function SectionRichBody({ w, section, footer }) {
  const color = w.color || "#4a7c3f";
  const { leadItems, blocks } = parseSectionContent(section?.content || "");
  const byKey = Object.fromEntries(blocks.map((b) => [b.key, b]));
  const hideLeadChecks = section.id === "takehome" || section.id === "activity";
  const paras = leadItems.filter((x) => x.kind === "p" && !/^Redo path:/i.test(x.text));
  const bullets = leadItems.filter((x) => x.kind === "item" && !(hideLeadChecks && /^✓/.test(x.raw || "")));
  const leaveItems = section.id === "takehome"
    ? (section.content || "").split("\n").filter((l) => /^\s*✓/.test(l)).map(cleanItem)
    : [];

  return (
    <div>
      {paras.map((p, i) => (
        <p key={`p-${i}`} style={{ margin: "0 0 10px", fontSize: "15.5px", lineHeight: 1.65, color: "#3a3128" }}>{p.text}</p>
      ))}
      {bullets.length > 0 && section.id !== "takehome" && (
        <div className="fw-block" style={{ borderColor: `${color}22` }}>
          <ul>
            {bullets.map((b, i) => (
              <li key={`b-${i}`}>
                <span aria-hidden="true" style={{ color, fontWeight: 700, marginTop: 1 }}>·</span>
                <span>{b.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {section.id === "takehome" && (
        <>
          <div className="fw-block fw-print-card" style={{ background: `${color}12`, borderColor: `${color}44` }}>
            <div className="fw-block-title" style={{ color }}>🖨 Print this card · take-home outdoor redo</div>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: "#3a3128" }}>Print the take-home pamphlet before people leave — kit list + numbered redo steps for the yard or kitchen table.</p>
          </div>
          <BlockCard color={color} icon="🎁" title="Leaves with you" items={leaveItems} />
          <BlockCard color={color} icon="📦" title="What you need" items={byKey.need?.items || []} />
          <BlockCard color={color} icon="✅" title="Done looks like" items={byKey.done?.items || []} />
          <ExampleCards color={color} pack={workshopExamplePack(w.number)} slot="takehome" />
          <BlockCard color={color} icon="🏠" title="At-home redo — numbered steps" items={byKey.redo?.items || []} numbered />
        </>
      )}

      {section.id === "activity" && (
        <>
          <div className="fw-block fw-print-card" style={{ background: `${color}12`, borderColor: `${color}44` }}>
            <div className="fw-block-title" style={{ color }}>🖨 Print this card · outdoor / hands-on path</div>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: "#3a3128" }}>When this block leaves the room (yard, shop, kitchen), use Print outdoor / take-home cards so the steps travel on paper — not only on the phone.</p>
          </div>
          {byKey.redopath?.items?.length ? (
            <div className="fw-block" style={{ background: `${color}12`, borderColor: `${color}33` }}>
              <div className="fw-block-title" style={{ color }}>Redo path</div>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5, color: "#3a3128" }}>{byKey.redopath.items.join(" ")}</p>
            </div>
          ) : null}
          <ExampleCards color={color} pack={workshopExamplePack(w.number)} slot="activity" />
          <BlockCard color={color} icon="🧰" title="Materials needed (session)" items={byKey.materials?.items || []} />
          <BlockCard color={color} icon="🎁" title="Take-home kit" items={byKey.kit?.items || []} />
          <BlockCard color={color} icon="💵" title="Rough cost (confirm locally)" items={byKey.cost?.items || []} />
          <BlockCard color={color} icon="🏠" title="At-home redo guide" items={byKey.redo?.items || []} numbered />
        </>
      )}

      {section.id === "discussion" && (
        <BlockCard color={color} icon="📌" title="Takeaway to write down" items={byKey.takeaway?.items || []} />
      )}

      {section.id !== "takehome" && section.id !== "activity" && section.id !== "discussion" && (
        <>
          {blocks.map((b) => (
            <BlockCard
              key={b.key}
              color={color}
              title={b.title}
              items={b.items}
              numbered={b.key === "redo"}
            />
          ))}
        </>
      )}

      {section.id === "discussion" && blocks.filter((b) => b.key !== "takeaway").map((b) => (
        <BlockCard key={b.key} color={color} title={b.title} items={b.items} />
      ))}

      {footer}
    </div>
  );
}

function AtHomePathCard({ w, onJump }) {
  const take = (w.sections || []).find((s) => s.id === "takehome");
  const { blocks } = parseSectionContent(take?.content || "");
  const byKey = Object.fromEntries(blocks.map((b) => [b.key, b]));
  const steps = byKey.redo?.items || [];
  const done = byKey.done?.items?.[0];
  const need = (byKey.need?.items || []).slice(0, 3);
  return (
    <div className="fw-home-path fw-glass" style={{ background: `linear-gradient(135deg, ${w.color}24 0%, rgba(255,250,243,0.4) 55%)`, border: `1px solid ${w.color}33` }}>
      <div className="fw-label" style={{ fontSize: 11, letterSpacing: "0.14em", color: w.color, fontWeight: 700, marginBottom: 6 }}>At-home path</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: "#241c16", marginBottom: 6 }}>Redo this workshop at home</div>
      {done && <p style={{ margin: "0 0 8px", fontSize: 13.5, lineHeight: 1.5, color: "#5c5148" }}><strong style={{ color: w.color }}>Done looks like:</strong> {done}</p>}
      {need.length > 0 && (
        <p style={{ margin: "0 0 8px", fontSize: 12.5, lineHeight: 1.45, color: "#7a6b5c" }}>
          Need: {need.join(" · ")}{byKey.need?.items?.length > 3 ? " …" : ""}
        </p>
      )}
      {steps[0] && (
        <p style={{ margin: "0 0 12px", fontSize: 13, lineHeight: 1.45, color: "#3a3128" }}>
          <span style={{ fontFamily: FW_SANS, color: w.color, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>1.</span> {steps[0]}
        </p>
      )}
      <button
        type="button"
        className="fw-tap fw-cta"
        onClick={onJump}
        style={{ ...ctaBtn(w.color, "#fffaf3"), width: "100%", fontSize: 13 }}
      >
        Open Take-Home · full numbered steps →
      </button>
    </div>
  );
}


function SectionPlaceholder({ w, section }) {
  const src = section?.image;
  if (!src) return null;
  const caption = `WS${w.number} · ${section.label}`;
  return (
    <figure className="fw-figure">
      <img
        src={src}
        alt={caption}
        style={{ background: w.dark || "#243619" }}
      />
    </figure>
  );
}

/* ── Print sheet content builder ───────────────────────────── */
function buildPrintSections(w) {
  const sections = [];
  const sticky = stickyTakeaway(w);
  if (sticky) {
    sections.push({
      heading: "Sticky takeaway · write this down",
      items: [sticky],
      pamphlet: true,
    });
  }
  sections.push({
    heading: "Key Learning Checklist",
    items: (w.keypoints || []).map((k) => `${k.label} — ${k.detail}`),
  });
  const take = (w.sections || []).find((s) => s.id === "takehome");
  const activity = (w.sections || []).find((s) => s.id === "activity");
  if (activity?.content) {
    const { leadItems, blocks } = parseSectionContent(activity.content);
    const byKey = Object.fromEntries(blocks.map((b) => [b.key, b]));
    const pamphletItems = [
      ...leadItems.filter((x) => x.kind === "item").map((x) => x.text).slice(0, 6),
      ...(byKey.materials?.items || []).slice(0, 8).map((t) => `Materials: ${t}`),
      ...(byKey.redo?.items || []).slice(0, 5).map((t, i) => `${i + 1}. ${t}`),
    ];
    sections.push({
      heading: "Print this card · Hands-On / outdoor path",
      items: pamphletItems.length ? pamphletItems : activity.content.split("\n").map((l) => l.replace(/^[•✓\-]\s*/, "").trim()).filter(Boolean),
      pamphlet: true,
    });
  }
  if (take?.content) {
    const { blocks } = parseSectionContent(take.content);
    const byKey = Object.fromEntries(blocks.map((b) => [b.key, b]));
    const kitItems = [
      ...(byKey.kit?.items || byKey.need?.items || []).slice(0, 8),
      ...(byKey.done?.items || []).map((t) => `Done: ${t}`),
      ...(byKey.redo?.items || []).slice(0, 5).map((t, i) => `${i + 1}. ${t}`),
    ];
    sections.push({
      heading: "Print this card · Take-Home / outdoor redo",
      items: kitItems.length ? kitItems : take.content.split("\n").map((l) => l.replace(/^[•✓\-]\s*/, "").trim()).filter(Boolean),
      pamphlet: true,
    });
  }
  const enrich = SLIDE_ENRICH[w.number] || [];
  if (enrich.length) {
    sections.push({
      heading: "Deck Talking Points (facilitator)",
      items: enrich.flatMap((slide) => [
        `▸ ${slide.title}`,
        ...slide.bullets.map((b) => `   · ${b}`),
      ]),
    });
  }
  return sections;
}

function PrintSheetView({ w, onClose, onPrint }) {
  const sections = buildPrintSections(w);
  return (
    <div style={{ minHeight: "100vh", background: "transparent" }}>
      <div className="fw-app-chrome fw-no-print" style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(251,247,240,0.92)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(70,48,32,0.08)", borderTop: `3px solid ${w.color}`, padding: "calc(10px + env(safe-area-inset-top, 0px)) 14px 10px", display: "flex", gap: 8, alignItems: "center" }}>
        <button type="button" className="fw-tap fw-cta" onClick={onClose} style={{ ...ctaBtn("#fff", w.color, `1.5px solid ${w.color}`), flex: 1 }}>← Back</button>
        <button type="button" className="fw-tap fw-cta" onClick={onPrint} style={{ ...ctaBtn(w.color, "#fff"), flex: 1 }}>🖨 Print pamphlet</button>
      </div>
      <div className="fw-print-sheet" style={{ padding: "22px 18px 40px", background: "#fffaf3", margin: "14px", borderRadius: 18, border: "1px solid rgba(70,48,32,0.08)", boxShadow: "0 12px 32px rgba(40,24,16,0.05)" }}>
        <div className="fw-label" style={{ fontSize: 11, letterSpacing: "0.12em", color: "#888", marginBottom: 6 }}>The Fibonacci Works™ · Outdoor / take-home pamphlet</div>
        <h1 className="fw-display" style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em" }}>{w.emoji} {w.title}</h1>
        <div className="fw-caption" style={{ marginBottom: 10, color: "#666" }}>Workshop {w.number} · {w.duration} · {w.stream}</div>
        <p className="fw-caption" style={{ lineHeight: 1.55, color: "#7a6b5c", margin: "0 0 16px" }}>Print this for the yard, shop, or kitchen table — not only the indoor screen.</p>
        <div className="fw-print-card" style={{ border: `1.5px solid ${w.color}55`, borderRadius: 12, padding: "12px 14px", background: "#fff", marginBottom: 16, display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
          <WorkshopQr url={workshopDeepUrl(w.number)} color={w.color} size={120} />
          <div style={{ flex: 1, minWidth: 160 }}>
            <div className="fw-label" style={{ fontSize: 10.5, letterSpacing: "0.12em", color: w.color, fontWeight: 700, marginBottom: 4 }}>Table QR · this workshop</div>
            <div className="fw-mono" style={{ fontSize: 12, lineHeight: 1.4, color: "#333", wordBreak: "break-all" }}>{workshopDeepUrl(w.number)}</div>
            <p style={{ margin: "8px 0 0", fontSize: 12, lineHeight: 1.4, color: "#7a6b5c" }}>Participants scan to open Workshop {w.number} alone. Facilitator stays on hub + slides.</p>
          </div>
        </div>
        {w.about && <p style={{ fontSize: 13, lineHeight: 1.6, color: "#444", borderLeft: `3px solid ${w.color}`, paddingLeft: 12, margin: "0 0 18px" }}>{w.about}</p>}
        {sections.map((sec) => (
          <div key={sec.heading} className={sec.pamphlet ? "fw-print-card" : undefined} style={{ marginBottom: 18, ...(sec.pamphlet ? { border: `1.5px solid ${w.color}55`, borderRadius: 12, padding: "12px 14px", background: "#fff" } : {}) }}>
            <h2 className="fw-label" style={{ fontSize: 12, letterSpacing: "0.12em", color: w.color, margin: "0 0 10px" }}>{sec.heading}</h2>
            <ul style={{ margin: 0, padding: "0 0 0 4px", listStyle: "none" }}>
              {sec.items.map((item, i) => (
                <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "6px 0", borderBottom: "1px solid #f0efe9", fontSize: 13, lineHeight: 1.45, color: "#333" }}>
                  {item.startsWith("▸") || item.startsWith("   ·") ? (
                    <span style={{ whiteSpace: "pre-wrap" }}>{item}</span>
                  ) : (
                    <>
                      <span style={{ width: 16, height: 16, border: "1.5px solid #999", borderRadius: 3, flexShrink: 0, marginTop: 2 }} />
                      <span>{item}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div style={{ marginTop: 24, fontSize: 11, color: "#999", textAlign: "center" }}>© 2026 Isaiah Chandler · The Fibonacci Works™</div>
      </div>
    </div>
  );
}

/* ── Teach menu (accordion / dropdown) ─────────────────────── */
function TeachMenu({ w, open, onClose, step, onJump, onPrint, onExit, aboutOpen, setAboutOpen, kpOpen, setKpOpen, flowOpen, setFlowOpen }) {
  if (!open) return null;
  const deck = DECKS[w.number];
  const openHref = deck?.pdf || deck?.canvaUrl;
  return (
    <div className="fw-menu-panel fw-no-print" role="menu">
      <div className="fw-label" style={{ padding: "12px 16px", borderBottom: "1px solid rgba(70,48,32,0.08)", fontSize: 11, letterSpacing: "0.14em", color: "#9a8b78" }}>Teach menu</div>

      <button type="button" className="fw-tap" onClick={() => setAboutOpen(!aboutOpen)} style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "14px 16px", borderBottom: "1px solid #f2f2ee", display: "flex", justifyContent: "space-between", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
        <span>About</span><span>{aboutOpen ? "▴" : "▾"}</span>
      </button>
      {aboutOpen && <div style={{ padding: "0 16px 14px", fontSize: 13, lineHeight: 1.6, color: "#555" }}>{w.about}</div>}

      <button type="button" className="fw-tap" onClick={() => setKpOpen(!kpOpen)} style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "14px 16px", borderBottom: "1px solid #f2f2ee", display: "flex", justifyContent: "space-between", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
        <span>Keypoints</span><span>{kpOpen ? "▴" : "▾"}</span>
      </button>
      {kpOpen && (
        <ul style={{ margin: "0 0 10px", padding: "0 16px 12px 32px", fontSize: 13, color: "#555", lineHeight: 1.5 }}>
          {(w.keypoints || []).map((k) => <li key={k.label} style={{ marginBottom: 6 }}><strong>{k.label}</strong> — {k.detail}</li>)}
        </ul>
      )}

      <button type="button" className="fw-tap" onClick={() => setFlowOpen(!flowOpen)} style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "14px 16px", borderBottom: "1px solid #f2f2ee", display: "flex", justifyContent: "space-between", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
        <span>Flow sections</span><span>{flowOpen ? "▴" : "▾"}</span>
      </button>
      {flowOpen && (
        <div style={{ padding: "0 8px 10px" }}>
          {(w.sections || []).map((s, i) => (
            <button
              key={s.id}
              type="button"
              className="fw-tap"
              onClick={() => { onJump(i); onClose(); }}
              style={{
                width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 10,
                padding: "12px 12px", border: "none", borderRadius: 8, cursor: "pointer",
                background: i === step ? `${w.color}18` : "transparent",
                color: i === step ? w.color : "#1a1a1a", fontWeight: i === step ? 700 : 500, fontSize: 14,
              }}
            >
              <span>{s.icon}</span>
              <span style={{ flex: 1 }}>{s.label}</span>
              <span className="fw-caption" style={{ fontVariantNumeric: "tabular-nums" }}>{i + 1}/{w.sections.length}</span>
            </button>
          ))}
        </div>
      )}

      <button type="button" className="fw-tap" onClick={() => { onPrint(); onClose(); }} style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "14px 16px", borderBottom: "1px solid #f2f2ee", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
        🖨 Print outdoor / take-home cards
      </button>

      {openHref && (
        <a className="fw-link" href={openHref} target="_blank" rel="noopener noreferrer" onClick={onClose} style={{ display: "block", padding: "14px 16px", borderBottom: "1px solid #f2f2ee", textDecoration: "none", color: "#1a1a1a", fontSize: 14, fontWeight: 600 }}>
          📄 Open deck
        </a>
      )}

      <button type="button" className="fw-tap" onClick={() => { onExit(); onClose(); }} style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "14px 16px", cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#a33" }}>
        ✕ Exit teach
      </button>
    </div>
  );
}

/* ── LIVE TEACH MODE ───────────────────────────────────────── */
function TeachMode({ w, onExit, onPrint }) {
  const sections = w.sections || [];
  const [step, setStep] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [kpOpen, setKpOpen] = useState(false);
  const [flowOpen, setFlowOpen] = useState(true);
  const total = sections.length || 1;
  const s = sections[step] || { label: "Session", icon: "📋", content: w.about || "" };

  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "auto" });
  }, [step]);

  const goPrev = () => setStep((i) => Math.max(0, i - 1));
  const goNext = () => setStep((i) => Math.min(total - 1, i + 1));
  const atEnd = step >= total - 1;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "transparent", ["--fw-accent"]: w.accent || w.color, ["--fw-color"]: w.color, ["--fw-tint"]: (w.accent || w.color) + "14" }}>
      {/* Top chrome */}
      <div className="fw-app-chrome fw-no-print" style={{ position: "sticky", top: 0, zIndex: 30, background: `linear-gradient(165deg, #221830 0%, ${w.dark} 46%, ${w.color} 100%)`, padding: "calc(14px + env(safe-area-inset-top, 0px)) 16px 16px", color: "#fffaf3" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 10 }}>
          <div className="fw-label" style={{ fontSize: 11, letterSpacing: "0.14em", opacity: 0.9 }}>Run this workshop · WS {w.number}</div>
          <div style={{ position: "relative" }}>
            <button
              type="button"
              className="fw-tap fw-cta"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              style={{ ...ctaBtn("rgba(255,255,255,0.18)", "#fff", "1px solid rgba(255,255,255,0.35)"), padding: "8px 14px", fontSize: 13 }}
            >
              Menu {menuOpen ? "▴" : "▾"}
            </button>
            <div style={{ position: "absolute", right: 0, top: "100%", width: "min(92vw, 360px)", marginTop: 0 }}>
              <TeachMenu
                w={w}
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
                step={step}
                onJump={setStep}
                onPrint={onPrint}
                onExit={onExit}
                aboutOpen={aboutOpen}
                setAboutOpen={setAboutOpen}
                kpOpen={kpOpen}
                setKpOpen={setKpOpen}
                flowOpen={flowOpen}
                setFlowOpen={setFlowOpen}
              />
            </div>
          </div>
        </div>
        <div style={{ fontSize: 13, opacity: 0.9, marginBottom: 4 }}>{w.emoji} {w.title}</div>
        <div style={{ display: "flex", gap: 4, marginTop: 10 }}>
          {sections.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 5, borderRadius: 99, background: i <= step ? "rgba(255,250,243,0.95)" : "rgba(255,250,243,0.22)", boxShadow: i === step ? "0 0 10px rgba(255,244,220,0.65)" : "none" }} />
          ))}
        </div>
      </div>

      {menuOpen && (
        <div className="fw-no-print" onClick={() => setMenuOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 25, background: "rgba(0,0,0,0.2)" }} />
      )}

      {/* Step body */}
      <div style={{ flex: 1, padding: "18px 14px 12px" }}>
        <div key={step} className="fw-rise fw-glass" style={{ background: `linear-gradient(180deg, ${w.color}22 0%, rgba(255,250,243,0.42) 42%)`, borderRadius: 22, border: `1px solid rgba(255,255,255,0.5)`, padding: "22px 16px 20px", minHeight: 280 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <span style={{ fontSize: 32 }}>{s.icon}</span>
            <div>
              <div className="fw-label" style={{ fontSize: 11, letterSpacing: "0.14em", color: "#a89884" }}>Step {step + 1} of {total}</div>
              <h2 className="fw-display fw-type-glass" style={{ margin: "2px 0 0", fontSize: 23, fontWeight: 500, color: w.color, letterSpacing: "-0.02em" }}>{s.label}</h2>
            </div>
          </div>
          {step === 0 && stickyTakeaway(w) && (
            <div className="fw-block" style={{ borderColor: `${w.color}44`, background: `${w.color}12`, marginBottom: 12 }}>
              <div className="fw-block-title" style={{ color: w.color }}>📌 Sticky takeaway · by the end</div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: "#3a3128" }}>{stickyTakeaway(w)}</p>
            </div>
          )}
          <SectionPlaceholder w={w} section={s} />
          <SectionRichBody w={w} section={s} />
        </div>

        {/* Quick jump chips */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "14px 0 4px", WebkitOverflowScrolling: "touch" }}>
          {sections.map((sec, i) => (
            <button
              key={sec.id}
              type="button"
              className="fw-tap"
              onClick={() => setStep(i)}
              style={{
                flexShrink: 0, minHeight: 40, padding: "8px 14px", borderRadius: 999, border: `1.5px solid ${i === step ? w.color : "rgba(70,48,32,0.12)"}`,
                background: i === step ? w.color : "#fffaf3", color: i === step ? "#fffaf3" : "#5c5148", fontSize: 12, fontWeight: 600, cursor: "pointer",
                fontFamily: FW_SANS,
              }}
            >
              {sec.icon} {sec.label.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Sticky teach bar */}
      <div className="fw-teach-bar fw-no-print" style={{ borderTop: `2px solid ${w.color}` }}>
        <button type="button" className="fw-tap fw-cta" disabled={step === 0} onClick={goPrev} style={{ ...ctaBtn(step === 0 ? "#eee" : "#fff", step === 0 ? "#bbb" : w.color, `1.5px solid ${step === 0 ? "#ddd" : w.color}`), flex: "0 0 auto", minWidth: 72, opacity: step === 0 ? 0.6 : 1 }}>
          Prev
        </button>
        <div style={{ flex: 1, textAlign: "center", fontFamily: FW_SANS, fontSize: 13.5, color: "#5c5148", fontWeight: 600, letterSpacing: "-0.012em" }}>
          {step + 1}/{total}
        </div>
        <button
          type="button"
          className="fw-tap fw-cta"
          onClick={atEnd ? onExit : goNext}
          style={{ ...ctaBtn(w.color, "#fff"), flex: "1 1 auto", minWidth: 110 }}
        >
          {atEnd ? "Done ✓" : step === 0 ? "Continue →" : "Next →"}
        </button>
      </div>
    </div>
  );
}

/* ── HUB / HOME ───────────────────────────────────────────── */
function Hub({ onOpen }) {
  const connected = WORKSHOPS.filter(isComplete).length;
  const progress = loadProgress();
  const continueTarget = resolveContinueTarget(progress);
  const continueWorkshop = WORKSHOPS.find((w) => w.number === continueTarget);
  const completedCount = progress.completed.length;
  const allDone = completedCount >= 14;

  return (
    <AppShell>
      <div style={{ background: "linear-gradient(168deg, #221830 0%, #2a2840 22%, #3c4a34 70%, #6a6248 100%)", padding: "calc(36px + env(safe-area-inset-top, 0px)) 20px 32px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: -50, right: -30, width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,236,206,0.5), rgba(196,160,106,0) 68%)" }} />
        <div aria-hidden="true" style={{ position: "absolute", bottom: -50, left: -30, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(122,182,72,0.28), transparent 70%)" }} />
        <div style={{ position: "relative" }}>
          <div className="fw-label fw-type-hero" style={{ fontSize: "11px", letterSpacing: "0.18em", color: "rgba(255,255,255,0.62)", marginBottom: "8px" }}>
            The Fibonacci Works™
          </div>
          <h1 className="fw-display fw-type-hero" style={{ fontSize: "clamp(30px, 8.2vw, 38px)", color: "#fffaf3", margin: "0 0 12px", fontWeight: 600, letterSpacing: "-0.024em", lineHeight: 1.1 }}>
            Everyday Teach Hub
          </h1>
          <p style={{ fontSize: "15.5px", lineHeight: 1.58, letterSpacing: "-0.01em", color: "rgba(255,250,243,0.82)", margin: "0 0 18px", fontWeight: 400 }}>
            Facilitator runbook + student path · 14 workshops · 4 streams · run slides again without re-researching · print outdoor cards when hands leave the room.
          </p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
            <span className="fw-pill fw-label" style={{ borderRadius: "20px", padding: "7px 13px", fontSize: "10.5px", color: "#fff", letterSpacing: "0.12em" }}>14 Workshops</span>
            <span className="fw-pill fw-label" style={{ borderRadius: "20px", padding: "7px 13px", fontSize: "10.5px", color: "#fff", letterSpacing: "0.12em" }}>4 Streams</span>
            <span className="fw-pill fw-label" style={{ borderRadius: "20px", padding: "7px 13px", fontSize: "10.5px", color: "#fff", letterSpacing: "0.12em" }}>{connected} guides</span>
            {completedCount > 0 && (
              <span className="fw-label" style={{ background: "rgba(122,182,72,0.25)", border: "1px solid rgba(122,182,72,0.45)", borderRadius: "20px", padding: "7px 13px", fontSize: "10.5px", color: "#c8e6a0", letterSpacing: "0.12em" }}>{completedCount}/14 opened</span>
            )}
          </div>

          <div
            className="fw-cta fw-tap"
            role="button"
            tabIndex={0}
            onClick={() => onOpen(continueTarget)}
            onKeyDown={keyActivate(() => onOpen(continueTarget))}
            style={{
              ...ctaBtn("linear-gradient(180deg, #8fbf62, #5f9140)", "#fffaf3"),
              width: "100%",
              padding: "16px 16px",
              fontSize: "14px",
              borderRadius: 18,
              boxShadow: "0 14px 32px rgba(20,16,8,0.28)",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "4px",
            }}
          >
            <span className="fw-label" style={{ fontSize: "10px", letterSpacing: "0.16em", opacity: 0.92, fontWeight: 600 }}>
              {allDone ? "SERIES COMPLETE · REOPEN" : progress.lastOpened ? "CONTINUE" : "START HERE"}
            </span>
            <span style={{ fontSize: "15.5px", fontWeight: 650, letterSpacing: "-0.016em" }}>
              {allDone
                ? `WS ${continueTarget} — ${continueWorkshop?.title || ""}`
                : `Continue · WS ${continueTarget} — ${continueWorkshop?.title || ""} →`}
            </span>
          </div>
        </div>
      </div>

      <div style={{ padding: "4px 12px 20px" }}>
        {STREAMS.map((stream) => {
          const items = WORKSHOPS.filter((w) => w.stream === stream.name);
          return (
            <div key={stream.name} style={{ marginTop: "22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px", padding: "0 4px" }}>
                <div style={{ width: "5px", alignSelf: "stretch", minHeight: "32px", borderRadius: "99px", background: `linear-gradient(180deg, ${stream.accent}, ${stream.color})`, boxShadow: `0 0 12px ${stream.color}55` }} />
                <div style={{ flex: 1 }}>
                  <div className="fw-label" style={{ fontSize: "10px", letterSpacing: "0.14em", color: "#a89884", marginBottom: "3px" }}>{stream.range}</div>
                  <h2 className="fw-display fw-type-glass" style={{ margin: 0, fontSize: "18px", fontWeight: 500, letterSpacing: "-0.02em", color: "#241c16" }}>{stream.name}</h2>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {items.map((w) => {
                  const done = isComplete(w);
                  const opened = progress.completed.includes(w.number);
                  const meta = streamMeta(w.stream);
                  const bar = w.color || meta.color;
                  return (
                    <div
                      key={w.number}
                      className="fw-card fw-row"
                      role="button"
                      tabIndex={0}
                      onClick={() => onOpen(w.number)}
                      onKeyDown={keyActivate(() => onOpen(w.number))}
                      style={{
                        background: `linear-gradient(115deg, ${bar}2a 0%, rgba(255,250,243,0.4) 48%)`,
                        border: `1px solid rgba(255,255,255,0.55)`,
                        borderRadius: "18px",
                        padding: "12px 12px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        minHeight: 64,
                      }}
                    >
                      <span className="fw-label" style={{ fontSize: "11px", letterSpacing: "0.08em", color: bar, fontWeight: 700, width: 26, fontVariantNumeric: "tabular-nums" }}>{w.number}</span>
                      <span style={{ width: 42, height: 42, borderRadius: 14, display: "grid", placeItems: "center", background: `${bar}1c`, fontSize: "22px", lineHeight: 1, flexShrink: 0 }}>{w.emoji}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "15.5px", fontWeight: 600, lineHeight: 1.28, letterSpacing: "-0.016em", color: "#241c16" }}>
                          {w.title || `Workshop ${w.number}`}
                        </div>
                        <div className="fw-caption" style={{ marginTop: 3, letterSpacing: "0.01em" }}>
                          {w.duration || ""}{opened ? " · ✓ opened" : ""}
                        </div>
                      </div>
                      <span style={{ fontSize: "18px", color: bar, fontWeight: 600 }}>›</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <Footer />
    </AppShell>
  );
}


function KeyPointSheet({ w, kp, covered, onClose, onToggleCovered }) {
  const answer = learningPointAnswer(w.number, kp.label, w.sections);
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="fw-sheet-scrim fw-no-print" onClick={onClose} role="presentation">
      <div
        className="fw-sheet fw-rise"
        role="dialog"
        aria-modal="true"
        aria-labelledby="fw-kp-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="fw-sheet-handle" aria-hidden="true" />
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div className="fw-label" style={{ fontSize: 11, letterSpacing: "0.14em", color: w.color }}>
            Key learning · answer
          </div>
          <button
            type="button"
            className="fw-tap"
            aria-label="Close"
            onClick={onClose}
            style={{ ...ctaBtn("#fff", "#5c5148", "1px solid rgba(70,48,32,0.12)"), width: 44, height: 44, padding: 0, borderRadius: 14, fontSize: 18 }}
          >
            ×
          </button>
        </div>
        <h2 id="fw-kp-title" className="fw-display fw-type-glass" style={{ margin: "8px 0 8px", fontSize: 27, fontWeight: 500, letterSpacing: "-0.022em", lineHeight: 1.18 }}>{kp.label}</h2>
        <p style={{ margin: "0 0 14px", fontSize: 14.5, lineHeight: 1.55, letterSpacing: "-0.01em", color: "#7a6b5c" }}>{kp.detail}</p>
        {answer.lines.length ? (
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
            {answer.lines.map((line) => (
              <li key={line} className="fw-answer-line">
                <span aria-hidden="true" style={{ color: w.color, fontWeight: 700, marginTop: 1 }}>·</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.58, letterSpacing: "-0.011em", color: "#6d5e50" }}>
            A longer answer is not in the deck talking points or the hands-on notes for this point.
          </p>
        )}
        {answer.source && (
          <div className="fw-caption" style={{ marginTop: 12, letterSpacing: "0.04em" }}>{answer.source}</div>
        )}
        <div style={{ marginTop: 14 }}>
          <ExampleCards color={w.color} pointExamples={examplesForPoint(w.number, kp.label)} slot="point" />
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <button type="button" className="fw-tap fw-cta" onClick={onToggleCovered} style={{ ...ctaBtn("#fff", w.color, `1.5px solid ${w.color}`), flex: 1 }}>
            {covered ? "Covered ✓" : "Mark covered"}
          </button>
          <button type="button" className="fw-tap fw-cta" onClick={onClose} style={{ ...ctaBtn(w.color, "#fffaf3"), flex: 1 }}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── DETAIL: full guide ───────────────────────────────────── */
function FullGuide({ w, onOpen, next, onHome, onTeach, onPrint }) {
  const [activeSection, setActiveSection] = useState(null);
  const [checked, setChecked] = useState({});
  const [openPoint, setOpenPoint] = useState(null);
  const sectionRefs = useState(() => ({}))[0];
  const toggle = (id) => setChecked((p) => ({ ...p, [id]: !p[id] }));
  const allChecked = w.keypoints.every((k) => checked[k.label]);
  const openSection = (id) => {
    setActiveSection((cur) => {
      const nextId = cur === id ? null : id;
      if (nextId) {
        requestAnimationFrame(() => {
          const el = sectionRefs[nextId];
          if (el?.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
      }
      return nextId;
    });
  };

  const renderContinue = (extraTop = "14px") => next ? (
    <div
      className="fw-cta fw-tap"
      role="button"
      tabIndex={0}
      onClick={() => onOpen(next.number)}
      onKeyDown={keyActivate(() => onOpen(next.number))}
      style={{
        ...ctaBtn(w.color, "#fff"),
        width: "100%",
        marginTop: extraTop,
        padding: "14px 16px",
        justifyContent: "space-between",
      }}
    >
      <span style={{ textAlign: "left" }}>
        <span className="fw-label" style={{ display: "block", fontSize: "10px", letterSpacing: "0.16em", opacity: 0.9, marginBottom: "4px", fontWeight: 600 }}>CONTINUE</span>
        Continue to Workshop {next.number} — {next.title || `Workshop ${next.number}`} →
      </span>
    </div>
  ) : (
    <div style={{ marginTop: extraTop, display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ ...ctaBtn("#e8e8e0", "#666", "1px solid #d8d8d0"), width: "100%", cursor: "default", fontWeight: 500 }}>
        Series complete — you've reached Workshop 14
      </div>
      <div
        className="fw-cta fw-tap"
        role="button"
        tabIndex={0}
        onClick={onHome}
        onKeyDown={keyActivate(onHome)}
        style={{ ...ctaBtn(w.color, "#fff"), width: "100%" }}
      >
        ← All workshops
      </div>
    </div>
  );

  return (
    <>
      <div className="fw-rise" style={{ background: `linear-gradient(${140 + Number(w.number) * 4}deg, #221830 0%, ${w.dark} 48%, ${w.color} 100%)`, padding: "calc(26px + env(safe-area-inset-top, 0px)) 18px 26px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: -60, right: -40, width: 220, height: 220, borderRadius: "50%", background: `radial-gradient(circle, ${w.accent}88, transparent 68%)`, opacity: 0.55 }} />
        <div aria-hidden="true" style={{ position: "absolute", bottom: -40, left: -20, width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,182,255,0.28), transparent 70%)" }} />
        <div style={{ position: "relative" }}>
          <div className="fw-label fw-type-hero" style={{ fontSize: "11px", letterSpacing: "0.16em", color: "rgba(255,255,255,0.65)", marginBottom: "8px" }}>The Fibonacci Works™ · Workshop {w.number}</div>
          <div className="fw-label" style={{ fontSize: "11px", letterSpacing: "0.14em", color: w.accent, marginBottom: "12px" }}>{w.stream}</div>
          <div style={{ fontSize: "40px", marginBottom: "8px" }}>{w.emoji}</div>
          <h1 className="fw-display fw-type-hero" style={{ fontSize: "clamp(28px, 7.2vw, 36px)", color: "#fffaf3", margin: "0 0 14px", fontWeight: 600, letterSpacing: "-0.024em", lineHeight: 1.12 }}>{w.title}</h1>
          <div className="fw-pill fw-label" style={{ display: "inline-block", borderRadius: "20px", padding: "7px 14px", fontSize: "11px", color: "#fff", letterSpacing: "0.1em" }}>⏱ {w.duration}</div>
          <img className="fw-hero-still" src={`placeholders/ws${w.number}-welcome.svg`} alt={`WS${w.number} · ${w.title}`} />
        </div>
      </div>

      {/* Primary actions: Run workshop + Print outdoor cards */}
      <div style={{ padding: "16px 14px 0", display: "flex", flexDirection: "column", gap: 10 }}>
        <button type="button" className="fw-cta fw-tap" onClick={onTeach} style={{ ...ctaBtn(w.color, "#fff"), width: "100%", fontSize: 15, padding: "16px", flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
          <span className="fw-label" style={{ fontSize: 10, letterSpacing: "0.16em", opacity: 0.92, fontWeight: 600 }}>FACILITATOR RUNBOOK</span>
          <span>▶ Run this workshop</span>
        </button>
        <div style={{ display: "flex", gap: 8 }}>
          <button type="button" className="fw-cta fw-tap" onClick={onPrint} style={{ ...ctaBtn("#fff", w.color, `1.5px solid ${w.color}`), flex: 1 }}>
            🖨 Print outdoor / take-home cards
          </button>
        </div>
        <DeckActions number={w.number} color={w.color} />
      </div>

      <div style={{ padding: "14px 14px 0" }}>
        <FacilitatorPrepCard w={w} onPrint={onPrint} />
      </div>

      {stickyTakeaway(w) && (
        <div style={{ padding: "14px 16px 0" }}>
          <div className="fw-block" style={{ borderColor: `${w.color}44`, background: `linear-gradient(135deg, ${w.color}1c 0%, rgba(255,250,243,0.4) 60%)` }}>
            <div className="fw-block-title" style={{ color: w.color }}>📌 Sticky takeaway · write this down</div>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, letterSpacing: "-0.011em", color: "#3a3128" }}>{stickyTakeaway(w)}</p>
          </div>
        </div>
      )}

      <div style={{ padding: "20px 16px 0" }}>
        <p style={{ fontSize: "15.5px", lineHeight: 1.62, letterSpacing: "-0.012em", color: "#3d342c", margin: 0, borderLeft: `3px solid ${w.color}`, paddingLeft: "14px" }}>{w.about}</p>
        <p className="fw-caption" style={{ margin: "12px 0 0", letterSpacing: "0.02em", lineHeight: 1.5 }}>Flow: Welcome → Knowledge → Hands-On → Discussion → Take-Home → Next · {w.duration}</p>
      </div>

      <div style={{ padding: "16px 16px 0" }}>
        <AtHomePathCard w={w} onJump={() => openSection("takehome")} />
      </div>

      <div style={{ padding: "20px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
          <h2 className="fw-label" style={{ fontSize: "11px", letterSpacing: "0.14em", color: "#8a7b68", margin: 0 }}>Key Learning Points</h2>
          {allChecked && <span className="fw-label" style={{ fontSize: "10.5px", color: w.color, letterSpacing: "0.12em" }}>ALL COVERED ✓</span>}
        </div>
        <p className="fw-caption" style={{ margin: "0 0 12px" }}>Tap a point for the answer</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {w.keypoints.map((kp) => (
            <div
              key={kp.label}
              style={{ background: checked[kp.label] ? `${w.color}1c` : "rgba(255,250,243,0.45)", border: `1px solid ${checked[kp.label] ? w.color : "rgba(255,255,255,0.55)"}`, borderRadius: "16px", padding: "10px 12px 10px 10px", display: "flex", alignItems: "flex-start", gap: "10px", minHeight: 52, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6), 0 6px 16px rgba(48,32,24,0.04)" }}
            >
              <button
                type="button"
                className="fw-tap"
                aria-label={checked[kp.label] ? `Unmark ${kp.label}` : `Mark ${kp.label} covered`}
                aria-pressed={!!checked[kp.label]}
                onClick={() => toggle(kp.label)}
                style={{ width: 44, height: 44, borderRadius: "50%", border: `2px solid ${checked[kp.label] ? w.color : "#ccc"}`, background: checked[kp.label] ? w.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, padding: 0, cursor: "pointer" }}
              >
                {checked[kp.label] && <span style={{ color: "#fff", fontSize: "13px" }}>✓</span>}
              </button>
              <button
                type="button"
                className="fw-tap"
                onClick={() => setOpenPoint(kp.label)}
                style={{ flex: 1, minWidth: 0, textAlign: "left", background: "none", border: "none", padding: "4px 0", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, color: "inherit" }}
              >
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: "block", fontSize: "14px", fontWeight: 600, color: checked[kp.label] ? w.color : "#1a1a1a", marginBottom: "2px" }}>{kp.label}</span>
                  <span style={{ display: "block", fontSize: "12px", color: "#888", lineHeight: 1.4 }}>{kp.detail}</span>
                </span>
                <span style={{ flexShrink: 0, fontSize: "11px", letterSpacing: "0.4px", color: w.color, fontFamily: FW_SANS, fontWeight: 700 }}>Answer ›</span>
              </button>
            </div>
          ))}
        </div>
        {openPoint && (
          <KeyPointSheet
            w={w}
            kp={w.keypoints.find((k) => k.label === openPoint)}
            covered={!!checked[openPoint]}
            onClose={() => setOpenPoint(null)}
            onToggleCovered={() => toggle(openPoint)}
          />
        )}
      </div>

      <div style={{ padding: "0 16px 20px" }}>
        <h2 className="fw-label" style={{ fontSize: "11px", letterSpacing: "0.14em", color: "#8a7b68", marginBottom: "12px" }}>Workshop Flow</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {w.sections.map((s) => (
            <div
              key={s.id}
              ref={(el) => { if (el) sectionRefs[s.id] = el; }}
            >
              <div
                className="fw-tap"
                role="button"
                aria-expanded={activeSection === s.id}
                tabIndex={0}
                onClick={() => openSection(s.id)}
                onKeyDown={keyActivate(() => openSection(s.id))}
                style={{ background: activeSection === s.id ? w.color : "rgba(255,250,243,0.45)", border: `1px solid ${activeSection === s.id ? w.color : "rgba(255,255,255,0.55)"}`, borderRadius: activeSection === s.id ? "16px 16px 0 0" : "16px", padding: "14px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", minHeight: 52, backdropFilter: activeSection === s.id ? "none" : "blur(12px)", WebkitBackdropFilter: activeSection === s.id ? "none" : "blur(12px)", boxShadow: activeSection === s.id ? "none" : "inset 0 1px 0 rgba(255,255,255,0.6), 0 6px 16px rgba(48,32,24,0.04)", transition: "background .22s ease, border-color .22s ease, border-radius .22s ease" }}
              >
                <span style={{ fontSize: "20px" }}>{s.icon}</span>
                <span style={{ flex: 1, fontSize: "14px", fontWeight: 600, color: activeSection === s.id ? "#fff" : "#1a1a1a" }}>{s.label}</span>
                {s.id === "takehome" && activeSection !== s.id && (
                  <span className="fw-label" style={{ fontSize: 10, letterSpacing: "0.12em", color: w.color, fontWeight: 700 }}>AT HOME</span>
                )}
                <span style={{ fontSize: "18px", color: activeSection === s.id ? "#fff" : "#ccc", transform: activeSection === s.id ? "rotate(180deg)" : "none", transition: "transform .22s ease" }}>▾</span>
              </div>
              {activeSection === s.id && (
                <div className="fw-sec-panel" style={{ background: `linear-gradient(180deg, ${w.color}22, rgba(255,250,243,0.45) 45%)`, border: `1px solid ${w.color}`, borderTop: "none", borderRadius: "0 0 16px 16px", padding: "16px", color: "#3a3128", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}>
                  <SectionPlaceholder w={w} section={s} />
                  <SectionRichBody
                    w={w}
                    section={s}
                    footer={s.id === "next" ? renderContinue("14px") : null}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: "18px", paddingTop: "16px", borderTop: "1px solid #e8e8e8" }}>
          <div className="fw-label" style={{ fontSize: "11px", letterSpacing: "0.14em", color: "#a89884", marginBottom: "10px" }}>What's Next</div>
          {renderContinue("0")}
        </div>
      </div>
    </>
  );
}

function StubGuide({ w, onOpen, next, onHome }) {
  const meta = streamMeta(w.stream);
  return (
    <>
      <div style={{ background: `linear-gradient(165deg, #221830 0%, ${w.dark || meta.dark} 50%, ${w.color || meta.color} 100%)`, padding: "28px 18px 26px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "relative" }}>
          <div className="fw-label fw-type-hero" style={{ fontSize: "11px", letterSpacing: "0.16em", color: "rgba(255,255,255,0.65)", marginBottom: "8px" }}>The Fibonacci Works™ · Workshop {w.number}</div>
          <div className="fw-label" style={{ fontSize: "11px", letterSpacing: "0.14em", color: w.accent || meta.accent, marginBottom: "12px" }}>{w.stream}</div>
          <div style={{ fontSize: "40px", marginBottom: "8px" }}>{w.emoji}</div>
          <h1 className="fw-display fw-type-hero" style={{ fontSize: "clamp(24px, 6.2vw, 32px)", color: "#fffaf3", margin: 0, fontWeight: 600, letterSpacing: "-0.022em", lineHeight: 1.14 }}>{w.title || `Workshop ${w.number}`}</h1>
        </div>
      </div>
      <div style={{ padding: "16px 14px 0" }}>
        <DeckActions number={w.number} color={w.color || meta.color} />
      </div>
      <div style={{ padding: "16px 14px 24px" }}>
        <div style={{ background: "#fff", border: "1px dashed #d8d8d0", borderRadius: "10px", padding: "24px 18px", textAlign: "center" }}>
          <div style={{ fontSize: "30px", marginBottom: "10px" }}>{w.emoji || "📘"}</div>
          <h2 className="fw-display" style={{ margin: "0 0 8px", fontSize: "18px", fontWeight: 600, letterSpacing: "-0.018em", color: "#1a1a1a" }}>Guide details coming soon</h2>
          <p style={{ fontSize: "13.5px", lineHeight: 1.62, letterSpacing: "-0.01em", color: "#666", margin: "0 auto 14px" }}>
            Workshop {w.number} · <strong style={{ fontWeight: 600 }}>{w.stream}</strong> — open the deck above to teach from slides.
          </p>
        </div>
        {next ? (
          <div className="fw-cta fw-tap" role="button" tabIndex={0} onClick={() => onOpen(next.number)} onKeyDown={keyActivate(() => onOpen(next.number))} style={{ ...ctaBtn(w.color || meta.color, "#fff"), width: "100%", marginTop: "14px" }}>
            Continue to Workshop {next.number} →
          </div>
        ) : (
          <div className="fw-cta fw-tap" role="button" tabIndex={0} onClick={onHome} onKeyDown={keyActivate(onHome)} style={{ ...ctaBtn(w.color || meta.color, "#fff"), width: "100%", marginTop: "14px" }}>
            ← All workshops
          </div>
        )}
      </div>
    </>
  );
}

/* ── DETAIL SHELL ─────────────────────────────────────────── */
function Detail({ number, onHome, onOpen }) {
  const i = WORKSHOPS.findIndex((w) => w.number === number);
  const w = WORKSHOPS[i];
  const prev = WORKSHOPS[i - 1];
  const next = WORKSHOPS[i + 1];
  const meta = streamMeta(w.stream);
  const accent = w.color || meta.color;
  const [view, setView] = useState("guide"); // guide | teach | print
  const [navMenu, setNavMenu] = useState(false);
  const deck = DECKS[w.number];
  const openHref = deck?.pdf || deck?.canvaUrl;

  if (view === "teach" && isComplete(w)) {
    return (
      <AppShell tone={{ ["--fw-color"]: w.color, ["--fw-accent"]: w.accent || w.color }}>
        <TeachMode w={w} onExit={() => setView("guide")} onPrint={() => setView("print")} />
      </AppShell>
    );
  }

  if (view === "print" && isComplete(w)) {
    return (
      <AppShell tone={{ ["--fw-color"]: w.color, ["--fw-accent"]: w.accent || w.color }}>
        <PrintSheetView
          w={w}
          onClose={() => setView("guide")}
          onPrint={() => { if (typeof window !== "undefined") window.print(); }}
        />
      </AppShell>
    );
  }

  return (
    <AppShell tone={{ ["--fw-color"]: accent, ["--fw-accent"]: w.accent || accent }}>
      <div className="fw-app-chrome" style={{ position: "sticky", top: 0, zIndex: 10, background: "rgba(255,252,248,0.55)", backdropFilter: "blur(22px) saturate(1.35)", WebkitBackdropFilter: "blur(22px) saturate(1.35)", borderBottom: "1px solid rgba(255,255,255,0.45)", borderTop: `3px solid ${accent}`, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)", paddingTop: "env(safe-area-inset-top, 0px)" }}>
        <div style={{ padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
          <span
            className="fw-link fw-tap"
            role="button"
            tabIndex={0}
            onClick={onHome}
            onKeyDown={keyActivate(onHome)}
            style={{ fontSize: "13.5px", color: meta.color, fontWeight: 600, letterSpacing: "-0.01em", cursor: "pointer", fontFamily: FW_SANS, minHeight: 44, display: "inline-flex", alignItems: "center" }}
          >
            ← All
          </span>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "flex-end", position: "relative" }}>
            {isComplete(w) && (
              <>
                <button type="button" className="fw-tap fw-cta" onClick={() => setView("teach")} style={{ ...ctaBtn(accent, "#fff"), padding: "8px 12px", fontSize: 12 }}>Teach</button>
                <button type="button" className="fw-tap fw-cta" onClick={() => setView("print")} style={{ ...ctaBtn("#fff", accent, `1.5px solid ${accent}`), padding: "8px 12px", fontSize: 12 }}>Print</button>
              </>
            )}
            <button type="button" className="fw-tap fw-cta" aria-expanded={navMenu} onClick={() => setNavMenu((o) => !o)} style={{ ...ctaBtn("#fff", "#555", "1.5px solid #ccc"), padding: "8px 12px", fontSize: 12 }}>
              Menu ▾
            </button>
            {navMenu && (
              <div className="fw-menu-panel" style={{ left: "auto", right: 0, width: 220, top: "100%" }}>
                <button type="button" className="fw-tap" onClick={() => { setNavMenu(false); setView("guide"); }} style={{ width: "100%", textAlign: "left", border: "none", background: "none", padding: "14px 16px", borderBottom: "1px solid #f2f2ee", cursor: "pointer", fontWeight: 600 }}>Guide</button>
                {isComplete(w) && (
                  <>
                    <button type="button" className="fw-tap" onClick={() => { setNavMenu(false); setView("teach"); }} style={{ width: "100%", textAlign: "left", border: "none", background: "none", padding: "14px 16px", borderBottom: "1px solid #f2f2ee", cursor: "pointer", fontWeight: 600 }}>Run this workshop</button>
                    <button type="button" className="fw-tap" onClick={() => { setNavMenu(false); setView("print"); }} style={{ width: "100%", textAlign: "left", border: "none", background: "none", padding: "14px 16px", borderBottom: "1px solid #f2f2ee", cursor: "pointer", fontWeight: 600 }}>Print outdoor / take-home cards</button>
                  </>
                )}
                {openHref && (
                  <a className="fw-link" href={openHref} target="_blank" rel="noopener noreferrer" onClick={() => setNavMenu(false)} style={{ display: "block", padding: "14px 16px", borderBottom: "1px solid #f2f2ee", textDecoration: "none", color: "#1a1a1a", fontWeight: 600 }}>Open deck</a>
                )}
                {prev && (
                  <button type="button" className="fw-tap" onClick={() => { setNavMenu(false); onOpen(prev.number); }} style={{ width: "100%", textAlign: "left", border: "none", background: "none", padding: "14px 16px", borderBottom: "1px solid #f2f2ee", cursor: "pointer" }}>← Previous · {prev.number}</button>
                )}
                {next ? (
                  <button type="button" className="fw-tap" onClick={() => { setNavMenu(false); onOpen(next.number); }} style={{ width: "100%", textAlign: "left", border: "none", background: "none", padding: "14px 16px", cursor: "pointer" }}>Next · {next.number} →</button>
                ) : (
                  <button type="button" className="fw-tap" onClick={() => { setNavMenu(false); onHome(); }} style={{ width: "100%", textAlign: "left", border: "none", background: "none", padding: "14px 16px", cursor: "pointer" }}>Series complete</button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {navMenu && <div onClick={() => setNavMenu(false)} style={{ position: "fixed", inset: 0, zIndex: 5 }} />}

      {isComplete(w) ? (
        <FullGuide key={w.number} w={w} onOpen={onOpen} next={next} onHome={onHome} onTeach={() => setView("teach")} onPrint={() => setView("print")} />
      ) : (
        <StubGuide key={w.number} w={w} onOpen={onOpen} next={next} onHome={onHome} />
      )}

      <div style={{ padding: "8px 12px 12px", display: "flex", gap: "8px" }}>
        {prev ? (
          <div className="fw-card fw-link fw-tap fw-glass" role="button" tabIndex={0} onClick={() => onOpen(prev.number)} onKeyDown={keyActivate(() => onOpen(prev.number))} style={{ flex: 1, background: "rgba(255,250,243,0.45)", borderRadius: "16px", padding: "14px", cursor: "pointer" }}>
            <div className="fw-label" style={{ fontSize: "10px", letterSpacing: "0.12em", color: "#aaa", marginBottom: "4px" }}>← Prev · {prev.number}</div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#1a1a1a", lineHeight: 1.3 }}>{prev.title || `Workshop ${prev.number}`}</div>
          </div>
        ) : <div style={{ flex: 1 }} />}
        {next ? (
          <div className="fw-card fw-link fw-tap fw-glass" role="button" tabIndex={0} onClick={() => onOpen(next.number)} onKeyDown={keyActivate(() => onOpen(next.number))} style={{ flex: 1, background: "rgba(255,250,243,0.45)", border: `1.5px solid ${accent}`, borderRadius: "16px", padding: "14px", cursor: "pointer", textAlign: "right" }}>
            <div className="fw-label" style={{ fontSize: "10px", letterSpacing: "0.12em", color: accent, marginBottom: "4px" }}>{next.number} · Next →</div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#1a1a1a", lineHeight: 1.3 }}>{next.title || `Workshop ${next.number}`}</div>
          </div>
        ) : (
          <div className="fw-card fw-link fw-tap fw-glass" role="button" tabIndex={0} onClick={onHome} onKeyDown={keyActivate(onHome)} style={{ flex: 1, background: "rgba(255,250,243,0.45)", borderRadius: "16px", padding: "14px", cursor: "pointer", textAlign: "right" }}>
            <div className="fw-label" style={{ fontSize: "10px", letterSpacing: "0.12em", color: "#aaa", marginBottom: "4px" }}>Series complete</div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#1a1a1a", lineHeight: 1.3 }}>← All workshops</div>
          </div>
        )}
      </div>

      <div style={{ padding: "0 12px 24px" }}>
        {next ? (
          <div className="fw-cta fw-tap" role="button" tabIndex={0} onClick={() => onOpen(next.number)} onKeyDown={keyActivate(() => onOpen(next.number))} style={{ ...ctaBtn(accent, "#fff"), width: "100%", padding: "14px 16px", fontSize: "14px" }}>
            Continue to Workshop {next.number} — {next.title || `Workshop ${next.number}`} →
          </div>
        ) : (
          <div className="fw-cta fw-tap" role="button" tabIndex={0} onClick={onHome} onKeyDown={keyActivate(onHome)} style={{ ...ctaBtn(accent, "#fff"), width: "100%", padding: "14px 16px", fontSize: "14px" }}>
            Series complete — ← All workshops
          </div>
        )}
      </div>

      <Footer />
    </AppShell>
  );
}

/* ── ROOT ─────────────────────────────────────────────────── */
export default function FibonacciWorksHub() {
  const [selected, setSelected] = useState(() => readDeepLinkWs());
  const [, setProgressTick] = useState(0);

  const open = useCallback((number) => {
    const n = normalizeWs(number) || number;
    markOpened(n);
    setProgressTick((t) => t + 1);
    setSelected(n);
    syncDeepLink(n);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  const home = useCallback(() => {
    setProgressTick((t) => t + 1);
    setSelected(null);
    syncDeepLink(null);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const apply = () => {
      const n = readDeepLinkWs();
      setSelected((cur) => (n === cur ? cur : n));
      if (n) markOpened(n);
    };
    apply();
    window.addEventListener("popstate", apply);
    window.addEventListener("hashchange", apply);
    return () => {
      window.removeEventListener("popstate", apply);
      window.removeEventListener("hashchange", apply);
    };
  }, []);

  useEffect(() => {
    // Keep URL aligned when state changes from Hub/Detail navigation
    syncDeepLink(selected);
  }, [selected]);

  return (
    <>
      <style>{STYLE}</style>
      {selected ? <Detail number={selected} onHome={home} onOpen={open} /> : <Hub onOpen={open} />}
    </>
  );
}
