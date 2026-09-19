import type { ReportStatus } from "@/lib/types";

/**
 * ---------------------------------------------------------------------------
 * DESIGN NOTE — read this before tuning the numbers below
 * ---------------------------------------------------------------------------
 * This encodes the rule you described:
 *   - yes share >= 30%  -> "under_consideration"
 *   - yes share >= 50%  -> "confirmed"   (this is the point it gets attached
 *                          to the plot as a flag and bumps the risk score)
 *   - yes share >= 70%  -> "locked"      (terminal — can never be removed
 *                          or reversed again, by anyone)
 *
 * Two things I had to decide that your spec didn't fully pin down:
 *
 * 1. STICKINESS BELOW 70%. You only said 70% is irreversible. I made
 *    "confirmed" (50%+) sticky too — once a report bumps a plot's risk,
 *    it stays bumped even if later votes push the yes-share back down,
 *    until it either reaches "locked" or someone builds an explicit
 *    admin "unconfirm" action. The alternative (letting it silently
 *    un-flag the plot if the vote swings back under 50%) is possible but
 *    means a plot's risk score could flicker up and down as votes come
 *    in, which felt like the wrong UX for something as high-stakes as
 *    "is this land safe to buy". Flip STICKY_ONCE_CONFIRMED below if you
 *    want the other behavior.
 *
 * 2. REJECTION PATH. Your schema has `rejected_at`, but you didn't say
 *    when a report gets rejected. I added a simple rule: if a report is
 *    still in "submitted" (i.e. hasn't reached 30% yet) and has enough
 *    votes, and yes-share is very low, it's marked "rejected" and frozen
 *    there. This is the piece most worth revisiting — see the note in
 *    my reply for options (auto-reject vs. manual moderation only).
 *
 * MIN_VOTES_FOR_REVIEW exists so a single early yes-vote can't instantly
 * push a fresh report to "confirmed" (1 yes / 0 no = 100%). Tune freely.
 * ---------------------------------------------------------------------------
 */

export const MIN_VOTES_FOR_REVIEW = 10;
export const CONSIDER_THRESHOLD = 30;
export const CONFIRM_THRESHOLD = 50;
export const LOCK_THRESHOLD = 70;
export const REJECT_MAX_YES_PERCENT = 15;
export const STICKY_ONCE_CONFIRMED = true;

const TIER_STATUS: readonly ReportStatus[] = [
  "submitted",
  "under_consideration",
  "confirmed",
];

export type Tier = 0 | 1 | 2 | 3;

export function yesPercent(yesVotes: number, noVotes: number): number {
  const total = yesVotes + noVotes;
  if (total === 0) return 0;
  return (yesVotes / total) * 100;
}

export function tierFromPercent(pct: number): Tier {
  if (pct >= LOCK_THRESHOLD) return 3;
  if (pct >= CONFIRM_THRESHOLD) return 2;
  if (pct >= CONSIDER_THRESHOLD) return 1;
  return 0;
}

export function statusFromTier(tier: Tier): ReportStatus {
  return TIER_STATUS[tier];
}

export function tierFromStatus(status: ReportStatus): Tier {
  if (status === "withdrawn") return 3;
  if (status === "confirmed") return 2;
  if (status === "under_consideration") return 1;
  return 0; // submitted and rejected both start at tier 0
}

/**
 * Given the status a report is currently at (which may already reflect an
 * earlier, higher tier reached in a previous vote) and the *current* raw
 * yes/no counts, return the status it should have now. Never returns a
 * lower tier than it's already at — that's what makes 50%+ and 70%
 * "sticky" per the design note above. Terminal statuses (locked, rejected)
 * are returned unchanged.
 */
export function nextStatus(
  current: ReportStatus,
  yesVotes: number,
  noVotes: number,
): ReportStatus {
  if (current === "withdrawn" || current === "rejected") return current;

  const total = yesVotes + noVotes;
  const currentTier = tierFromStatus(current);

  if (total < MIN_VOTES_FOR_REVIEW) {
    return current;
  }

  const pct = yesPercent(yesVotes, noVotes);

  // Rejection only applies before anything has been confirmed.
  if (currentTier === 0 && pct <= REJECT_MAX_YES_PERCENT) {
    return "rejected";
  }

  const targetTier = tierFromPercent(pct);
  const effectiveTier = STICKY_ONCE_CONFIRMED
    ? (Math.max(currentTier, targetTier) as Tier)
    : (targetTier as Tier);

  return statusFromTier(effectiveTier);
}

export const STATUS_RANK: Record<ReportStatus, number> = {
  submitted: 0,
  under_consideration: 1,
  rejected: 1,
  confirmed: 2,
  withdrawn: 3,
};
