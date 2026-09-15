export type RiskLevel = "green" | "amber" | "red";
// Not an enforced Prisma enum — Plot.khajnaStatus is a free-text column.
// These are the only values the seed/backend actually writes today.
export type KhajnaStatus = "Paid" | "Pending" | "Partial";
export type Possession = "matches" | "other" | "vacant" | "uncertain";
export type CourtHint = "none" | "rumored" | "pending";
export type OwnerRole = "recorded" | "claimed" | "deceased" | "heir";
export type MutationStatus = "approved" | "pending" | "objected";
export type FlagReason =
  | "grab_attempt"
  | "overlapping_claim"
  | "fake_deed"
  | "mutation_without_owner"
  | "occupancy_mismatch"
  | "tax_dispute";

export type PlotSummary = {
  id: number;
  code: string;
  district: string;
  districtBn: string;
  upazila: string;
  upazilaBn: string;
  mouza: string;
  mouzaBn: string;
  jlNo: string;
  khatianNo: string;
  dagNo: string;
  areaDecimal: number;
  landClass: string;
  landClassBn: string;
  surveyType: string;
  khajnaStatus: KhajnaStatus;
  khajnaYear: string | null;
  possession: Possession;
  riskScore: number;
  riskLevel: RiskLevel;
  courtHint: CourtHint;
  mortgaged: boolean;
  flagCount: number;
  ownerLabel: string;
  ownerLabelBn: string;
};

export type PlotOwner = {
  id: number;
  nameBn: string;
  nameEn: string;
  // Decimal column, serializes as a string over JSON.
  shareAna: string;
  role: OwnerRole;
  sinceYear: number | null;
};

export type MutationEvent = {
  id: number;
  caseNo: string;
  kind: string;
  fromBn: string;
  fromEn: string;
  toBn: string;
  toEn: string;
  officeBn: string;
  officeEn: string;
  happenedOn: string;
  status: MutationStatus;
  // Nullable in the schema.
  noteBn: string | null;
  noteEn: string | null;
};

export type KhajnaReceipt = {
  id: number;
  fiscalYear: number;
  // Decimal column, serializes as a string over JSON.
  amountBdt: string;
  paidOn: string | null;
  // Matches the real ReceiptStatus Prisma enum.
  status: "paid" | "pending" | "unpaid" | "partial";
};

export type PlotWarning = {
  id: number;
  code: string;
  // Matches what the seed actually writes — no Severity enum exists in
  // the schema to enforce this, it's a free-text column.
  severity: "high" | "medium" | "low";
  titleBn: string;
  titleEn: string;
  detailBn: string;
  detailEn: string;
};

export type PlotFlag = {
  id: number;
  reportId: number;
  reason: FlagReason;
  createdAt: string;
};

export type ChecklistItem = {
  id: string;
  pass: boolean;
  warn: boolean;
};

export type PlotDossier = PlotSummary & {
  notesBn: string;
  notesEn: string;
  owners: PlotOwner[];
  mutations: MutationEvent[];
  receipts: KhajnaReceipt[];
  warnings: PlotWarning[];
  flags: PlotFlag[];
  nearby: PlotSummary[];
  checklist: ChecklistItem[];
};

export type DistrictOption = {
  id: string;
  labelEn: string;
  labelBn: string;
};

export type Snapshot = {
  plots: number;
  red: number;
  overdue: number;
  flags: number;
};

export type HomeData = {
  plots: PlotSummary[];
  highRisk: PlotSummary[];
  districts: DistrictOption[];
  snapshot: Snapshot;
  queried: boolean;
};

// Matches the real ReportStatus Prisma enum exactly — "locked" removed,
// "withdrawn" added.
export type ReportStatus =
  | "submitted"
  | "under_consideration"
  | "confirmed"
  | "rejected"
  | "withdrawn";
export type VoteType = "yes" | "no";

export type CommunityReport = {
  id: string;
  plotCode: string;
  reporterName: string;
  isAnonymous: boolean;
  reason: FlagReason;
  description: string;
  status: ReportStatus;
  yesVotes: number;
  noVotes: number;
  createdAt: string;
  confirmedAt: string | null;
  rejectedAt: string | null;
};

export type CommunityReportView = CommunityReport & {
  totalVotes: number;
  yesPercent: number;
  myVote: VoteType | null;
  plot: PlotSummary | null;
};
