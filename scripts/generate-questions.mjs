import fs from "node:fs";
import path from "node:path";

const root = path.resolve("src/data");

function q(exam, topic, stem, choices, correctIndex, explanation, extra = {}) {
  return { exam, topic, stem, choices, correctIndex, explanation, ...extra };
}

function vary(base, variations) {
  return variations.map((v, i) => ({
    ...base,
    stem: v.stem ?? base.stem,
    choices: v.choices ?? base.choices,
    correctIndex: v.correctIndex ?? base.correctIndex,
    explanation: v.explanation ?? base.explanation,
    tags: [...(base.tags ?? []), `var-${i + 1}`],
  }));
}

function buildGov() {
  const items = [];

  // ——— Constitutional underpinnings ———
  const constitutionalSeeds = [
    q(
      "gov",
      "constitutional",
      "Which principle divides authority between a national government and state governments?",
      [
        "Separation of powers",
        "Federalism",
        "Judicial review",
        "Popular sovereignty",
        "Nullification",
      ],
      1,
      "Federalism splits power between national and state governments; separation of powers divides branches within a level of government."
    ),
    q(
      "gov",
      "constitutional",
      "The Great Compromise at the Constitutional Convention mainly resolved conflict over",
      [
        "slavery and the slave trade",
        "representation in Congress",
        "the Bill of Rights",
        "presidential term limits",
        "judicial tenure",
      ],
      1,
      "It created a bicameral Congress: equal Senate representation and population-based House representation."
    ),
    q(
      "gov",
      "constitutional",
      "Which idea is most closely associated with Madison in Federalist No. 10?",
      [
        "A large republic can control the mischiefs of faction",
        "States should nullify unconstitutional laws",
        "A bill of rights is unnecessary",
        "Direct democracy is superior to representation",
        "The president should be chosen by lot",
      ],
      0,
      "Madison argued an extended republic would dilute factional majorities through competition among many interests."
    ),
    q(
      "gov",
      "constitutional",
      "Checks and balances are designed primarily to",
      [
        "guarantee equal representation for states",
        "prevent any one branch from dominating another",
        "expand presidential war powers",
        "ensure rapid policy change",
        "protect political parties",
      ],
      1,
      "Each branch has tools to limit the others, reducing concentration of power."
    ),
    q(
      "gov",
      "constitutional",
      "The supremacy clause establishes that",
      [
        "state constitutions override federal statutes",
        "the Constitution and federal laws made under it are supreme",
        "Supreme Court opinions cannot be amended",
        "treaties require state ratification",
        "governors may veto federal regulations",
      ],
      1,
      "Article VI makes the Constitution and valid federal law supreme over conflicting state law."
    ),
    q(
      "gov",
      "constitutional",
      "Which concept most clearly protects minority rights against majority rule?",
      [
        "Winner-take-all elections",
        "The Bill of Rights and judicial review",
        "Party caucuses",
        "Gerrymandering",
        "The electoral college alone",
      ],
      1,
      "Constitutional rights and courts limit what majorities may impose on individuals and minorities."
    ),
    q(
      "gov",
      "constitutional",
      "Enumerated powers of Congress are found mainly in",
      [
        "Article I, Section 8",
        "Article II, Section 2",
        "Article III",
        "the Tenth Amendment only",
        "the Preamble",
      ],
      0,
      "Article I, Section 8 lists Congress’s delegated powers, including commerce and taxation."
    ),
    q(
      "gov",
      "constitutional",
      "The necessary and proper clause is most often used to justify",
      [
        "state police powers",
        "implied powers of Congress",
        "executive privilege",
        "judicial elections",
        "direct democracy",
      ],
      1,
      "It allows Congress to enact laws needed to carry out enumerated powers (McCulloch v. Maryland)."
    ),
    q(
      "gov",
      "constitutional",
      "Dual federalism is best described as a system in which",
      [
        "national and state governments have clearly separated spheres",
        "only the national government makes policy",
        "states may secede freely",
        "local governments replace states",
        "courts never review legislation",
      ],
      0,
      "Classic dual federalism treats national and state authority as largely distinct layers."
    ),
    q(
      "gov",
      "constitutional",
      "Cooperative federalism emphasizes",
      [
        "strict separation of state and federal functions",
        "shared policy responsibilities between levels of government",
        "abolishing state governments",
        "military rule of the states",
        "unicameral legislatures",
      ],
      1,
      "New Deal–era and later programs often mix federal funding with state administration."
    ),
    q(
      "gov",
      "constitutional",
      "Which compromise counted enslaved persons as three-fifths of a person for representation and taxation?",
      [
        "Missouri Compromise",
        "Three-Fifths Compromise",
        "Connecticut Compromise",
        "Compromise of 1850",
        "Wilmot Proviso",
      ],
      1,
      "The Three-Fifths Compromise affected House apportionment and direct taxes before the Civil War amendments."
    ),
    q(
      "gov",
      "constitutional",
      "Anti-Federalists most strongly demanded",
      [
        "a standing national army",
        "a Bill of Rights",
        "lifetime Senate terms",
        "elimination of state courts",
        "direct election of judges",
      ],
      1,
      "Concern about national power led Anti-Federalists to push for explicit protections of liberties."
    ),
    q(
      "gov",
      "constitutional",
      "The amendment process in Article V requires",
      [
        "a presidential proclamation alone",
        "proposal and ratification by supermajorities",
        "unanimous state consent",
        "a national referendum only",
        "Supreme Court approval",
      ],
      1,
      "Amendments typically need 2/3 of Congress (or a convention) and 3/4 of the states."
    ),
    q(
      "gov",
      "constitutional",
      "Popular sovereignty means that",
      [
        "judges create law",
      "ultimate political authority rests with the people",
        "states are sovereign over the Union",
        "parties choose all nominees by lottery",
        "the military ratifies treaties",
      ],
      1,
      "Democratic legitimacy is grounded in the consent of the governed."
    ),
    q(
      "gov",
      "constitutional",
      "Which statement best describes separation of powers?",
      [
        "Power is divided among legislative, executive, and judicial branches",
        "Power is shared equally by all 50 states",
        "Power is concentrated in Congress alone",
        "Power is exercised only by political parties",
        "Power belongs exclusively to the president",
      ],
      0,
      "The Constitution assigns distinct primary functions to three branches."
    ),
  ];

  for (const seed of constitutionalSeeds) {
    items.push(seed);
    items.push(
      ...vary(seed, [
        {
          stem: seed.stem.replace("Which", "What").replace("best ", ""),
        },
        {
          stem: `All of the following relate to the topic of this question EXCEPT a distractor about ${seed.choices[4].toLowerCase()}. Which choice is the correct concept?`,
          choices: seed.choices,
          correctIndex: seed.correctIndex,
        },
      ]).slice(0, 1)
    );
  }

  // Expand constitutional with more unique items
  const moreConst = [
    ["reserved powers", "Tenth Amendment", "powers not delegated to the U.S. nor prohibited to the states"],
    ["full faith and credit", "Article IV", "states respect public acts and judicial proceedings of other states"],
    ["extradition", "Article IV", "fugitives returned to the state of the alleged crime"],
    ["republican form of government", "Article IV guarantee", "states must have representative government"],
    ["commerce clause", "Article I", "Congress regulates interstate and foreign commerce"],
    ["taxing and spending clause", "Article I", "Congress raises revenue and funds programs"],
    ["privileges and immunities", "Article IV", "states generally treat citizens of other states fairly"],
    ["judicial review", "Marbury v. Madison", "courts may strike down unconstitutional acts"],
    ["writ of habeas corpus", "Article I limits", "detention must be justified in court"],
    ["bill of attainder ban", "Article I", "legislatures cannot punish individuals without trial"],
    ["ex post facto ban", "Article I", "cannot criminalize past lawful acts retroactively"],
    ["emoluments concerns", "Article I/II limits", "limits on gifts/office from foreign states"],
    ["impeachment", "Articles I & II", "House impeaches; Senate tries"],
    ["treaty power", "Article II", "president negotiates; Senate advises and consents"],
    ["electoral college", "Article II / 12th Amendment", "elects the president"],
    ["presentment clause", "Article I", "bills go to the president for signature or veto"],
    ["pocket veto", "presidential practice", "bill dies if unsigned after Congress adjourns"],
    ["line-item veto", "Clinton v. City of New York", "struck down as unconstitutional for presidents"],
    ["categorical grants", "fiscal federalism", "federal money for specific purposes"],
    ["block grants", "fiscal federalism", "broader purpose funds with more state flexibility"],
    ["unfunded mandates", "intergovernmental relations", "federal requirements without full funding"],
    ["devolution", "modern federalism debates", "shifting power/responsibility toward states"],
    ["nullification theory", "rejected historically", "states cannot unilaterally void federal law"],
    ["commerce as national power", "Gibbons v. Ogden", "broad federal authority over interstate commerce"],
    ["national bank implied", "McCulloch v. Maryland", "necessary and proper + supremacy"],
  ];

  moreConst.forEach(([term, anchor, meaning], i) => {
    items.push(
      q(
        "gov",
        "constitutional",
        `Which description best matches ${term}?`,
        [
          meaning,
          "A power reserved exclusively to city councils",
          "A rule that presidents appoint all state judges",
          "A ban on political parties in Congress",
          "A requirement that all laws be ratified by referendum",
        ],
        0,
        `${term} is associated with ${anchor}: ${meaning}.`
      )
    );
    if (i % 2 === 0) {
      items.push(
        q(
          "gov",
          "constitutional",
          `${anchor} is most directly connected to which concept?`,
          [term, "soft money", "cloture", "markup", "front-loading"],
          0,
          `${anchor} relates to ${term}.`
        )
      );
    }
  });

  // ——— Institutions ———
  const institutionFacts = [
    ["conference committee", "reconciles House and Senate versions of a bill", "subcommittee markup", "party convention", "electoral college meeting", "cabinet recess"],
    ["House Rules Committee", "sets debate terms and amendment rules for many bills", "confirms treaties", "tries impeachments", "draws state legislative maps", "audits the Fed"],
    ["senatorial courtesy", "home-state senators influence district court nominees", "filibuster of budget bills only", "automatic cloture", "pocket veto", "logrolling ban"],
    ["filibuster", "extended debate used in the Senate to delay or block action", "House discharge petition", "presidential signing statement", "gerrymander", "executive order"],
    ["cloture", "Senate procedure to end a filibuster with a supermajority vote", "House germaneness rule", "pocket veto", "writ of certiorari", "line-item veto"],
    ["incumbency advantage", "name recognition, franking, and fundraising edge for officeholders", "term limits for all members", "ban on PAC money", "closed primaries only", "proportional House seats"],
    ["gerrymandering", "drawing districts to favor a party or group", "at-large Senate elections", "judicial redistricting only", "electoral college reform", "initiative process"],
    ["oversight", "Congress monitors executive agencies and program implementation", "judicial nomination", "state nullification", "party realignment", "soft money ads"],
    ["executive agreement", "international pact by the president not requiring Senate treaty approval", "constitutional amendment", "concurrent resolution", "bill of attainder", "writ of mandamus"],
    ["signing statement", "presidential commentary on how a law will be interpreted or enforced", "Senate hold", "discharge petition", "markup memo", "amicus brief"],
    ["executive order", "presidential directive managing executive branch operations", "statute passed by Congress", "Supreme Court rule", "state compact", "party platform plank"],
    ["cabinet", "heads of executive departments advising the president", "all federal judges", "House committee chairs only", "state governors", "Federal Reserve board alone"],
    ["White House Office / EOP", "closest presidential advisers and staff support", "Senate parliamentarian", "GAO auditors only", "state legislatures", "electoral college"],
    ["independent regulatory commission", "agency with quasi-legislative/quasi-judicial duties somewhat insulated from the president", "House whip organization", "trial jury", "political party national committee", "conference committee"],
    ["iron triangle", "alliance of agency, congressional committee, and interest group", "three-branch separation", "electoral college", "federalism layers", "party realignment"],
    ["issue network", "loose, shifting coalitions of actors around a policy area", "strict iron triangle only", "unicameral Congress", "military junta", "closed primary"],
    ["bureaucratic discretion", "agencies fill in details when statutes are broad", "judges writing statutes", "presidents amending the Constitution", "voters vetoing agencies", "states seceding"],
    ["Pendleton Act", "created merit-based civil service hiring", "ended judicial review", "created the Fed", "banned interest groups", "established the income tax"],
    ["Hatch Act", "limits certain political activities by federal employees", "creates Senate filibuster", "ends gerrymandering", "requires balanced budgets", "bans presidential vetoes"],
    ["stare decisis", "courts generally follow precedent", "Congress must follow party platforms", "presidents cannot veto", "states must use primaries", "agencies ignore statutes"],
    ["writ of certiorari", "Supreme Court order agreeing to hear a case", "presidential pardon", "House censure", "Senate confirmation", "state initiative"],
    ["amicus curiae brief", "interest group or outsider filing to influence a court", "conference report", "executive order", "discharge petition", "pocket veto"],
    ["judicial activism", "judges more willing to strike down acts or make bold policy via rulings", "strict refusal to hear cases", "deferring always to agencies", "avoiding constitutional questions", "electing judges by lottery"],
    ["judicial restraint", "judges defer more to elected branches and precedent", "frequent overrides of statutes", "writing new amendments", "campaigning for office", "ignoring the Constitution"],
    ["original jurisdiction of SCOTUS", "limited cases such as those involving states or ambassadors", "all criminal appeals", "all tax disputes", "all patent cases", "all bankruptcy cases"],
    ["appellate jurisdiction", "authority to review lower court decisions", "power to tax imports", "power to declare war", "power to redraw districts", "power to appoint senators"],
    ["Senate advice and consent", "confirms many presidential nominees and treaties", "originates revenue bills", "elects the Speaker", "runs the census", "imposes state taxes"],
    ["House unique power", "initiates revenue bills and impeaches", "confirms treaties", "tries impeachments", "filibusters bills", "elects Vice President always"],
    ["Speaker of the House", "presiding officer and powerful party leader in the House", "President pro tempore only role", "Chief Justice", "Attorney General", "Whip of the Senate alone"],
    ["majority leader (Senate)", "key agenda-setter for the majority party in the Senate", "presides over the House", "chairs the Fed", "leads the Supreme Court", "runs the GAO"],
    ["whip", "party leader who counts votes and encourages cohesion", "committee parliamentarian", "Solicitor General", "Clerk of Court", "Census director"],
    ["markup", "committee session editing bill language", "floor filibuster", "electoral vote count", "cabinet meeting", "primary debate"],
    ["discharge petition", "House tool to force a bill out of committee", "Senate cloture", "presidential veto", "judicial stay", "state referendum"],
    ["logrolling", "vote trading among legislators", "gerrymandering", "soft money", "front-loading", "selective incorporation"],
    ["pork / earmarks", "targeted spending benefiting a member’s district or state", "cloture petitions", "writs of certiorari", "executive privilege", "amicus briefs"],
    ["executive privilege", "claim that presidents may withhold certain communications", "automatic Senate confirmation", "state nullification", "party soft money", "judicial elections"],
    ["War Powers Resolution", "attempts to limit unilateral presidential troop commitments", "creates selective service", "ends judicial review", "bans treaties", "creates NATO"],
    ["budget reconciliation", "special Senate process limiting filibusters on certain budget bills", "House only process", "Supreme Court budgeting", "state compact", "treaty ratification"],
    ["Continuing resolution", "temporary funding when regular appropriations are late", "constitutional amendment", "executive agreement", "cloture vote", "discharge petition"],
    ["Office of Management and Budget", "helps president prepare and manage the federal budget", "writes all statutes", "counts electoral votes", "chairs conference committees", "runs state elections"],
    ["Government Accountability Office", "legislative branch watchdog auditing federal spending/programs", "White House counsel", "FBI directorate alone", "Federal Reserve Open Market Committee", "party national committee"],
    ["Solicitor General", "represents the federal government before the Supreme Court", "Speaker of the House", "Senate parliamentarian", "Chief of Staff", "Fed chair"],
    ["rulemaking", "agency process creating regulations with notice and comment", "Senate advice and consent", "House impeachment", "electoral college vote", "initiative petition"],
    ["implementation", "bureaucracy carrying out statutes and policies", "judicial nomination", "party nomination", "census reapportionment", "primary front-loading"],
    ["patronage / spoils", "jobs awarded for political loyalty rather than merit", "civil service exams", "judicial tenure", "cloture", "selective incorporation"],
  ];

  for (const [term, correct, w1, w2, w3, w4] of institutionFacts) {
    items.push(
      q(
        "gov",
        "institutions",
        `Which of the following best defines ${term}?`,
        [correct, w1, w2, w3, w4],
        0,
        `${term}: ${correct}.`
      )
    );
    items.push(
      q(
        "gov",
        "institutions",
        `A student describing "${correct}" is referring to`,
        [term, w1.split(" ")[0], w2.split(" ")[0], "pluralism", "hyperpluralism"],
        0,
        `That definition matches ${term}.`
      )
    );
  }

  const institutionScenarios = [
    q(
      "gov",
      "institutions",
      "Differences between House and Senate versions of a bill are usually resolved in a",
      [
        "conference committee",
        "joint economic committee only",
        "party convention",
        "cabinet meeting",
        "Supreme Court conference",
      ],
      0,
      "Conference committees negotiate a single compromise text."
    ),
    q(
      "gov",
      "institutions",
      "Which statement about the presidential veto is accurate?",
      [
        "Congress can override with a two-thirds vote in both chambers",
        "A veto requires Supreme Court approval",
        "Presidents typically veto about one-third of all bills",
        "Vetoes apply only to spending bills",
        "Pocket vetoes can be overridden easily after adjournment",
      ],
      0,
      "Overrides are rare because a two-thirds vote in both houses is difficult."
    ),
    q(
      "gov",
      "institutions",
      "The power of the House Rules Committee primarily stems from its ability to",
      [
        "limit debate time and control amendments on the floor",
        "confirm judicial nominees",
        "try impeachments",
        "appoint Supreme Court justices",
        "redraw state senate districts",
      ],
      0,
      "Rules Committee special rules structure floor consideration in the House."
    ),
    q(
      "gov",
      "institutions",
      "Cabinet secretaries’ usefulness as neutral political advisers is limited because",
      [
        "they often have loyalties to their departments and clienteles",
        "they cannot meet the president",
        "they are elected independently",
        "they serve only one-year terms",
        "they may not testify before Congress",
      ],
      0,
      "Departmental perspectives and constituencies can pull cabinet members away from pure presidential loyalty."
    ),
    q(
      "gov",
      "institutions",
      "Which committee assignment historically confers especially high influence in the House?",
      [
        "Ways and Means",
        "House Administration’s least active subcommittee",
        "Joint Printing only",
        "Select ethics temporary panels only",
        "Ceremonial commemorative panels",
      ],
      0,
      "Ways and Means handles major tax legislation and is highly sought."
    ),
    q(
      "gov",
      "institutions",
      "Most details of legislation are typically worked out in",
      [
        "subcommittee or committee markup",
        "the electoral college",
        "Supreme Court oral argument",
        "state party conventions",
        "press conferences alone",
      ],
      0,
      "Committees refine language before floor action."
    ),
    q(
      "gov",
      "institutions",
      "Broad statutes that leave agencies to write specific rules illustrate",
      [
        "delegated authority / bureaucratic discretion",
        "judicial originalism only",
        "nullification",
        "hard money limits",
        "cloture",
      ],
      0,
      "Congress often sets goals and delegates details to the bureaucracy."
    ),
    q(
      "gov",
      "institutions",
      "Life tenure during good behavior was intended to",
      [
        "protect judicial independence",
        "ensure frequent elections of judges",
        "let Congress rewrite rulings weekly",
        "tie judges to party platforms",
        "make courts subordinate to governors",
      ],
      0,
      "Article III tenure insulates judges from short-term political pressure."
    ),
    q(
      "gov",
      "institutions",
      "Which is a function most associated with the White House staff?",
      [
        "Advising the president on political and policy decisions",
        "Serving as voting members of Congress",
        "Issuing binding Supreme Court opinions",
        "Certifying state election results",
        "Chairing state legislatures",
      ],
      0,
      "EOP/White House staff provide proximate counsel and coordination."
    ),
    q(
      "gov",
      "institutions",
      "I. Presidents may threaten vetoes to shape bills.\nII. Presidents veto roughly one-third of all bills.\nIII. Overrides of vetoes are uncommon.\nWhich statements are generally true?",
      ["I only", "II only", "I and III only", "II and III only", "I, II, and III"],
      2,
      "Veto threats matter and overrides are rare; vetoes are far less frequent than one-third of bills."
    ),
  ];
  items.push(...institutionScenarios);

  // ——— Civil liberties / rights ———
  const cases = [
    ["Brown v. Board of Education", "school segregation violates equal protection", "established one person, one vote", "created Miranda warnings", "ended all affirmative action", "banned flag burning"],
    ["Baker v. Carr", "opened federal courts to legislative apportionment cases (one person, one vote path)", "legalized abortion nationally", "required counsel for indigents", "incorporated free exercise", "struck down the income tax"],
    ["Gideon v. Wainwright", "state felony defendants have a right to counsel", "banned school prayer", "ended prior restraint", "created judicial review", "allowed poll taxes"],
    ["Miranda v. Arizona", "suspects must be informed of rights before custodial interrogation", "integrated schools", "ended gerrymandering", "banned PACs", "created the exclusionary rule for the first time"],
    ["Mapp v. Ohio", "exclusionary rule applied to the states", "ended slavery", "created Soft money", "allowed line-item vetoes", "banned the draft"],
    ["Roe v. Wade", "recognized a constitutional privacy-based abortion right (later overturned/altered by Dobbs)", "ended school segregation", "required Miranda warnings", "created Social Security", "banned literacy tests"],
    ["Dobbs v. Jackson", "returned abortion regulation largely to the states", "integrated buses", "banned the death penalty", "created Title IX", "ended judicial review"],
    ["New York Times v. United States", "heavy presumption against prior restraint (Pentagon Papers)", "allowed sedition prosecutions freely", "banned all wartime reporting", "required equal time for candidates", "created FCC licensing"],
    ["Schenck v. United States", "clear and present danger test for speech limits", "absolute free speech always", "ended draft registration", "banned commercial speech regulation", "created actual malice"],
    ["Brandenburg v. Ohio", "incitement standard protecting speech unless directed to imminent lawless action", "total ban on hate speech", "ended free exercise", "required loyalty oaths for all speech", "banned symbolic speech"],
    ["Tinker v. Des Moines", "students retain free speech rights at school if not substantially disruptive", "no student speech rights", "banned armbands everywhere", "ended compulsory education", "required school prayer"],
    ["Engel v. Vitale", "school-sponsored prayer violates the Establishment Clause", "allowed official state religions", "banned private prayer", "ended free exercise", "required Bible reading"],
    ["Lemon v. Kurtzman", "test often used historically for Establishment Clause cases", "created Miranda", "ended exclusionary rule", "banned all religious schools", "required chaplains in every classroom"],
    ["Wisconsin v. Yoder", "Amish free exercise claim limited compulsory high school attendance", "banned all religious exemptions", "ended public schools", "required military service for Amish", "created establishment of religion"],
    ["McDonald v. Chicago", "incorporated Second Amendment against the states", "banned handguns nationally", "ended militia clauses", "created federal police", "required gun licenses for judges"],
    ["Gideon / incorporation theme", "selective incorporation applies Bill of Rights protections to states via the 14th Amendment", "total incorporation overnight in 1791", "states never bound by Bill of Rights", "only the 10th Amendment applies to states", "Bill of Rights repealed"],
    ["Plessy v. Ferguson", "upheld separate but equal (later overturned by Brown)", "ended segregation", "created affirmative action", "banned Jim Crow", "required busing"],
    ["Korematsu v. United States", "upheld WWII Japanese American exclusion (widely condemned later)", "ended internment immediately", "banned martial law forever", "created civil rights Act", "required reparations in 1944"],
    ["Regents of Univ. of California v. Bakke", "struck down rigid racial quotas but allowed some race-conscious admissions then", "banned all diversity goals forever in every context", "required quotas", "ended Title VI", "created poll taxes"],
    ["Citizens United v. FEC", "independent corporate/union electioneering spending protected as speech (with limits still on contributions)", "banned all campaign spending", "ended PACs", "required public financing only", "outlawed Super PACs by name in the opinion’s holding alone"],
    ["Shaw v. Reno", "racial gerrymandering can violate equal protection", "required race-based districts always", "ended Voting Rights Act", "banned all redistricting", "created majority-minority districts as mandatory everywhere"],
    ["United States v. Lopez", "struck down Gun-Free School Zones Act as beyond commerce power (federalism limit)", "expanded commerce power without limit", "banned state police power", "ended federal criminal law", "required national curriculum"],
    ["Obergefell v. Hodges", "recognized a constitutional right to same-sex marriage", "banned civil unions", "ended privacy doctrine entirely", "required religious officiants to preside", "created new amendment text"],
    ["Griswold v. Connecticut", "recognized privacy in marital contraception context", "banned birth control nationwide", "ended incorporation", "created Miranda", "allowed prior restraint"],
    ["Near v. Minnesota", "prior restraint strongly disfavored", "allowed permanent press licensing bans of criticism", "ended free press", "required government editors", "banned newspapers"],
  ];

  for (const [name, correct, w1, w2, w3, w4] of cases) {
    items.push(
      q(
        "gov",
        "civil-liberties",
        `Which statement correctly describes ${name}?`,
        [correct, w1, w2, w3, w4],
        0,
        `${name}: ${correct}.`
      )
    );
  }

  const rightsExtra = [
    q("gov", "civil-liberties", "Prior to the Voting Rights Act of 1965, literacy tests in some southern states were mainly used to", ["prevent African Americans from voting", "measure civic knowledge fairly", "increase turnout", "register immigrants quickly", "select jurors only"], 0, "Literacy tests were administered discriminatorily to suppress Black voting."),
    q("gov", "civil-liberties", "Selective incorporation refers to", ["applying Bill of Rights protections to the states case by case through the 14th Amendment", "adding new amendments yearly", "electing judges", "funding schools", "drawing districts"], 0, "The Court incorporated most protections gradually via due process."),
    q("gov", "civil-liberties", "Due process most directly protects a person from", ["imprisonment without fair legal procedures", "paying taxes", "serving on juries", "voting in primaries", "owning property"], 0, "Procedural due process requires fair procedures before depriving life, liberty, or property."),
    q("gov", "civil-liberties", "The equal protection clause is located in the", ["Fourteenth Amendment", "First Amendment", "Second Amendment", "Tenth Amendment", "Preamble"], 0, "Section 1 of the 14th Amendment includes equal protection."),
    q("gov", "civil-liberties", "Civil liberties are best understood as", ["protections from government interference with individual freedoms", "guarantees of equal treatment in government programs only", "party platform planks", "state police powers", "military regulations"], 0, "Liberties limit government; civil rights often emphasize equal protection/treatment."),
    q("gov", "civil-liberties", "Civil rights policies primarily concern", ["equal treatment and protection under law", "prior restraint only", "filibuster rules", "soft money", "executive privilege"], 0, "Civil rights focus on equality and anti-discrimination."),
    q("gov", "civil-liberties", "The exclusionary rule means that", ["illegally obtained evidence is generally inadmissible in court", "juries must exclude experts", "Congress excludes third parties", "states exclude federal law", "voters exclude absentee ballots"], 0, "It deters unconstitutional searches and seizures."),
    q("gov", "civil-liberties", "Which right has NOT been fully incorporated against the states in the same way as most others?", ["The Fifth Amendment grand jury indictment requirement", "Freedom of speech", "Free exercise of religion", "Protection against unreasonable searches", "Right to counsel in felony cases"], 0, "Grand jury indictment has not been incorporated; many other rights have."),
    q("gov", "civil-liberties", "Title IX is most associated with", ["sex discrimination in education programs receiving federal funds", "voting age", "Senate cloture", "tariff policy", "judicial salaries"], 0, "Title IX prohibits sex discrimination in federally funded education."),
    q("gov", "civil-liberties", "The Civil Rights Act of 1964 banned discrimination in", ["public accommodations and employment (among other areas)", "only private homes", "only military drafts", "only state taxes", "only political conventions"], 0, "It was landmark legislation against Jim Crow-style discrimination."),
    q("gov", "civil-liberties", "Affirmative action debates typically center on", ["race- or sex-conscious policies to remedy discrimination or promote diversity", "whether presidents may veto bills", "Senate filibuster math", "tariff schedules", "gerrymandering software only"], 0, "Courts and politics have long contested the legality and wisdom of such policies."),
    q("gov", "civil-liberties", "Libel law for public officials after New York Times v. Sullivan requires showing", ["actual malice", "any factual error", "prior restraint", "symbolic speech", "soft money"], 0, "Public officials must prove knowledge of falsity or reckless disregard for truth."),
    q("gov", "civil-liberties", "Symbolic speech is", ["expressive conduct that communicates a message", "only spoken words", "only campaign donations", "only commercial ads", "only religious rituals"], 0, "Examples include armbands or flag desecration cases with nuanced doctrine."),
    q("gov", "civil-liberties", "The free exercise clause protects", ["religious belief and, with limits, religious practice", "only Christian churches", "political parties", "commercial speech only", "state-established religions"], 0, "Belief is strongly protected; conduct can be regulated under certain tests."),
    q("gov", "civil-liberties", "The establishment clause prohibits", ["government endorsement or establishment of religion", "private prayer", "religious books", "chaplains in Congress in all eras without debate", "all references to religion in history class"], 0, "It constrains government religion, not all private religious expression."),
  ];
  items.push(...rightsExtra);

  // ——— Parties / interest groups / elections ———
  const partyItems = [
    q("gov", "parties-interest", "The most significant long-term influence on an individual’s party identification is typically", ["family / political socialization", "one TV ad", "weather on Election Day", "random chance alone", "the current Speaker"], 0, "Family is a primary agent of political socialization."),
    q("gov", "parties-interest", "A critical (realigning) election is one that", ["produces a lasting shift in party coalitions", "has high turnout only", "occurs during war only", "features a third-party win always", "is decided by the House always"], 0, "Realignments reshape partisan attachments for decades."),
    q("gov", "parties-interest", "Interest groups differ from parties mainly because interest groups generally", ["do not nominate candidates for a place on the ballot as parties do", "never lobby", "never care about elections", "have no national presence", "cannot donate"], 0, "Parties run candidates under a label; groups influence without being the ballot vehicle."),
    q("gov", "parties-interest", "Soft money historically referred to", ["funds given to parties for party-building rather than direct candidate contributions (pre-BCRA reforms)", "cash only under $5", "foreign bribes only", "judicial salaries", "poll taxes"], 0, "BCRA (McCain-Feingold) restricted party soft money."),
    q("gov", "parties-interest", "PACs are primarily", ["organizations that raise and spend money to influence elections", "Senate committees", "state courts", "census bureaus", "military units"], 0, "Political action committees channel campaign money under rules."),
    q("gov", "parties-interest", "Pluralist theory holds that", ["public policy emerges from competition and compromise among groups", "a tiny elite always rules alone", "voters are irrelevant", "courts never matter", "parties should be banned"], 0, "Pluralism emphasizes group bargaining."),
    q("gov", "parties-interest", "Elite theory argues that", ["a relatively small set of economic/political elites dominate key decisions", "all groups have equal power", "federalism does not exist", "turnout is always 100%", "media has no effect"], 0, "Elitism stresses concentrated power."),
    q("gov", "parties-interest", "Hyperpluralism suggests", ["too many groups make government unable to act coherently", "there are no interest groups", "only two groups exist", "parties merge with courts", "federalism ends"], 0, "Policy may become contradictory under group pressure."),
    q("gov", "parties-interest", "Third parties in U.S. history have often been most effective when they", ["dramatize issues ignored by major parties", "always win the presidency", "control the Supreme Court", "ban elections", "run only in one county forever"], 0, "They can force major parties to adopt issues."),
    q("gov", "parties-interest", "Winner-take-all single-member districts tend to", ["favor a two-party system", "guarantee multiparty cabinets", "require proportional representation", "ban primaries", "elect judges only"], 0, "Duverger’s logic: plurality rules squeeze third parties."),
    q("gov", "parties-interest", "Open primaries allow", ["voters to choose a party’s ballot without formal registration as that party (rules vary by state)", "only party bosses to vote", "only senators to vote", "mail voting only", "no challengers"], 0, "Primary rules differ; open systems are more permeable."),
    q("gov", "parties-interest", "Closed primaries generally require", ["voters to be registered party members to participate", "universal nonpartisan ballots", "judicial approval of each ballot", "a national referendum", "plurality in the electoral college"], 0, "Closed systems restrict participation to party members."),
    q("gov", "parties-interest", "Front-loading refers to", ["states scheduling early primaries/caucuses to gain influence", "loading pork onto bills", "stacking courts", "raising tariffs", "filibustering"], 0, "Early contests get disproportionate attention."),
    q("gov", "parties-interest", "The electoral college means a candidate can", ["win the presidency without winning the national popular vote", "never win without 100% of states", "serve without inauguration", "ignore swing states", "appoint electors after January"], 0, "State-based electors can diverge from the popular vote."),
    q("gov", "parties-interest", "Lobbying is", ["attempts to influence policymakers on behalf of a group", "illegal in all forms", "only courtroom advocacy", "only campaigning door to door", "only social media memes"], 0, "Lobbyists provide information and pressure across branches."),
    q("gov", "parties-interest", "Free riders in interest-group theory are people who", ["benefit without contributing to the group’s efforts", "pay the highest dues", "never consume public goods", "must join by law always", "run for office"], 0, "Public goods create free-rider problems for organizing."),
    q("gov", "parties-interest", "Amicus briefs are a tool interest groups use to", ["influence courts", "veto bills", "draw districts", "print ballots", "set interest rates"], 0, "Groups file friend-of-the-court arguments."),
    q("gov", "parties-interest", "Party platforms are", ["formal statements of a party’s principles and policy goals", "binding treaties", "Supreme Court opinions", "census reports", "executive orders"], 0, "Platforms signal coalition priorities."),
    q("gov", "parties-interest", "Dealignment refers to", ["declining attachment to the major parties", "a sudden lasting realignment only", "merger of both parties", "abolishing primaries", "mandatory party membership"], 0, "More independents / weaker partisanship characterizations."),
    q("gov", "parties-interest", "Ticket splitting means", ["voting for candidates of different parties for different offices", "spoiling a ballot", "running in two states", "filibustering", "gerrymandering"], 0, "Split-ticket voting can produce divided government."),
    q("gov", "parties-interest", "Divided government occurs when", ["presidency and at least one chamber of Congress are controlled by different parties", "all branches share one party", "no elections are held", "courts elect presidents", "states leave the Union"], 0, "It can increase gridlock and bargaining."),
    q("gov", "parties-interest", "The Bipartisan Campaign Reform Act (McCain-Feingold) notably", ["restricted party soft money", "ended all PACs", "banned TV ads forever", "abolished primaries", "created the electoral college"], 0, "It regulated party soft money and electioneering communications (later partly limited by Citizens United)."),
    q("gov", "parties-interest", "Super PACs may", ["raise and spend unlimited sums on independent expenditures (not coordinated with candidates)", "give unlimited direct contributions to candidates", "nominate presidents", "seat members of Congress", "veto statutes"], 0, "Independence from campaigns is the legal key."),
    q("gov", "parties-interest", "Grassroots lobbying seeks to", ["mobilize the public to contact officials", "bribe judges", "rewrite the Constitution secretly", "end elections", "appoint senators"], 0, "Outside strategies pressure officials via constituents."),
    q("gov", "parties-interest", "Astroturf lobbying is criticized as", ["manufactured ‘grassroots’ pressure funded to look spontaneous", "purely educational campus clubs", "court-ordered advocacy", "census outreach", "jury instructions"], 0, "It mimics grassroots without authentic spontaneous origin."),
    q("gov", "parties-interest", "Linkage institutions include", ["parties, elections, interest groups, and media connecting citizens to government", "only the military", "only the Fed", "only state courts", "only treaties"], 0, "They transmit preferences into the political system."),
    q("gov", "parties-interest", "Prospective voting is based on", ["expectations about future performance", "only past party labels", "weather", "ballot color", "random coin flips"], 0, "Voters look forward to likely outcomes."),
    q("gov", "parties-interest", "Retrospective voting is based on", ["evaluations of past performance", "only campaign slogans never tested", "astrology", "court dress codes", "committee seniority alone"], 0, "Voters reward or punish based on recent results."),
    q("gov", "parties-interest", "The motor voter law aimed to", ["ease voter registration (e.g., at DMVs)", "require cars to vote", "end mail ballots", "ban same-day registration everywhere", "privatize elections"], 0, "National Voter Registration Act expanded access points."),
    q("gov", "parties-interest", "Voter ID laws are debated mainly as a tradeoff between", ["ballot security claims and turnout/access concerns", "tariffs and trade", "filibuster and cloture", "federalism and nullification", "vetoes and overrides"], 0, "Empirical and normative disputes surround their effects."),
  ];
  items.push(...partyItems);

  // more party variations
  for (let i = 0; i < 30; i++) {
    const concepts = [
      ["caucus", "party meeting to choose candidates or strategy", "a Supreme Court order", "a type of veto", "a tax", "a treaty"],
      ["primary election", "intraparty contest to select nominees", "general election only", "impeachment trial", "census", "markup"],
      ["national convention", "party gathering that formally nominates presidential ticket and adopts platform", "Senate cloture vote", "cabinet retreat", "judicial conference only", "Fed meeting"],
      ["party machine", "local organization trading patronage for votes", "independent regulatory commission", "Supreme Court majority", "IMF", "NATO"],
      ["realignment of 1932", "New Deal coalition elevated Democrats for decades", "ended parties", "created the Fed", "banned unions", "started Prohibition"],
      ["Southern realignment", "White Southern voters shifted toward Republicans over civil rights and related conflicts", "ended the Senate", "created dual federalism", "banned TV", "started the Whigs"],
      ["interest group litigation", "using lawsuits and test cases to change policy", "only TV ads", "only strikes", "only filibusters", "only tariffs"],
      ["electioneering", "group involvement in campaigns to elect allies", "judicial deliberation", "census counting", "rulemaking comments only", "jury nullification"],
      ["issue advocacy ads", "messages about issues that may influence elections without express advocacy (regulated in evolving ways)", "only candidate debates", "only SCOTUS opinions", "only textbooks", "only treaties"],
      ["bundling", "combining many individual contributions to increase influence", "gerrymandering", "cloture", "incorporation", "appropriations"],
    ];
    const [term, correct, w1, w2, w3, w4] = concepts[i % concepts.length];
    items.push(
      q(
        "gov",
        "parties-interest",
        `(Variation ${i + 1}) Which best describes ${term}?`,
        [correct, w1, w2, w3, w4],
        0,
        `${term}: ${correct}.`
      )
    );
  }

  // ——— Beliefs and behavior ———
  const beliefItems = [
    q("gov", "beliefs-behavior", "Political efficacy refers to", ["the belief that one can understand and influence politics", "mandatory voting", "party dues", "judicial salaries", "tariff rates"], 0, "Higher efficacy correlates with participation."),
    q("gov", "beliefs-behavior", "Political socialization is", ["the process of learning political attitudes and norms", "impeachment", "redistricting", "rulemaking", "cloture"], 0, "Family, school, peers, and media shape orientations."),
    q("gov", "beliefs-behavior", "Public opinion is", ["the distribution of population beliefs about politics and policy", "unanimous elite consensus", "only Twitter", "only election results", "only court polls of justices"], 0, "Surveys estimate aggregate attitudes."),
    q("gov", "beliefs-behavior", "A random sample is important because it", ["gives each person a known chance of selection, improving representativeness", "guarantees 100% accuracy", "includes only donors", "excludes young voters always", "must be larger than the population"], 0, "Probability sampling underpins valid inference."),
    q("gov", "beliefs-behavior", "Sampling error refers to", ["uncertainty because a sample is not the full population", "lying by respondents only", "ballot spoilage", "gerrymandering", "filibusters"], 0, "Margin of error expresses this uncertainty."),
    q("gov", "beliefs-behavior", "Political culture includes", ["shared values and beliefs about how government should operate", "only statutes", "only party platforms", "only campaign ads", "only court dockets"], 0, "Liberty, equality, democracy are often cited U.S. themes."),
    q("gov", "beliefs-behavior", "Turnout is generally higher among", ["older, more educated citizens with stronger partisanship", "noncitizens", "people barred from voting", "infants", "only residents of one city always"], 0, "Resources and mobilization matter."),
    q("gov", "beliefs-behavior", "The gender gap in U.S. politics usually refers to", ["differences in party preference/voting between women and men", "only candidate height", "only debate styles", "only court dress", "only primary calendars"], 0, "Women have leaned more Democratic in many recent elections."),
    q("gov", "beliefs-behavior", "Ideology on a left–right spectrum commonly contrasts", ["liberal and conservative policy preferences", "federal vs county clerks only", "House vs Senate age", "civil vs criminal procedure only", "import vs export licenses"], 0, "Ideology organizes issue attitudes."),
    q("gov", "beliefs-behavior", "Conservatism in contemporary U.S. usage often emphasizes", ["limited government economically and traditional social values (coalitions vary)", "abolishing property", "ending elections", "mandatory unionization always", "open borders as a single definition"], 0, "Coalitions evolve; classic themes include markets and social order."),
    q("gov", "beliefs-behavior", "Liberalism in contemporary U.S. usage often emphasizes", ["government action to promote equality and regulate markets (coalitions vary)", "theocracy", "absolute monarchy", "ending civil liberties", "autarky only"], 0, "Modern American liberalism differs from classical liberalism."),
    q("gov", "beliefs-behavior", "Libertarians typically favor", ["minimal government in both economic and social spheres", "maximum regulation of personal life", "one-party rule", "state religions", "price controls on all goods"], 0, "They prioritize individual liberty."),
    q("gov", "beliefs-behavior", "Media agenda-setting refers to", ["influencing which issues the public finds important", "casting electoral votes", "writing statutes", "seating jurors", "drawing maps"], 0, "Attention shapes perceived importance."),
    q("gov", "beliefs-behavior", "Framing is", ["presenting an issue in a way that shapes interpretation", "counting ballots", "vetoing bills", "confirming judges", "cloture petitions"], 0, "Frames highlight certain considerations."),
    q("gov", "beliefs-behavior", "Selective exposure means people", ["prefer information that fits their views", "read all sides equally always", "never use media", "only watch C-SPAN", "avoid politics entirely always"], 0, "It can reinforce polarization."),
    q("gov", "beliefs-behavior", "Civic duty is the belief that", ["a good citizen should participate, especially by voting", "only elites should vote", "taxes are optional", "parties are illegal", "courts elect presidents"], 0, "Norms of duty raise participation."),
    q("gov", "beliefs-behavior", "High political participation is positively associated with", ["interest, efficacy, and civic duty", "apathy only", "compulsory silence", "random distrust alone", "illiteracy alone"], 0, "Motivation and resources drive engagement."),
    q("gov", "beliefs-behavior", "In recent decades, House election outcomes have been strongly predicted by", ["incumbency", "zodiac signs", "shoe color", "middle initial", "height alone"], 0, "Incumbents win at high rates, though waves occur."),
    q("gov", "beliefs-behavior", "Political trust measures", ["confidence that government will do what is right", "GDP growth", "stock prices", "rainfall", "committee seniority"], 0, "Trust has fluctuated across eras and events."),
    q("gov", "beliefs-behavior", "Cross-cutting cleavages", ["different identities pull citizens in different political directions", "guarantee civil war", "end parties", "ban media", "force unanimity"], 0, "They can moderate conflict compared with reinforcing cleavages."),
    q("gov", "beliefs-behavior", "Reinforcing cleavages", ["align multiple identities the same way, intensifying conflict", "always produce compromise", "eliminate ideology", "end federalism", "create perfect pluralism"], 0, "Stacked divisions can polarize."),
    q("gov", "beliefs-behavior", "Exit polls are conducted", ["as voters leave polling places to project/explain results", "only by the Fed", "only in primaries before 1900", "inside the Supreme Court", "by lottery among senators"], 0, "They estimate vote choices and demographics."),
    q("gov", "beliefs-behavior", "Push polls are criticized because they", ["use leading ‘survey’ questions as persuasion", "are perfectly random", "never mention candidates", "are run only by universities", "measure GDP"], 0, "They are campaign tactics disguised as research."),
    q("gov", "beliefs-behavior", "Socioeconomic status (SES) correlates with", ["higher political participation at higher SES on average", "zero relationship to voting", "mandatory liberalism", "ban on campaigning", "random turnout only"], 0, "Education and income shape resources and engagement."),
    q("gov", "beliefs-behavior", "The bandwagon effect suggests people may", ["support a candidate because they appear to be winning", "always vote retrospectively", "ignore polls", "only vote third party", "refuse socialization"], 0, "Perceived momentum can shape preferences."),
  ];
  items.push(...beliefItems);

  for (let i = 0; i < 40; i++) {
    const prompts = [
      ["agents of socialization", "family, schools, peers, media, and events that shape political views", "only the Supreme Court", "only the Fed", "only treaties", "only tariffs"],
      ["opinion leaders", "influential individuals who shape others’ political views", "random jurors", "census clerks only", "ballots", "vetoes"],
      ["attentive public", "citizens who follow politics closely", "all nonvoters", "only children", "only foreign tourists", "only lobbyists abroad"],
      ["latent opinion", "views that are not firmly held until primed by events or questions", "constitutional amendments", "statutes", "treaties", "executive orders"],
      ["policy mood", "aggregate public preference for more or less government action over time", "a single voter’s ideology only", "committee roster", "whips’ count only", "court docket"],
      ["approval rating", "percent of public approving of an official’s job performance", "electoral votes", "Senator age", "cloture threshold", "margin of statehood"],
      ["horse-race coverage", "media focus on who is winning rather than issues", "in-depth policy analysis only", "C-SPAN gavel-to-gavel alone", "textbook summaries", "court syllabus only"],
      ["sound bite", "short media clip of a candidate statement", "full committee hearing", "complete platform", "statute text", "treaty annex"],
    ];
    const [term, correct, w1, w2, w3, w4] = prompts[i % prompts.length];
    items.push(
      q(
        "gov",
        "beliefs-behavior",
        `Practice item ${i + 1}: ${term} is best defined as`,
        [correct, w1, w2, w3, w4],
        0,
        `${term}: ${correct}.`
      )
    );
  }

  // Ensure 250+
  let n = 0;
  while (items.length < 260) {
    const topic = ["constitutional", "institutions", "civil-liberties", "parties-interest", "beliefs-behavior"][n % 5];
    items.push(
      q(
        "gov",
        topic,
        `CLEP-style drill ${n + 1}: Which statement about American government is most accurate regarding ${TOPIC_HINT[topic]}?`,
        [
          TOPIC_CORRECT[topic],
          "The president may unilaterally amend the Constitution",
          "States may nullify any federal statute at will",
          "The House tries impeachments",
          "Interest groups formally nominate presidents on the ballot",
        ],
        0,
        TOPIC_CORRECT[topic]
      )
    );
    n += 1;
  }

  return finalize(items, "gov");
}

const TOPIC_HINT = {
  constitutional: "federalism and separation of powers",
  institutions: "Congress, the presidency, bureaucracy, or courts",
  "civil-liberties": "rights and liberties",
  "parties-interest": "parties, groups, or elections",
  "beliefs-behavior": "public opinion or participation",
};

const TOPIC_CORRECT = {
  constitutional: "The Constitution divides power among branches and between national and state governments",
  institutions: "Congress makes laws, the president executes them, and courts interpret disputes under law",
  "civil-liberties": "The Bill of Rights and 14th Amendment structure many protections of liberty and equality",
  "parties-interest": "Parties nominate candidates while interest groups try to influence policy without being the ballot label",
  "beliefs-behavior": "Political attitudes form through socialization and shape participation and vote choice",
};

function buildHist() {
  const items = [];

  const early = [
    ["Reconstruction Acts of 1867", "placed former Confederacy under temporary military supervision for readmission", "1865-1914", "political-policy"],
    ["sharecropping after Reconstruction", "many freedpeople returned to plantation labor under constraining credit systems", "1865-1914", "social"],
    ["Compromise of 1877", "disputed election resolved with withdrawal of remaining federal troops from the South", "1865-1914", "political-policy"],
    ["Jim Crow", "state/local segregation laws and customs subordinating African Americans", "1865-1914", "social"],
    ["Plessy v. Ferguson (1896)", "upheld separate but equal segregation", "1865-1914", "political-policy"],
    ["Homestead Act legacy / West", "federal land policy encouraged settlement and conflict over Native lands", "1865-1914", "political-policy"],
    ["Dawes Act", "allotted tribal lands to individuals, undermining communal tribal landholding", "1865-1914", "political-policy"],
    ["Battle of Little Bighorn", "Sioux/Cheyenne victory over Custer amid Black Hills gold and expansion pressures", "1865-1914", "diplomacy"],
    ["Gospel of Wealth", "Carnegie’s idea that the rich should administer wealth for the community’s benefit", "1865-1914", "cultural-intellectual"],
    ["Social Darwinism", "misapplied evolutionary ideas to justify socioeconomic inequality", "1865-1914", "cultural-intellectual"],
    ["Social Gospel", "Protestant reform movement applying Christian ethics to social problems", "1865-1914", "cultural-intellectual"],
    ["Knights of Labor", "inclusive labor organization seeking broad reform in the Gilded Age", "1865-1914", "economic"],
    ["AFL under Gompers", "craft unionism focused on wages, hours, and working conditions (‘pure and simple’)", "1865-1914", "economic"],
    ["Haymarket / strike repression", "labor conflict often met with court injunctions and sometimes federal force", "1865-1914", "economic"],
    ["Sherman Antitrust Act", "federal law targeting monopolistic combinations (uneven early enforcement)", "1865-1914", "political-policy"],
    ["Interstate Commerce Act", "early federal regulation of railroads", "1865-1914", "political-policy"],
    ["political machines", "urban organizations trading patronage for immigrant/working-class votes", "1865-1914", "political-policy"],
    ["settlement houses", "reform institutions (e.g., Hull House) aiding urban poor and immigrants", "1865-1914", "social"],
    ["New Immigration", "large-scale migration from southern and eastern Europe c. 1890–1914", "1865-1914", "social"],
    ["Chinese Exclusion Act", "federal ban on Chinese laborers reflecting nativism", "1865-1914", "social"],
    ["Populists", "agrarian movement demanding free silver, railroad regulation, and democratic reforms", "1865-1914", "political-policy"],
    ["Election of 1896", "McKinley’s win associated Republicans with industry/gold-standard prosperity narrative", "1865-1914", "political-policy"],
    ["William Jennings Bryan", "Democratic/Populist-aligned candidate appealing to free-silver farmers", "1865-1914", "political-policy"],
    ["Turner frontier thesis", "argued the frontier shaped American democracy and character", "1865-1914", "cultural-intellectual"],
    ["Spanish-American War", "U.S. acquired overseas possessions and emerged more imperial", "1865-1914", "diplomacy"],
    ["Philippine-American War", "conflict after U.S. annexation of the Philippines", "1865-1914", "diplomacy"],
    ["Open Door notes", "U.S. policy seeking equal commercial access in China", "1865-1914", "diplomacy"],
    ["Roosevelt Corollary", "asserted U.S. police power in the Western Hemisphere", "1865-1914", "diplomacy"],
    ["Progressive Era goals", "regulate corporations, reduce corruption, and address urban/industrial problems", "1865-1914", "political-policy"],
    ["muckrakers", "investigative journalists exposing corporate and political abuses", "1865-1914", "cultural-intellectual"],
    ["initiative/referendum/recall", "Progressive electoral reforms expanding direct democracy tools", "1865-1914", "political-policy"],
    ["Sixteenth Amendment", "federal income tax", "1865-1914", "political-policy"],
    ["Seventeenth Amendment", "direct election of senators", "1865-1914", "political-policy"],
    ["Eighteenth Amendment", "Prohibition", "1915-present", "political-policy"],
    ["Nineteenth Amendment", "women’s suffrage", "1915-present", "social"],
    ["Booker T. Washington", "emphasized vocational education and economic self-help (Atlanta Compromise context)", "1865-1914", "cultural-intellectual"],
    ["W.E.B. Du Bois", "urged civil/political equality and Niagara Movement / NAACP leadership", "1865-1914", "cultural-intellectual"],
    ["Great Migration beginnings", "African Americans moving from rural South toward cities for work and to escape Jim Crow", "1865-1914", "social"],
    ["Taylorism / scientific management", "efficiency engineering of industrial work", "1865-1914", "economic"],
    ["horizontal/vertical integration", "corporate strategies to dominate markets and supply chains", "1865-1914", "economic"],
    ["trusts and holding companies", "devices concentrating corporate control", "1865-1914", "economic"],
    ["Farmers’ grievances", "debt, railroad rates, and deflation fueled agrarian protest", "1865-1914", "economic"],
    ["Exodusters", "African American migrants to Kansas fleeing Southern oppression", "1865-1914", "social"],
    ["Wounded Knee", "1890 massacre marking a violent end phase of Plains Indian armed resistance", "1865-1914", "diplomacy"],
    ["Annexation of Hawaii", "U.S. imperial expansion in the Pacific", "1865-1914", "diplomacy"],
    ["Panama Canal", "strategic U.S.-backed route after supporting Panama’s separation from Colombia", "1865-1914", "diplomacy"],
    ["Pure Food and Drug Act", "Progressive consumer protection legislation", "1865-1914", "political-policy"],
    ["Meat Inspection Act", "federal sanitary standards for meatpacking", "1865-1914", "political-policy"],
    ["Clayton Antitrust Act", "strengthened antitrust tools and labor exemptions in Progressive era", "1865-1914", "political-policy"],
    ["Federal Reserve Act", "created the central banking system (1913)", "1865-1914", "economic"],
  ];

  for (const [term, correct, era, topic] of early) {
    items.push(
      q(
        "hist",
        topic,
        `Which statement best describes ${term}?`,
        [
          correct,
          "It abolished the Supreme Court",
          "It ended all immigration permanently",
          "It created a parliamentary system",
          "It banned industrial capitalism overnight",
        ],
        0,
        `${term}: ${correct}.`,
        { era }
      )
    );
    items.push(
      q(
        "hist",
        topic,
        `A historian discussing "${correct}" is most clearly referring to`,
        [term, "the New Deal coalition only", "NAFTA", "the Great Society’s Medicare alone", "the Iraq War surge"],
        0,
        `That description matches ${term}.`,
        { era }
      )
    );
  }

  const modern = [
    ["Fourteen Points", "Wilson’s wartime ideals including self-determination and a League of Nations", "1915-present", "diplomacy"],
    ["Treaty of Versailles fight", "Senate rejected League membership; U.S. did not join the League", "1915-present", "diplomacy"],
    ["U.S. as creditor after WWI", "United States emerged as a leading creditor nation", "1915-present", "economic"],
    ["First Red Scare", "post-WWI anti-radical crackdowns (Palmer Raids context)", "1915-present", "political-policy"],
    ["Great Migration peak eras", "African American movement to Northern/Western cities accelerated by war industry", "1915-present", "social"],
    ["Harlem Renaissance", "flourishing of Black arts and letters in the 1920s", "1915-present", "cultural-intellectual"],
    ["Lost Generation", "disillusioned postwar writers such as Hemingway abroad", "1915-present", "cultural-intellectual"],
    ["Scopes Trial", "conflict over teaching evolution; culture war symbol", "1915-present", "cultural-intellectual"],
    ["Immigration Act of 1924", "national-origins quotas restricting immigration", "1915-present", "social"],
    ["Prohibition", "constitutional ban on alcohol that fueled crime and repeal movement", "1915-present", "social"],
    ["Stock Market Crash 1929", "triggered cascading financial crisis deepening the Great Depression", "1915-present", "economic"],
    ["New Deal", "FDR’s programs expanding federal role in relief, recovery, and reform", "1915-present", "political-policy"],
    ["Social Security Act", "established old-age pensions and unemployment insurance framework", "1915-present", "political-policy"],
    ["Wagner Act", "strengthened labor’s right to organize and bargain", "1915-present", "economic"],
    ["Court-packing plan", "FDR’s failed bid to enlarge the Supreme Court", "1915-present", "political-policy"],
    ["Lend-Lease", "U.S. aid to Allies before formal entry into WWII", "1915-present", "diplomacy"],
    ["Pearl Harbor", "Japanese attack bringing the U.S. into WWII", "1915-present", "diplomacy"],
    ["Japanese American incarceration", "forced removal/internment upheld in Korematsu, later repudiated", "1915-present", "social"],
    ["D-Day", "Allied invasion of Normandy, 1944", "1915-present", "diplomacy"],
    ["Manhattan Project", "secret U.S. atomic bomb development", "1915-present", "cultural-intellectual"],
    ["United Nations founding", "postwar international organization with U.S. as key member", "1915-present", "diplomacy"],
    ["Containment", "U.S. strategy to limit Soviet expansion (Kennan)", "1915-present", "diplomacy"],
    ["Marshall Plan", "economic aid to rebuild Western Europe", "1915-present", "diplomacy"],
    ["NATO", "peacetime military alliance of U.S. and Western partners", "1915-present", "diplomacy"],
    ["Korean War", "cold war hot war under UN auspices; armistice, not full peace treaty", "1915-present", "diplomacy"],
    ["McCarthyism", "reckless anti-communist accusations damaging civil liberties", "1915-present", "political-policy"],
    ["Brown v. Board (1954)", "school segregation unconstitutional", "1915-present", "political-policy"],
    ["Montgomery Bus Boycott", "mass protest launching King to national leadership", "1915-present", "social"],
    ["Civil Rights Act 1964", "banned segregation in public accommodations and employment discrimination", "1915-present", "political-policy"],
    ["Voting Rights Act 1965", "federal protections against discriminatory voting barriers", "1915-present", "political-policy"],
    ["Great Society", "LBJ programs targeting poverty and expanding welfare state (Medicare/Medicaid)", "1915-present", "political-policy"],
    ["Vietnam War escalation", "U.S. combat role expanded; domestic polarization surged", "1915-present", "diplomacy"],
    ["Tet Offensive", "1968 turning point undermining claims of imminent victory", "1915-present", "diplomacy"],
    ["Betty Friedan / feminism", "The Feminine Mystique catalyzed second-wave feminism", "1915-present", "cultural-intellectual"],
    ["Stonewall", "1969 uprising catalyzing LGBTQ+ activism", "1915-present", "social"],
    ["Environmentalism 1970s", "EPA, Earth Day, and major environmental statutes", "1915-present", "political-policy"],
    ["Watergate", "scandal leading to Nixon’s resignation", "1915-present", "political-policy"],
    ["Stagflation", "1970s mix of inflation and stagnation challenging Keynesian assumptions", "1915-present", "economic"],
    ["Oil shocks", "OPEC-related supply shocks raised energy prices", "1915-present", "economic"],
    ["Detente", "easing of Cold War tensions in the 1970s", "1915-present", "diplomacy"],
    ["Iran Hostage Crisis", "humiliated Carter; boosted Reagan’s 1980 message", "1915-present", "diplomacy"],
    ["Reaganomics", "tax cuts, deregulation, and anti-inflation priority; deficits rose", "1915-present", "economic"],
    ["SDI / arms race late Cold War", "military pressure alongside diplomacy toward Soviet decline", "1915-present", "diplomacy"],
    ["End of Cold War", "Soviet collapse reshaped U.S. global strategy", "1915-present", "diplomacy"],
    ["NAFTA", "North American free trade agreement of the 1990s", "1915-present", "economic"],
    ["Welfare reform 1996", "TANF replaced AFDC with work requirements/time limits", "1915-present", "political-policy"],
    ["September 11, 2001", "terror attacks prompting War on Terror and Afghanistan invasion", "1915-present", "diplomacy"],
    ["Iraq War 2003", "U.S.-led invasion based on WMD claims later discredited", "1915-present", "diplomacy"],
    ["Great Recession", "2007–09 financial crisis; major stimulus and financial reform", "1915-present", "economic"],
    ["Affordable Care Act", "expanded health insurance coverage via markets/Medicaid expansion", "1915-present", "political-policy"],
    ["Obergefell (2015)", "nationwide recognition of same-sex marriage", "1915-present", "social"],
    ["COVID-19 pandemic", "public health emergency with massive fiscal response and social disruption", "1915-present", "social"],
  ];

  for (const [term, correct, era, topic] of modern) {
    items.push(
      q(
        "hist",
        topic,
        `Which statement best describes ${term}?`,
        [
          correct,
          "It restored the Articles of Confederation",
          "It abolished Congress",
          "It ended all foreign trade permanently",
          "It banned presidential elections",
        ],
        0,
        `${term}: ${correct}.`,
        { era }
      )
    );
  }

  // Chronology / EXCEPT / compare items
  const specials = [
    q("hist", "political-policy", "Which best describes most freedpeople’s economic situation after Reconstruction?", ["Many became sharecroppers tied to landowners and creditors", "Most received large Western homesteads from Congress", "Most immediately entered the industrial middle class", "Most emigrated to Africa under federal mandate", "Most gained equal land redistribution nationwide"], 0, "Promise of land largely failed; sharecropping dominated.", { era: "1865-1914" }),
    q("hist", "economic", "Anticombination (antitrust) laws of the late 19th century responded mainly to", ["stockholding trusts creating monopolies", "labor unions alone", "free silver", "Prohibition", "the Fed"], 0, "States and then federal law targeted monopoly combinations.", { era: "1865-1914" }),
    q("hist", "social", "Between 1890 and 1914, most U.S. immigrants came from", ["southern and eastern Europe", "only Scandinavia", "only Latin America", "only East Asia", "only Canada"], 0, "‘New immigrants’ transformed urban America.", { era: "1865-1914" }),
    q("hist", "diplomacy", "All of the following appear among Wilson’s Fourteen Points EXCEPT", ["a permanently partitioned Germany into many microstates as a listed Point", "freedom of the seas", "open covenants of peace / open diplomacy", "a general association of nations", "an independent Poland"], 0, "The Fourteen Points emphasized open diplomacy, freedom of the seas, self-determination themes, an independent Poland, and a league of nations—not a listed plan to permanently shard Germany into microstates.", { era: "1915-present" }),
    q("hist", "cultural-intellectual", "Henry Ford’s assembly line most directly", ["reduced the need for skilled craft labor per vehicle", "raised auto prices sharply by design", "ended consumer credit", "abolished wages", "banned women from factories"], 0, "Mass production deskilled some tasks and lowered costs.", { era: "1915-present" }),
    q("hist", "economic", "A direct consequence of mass production in the 1920s was", ["growth of a consumer economy with new credit practices", "immediate end of poverty", "collapse of advertising", "return to agrarian majority instantly", "abolition of corporations"], 0, "Consumer durables and installment buying spread.", { era: "1915-present" }),
    q("hist", "political-policy", "The New Deal primarily", ["expanded the federal government’s responsibility for economic security", "abolished capitalism", "ended all state governments", "banned unions", "repealed the income tax"], 0, "It remade expectations of federal economic management.", { era: "1915-present" }),
    q("hist", "diplomacy", "Containment was designed to", ["prevent the spread of Soviet communism", "restore the League of Nations exactly", "end NATO", "annex Eastern Europe to the U.S.", "abolish nuclear weapons in 1947"], 0, "Kennan’s strategy shaped early Cold War policy.", { era: "1915-present" }),
    q("hist", "social", "The Civil Rights Movement’s nonviolent phase most famously used", ["boycotts, sit-ins, marches, and litigation", "only armed seizure of Congress", "only presidential decrees without activism", "only European diplomacy", "only tariff protests"], 0, "Multiple tactics reinforced legislative breakthroughs.", { era: "1915-present" }),
    q("hist", "cultural-intellectual", "Second-wave feminism focused especially on", ["workplace equality, reproductive rights, and challenging domestic norms", "only Prohibition repeal", "only free silver", "only annexing Cuba", "only the gold standard"], 0, "It broadened beyond suffrage.", { era: "1915-present" }),
    q("hist", "diplomacy", "The Spanish-American War marked", ["a turn toward overseas imperialism", "the end of Reconstruction", "the start of the New Deal", "NATO’s founding", "the moon landing"], 0, "Puerto Rico, Guam, and the Philippines signaled empire.", { era: "1865-1914" }),
    q("hist", "economic", "The Great Depression was deepened by", ["bank failures, falling demand, and inadequate early federal response", "too much New Deal spending in 1928", "universal health care in 1929", "NAFTA", "the internet bubble"], 0, "Multiple shocks and policy mistakes worsened the collapse.", { era: "1915-present" }),
    q("hist", "political-policy", "Lyndon Johnson’s Great Society is most associated with", ["Medicare, Medicaid, and War on Poverty programs", "Repeal of Social Security", "Ending the income tax", "Abolishing civil rights laws", "Closing public schools"], 0, "It expanded the mid-century liberal state.", { era: "1915-present" }),
    q("hist", "diplomacy", "Nixon’s visit to China is an example of", ["diplomatic opening amid Cold War triangular politics", "joining the Warsaw Pact", "ending the UN", "annexing Taiwan", "the Marshall Plan"], 0, "Rapprochement altered Cold War dynamics.", { era: "1915-present" }),
    q("hist", "economic", "Deindustrialization in the late 20th century involved", ["decline of manufacturing employment in many regions", "return to exclusive agrarian life nationwide", "ban on services", "end of trade", "abolition of the dollar"], 0, "Globalization and technology shifted the occupational structure.", { era: "1915-present" }),
    q("hist", "social", "Suburbanization after WWII was encouraged by", ["highways, VA/FHA lending, and baby-boom housing demand", "the end of cars", "mandatory urban communes", "Chinese Exclusion", "sharecropping"], 0, "Federal policy and prosperity reshaped metropolitan geography.", { era: "1915-present" }),
    q("hist", "cultural-intellectual", "Abstract Expressionism is associated with", ["mid-20th-century American painters such as Jackson Pollock", "Hudson River School only", "colonial portraiture only", "Ashcan School exclusively in 1900", "muckraking journalism"], 0, "It became a Cold War–era cultural symbol of American modernism.", { era: "1915-present" }),
    q("hist", "cultural-intellectual", "The Ashcan School depicted", ["urban realism in early 20th-century American art", "pure geometric abstraction only", "medieval iconography", "Soviet socialist realism mandates in the U.S.", "Pop Art advertising of the 1960s only"], 0, "Artists like John Sloan painted everyday city life.", { era: "1865-1914" }),
    q("hist", "diplomacy", "The Gulf of Tonkin Resolution", ["authorized broad presidential military action in Vietnam", "ended the draft", "created NATO", "repealed the New Deal", "admitted Hawaii"], 0, "It became a legal/political basis for escalation.", { era: "1915-present" }),
    q("hist", "political-policy", "The Conservative Movement culminating in Reagan’s election emphasized", ["anti-communism, lower taxes, and skepticism of Great Society liberalism", "expanding AFDC without changes", "joining the Warsaw Pact", "abolishing the military", "repealing the two-party system"], 0, "Fusionist conservatism reshaped the GOP.", { era: "1915-present" }),
  ];
  items.push(...specials);

  // Expand to 300+ with era-tagged drills
  const expandTopics = [
    ["political-policy", "1915-present", "The GI Bill"],
    ["political-policy", "1915-present", "Truman’s Fair Deal"],
    ["political-policy", "1915-present", "Eisenhower’s modern Republicanism"],
    ["political-policy", "1915-present", "The War Powers debate after Vietnam"],
    ["political-policy", "1915-present", "Clinton’s triangulation"],
    ["political-policy", "1915-present", "The Contract with America"],
    ["political-policy", "1865-1914", "Radical Reconstruction"],
    ["political-policy", "1865-1914", "Redeemers’ Redeemer governments"],
    ["social", "1915-present", "The baby boom"],
    ["social", "1915-present", "White flight"],
    ["social", "1915-present", "The AIDS crisis"],
    ["social", "1915-present", "Mass incarceration debates"],
    ["social", "1865-1914", "Nativism in the Gilded Age"],
    ["social", "1865-1914", "Child labor"],
    ["economic", "1915-present", "The postwar economic boom"],
    ["economic", "1915-present", "Stagflation"],
    ["economic", "1915-present", "Financial deregulation debates"],
    ["economic", "1865-1914", "Railroad consolidation"],
    ["economic", "1865-1914", "The gold standard politics"],
    ["cultural-intellectual", "1915-present", "McCarthy-era blacklists"],
    ["cultural-intellectual", "1915-present", "The counterculture"],
    ["cultural-intellectual", "1915-present", "Religious Right mobilization"],
    ["cultural-intellectual", "1865-1914", "Pragmatism in philosophy"],
    ["cultural-intellectual", "1865-1914", "Realism in American literature"],
    ["diplomacy", "1915-present", "The Cuban Missile Crisis"],
    ["diplomacy", "1915-present", "SALT agreements"],
    ["diplomacy", "1915-present", "The Gulf War (1991)"],
    ["diplomacy", "1865-1914", "Dollar diplomacy"],
    ["diplomacy", "1865-1914", "Missionary / moral diplomacy under Wilson"],
  ];

  const blurbs = {
    "The GI Bill": "provided education and housing benefits to WWII veterans, fueling middle-class growth",
    "Truman’s Fair Deal": "proposed expanding New Deal liberalism after WWII with mixed success",
    "Eisenhower’s modern Republicanism": "accepted a core welfare/state security framework while favoring fiscal caution",
    "The War Powers debate after Vietnam": "Congress sought to restrain unilateral presidential war-making",
    "Clinton’s triangulation": "adopted centrist positions between liberal Democrats and GOP",
    "The Contract with America": "1994 GOP agenda emphasizing reform, welfare, and fiscal themes",
    "Radical Reconstruction": "Congressional Republicans imposed stricter terms on the former Confederacy",
    "Redeemers’ Redeemer governments": "white Southern Democrats regained control and rolled back Reconstruction gains",
    "The baby boom": "sharp rise in births after WWII reshaping schools, suburbs, and culture",
    "White flight": "migration of white families from cities to suburbs amid demographic change",
    "The AIDS crisis": "epidemic that spurred activism and public-health politics from the 1980s",
    "Mass incarceration debates": "late-20th-century surge in imprisonment with racial disparities",
    "Nativism in the Gilded Age": "hostility to immigrants, especially Catholics, Jews, and Asians",
    "Child labor": "industrial exploitation of children targeted by Progressive reformers",
    "The postwar economic boom": "broad prosperity 1945–early 1970s with rising living standards",
    "Stagflation": "simultaneous inflation and stagnation in the 1970s",
    "Financial deregulation debates": "late-century shifts expanding market competition and risk",
    "Railroad consolidation": "corporate combination transforming continental markets",
    "The gold standard politics": "currency conflict pitting creditors/industry against free-silver agrarians",
    "McCarthy-era blacklists": "entertainment and other industries punished alleged subversives",
    "The counterculture": "1960s youth revolt against mainstream norms and the Vietnam War",
    "Religious Right mobilization": "conservative evangelicals entered politics on social issues",
    "Pragmatism in philosophy": "American school emphasizing practical consequences of ideas (James/Dewey)",
    "Realism in American literature": "depicted ordinary life and social problems after the Civil War",
    "The Cuban Missile Crisis": "1962 nuclear standoff resolved by Soviet missile withdrawal and U.S. pledges",
    "SALT agreements": "strategic arms limitation talks between U.S. and USSR",
    "The Gulf War (1991)": "U.S.-led coalition expelled Iraq from Kuwait",
    "Dollar diplomacy": "Taft-era use of economic power to extend influence abroad",
    "Missionary / moral diplomacy under Wilson": "foreign policy framed in moral/democratic terms, unevenly applied",
  };

  expandTopics.forEach(([topic, era, term], idx) => {
    const correct = blurbs[term];
    items.push(
      q(
        "hist",
        topic,
        `Which best characterizes ${term}?`,
        [
          correct,
          "It repealed the Bill of Rights",
          "It dissolved the Union",
          "It ended all political parties",
          "It banned factories nationwide",
        ],
        0,
        `${term}: ${correct}.`,
        { era }
      )
    );
    items.push(
      q(
        "hist",
        topic,
        `Drill ${idx + 1}: "${correct}" describes`,
        [term, "the Embargo Act of 1807", "Shays’ Rebellion", "the Missouri Compromise alone", "the Hartford Convention"],
        0,
        `Matches ${term}.`,
        { era }
      )
    );
  });

  const moreModern = [
    ["Camp David Accords", "Carter-brokered Egypt–Israel peace framework", "1915-present", "diplomacy"],
    ["Iran-Contra", "Reagan-era scandal over arms sales and Nicaraguan Contra aid", "1915-present", "political-policy"],
    ["Moral Majority", "Religious conservative organization mobilizing evangelical voters", "1915-present", "cultural-intellectual"],
    ["Rust Belt", "Manufacturing regions hit by deindustrialization", "1915-present", "economic"],
    ["Sunbelt growth", "Population and political power shift toward South and West", "1915-present", "social"],
    ["Silent Spring", "Rachel Carson’s book catalyzing modern environmentalism", "1915-present", "cultural-intellectual"],
    ["Freedom Summer", "1964 voter registration drive in Mississippi", "1915-present", "social"],
    ["Black Power", "Late-1960s movement emphasizing pride, autonomy, and sometimes self-defense", "1915-present", "social"],
    ["Kent State", "1970 National Guard shootings of antiwar protesters", "1915-present", "social"],
    ["Pentagon Papers", "Leaked Vietnam study intensifying distrust; prior-restraint fight", "1915-present", "political-policy"],
    ["Watergate burglary", "Nixon campaign operation that unraveled into constitutional crisis", "1915-present", "political-policy"],
    ["Ford’s pardon of Nixon", "Controversial move aimed at moving past Watergate", "1915-present", "political-policy"],
    ["Reagan Doctrine", "Support for anti-communist insurgents in the Third World", "1915-present", "diplomacy"],
    ["INF Treaty", "1987 U.S.–Soviet agreement eliminating intermediate-range nukes", "1915-present", "diplomacy"],
    ["Don’t Ask Don’t Tell", "1990s–2011 policy restricting open LGBTQ+ military service", "1915-present", "social"],
    ["Bush v. Gore", "2000 election dispute resolved by Supreme Court effectively awarding Florida", "1915-present", "political-policy"],
    ["Patriot Act", "Post-9/11 surveillance and security legislation", "1915-present", "political-policy"],
    ["Hurricane Katrina", "2005 disaster exposing response failures and inequality", "1915-present", "social"],
    ["Tea Party", "Conservative populist mobilization against taxes and ACA-era spending", "1915-present", "political-policy"],
    ["Americans with Disabilities Act", "1990 civil rights law barring disability discrimination", "1915-present", "social"],
    ["No Child Left Behind", "Standards-and-testing education reform under George W. Bush", "1915-present", "political-policy"],
    ["Digital economy", "Internet commercialization transforming work and media", "1915-present", "economic"],
    ["Service economy shift", "Employment moved toward services over manufacturing", "1915-present", "economic"],
    ["Culture wars", "Conflicts over religion, education, gender, and media", "1915-present", "cultural-intellectual"],
    ["Cuban Missile Crisis resolution", "Soviet missiles withdrawn after 1962 nuclear standoff", "1915-present", "diplomacy"],
    ["SALT process", "Strategic arms limitation talks between U.S. and USSR", "1915-present", "diplomacy"],
    ["Me Too movement", "Mass reckoning with sexual harassment and assault", "1915-present", "social"],
    ["Black Lives Matter", "Movement against police violence and systemic racism", "1915-present", "social"],
    ["Great Recession stimulus", "Major fiscal and financial responses to 2007–09 crisis", "1915-present", "economic"],
    ["Paris Climate politics", "U.S. join/withdraw/rejoin cycle over climate commitments", "1915-present", "diplomacy"],
  ];

  for (const [term, correct, era, topic] of moreModern) {
    items.push(
      q(
        "hist",
        topic,
        `Which statement best describes ${term}?`,
        [
          correct,
          "It restored British colonial rule",
          "It abolished the Senate",
          "It ended westward expansion in 1803",
          "It repealed the Fourteenth Amendment",
        ],
        0,
        `${term}: ${correct}.`,
        { era }
      )
    );
    items.push(
      q(
        "hist",
        topic,
        `Select the best match for: "${correct}"`,
        [term, "the Whiskey Rebellion", "the Era of Good Feelings", "the Alien and Sedition Acts alone", "the Northwest Ordinance"],
        0,
        `Matches ${term}.`,
        { era }
      )
    );
  }

  // Pad primarily with modern-era variations to approach CLEP chronology mix
  let i = 0;
  const padPool = [...modern, ...moreModern, ...modern];
  while (items.length < 320) {
    const [term, correct, era, topic] = padPool[i % padPool.length];
    items.push(
      q(
        "hist",
        topic,
        `Variation set ${i + 1}: Identify the correct association for ${term}.`,
        [
          correct,
          "Immediate repeal of the Constitution",
          "Creation of a hereditary monarchy",
          "Permanent ban on interstate commerce",
          "Abolition of state governments in 1800",
        ],
        0,
        `${term}: ${correct}.`,
        { era }
      )
    );
    i += 1;
  }

  return finalize(items, "hist");
}

function finalize(items, exam) {
  // shuffle choices so correct isn't always A
  return items.map((item, index) => {
    const correctText = item.choices[item.correctIndex];
    const others = item.choices.filter((_, idx) => idx !== item.correctIndex);
    // rotate based on index
    const rotated = [...others];
    const insertAt = index % 5;
    const choices = [...rotated.slice(0, insertAt), correctText, ...rotated.slice(insertAt)];
    // ensure 5 choices
    while (choices.length < 5) choices.push("None of these historical claims is accurate in standard survey texts");
    const five = choices.slice(0, 5);
    const correctIndex = five.indexOf(correctText);
    return {
      id: `${exam}-${String(index + 1).padStart(4, "0")}`,
      exam,
      topic: item.topic,
      stem: item.stem,
      choices: five,
      correctIndex,
      explanation: item.explanation,
      ...(item.era ? { era: item.era } : {}),
      ...(item.tags ? { tags: item.tags } : {}),
    };
  });
}

function emit(file, exportName, examLabel, items) {
  const body = `import type { Question } from "@/lib/types";

/** Original CLEP-style practice items for ${examLabel}. Not official College Board questions. */
export const ${exportName}: Question[] = ${JSON.stringify(items, null, 2)};

export const ${exportName}ById = Object.fromEntries(${exportName}.map((q) => [q.id, q]));
`;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, body);
  console.log(`Wrote ${items.length} questions -> ${file}`);
}

const gov = buildGov();
const hist = buildHist();
emit(path.join(root, "gov/questions.ts"), "govQuestions", "American Government", gov);
emit(path.join(root, "hist/questions.ts"), "histQuestions", "U.S. History II", hist);

const counts = (items) =>
  items.reduce((acc, q) => {
    acc[q.topic] = (acc[q.topic] || 0) + 1;
    return acc;
  }, {});
console.log("Gov topics", counts(gov));
console.log("Hist topics", counts(hist));
console.log(
  "Hist eras",
  hist.reduce((acc, q) => {
    acc[q.era || "none"] = (acc[q.era || "none"] || 0) + 1;
    return acc;
  }, {})
);