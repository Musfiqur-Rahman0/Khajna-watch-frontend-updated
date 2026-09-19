import type { CommunityReport } from "@/lib/types";

/**
 * Demo data mirroring the `reports` table shape. Note `description` is a
 * single field (matching the schema — no _bn/_en split), so it's shown
 * as-is regardless of the language toggle. See the app-level note about
 * this in the chat reply: real user-submitted text can't be pre-translated.
 *
 * `status`, `yesVotes`, `noVotes`, `confirmedAt`, `rejectedAt` below are
 * the *current* snapshot — i.e. what a real backend would already have
 * stored after all the historical votes shown here were cast. When you
 * vote on one of these in the UI, your vote is layered on top of these
 * base counts (see report-selectors.ts) and the status is recomputed
 * live using the same threshold logic in report-status.ts.
 */
// export const DEMO_REPORTS: CommunityReport[] = [
//   {
//     id: "rpt-01",
//     plotCode: "sav-190-014",
//     reporterName: "Nasrin Akter",
//     isAnonymous: false,
//     reason: "fake_deed",
//     description:
//       "গত বছর এই দাগ কিনতে গিয়ে দেখি দালাল একটি নতুন দলিল দেখাচ্ছেন, অথচ পুরনো মালিকের খতিয়ান তখনও সচল। এসি ল্যান্ডে গিয়ে নিশ্চিত হয়েছি দুটো আলাদা দাবিদার আছে।",
//     status: "locked",
//     yesVotes: 61,
//     noVotes: 9,
//     createdAt: "2024-03-05T10:20:00Z",
//     confirmedAt: "2024-03-09T08:00:00Z",
//     rejectedAt: null,
//   },
//   {
//     id: "rpt-02",
//     plotCode: "sav-190-014",
//     reporterName: "",
//     isAnonymous: true,
//     reason: "occupancy_mismatch",
//     description:
//       "নামজারির শুনানি শেষ হওয়ার আগেই টিনের বেড়া দিয়ে জমি আটকে ফেলা হয়েছে। প্রতিবেশী হিসেবে এটা দেখেছি নিজের চোখে।",
//     status: "under_consideration",
//     yesVotes: 9,
//     noVotes: 14,
//     createdAt: "2024-03-18T07:00:00Z",
//     confirmedAt: null,
//     rejectedAt: null,
//   },
//   {
//     id: "rpt-03",
//     plotCode: "krg-221-032",
//     reporterName: "Farida Yasmin",
//     isAnonymous: false,
//     reason: "occupancy_mismatch",
//     description:
//       "তিন বছর ধরে একজন গার্মেন্টস গুদাম পরিচালক এই জমি ব্যবহার করছেন কিন্তু কাগজে তার নাম নেই। কেনার আগে সরাসরি এসি ল্যান্ডে খতিয়ান তুলে দেখুন।",
//     status: "locked",
//     yesVotes: 30,
//     noVotes: 5,
//     createdAt: "2024-02-02T09:15:00Z",
//     confirmedAt: "2024-02-06T09:00:00Z",
//     rejectedAt: null,
//   },
//   {
//     id: "rpt-04",
//     plotCode: "krg-221-032",
//     reporterName: "Mostafa Kamal",
//     isAnonymous: false,
//     reason: "tax_dispute",
//     description:
//       "সাব-রেজিস্ট্রি অফিসে জিজ্ঞেস করেও বন্ধক রিলিজের কাগজ পাইনি। উকিল বলেছেন লেনদেনের আগে এটা আবশ্যিক যাচাই।",
//     status: "confirmed",
//     yesVotes: 12,
//     noVotes: 9,
//     createdAt: "2024-02-20T11:40:00Z",
//     confirmedAt: "2024-02-25T06:00:00Z",
//     rejectedAt: null,
//   },
//   {
//     id: "rpt-05",
//     plotCode: "khl-077-089",
//     reporterName: "Abdur Rob",
//     isAnonymous: false,
//     reason: "overlapping_claim",
//     description:
//       "যুগ্ম জেলা জজ আদালতে মামলা এখনো চলমান। স্থানীয়রা বলছেন সহজে শেষ হবে না, তাই এখনই টাকা দেওয়ার আগে দুইবার ভাবুন।",
//     status: "locked",
//     yesVotes: 40,
//     noVotes: 3,
//     createdAt: "2023-12-11T06:30:00Z",
//     confirmedAt: "2023-12-15T06:00:00Z",
//     rejectedAt: null,
//   },
//   {
//     id: "rpt-06",
//     plotCode: "khl-077-089",
//     reporterName: "",
//     isAnonymous: true,
//     reason: "tax_dispute",
//     description:
//       "খজনা নিয়ে সমস্যা আছে বলে শুনেছি, তবে নিজে নিশ্চিত হতে পারিনি। কেউ যাচাই করে জানালে ভালো হয়।",
//     status: "submitted",
//     yesVotes: 8,
//     noVotes: 20,
//     createdAt: "2024-01-08T08:05:00Z",
//     confirmedAt: null,
//     rejectedAt: null,
//   },
//   {
//     id: "rpt-07",
//     plotCode: "gzp-118-201",
//     reporterName: "Habibur Rahman",
//     isAnonymous: false,
//     reason: "mutation_without_owner",
//     description:
//       "কারখানার শেয়ার হস্তান্তরের পর নামজারি আবেদন এসি ল্যান্ডে আটকে আছে, পরিচালকদের স্বাক্ষর যাচাই চলছে।",
//     status: "locked",
//     yesVotes: 15,
//     noVotes: 4,
//     createdAt: "2024-01-30T05:50:00Z",
//     confirmedAt: "2024-02-01T05:00:00Z",
//     rejectedAt: null,
//   },
//   {
//     id: "rpt-08",
//     plotCode: "sav-190-016",
//     reporterName: "Selim Reza",
//     isAnonymous: false,
//     reason: "occupancy_mismatch",
//     description:
//       "সামান্য একটা সীমানা প্রশ্ন উঠেছিল, কিন্তু এখনো যথেষ্ট মানুষ ভোট দেননি নিশ্চিত হতে।",
//     status: "submitted",
//     yesVotes: 3,
//     noVotes: 1,
//     createdAt: "2024-04-02T09:00:00Z",
//     confirmedAt: null,
//     rejectedAt: null,
//   },
//   {
//     id: "rpt-09",
//     plotCode: "krg-221-033",
//     reporterName: "",
//     isAnonymous: true,
//     reason: "tax_dispute",
//     description:
//       "একটা অভিযোগ পেয়েছিলাম কিন্তু যাচাই করে দেখলাম ভিত্তিহীন। খজনা আসলে হালনাগাদ আছে।",
//     status: "rejected",
//     yesVotes: 1,
//     noVotes: 9,
//     createdAt: "2024-02-27T12:00:00Z",
//     confirmedAt: null,
//     rejectedAt: "2024-03-01T12:00:00Z",
//   },
//   {
//     id: "rpt-10",
//     plotCode: "cum-303-045",
//     reporterName: "",
//     isAnonymous: true,
//     reason: "overlapping_claim",
//     description:
//       "চাচাতো ভাইয়ের পরিবারের কাছ থেকে সীমানা নিয়ে অভিযোগের গুজব আছে; আদালতে এখনো কিছু দাখিল হয়নি তবে স্থানীয়রা সমর্থন করছেন অভিযোগে।",
//     status: "confirmed",
//     yesVotes: 6,
//     noVotes: 4,
//     createdAt: "2024-03-22T14:10:00Z",
//     confirmedAt: "2024-03-27T10:00:00Z",
//     rejectedAt: null,
//   },
//   {
//     id: "rpt-11",
//     plotCode: "bgr-410-112",
//     reporterName: "Fatema Begum",
//     isAnonymous: false,
//     reason: "occupancy_mismatch",
//     description:
//       "একজন প্রতিবেশী সীমানা নিয়ে প্রশ্ন তুলেছেন, তবে এখনো যাচাইয়ের জন্য যথেষ্ট ভোট পড়েনি।",
//     status: "submitted",
//     yesVotes: 0,
//     noVotes: 2,
//     createdAt: "2024-01-14T07:20:00Z",
//     confirmedAt: null,
//     rejectedAt: null,
//   },
// ];
