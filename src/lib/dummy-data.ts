import type { Service, AdminStatus } from "@/lib/types";

export const SERVICES: Service[] = [
  {
    id: "general-pest",
    name: "General pest control",
    detail:
      "A practical reset for ants, roaches, spiders, and the small signs you should not ignore.",
    type: "Residential",
    icon: "bug",
    price: "From $89",
  },
  {
    id: "bed-bug",
    name: "Bed bug treatment",
    detail:
      "Careful inspection, targeted treatment, and a clear follow-up plan for peace of mind.",
    type: "Residential",
    icon: "shield",
    price: "From $249",
  },
  {
    id: "rodent",
    name: "Rodent control",
    detail:
      "Find the entry points, remove the risk, and keep your home protected after we leave.",
    type: "Residential",
    icon: "house",
    price: "From $139",
  },
  {
    id: "mosquito",
    name: "Mosquito control",
    detail: "Seasonal protection that helps your yard feel like yours again.",
    type: "Residential",
    icon: "sparkle",
    price: "From $79",
  },
  {
    id: "deep-clean",
    name: "Deep cleaning",
    detail:
      "A detailed top-to-bottom clean for the places everyday routines miss.",
    type: "Residential",
    icon: "spray",
    price: "From $180",
  },
  {
    id: "home-clean",
    name: "Standard home cleaning",
    detail:
      "Reliable recurring or one-off cleaning for the rooms you live in most.",
    type: "Residential",
    icon: "droplets",
    price: "From $110",
  },
  {
    id: "office-clean",
    name: "Office cleaning",
    detail:
      "Professional cleaning for productive, welcoming workspaces and shared areas.",
    type: "Commercial",
    icon: "building",
    price: "From $220",
  },
  {
    id: "move-clean",
    name: "Move-in / move-out",
    detail:
      "Start fresh or hand over the keys with a space that is ready for what is next.",
    type: "Residential",
    icon: "clipboard",
    price: "From $210",
  },
];

export const SERVICE_DETAILS: Record<
  string,
  {
    audience: string;
    included: string[];
    duration: string;
    prep: string;
    next: string;
  }
> = {
  "general-pest": {
    audience:
      "Homes, apartments, and small businesses with everyday pest activity.",
    included: [
      "Interior and exterior inspection",
      "Targeted treatment for ants, roaches, and spiders",
      "Entry-point and moisture observations",
      "Written recommendations after the visit",
    ],
    duration: "60–90 min",
    prep: "Clear access to sinks, baseboards, and the areas where activity was noticed. Pets can stay in another room during treatment.",
    next: "A technician confirms the pest, explains the treatment, and sets a follow-up cadence if prevention will help.",
  },
  "bed-bug": {
    audience:
      "Households, hospitality spaces, and property teams dealing with bites, spotting, or confirmed activity.",
    included: [
      "Room-by-room inspection and evidence mapping",
      "Targeted treatment plan based on findings",
      "Mattress, frame, and perimeter review",
      "Follow-up checkpoints with clear preparation notes",
    ],
    duration: "90–150 min",
    prep: "Do not move furniture or discard mattresses before inspection. Bag loose linens and keep a clear path around beds.",
    next: "We document what we find first, then recommend the smallest responsible treatment plan and next check.",
  },
  rodent: {
    audience:
      "Homes, restaurants, offices, and facilities with signs of rodents or unwanted entry.",
    included: [
      "Entry-point and activity inspection",
      "Exterior placement and interior risk review",
      "Humane control recommendations",
      "Exclusion notes and monitoring plan",
    ],
    duration: "75–120 min",
    prep: "Keep access to crawl spaces, utility rooms, attics, and exterior walls. Note any sounds, droppings, or food damage.",
    next: "Your service pro shows you the likely route in and leaves a prioritized plan for removal and prevention.",
  },
  mosquito: {
    audience:
      "Homes, patios, event spaces, and outdoor areas that need seasonal relief.",
    included: [
      "Yard and standing-water assessment",
      "Targeted perimeter application",
      "Harborage and water-source recommendations",
      "Seasonal scheduling guidance",
    ],
    duration: "30–60 min",
    prep: "Bring in toys, food, and pet bowls. Keep people and pets away from the treated area until the technician confirms re-entry.",
    next: "We map the areas that hold mosquitoes and time service around how your yard is actually used.",
  },
  "deep-clean": {
    audience:
      "Homes, offices, and spaces that need a detailed reset beyond routine upkeep.",
    included: [
      "Kitchen and bathroom detail work",
      "High-touch surfaces and overlooked edges",
      "Dusting of reachable fixtures and trim",
      "Room-by-room completion notes",
    ],
    duration: "3–6 hours",
    prep: "Put away personal items and identify any surfaces needing special care. We bring supplies unless you request a product preference.",
    next: "A cleaning lead confirms the scope at arrival and checks the finished rooms with you before leaving.",
  },
  "home-clean": {
    audience:
      "Busy households looking for a reliable one-time or recurring home clean.",
    included: [
      "Bathrooms, kitchen, living areas, and bedrooms",
      "Floors, surfaces, and high-touch points",
      "Trash reset and visible tidy-up",
      "Optional recurring schedule after the first visit",
    ],
    duration: "2–4 hours",
    prep: "A quick pickup lets the team focus on cleaning. Share priorities, access instructions, and any pets before arrival.",
    next: "Choose a one-time reset or ask us to shape a 30-day, 60-day, or custom rhythm around your home.",
  },
  "office-clean": {
    audience: "Offices, studios, retail spaces, and shared work environments.",
    included: [
      "Workstations and shared surfaces",
      "Kitchens, restrooms, and entry areas",
      "Floor care and touchpoint disinfection",
      "Service notes for facilities or office managers",
    ],
    duration: "2–5 hours",
    prep: "Tell us about alarm access, quiet hours, sensitive equipment, and any areas that should remain off limits.",
    next: "We walk the space with your point person, then build a repeatable route that respects your operating hours.",
  },
  "move-clean": {
    audience:
      "Tenants, homeowners, landlords, and property teams between occupants.",
    included: [
      "Cabinet, appliance, and fixture cleaning",
      "Inside windows where accessible",
      "Bathroom and kitchen detail",
      "Handover-ready completion checklist",
    ],
    duration: "3–6 hours",
    prep: "The property should be empty of movers and personal items. Utilities need to be on for a complete clean.",
    next: "Share your handover date and property size; we will confirm the right crew and a realistic finish window.",
  },
};

export const JOBS = [
  {
    id: "AJ-2048",
    time: "08:30",
    client: "Northline Bakery",
    service: "General pest control",
    kind: "Pest",
    tech: "JR",
    status: "Scheduled" as AdminStatus,
    address: "Mission district",
  },
  {
    id: "AJ-2051",
    time: "10:00",
    client: "Amina Johnson",
    service: "Home protection visit",
    kind: "Pest",
    tech: "ML",
    status: "Scheduled" as AdminStatus,
    address: "Noe Valley",
  },
  {
    id: "AJ-2054",
    time: "11:30",
    client: "Harbor Studio",
    service: "Office cleaning",
    kind: "Cleaning",
    tech: "TN",
    status: "Quoted" as AdminStatus,
    address: "Dogpatch",
  },
  {
    id: "AJ-2057",
    time: "13:00",
    client: "The Carver house",
    service: "Deep cleaning",
    kind: "Cleaning",
    tech: "SK",
    status: "New" as AdminStatus,
    address: "Bernal Heights",
  },
  {
    id: "AJ-2041",
    time: "15:30",
    client: "Juniper Facilities",
    service: "Rodent control",
    kind: "Pest",
    tech: "JR",
    status: "Complete" as AdminStatus,
    address: "SoMa",
  },
];
