export type Lang = "bn" | "en";

export const FLAG_REASONS = [
  "grab_attempt",
  "overlapping_claim",
  "fake_deed",
  "mutation_without_owner",
  "occupancy_mismatch",
  "tax_dispute",
] as const;

export const copy = {
  appName: { bn: "খজনা ওয়াচ", en: "Khajna Watch" },
  tagline: {
    bn: "জমি কেনার আগে, দলিল যাচাই করুন",
    en: "Check the deed before you buy the land",
  },
  nav: {
    search: { bn: "খোঁজ", en: "Search" },
    watch: { bn: "নজর তালিকা", en: "Watchlist" },
    reports: { bn: "প্রতিবেদন", en: "Reports" },
    guide: { bn: "গাইড", en: "Guide" },
    notification: { bn: "নোটিফিকেশন", en: "Notifications" },
  },
  langToggle: { bn: "EN", en: "বাং" },
  heroLead: {
    bn: "খতিয়ান, দাগ, নামজারি ও খজনার অবস্থা এক খাতায়। দালালের কথায় নয় — রেকর্ডে যা আছে, তাই দেখুন।",
    en: "Khatian, dag, mutation and khajna on one sheet. Trust the record, not the dalal.",
  },
  searchLabel: { bn: "খোঁজ", en: "Lookup" },
  searchPlaceholder: {
    bn: "মৌজা, খতিয়ান বা দাগ নম্বর",
    en: "Mouza, khatian or dag number",
  },
  districtAll: { bn: "সব জেলা", en: "All districts" },
  searchCta: { bn: "যাচাই করুন", en: "Scan record" },
  chipsLabel: { bn: "নমুনা খোঁজ", en: "Try a sample" },
  riskAll: { bn: "সব", en: "All" },
  riskGreen: { bn: "নিরাপদ", en: "Clear" },
  riskAmber: { bn: "সতর্ক", en: "Watch" },
  riskRed: { bn: "ঝুঁকিপূর্ণ", en: "High risk" },
  snapshotPlots: { bn: "নমুনা দাগ", en: "Sample dags" },
  snapshotRed: { bn: "লাল সতর্কতা", en: "Red alerts" },
  snapshotOverdue: { bn: "খজনা বকেয়া", en: "Khajna overdue" },
  snapshotFlags: { bn: "প্রতিবেশী পতাকা", en: "Neighbour flags" },
  highRiskTitle: { bn: "উচ্চ ঝুঁকির দাগ", en: "High-risk dags" },
  highRiskSub: {
    bn: "দ্বৈত দলিল, নামজারি আপত্তি, দখল অমিল — এখনই খোলা খাতা।",
    en: "Double deeds, objected mutations, possession fights — open files.",
  },
  resultsTitle: { bn: "খোঁজের ফল", en: "Lookup results" },
  noResults: {
    bn: "এই খোঁজে কোনো দাগ মেলেনি। মৌজা বা খতিয়ান নম্বর বদলে দেখুন।",
    en: "No dag matched. Try a mouza name or khatian number.",
  },
  howTitle: { bn: "কীভাবে কাজ করে", en: "How it works" },
  how1t: { bn: "১. দাগ খুঁজুন", en: "1. Find the dag" },
  how1d: {
    bn: "জেলা, মৌজা, খতিয়ান বা দাগ নম্বর দিন। আরএস/বিএস জেএলসহ মিলিয়ে দেখুন।",
    en: "Enter district, mouza, khatian or dag. Match JL numbers across surveys.",
  },
  how2t: { bn: "২. রেডার পড়ুন", en: "2. Read the radar" },
  how2d: {
    bn: "মালিকানা ধারা, খজনা, নামজারি ও দখল মিলিয়ে লাল-হলুদ-সবুজ স্কোর।",
    en: "Ownership chain, khajna, mutation and possession fold into a risk score.",
  },
  how3t: {
    bn: "৩. অফিসে যান প্রস্তুত হয়ে",
    en: "3. Walk into the office ready",
  },
  how3d: {
    bn: "এসি ল্যান্ডে কী কাগজ লাগবে, কোন আপত্তি খোলা — প্রিন্ট করে নিয়ে যান।",
    en: "Print what to carry to AC Land and which objections are already open.",
  },
  disclaimer: {
    bn: "এটি সরকারি ভূমি সার্ভার নয়। নমুনা রেজিস্ট্রি দিয়ে যাচাইয়ের ধরন দেখানো হয়েছে। কেনার আগে এসি ল্যান্ড ও সাব-রেজিস্ট্রি অফিসে মূল খতিয়ান মিলিয়ে নিন।",
    en: "This is not a government land server. Sample registry data shows the workflow. Verify the original khatian at AC Land and the sub-registry before you buy.",
  },
  khatian: { bn: "খতিয়ান", en: "Khatian" },
  dag: { bn: "দাগ", en: "Dag" },
  jl: { bn: "জেএল", en: "JL" },
  mouza: { bn: "মৌজা", en: "Mouza" },
  area: { bn: "পরিমাণ", en: "Area" },
  survey: { bn: "জরিপ", en: "Survey" },
  owner: { bn: "রেকর্ডকৃত মালিক", en: "Recorded owner" },
  flags: { bn: "পতাকা", en: "Flags" },
  openDossier: { bn: "খাতা খুলুন", en: "Open dossier" },
  watchAdd: { bn: "নজরে রাখুন", en: "Watch this dag" },
  watchToast: {
    bn: "প্লটটি আপনার নজরে যোগ করা হয়েছে",
    en: "Plot successfully added to the watchlist",
  },
  watchToastRemove: {
    bn: "প্লটটি আপনার নজর থেকে সরানো হয়েছে",
    en: "Plot successfully removed from the watchlist",
  },
  watchRemove: { bn: "নজর সরান", en: "Remove watch" },
  watchView: { bn: "নজরে রাখা প্লটগুলো", en: "View Watchlist" },
  watchGuide: { bn: "গাইড দেখুন", en: "View Guide" },
  notifTitle: { bn: "বিজ্ঞপ্তি", en: "Notifications" },
  notifLead: {
    bn: "আপনার নজরে রাখা প্লটগুলোর সাম্প্রতিক আপডেট।",
    en: "Recent updates on the plots you're watching.",
  },
  notifTabUnread: { bn: "অপঠিত", en: "Unread" },
  notifTabAll: { bn: "সব", en: "All" },
  newNotification : {bn : "প্লটটিতে নতুন  রিপোর্ট যোগ হয়েছে", en : "New report on a watch plot" },
  notifMarkAllRead: { bn: "সব পঠিত করুন", en: "Mark all as read" },
  notifEmptyUnread: {
    bn: "কোনো অপঠিত বিজ্ঞপ্তি নেই।",
    en: "No unread notifications.",
  },
  notifEmptyAll: {
    bn: "এখনো কোনো বিজ্ঞপ্তি নেই।",
    en: "No notifications yet.",
  },
  viewAllNotification: {
    bn: "সব বিজ্ঞপ্তি দেখুন",
    en: "View all notifications",
  },

  printPack: { bn: "অফিস প্যাক প্রিন্ট", en: "Print office pack" },
  flagCta: { bn: "সতর্কতা দিন", en: "Raise a flag" },
  flagTitle: { bn: "এই দাগে সতর্কতা", en: "Flag this dag" },
  flagHelp: {
    bn: "নাম বা ফোন লাগবে না। শুধু কারণ বেছে দিন। অপব্যবহার ঠেকাতে একই কারণ বারবার গণনা হয় না।",
    en: "No name or phone. Pick a reason. Duplicate reasons on the same dag are ignored.",
  },
  flagSubmit: { bn: "পতাকা লাগান", en: "Plant flag" },
  flagCancel: { bn: "ফিরে যান", en: "Back" },
  flagOk: {
    bn: "পতাকা গেছে। স্কোর হালনাগাদ হয়েছে।",
    en: "Flag recorded. Score updated.",
  },
  flagDup: {
    bn: "এই কারণে পতাকা আগেই আছে।",
    en: "That reason is already flagged.",
  },
  dossierKicker: { bn: "ভূমি খাতা", en: "Land dossier" },
  riskTitle: { bn: "ঝুঁকি রেডার", en: "Risk radar" },
  tabOwners: { bn: "মালিকানা", en: "Owners" },
  tabMutations: { bn: "নামজারি", en: "Mutations" },
  tabKhajna: { bn: "খজনা", en: "Khajna" },
  tabFlags: { bn: "সতর্কতা", en: "Alerts" },
  tabCheck: { bn: "কেনার চেক", en: "Buy check" },
  nearbyTitle: { bn: "একই মৌজার দাগ", en: "Same mouza" },
  noNearby: {
    bn: "এই নমুনায় পাশের দাগ নেই।",
    en: "No neighbouring dag in this sample.",
  },
  noFlags: {
    bn: "এখনো কোনো প্রতিবেশী পতাকা নেই।",
    en: "No neighbour flags yet.",
  },
  noMutations: { bn: "নামজারির খাতা খালি।", en: "No mutation events on file." },
  share: { bn: "অংশ", en: "Share" },
  since: { bn: "থেকে", en: "Since" },
  caseNo: { bn: "কেস", en: "Case" },
  office: { bn: "অফিস", en: "Office" },
  fiscal: { bn: "অর্থবছর", en: "Fiscal year" },
  amount: { bn: "পরিমাণ", en: "Amount" },
  paidOn: { bn: "জমা", en: "Paid" },
  unpaid: { bn: "বকেয়া", en: "Unpaid" },
  watchEmpty: {
    bn: "এখনো কোনো দাগ নজরে নেই। খাতা খুলে ‘নজরে রাখুন’ চাপুন — নামজারি নড়লে এই তালিকায় দেখবেন।",
    en: "No dags watched yet. Open a dossier and tap Watch — mutation movement will surface here.",
  },
  watchTitle: { bn: "আপনার নজর তালিকা", en: "Your watchlist" },
  watchLead: {
    bn: "এই ডিভাইসে সংরক্ষিত। অ্যাকাউন্ট লাগে না। লাল দাগে নামজারি নড়লে আগে চোখে পড়বে।",
    en: "Saved on this device. No account. Red dags with live mutation jump the queue.",
  },
  watchActivity: {
    bn: "চলমান নামজারি / নতুন পতাকা",
    en: "Live mutation / new flags",
  },
  guideKicker: { bn: "কেনার আগে", en: "Before you buy" },
  guideTitle: {
    bn: "এসি ল্যান্ডে যাওয়ার আগে আটটি কাজ",
    en: "Eight jobs before you walk into AC Land",
  },
  guideLead: {
    bn: "বাংলাদেশের দেওয়ানি মামলার সিংহভাগ জমি নিয়ে। বেশিরভাগ ফাঁক কাগজে, মাঠে নয়।",
    en: "Most civil cases in Bangladesh are land. Most of the holes are in the paper, not the soil.",
  },
  glossaryTitle: { bn: "শব্দার্থ", en: "Glossary" },
  notFoundTitle: { bn: "এই দাগ খাতায় নেই", en: "This dag is not on file" },
  notFoundBody: {
    bn: "নমুনা রেজিস্ট্রিতে কোডটি মেলেনি। খোঁজে ফিরে অন্য খতিয়ান দেখুন।",
    en: "That code is not in the sample registry. Go back and try another khatian.",
  },
  backHome: { bn: "খোঁজে ফিরুন", en: "Back to lookup" },
  possession: { bn: "দখল", en: "Possession" },
  court: { bn: "আদালত", en: "Court" },
  mortgage: { bn: "বন্ধক", en: "Mortgage" },
  notes: { bn: "নোট", en: "Note" },
  from: { bn: "হইতে", en: "From" },
  to: { bn: "প্রতি", en: "To" },
  reportsKicker: { bn: "সম্প্রদায়", en: "Community" },
  reportsTitle: { bn: "প্রতিবেদন ও ভোট", en: "Reports from other buyers" },
  reportsLead: {
    bn: "অন্য ক্রেতা ও প্রতিবেশীদের রিপোর্ট। ৩০% সহমত হলে ‘বিবেচনাধীন’, ৫০% পার হলে দাগে যুক্ত হয়ে ঝুঁকি বাড়ে, ৭০% পার হলে চিরস্থায়ী হয়ে যায়।",
    en: "Reports from other buyers and neighbours. 30% yes moves it to review, 50% attaches it to the dag and raises risk, 70% locks it in for good.",
  },
  reportSubmitCta: { bn: "প্রতিবেদন লিখুন", en: "Write a report" },
  reportSortTop: { bn: "সর্বাধিক সহমত", en: "Top yes-share" },
  reportSortNew: { bn: "নতুন", en: "Newest" },
  reportSearchPlaceholder: {
    bn: "দাগ কোড বা মৌজা দিয়ে খুঁজুন",
    en: "Search by dag code or mouza",
  },
  reportReasonAll: { bn: "সব ধরন", en: "All reasons" },
  reportStatusAll: { bn: "সব অবস্থা", en: "All statuses" },
  reportEmpty: {
    bn: "এই ফিল্টারে কোনো প্রতিবেদন নেই। ফিল্টার পাল্টে দেখুন বা প্রথম প্রতিবেদনটি লিখুন।",
    en: "No reports match this filter. Try another filter or be the first to write one.",
  },
  reportVoteYes: { bn: "হ্যাঁ, সত্যি", en: "Yes, true" },
  reportVoteNo: { bn: "না, ভুল", en: "No, false" },
  reportYesShare: { bn: "সহমত", en: "yes" },
  reportVotesCount: { bn: "ভোট", en: "votes" },
  reportNeedMoreVotes: {
    bn: "সিদ্ধান্তের জন্য আরও ভোট দরকার",
    en: "Needs more votes before this counts",
  },
  reportDialogTitle: { bn: "একটি দাগ নিয়ে লিখুন", en: "Report on a dag" },
  reportDialogHelp: {
    bn: "দাগ, কারণ ও বিস্তারিত লিখুন। অন্যরা ভোট দিয়ে যাচাই করবেন — যথেষ্ট সহমত হলে এটি দাগের সতর্কতায় যুক্ত হবে।",
    en: "Pick the dag, a reason, and add detail. Others will vote to validate it — enough agreement adds it to the dag's alerts.",
  },
  reportFieldPlot: { bn: "দাগ কোড", en: "Dag" },
  reportFieldReason: { bn: "কারণ", en: "Reason" },
  reportFieldAnon: { bn: "নাম গোপন রাখুন", en: "Post anonymously" },
  reportFieldName: { bn: "আপনার নাম", en: "Your name" },
  reportFieldDescription: { bn: "বিস্তারিত", en: "Details" },
  reportFieldDescriptionPh: {
    bn: "কী দেখেছেন বা শুনেছেন লিখুন — তারিখ, অফিস, সাক্ষী থাকলে যোগ করুন।",
    en: "Describe what you saw or heard — dates, offices, witnesses if any.",
  },
  reportSubmit: { bn: "প্রতিবেদন পোস্ট করুন", en: "Post report" },
  reportCancel: { bn: "বাতিল", en: "Cancel" },
  reportOk: {
    bn: "প্রতিবেদন যোগ হয়েছে। ভোট শুরু হলো।",
    en: "Report posted. Voting starts now.",
  },
  reportAnon: { bn: "নামহীন ব্যবহারকারী", en: "Anonymous user" },
  reportOn: { bn: "দাগ", en: "On" },
  reportLocked: {
    bn: "৭০% সহমত পার হয়েছে — এই প্রতিবেদন এখন স্থায়ী, আর সরানো যাবে না।",
    en: "Past 70% yes — this report is now permanent and can't be removed.",
  },
  reportRejected: {
    bn: "এই প্রতিবেদনটি বাতিল করা হয়েছে। আর ভোট নেওয়া হবে না।",
    en: "This report has been rejected and is closed to further voting.",
  },
} as const;

type Leaf = { bn: string; en: string };
type Tree = { [key: string]: Leaf | Tree };

function isLeaf(node: Leaf | Tree): node is Leaf {
  return (
    typeof node === "object" &&
    node !== null &&
    "bn" in node &&
    "en" in node &&
    typeof (node as Leaf).bn === "string" &&
    typeof (node as Leaf).en === "string"
  );
}

type Localized<T> = T extends Leaf
  ? string
  : T extends Record<string, unknown>
    ? { [K in keyof T]: Localized<T[K]> }
    : T;

export function localize<T>(node: T, lang: Lang): Localized<T> {
  if (isLeaf(node as Leaf)) {
    return (node as Leaf)[lang] as Localized<T>;
  }
  const src = node as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(src)) {
    out[key] = localize(src[key], lang);
  }
  return out as Localized<T>;
}

export const ROLE_LABEL: Record<string, Leaf> = {
  recorded: { bn: "রেকর্ডকৃত", en: "Recorded" },
  claimed: { bn: "দাবিদার", en: "Claimed" },
  deceased: { bn: "মৃত", en: "Deceased" },
  heir: { bn: "ওয়ারিশ", en: "Heir" },
};

export const MUTATION_KIND: Record<string, Leaf> = {
  sale: { bn: "ক্রয়-বিক্রয়", en: "Sale" },
  inheritance: { bn: "ওয়ারিশ", en: "Inheritance" },
  heba: { bn: "হেবা", en: "Heba (gift)" },
  correction: { bn: "সংশোধন", en: "Correction" },
};

export const MUTATION_STATUS: Record<string, Leaf> = {
  approved: { bn: "অনুমোদিত", en: "Approved" },
  pending: { bn: "চলমান", en: "Pending" },
  objected: { bn: "আপত্তিকৃত", en: "Objected" },
};

export const POSSESSION_LABEL: Record<string, Leaf> = {
  matches: { bn: "রেকর্ড ও দখল মিলে", en: "Matches record" },
  other: { bn: "দখল অন্যের", en: "Occupied by other" },
  vacant: { bn: "খালি", en: "Vacant" },
  uncertain: { bn: "অনিশ্চিত", en: "Uncertain" },
};

export const KHAJNA_LABEL: Record<string, Leaf> = {
  paid: { bn: "পরিশোধিত", en: "Paid" },
  overdue: { bn: "বকেয়া", en: "Overdue" },
  partial: { bn: "আংশিক", en: "Partial" },
  unknown: { bn: "অজানা", en: "Unknown" },
};

export const COURT_LABEL: Record<string, Leaf> = {
  none: { bn: "জানা মামলা নেই", en: "No known case" },
  rumored: { bn: "গুজব / অভিযোগ", en: "Rumour / complaint" },
  pending: { bn: "দেওয়ানি মামলা চলমান", en: "Civil suit pending" },
};

export const FLAG_LABEL: Record<string, Leaf> = {
  grab_attempt: { bn: "দখলের চেষ্টা", en: "Grab attempt" },
  overlapping_claim: { bn: "দ্বৈত মালিকানা দাবি", en: "Overlapping claim" },
  fake_deed: { bn: "জাল দলিল সন্দেহ", en: "Suspected fake deed" },
  mutation_without_owner: {
    bn: "মালিক ছাড়া নামজারি",
    en: "Mutation without owner",
  },
  occupancy_mismatch: { bn: "দখল ও রেকর্ড অমিল", en: "Occupancy mismatch" },
  tax_dispute: { bn: "খজনা বিরোধ", en: "Khajna dispute" },
};

export const REPORT_STATUSES = [
  "submitted",
  "under_consideration",
  "confirmed",
  "locked",
  "rejected",
] as const;

export const REPORT_STATUS_LABEL: Record<string, Leaf> = {
  submitted: { bn: "জমাকৃত", en: "Submitted" },
  under_consideration: { bn: "বিবেচনাধীন", en: "Under consideration" },
  confirmed: { bn: "নিশ্চিত", en: "Confirmed" },
  locked: { bn: "স্থায়ী", en: "Locked" },
  rejected: { bn: "বাতিল", en: "Rejected" },
};

export const REPORT_STATUS_HINT: Record<string, Leaf> = {
  submitted: {
    bn: "৩০% সহমত হলে বিবেচনায় যাবে ( সর্বনিম্ন ১০ ভোট )",
    en: "Needs 30% yes to move to review ( minimum 10 votes )",
  },
  under_consideration: {
    bn: "৫০% সহমত হলে দাগে যুক্ত হবে ( সর্বনিম্ন ১০ ভোট )",
    en: "Needs 50% yes to attach to the dag ( minimum 10 votes )",
  },
  confirmed: {
    bn: "দাগের ঝুঁকিতে যুক্ত হয়েছে · ৭০%-এ স্থায়ী হবে ( সর্বনিম্ন ১০ ভোট )",
    en: "Attached to the dag's risk · locks in at 70% ( minimum 10 votes )",
  },
  locked: {
    bn: "স্থায়ীভাবে দাগের সাথে যুক্ত",
    en: "Permanently attached to the dag",
  },
  rejected: {
    bn: "সম্প্রদায় এটিকে অগ্রাহ্য করেছে",
    en: "The community dismissed this",
  },
};

export const CHECK_LABEL: Record<
  string,
  { title: Leaf; warn?: Leaf; fail: Leaf }
> = {
  title_chain: {
    title: { bn: "একক মালিকানা ধারা", en: "Single title chain" },
    warn: {
      bn: "একজন ওয়ারিশ এখনো রেকর্ডে আসেননি।",
      en: "One heir is not yet on the recorded title.",
    },
    fail: {
      bn: "একাধিক দাবিদার বা দ্বৈত দলিল আছে।",
      en: "Multiple claimants or a double deed.",
    },
  },
  mutation: {
    title: { bn: "নামজারি পরিষ্কার", en: "Clean mutation" },
    warn: {
      bn: "একটি নামজারি আবেদন বিচারাধীন।",
      en: "One mutation application is still pending review.",
    },
    fail: {
      bn: "নামজারি আপত্তিকৃত বা একাধিক আবেদন বিচারাধীন।",
      en: "A mutation is objected, or multiple are pending at once.",
    },
  },
  khajna: {
    title: { bn: "খাজনা চালু", en: "Khajna current" },
    warn: {
      bn: "খাজনা আংশিক পরিশোধিত।",
      en: "Khajna is only partially paid.",
    },
    fail: {
      bn: "খাজনা বকেয়া।",
      en: "Khajna is overdue.",
    },
  },
  possession: {
    title: { bn: "দখল মিলে", en: "Possession matches" },
    fail: {
      bn: "মাঠের দখল রেকর্ডের সাথে মেলে না।",
      en: "Ground possession does not match the record.",
    },
    // No warn tier yet — this item isn't computed by the backend today;
    // see note below.
  },
  survey: {
    title: { bn: "জরিপ অমিল নেই", en: "No survey clash" },
    fail: {
      bn: "এসএ/আরএস খতিয়ান কাটাকাটি করছে।",
      en: "SA/RS khatians conflict.",
    },
    // No warn tier yet — this item isn't computed by the backend today;
    // see note below.
  },
  flags: {
    title: { bn: "কোনো নিশ্চিত পতাকা নেই", en: "No confirmed flags" },
    warn: {
      bn: "একটি অমীমাংসিত প্রতিবেদন পর্যালোচনাধীন।",
      en: "An unresolved report is currently under review.",
    },
    fail: {
      bn: "এই দাগে নিশ্চিত সতর্কতা পতাকা আছে।",
      en: "This dag carries a community-confirmed alert flag.",
    },
  },
  court: {
    title: { bn: "মামলামুক্ত", en: "No court cloud" },
    warn: {
      bn: "মামলার গুজব আছে, নিশ্চিত নয়।",
      en: "A rumor of litigation exists, unconfirmed.",
    },
    fail: {
      bn: "সক্রিয় মামলা বা গুরুতর অভিযোগ আছে।",
      en: "An active suit or serious complaint is indicated.",
    },
  },
  mortgage: {
    title: { bn: "বন্ধকমুক্ত / প্রকাশিত", en: "Unencumbered / disclosed" },
    fail: {
      bn: "বন্ধক আছে — রিলিজ লেটার ছাড়া কিনবেন না।",
      en: "Mortgaged — do not buy without a release letter.",
    },
    // No warn tier — mortgaged is a flat yes/no in the current schema,
    // with no "in the process of being released" state to represent.
  },
};
export const GUIDE_STEPS: { title: Leaf; body: Leaf }[] = [
  {
    title: {
      bn: "খতিয়ান ও দাগ মাঠে মিলান",
      en: "Match khatian and dag on the ground",
    },
    body: {
      bn: "কাগজের দাগ নম্বর আর আলের ধার এক নয়। প্রতিবেশী দুইজনকে জিজ্ঞেস করুন মালিক কে, কতকাল ধরে আছেন।",
      en: "A paper dag is not a field boundary. Ask two neighbours who occupies the plot, and since when.",
    },
  },
  {
    title: { bn: "সর্বশেষ নামজারি দেখুন", en: "Read the latest mutation" },
    body: {
      bn: "সাফ কবলা থাকলেই মালিকানা হয় না। এসি ল্যান্ডে নামজারি না হলে খতিয়ান পুরোনো মালিকের নামেই থাকে।",
      en: "A saf-kabala is not title. Until AC Land mutates, the khatian still names the old owner.",
    },
  },
  {
    title: { bn: "খজনা রসিদ তিন বছর", en: "Three years of khajna receipts" },
    body: {
      bn: "বকেয়া থাকলে নামজারি আটকে যায়, আর দালাল ‘আনঅফিসিয়াল ফি’ চায়। রসিদ নিজে তুলুন।",
      en: "Arrears freeze mutation and invite unofficial fees. Collect the receipts yourself.",
    },
  },
  {
    title: { bn: "এসএ, আরএস, বিএস কাটাকাটি", en: "SA, RS, BS overlap" },
    body: {
      bn: "একই দাগে দুই খতিয়ান মানে দ্বৈত মালিকানা। দুটো জরিপের মৌজা ম্যাপ হাতে নিয়ে তুলনা করুন।",
      en: "Two khatians on one dag means dual title. Compare both survey maps in your hand.",
    },
  },
  {
    title: { bn: "দখল রেকর্ডের সাথে", en: "Possession vs record" },
    body: {
      bn: "বাংলাদেশে ‘দলিল আছে, দখল নেই’ ক্লাসিক ফাঁদ। বিডিএস রেকর্ডে দখল ছাড়া নাম ওঠে না।",
      en: "Deed without possession is a classic trap. BDS record will not list you without occupation.",
    },
  },
  {
    title: { bn: "মামলা ও বন্ধক", en: "Suits and mortgages" },
    body: {
      bn: "সাব-রেজিস্ট্রিতে এনকumbrance, ব্যাংক লিয়েন, এবং সহকারী জজ আদালতে জমির মামলা খোঁজ করুন।",
      en: "Search encumbrance at the sub-registry, bank liens, and land suits at the Assistant Judge court.",
    },
  },
  {
    title: { bn: "ওটিপি নিজের নম্বরে", en: "OTP on your own number" },
    body: {
      bn: "ডিজিটাল নামজারিতে কম্পিউটার দোকানের নম্বর দিলে খাতা জিম্মি হয়। নিজের সিম ছাড়া আবেদন করবেন না।",
      en: "If a computer-shop number receives the mutation OTP, they hold your file. Use your own SIM.",
    },
  },
  {
    title: { bn: "দালাল ফি নয়, রসিদ", en: "Receipts, not dalal fees" },
    body: {
      bn: "নামজারি-খজনার সরকারি ফি নির্ধারিত। ‘তাড়াতাড়ি হবে’ বলে নগদ হাত বদল করবেন না।",
      en: "Mutation and khajna fees are gazette. Do not pay cash for ‘we will make it faster’.",
    },
  },
];

export const GLOSSARY: { term: Leaf; body: Leaf }[] = [
  {
    term: { bn: "খতিয়ান", en: "Khatian" },
    body: {
      bn: "মৌজার রেকর্ড অব রাইটস। কার নামে কত অংশ, কোন দাগ — এই খাতা।",
      en: "The mouza record of rights: who owns which share of which dag.",
    },
  },
  {
    term: { bn: "দাগ", en: "Dag" },
    body: {
      bn: "মৌজা ম্যাপে একটি প্লটের নম্বর। খতিয়ান ছাড়া দাগ, দাগ ছাড়া খতিয়ান — দুটোই অসম্পূর্ণ।",
      en: "The plot number on the mouza map. Khatian without dag, or dag without khatian, is incomplete.",
    },
  },
  {
    term: { bn: "নামজারি", en: "Namjari / mutation" },
    body: {
      bn: "কেনা, হেবা বা ওয়ারিশের পর খতিয়ানে নাম বদল। দলিল নিবন্ধন আর নামজারি দুই অফিস।",
      en: "Updating the khatian after sale, heba or inheritance. Registration and mutation are different offices.",
    },
  },
  {
    term: { bn: "খজনা", en: "Khajna" },
    body: {
      bn: "ভূমি উন্নয়ন কর। বকেয়া থাকলে সরকারি সেবা আটকে যায়, আর মালিকানা প্রশ্নে ওঠে।",
      en: "Land development tax. Arrears stall public services and cloud ownership.",
    },
  },
  {
    term: { bn: "জেএল নম্বর", en: "JL number" },
    body: {
      bn: "জurisdiction list — মৌজার স্থায়ী কোড। জেলায় একই নামের মৌজা থাকলে জেএল আলাদা করে।",
      en: "Jurisdiction list — the mouza’s standing code. Splits mouzas that share a name.",
    },
  },
  {
    term: { bn: "এসএ / আরএস / বিএস", en: "SA / RS / BS" },
    body: {
      bn: "স্টেট অ্যাকুইজিশন, রিভিশনাল সার্ভে, বাংলাদেশ সার্ভে — ভিন্ন যুগের খতিয়ান। কাটাকাটিই বেশিরভাগ বিরোধ।",
      en: "State Acquisition, Revisional Survey, Bangladesh Survey. Most disputes are clashes between them.",
    },
  },
];

export const SAMPLE_CHIPS: { q: string; label: Leaf }[] = [
  { q: "সাভার", label: { bn: "সাভার", en: "Savar" } },
  { q: "190", label: { bn: "দ্বৈত দলিল ১৯০", en: "Double deed 190" } },
  { q: "চর", label: { bn: "চর", en: "Char" } },
  { q: "কেরানীগঞ্জ", label: { bn: "কেরানীগঞ্জ", en: "Keraniganj" } },
  { q: "ঘের", label: { bn: "খুলনা ঘের", en: "Khulna gher" } },
];
