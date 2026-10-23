import type { ExamConfig, ExamId } from "./types";

export const TOPIC_LABELS: Record<string, string> = {
  institutions: "Institutions & Policy Processes",
  "civil-liberties": "Civil Liberties & Civil Rights",
  "parties-interest": "Political Parties & Interest Groups",
  "beliefs-behavior": "Political Beliefs & Behavior",
  constitutional: "Constitutional Underpinnings",
  "political-policy": "Political Institutions & Public Policy",
  social: "Social Developments",
  economic: "Economic Developments",
  "cultural-intellectual": "Cultural & Intellectual Developments",
  diplomacy: "Diplomacy & International Relations",
};

export const EXAM_CONFIGS: Record<
  ExamId,
  ExamConfig & { aceScoreHint: number; semesterHours: number }
> = {
  gov: {
    id: "gov",
    title: "American Government",
    shortTitle: "Government",
    courseCode: "Govt 2305",
    description:
      "CLEP-style practice for institutions, civil liberties, parties, political behavior, and the Constitution.",
    questionCount: 100,
    timeMinutes: 90,
    aceScoreHint: 50,
    semesterHours: 3,
    topics: [
      { id: "institutions", label: TOPIC_LABELS.institutions, weight: "30–35%" },
      {
        id: "civil-liberties",
        label: TOPIC_LABELS["civil-liberties"],
        weight: "10–15%",
      },
      {
        id: "parties-interest",
        label: TOPIC_LABELS["parties-interest"],
        weight: "15–20%",
      },
      {
        id: "beliefs-behavior",
        label: TOPIC_LABELS["beliefs-behavior"],
        weight: "15–20%",
      },
      {
        id: "constitutional",
        label: TOPIC_LABELS.constitutional,
        weight: "15–20%",
      },
    ],
  },
  hist: {
    id: "hist",
    title: "History of the United States II",
    shortTitle: "U.S. History II",
    courseCode: "1865–Present",
    description:
      "CLEP-style practice from Reconstruction through the present — politics, society, culture, economy, and diplomacy.",
    questionCount: 120,
    timeMinutes: 90,
    aceScoreHint: 50,
    semesterHours: 3,
    topics: [
      {
        id: "political-policy",
        label: TOPIC_LABELS["political-policy"],
        weight: "30%",
      },
      { id: "social", label: TOPIC_LABELS.social, weight: "30%" },
      {
        id: "cultural-intellectual",
        label: TOPIC_LABELS["cultural-intellectual"],
        weight: "20%",
      },
      { id: "economic", label: TOPIC_LABELS.economic, weight: "10%" },
      { id: "diplomacy", label: TOPIC_LABELS.diplomacy, weight: "10%" },
    ],
  },
};
