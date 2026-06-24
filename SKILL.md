---
name: prompt-optimizer
version: 2.2.0
allowed-tools: "Read TodoWrite"
compatibility: skill runtime requires Claude Code >= 1.0.0; CLI / test commands require Node.js 16+
description: Optimize and rewrite prompts using 61 frameworks (APE, RACE, CRISPE, Chain-of-Thought, COAST, SMART, etc.). Trigger on "optimize prompt", "improve this prompt", "make this prompt better", "rewrite for AI", "优化提示词", "改写 prompt", "优化指令", "让提示词更好", "帮我把这个写成 prompt" or any vague/short instruction the user wants turned into a high-quality prompt — even if the user only says "make this clearer" or "help me write this". Also trigger whenever the user pastes raw text and asks for a structured AI-ready version, or expresses dissatisfaction with AI output quality without naming a fix. Always use this skill when the user inputs vague instructions, needs prompt optimization, or is dissatisfied with AI output quality.
---

# Prompt Optimizer v2.2

Helps users select the most suitable prompt framework for a given task context and generates clearer, more actionable prompts.

---

## Design Patterns

This skill primarily uses:
- **Reviewer**: First diagnose problems with the user's existing prompt or task description
- **Inversion**: When information is insufficient, ask for goals, audience, constraints, and format before proceeding
- **Generator**: Generate an optimized prompt based on the selected framework
- **Validator**: Verify that the optimized result meets quality standards

## Gotchas

- Don't jump straight to a framework — first determine whether the task actually needs a complex one
- **CRITICAL — Don't over-engineer simple prompts**: If the user's input is a single sentence or has ≤ 3 elements (Step 1 complexity = Simple), use a Simple-tier framework (APE, ERA, TAG) and output the Basic version. Adding RACE/CRISPE/Chain-of-Thought to a "rewrite this sentence" request bloats the prompt and makes the AI's output worse, not better. Complexity inflation is the #1 quality risk in prompt optimization.
- If the user only wants a quick polish on one sentence, don't force a long structured template
- If goal, audience, or output format are unclear, ask only the minimum necessary questions
- Explaining why you chose a framework is more valuable than listing many framework names
- **Boundary handling**: If the user's input is completely unintelligible, guide them with examples
- **Refusal handling**: If the user refuses to answer clarifying questions, proceed with smart defaults

---

## Workflow

**Track progress with `TodoWrite`** — at Step 1, create one task per workflow step below, then mark each `in_progress` → `completed` as you go. Do not rely on a plain-text checklist; the harness only enforces what's in the task list.

The seven steps:
1. Analyze User Input
2. Match Scenario and Select Framework
3. Load Framework Details
4. Clarify Ambiguities
5. Generate Optimized Prompt
6. Quality Validation
7. Present Results

### Step 1: Analyze User Input

Receive the user's request. It will be one of:

- A raw prompt that needs optimization
- A task description or requirement  
- A vague idea that needs to be turned into a prompt

Classify the input clarity first: completely vague → offer 3 examples; partially clear → ask key questions (Step 4); completely clear → proceed. For the full boundary-handling table and vague-input example, see [`references/Decision_Tables.md#boundary-handling`](references/Decision_Tables.md#boundary-handling).

**Complexity Assessment (REQUIRED before Step 2):**

Must be performed before framework selection — matching a Simple task to a Complex framework produces a bloated prompt that makes AI output worse, not better (see Gotchas). See [references/Quick_Reference.md](references/Quick_Reference.md) for real-world examples.

Count the number of distinct task elements present in the user's input. See [`references/Decision_Tables.md`](references/Decision_Tables.md#element-definitions) for the full element list with examples.

Classify complexity by element count:

| Complexity | Element count | Signal words in user input |
|------------|---------------|---------------------------|
| **Simple** | ≤ 3 | "just", "quick", "simple", "polish", single-sentence requests |
| **Medium** | 4–5 | Multi-sentence with some detail, mentions audience or format |
| **Complex** | 6+ | Detailed specs, multiple constraints, examples + role + format |

Record the complexity classification — it drives framework selection (Step 2), version default (Step 5), and CLARITY threshold (Step 6).

---

### Step 2: Match Scenario and Select Framework

Identify the user's scenario and match the most suitable framework(s) by evaluating all three dimensions:

**Framework Selection Guide by Complexity:**

| Complexity | Recommended Frameworks |
|------------|----------------------|
| Simple (≤3 elements) | APE, ERA, TAG, RTF, BAB, PEE, ELI5 |
| Medium (4-5 elements) | RACE, COAST, ROSES, Chain-of-Thought, SMART, FOCUS |
| Complex (6+ elements) | RACEF, CRISPE, RISEN |

**Framework Selection Guide by Domain:**

For the full domain-to-framework mapping, see [`references/Decision_Tables.md#framework-selection-guide-by-domain`](references/Decision_Tables.md#framework-selection-guide-by-domain).

**Framework Selection Explanation:**

After selecting a framework, you must explain:
1. **Why this framework**: Which of the user's needs does it match?
2. **Confidence score**: 1–10, indicating how certain the match is
3. **Alternatives**: If confidence < 7, provide 1–2 alternative frameworks

Example:
```
Selected framework: RACE (Role-Action-Context-Expectation)
Reason: The user needs a role-play dialogue and has provided detailed background.
        RACE's Context and Expectation elements organize this information well.
Confidence: 8/10
Alternative: COAST (if the user needs to emphasize interaction steps)
```

**Anti-patterns (MUST avoid):**

For a detailed anti-patterns reference, see [`references/Decision_Tables.md#anti-patterns`](references/Decision_Tables.md#anti-patterns).

---

### Step 3: Load Framework Details

**Lookup-first — always read `frameworks/index.json` to resolve the framework's `file`, `elements`, `domains`, and `use_cases`. The index is the source of truth; do not guess paths.**

Load the resolved file only when you need the full structure, example, or usage tips:
- Simple frameworks: `frameworks/simple/{framework}.md`
- Medium frameworks: `frameworks/medium/{framework}.md`
- Complex frameworks: `frameworks/complex/{framework}.md`
- Patterns: `frameworks/patterns/{pattern}.md`

Framework files contain:
1. Full structure description
2. Applicable scenarios
3. Usage examples
4. Best practices

---

### Step 4: Clarify Ambiguities

Before generating the final prompt, verify with the user. These four dimensions are chosen because each independently changes the prompt's shape — omitting any one leaves a blind spot the AI must guess at, and guesses produce inconsistent output.

1. **Goal Clarity**: Is the intended outcome clear? → *Without a concrete goal, the AI optimizes for the wrong metric (e.g., creativity vs. accuracy).*
2. **Target Audience**: Who will receive the AI's response? → *Audience determines vocabulary, depth, and assumptions the AI can make.*
3. **Context Completeness**: Is sufficient background information provided? → *Missing context forces the AI to hallucinate or hedge, reducing usefulness.*
4. **Format Requirements**: Are there specific output format needs? → *Format mismatches (prose vs. JSON vs. table) make the result unusable even if content is correct.*
5. **Constraints**: Are there any limitations or restrictions? → *Unstated constraints (length, tone, exclusions) cause the AI to over- or under-deliver.*

**Clarifying Questions Template:**
```
To generate the best prompt for you, I need to know:

1. **Goal**: What specific outcome do you want to achieve?
   e.g., "Get copy ready to publish" vs. "Get creative inspiration"

2. **Audience**: Who will read the AI's output?
   e.g., "Technical experts" vs. "General consumers"

3. **Format**: What output format do you need?
   e.g., "Bullet points" vs. "Full paragraphs" vs. "Table"

4. **Constraints**: Any limitations?
   e.g., word count limit, style requirements, content to include or exclude

Please answer the questions above, or say "default" to use standard settings.
```

**Refusal Handling:**

If the user declines to answer, continue with smart defaults (Goal: "high-quality content", Audience: "general professionals", Format: "structured text", Constraints: "none"). For the full refusal-response matrix, see [`references/Decision_Tables.md#refusal-handling`](references/Decision_Tables.md#refusal-handling).

---

### Step 5: Generate Optimized Prompt

Apply the selected framework to build the final prompt:

**Multi-Version Output:**

Provide 1–3 versions based on user needs. See [`references/Decision_Tables.md#version-characteristics`](references/Decision_Tables.md#version-characteristics) for a summary of each version.

**Version Selection Guide:**

**Version Selection Guide:**
- User says "keep it simple" / "quick": Provide Basic version
- User says "more detail" / "complete": Provide Enhanced version
- User says "best possible" / "professional": Provide Expert version
- No clear preference + **Simple** complexity (Step 1): Provide **Basic** version — do not inflate a simple task to Enhanced/Expert
- No clear preference + **Medium/Complex** complexity: Provide Enhanced version + note that upgrade/downgrade is available

---

### Step 6: Quality Validation

**CRITICAL STEP**

Validate the optimized prompt using the **CLARITY Checklist**. Each item is a binary pass/fail. For the full pass-criteria rubric, see [`references/Decision_Tables.md#clarity-scoring-rubric`](references/Decision_Tables.md#clarity-scoring-rubric). Quick summary:

| Letter | Element | One-line trigger |
|--------|---------|-----------------|
| **C** | Context | Names specific background (not just "business setting") |
| **L** | Logic | Prescribes reasoning method or ordered sub-steps |
| **A** | Action | Contains a specific imperative verb (write, classify, refactor…) |
| **R** | Role | Assigns expert identity with domain + seniority |
| **I** | Input/Output | Names both input shape and output structure |
| **T** | Tone | Constrains voice to a named style or audience |
| **Y** | Yardstick | States ≥1 measurable acceptance criterion |

Compute the score: count items that pass.

**Validation thresholds (by task complexity):**
For rationale, see [`references/Decision_Tables.md#clarity-scoring-rubric`](references/Decision_Tables.md#clarity-scoring-rubric).

| Task complexity | Required score | Action on fail |
|-----------------|----------------|----------------|
| Simple          | ≥ 3 / 7        | Add the lowest-cost missing element (skip Role if format-only) |
| Medium          | ≥ 5 / 7        | Add the 1–2 missing elements with the highest impact |
| Complex         | ≥ 6 / 7        | Iterate until threshold met; never present below threshold |

**If validation fails:**
1. List the failing items by name
2. Generate a one-line patch for each (the exact sentence to add)
3. Re-apply and re-score

**Additional quality checks:**

For the full checklist with pass criteria, see [`references/Decision_Tables.md#additional-quality-checks`](references/Decision_Tables.md#additional-quality-checks).

---

### Step 7: Present Results

Present the optimized prompt to the user with:

1. **Framework Selection Summary**: The chosen framework and the reason for selecting it
2. **Quality Validation Result**: CLARITY checklist pass status
3. **The Optimized Prompt**: The complete optimized prompt
4. **Version Options**: Basic / Enhanced / Expert (as applicable)
5. **Usage Tips**: How to adjust based on actual results

**Presentation Template:**
```
## Optimization Result

### Framework Selection
- Framework used: {framework}
- Reason: {reasoning}
- Confidence: {score}/10

### Quality Validation
- CLARITY check: {X}/7 items passed
- Quality grade: {Excellent / Good / Needs improvement}

### Optimized Prompt
```
{optimized_prompt}
```

### Version Options
- [ ] Basic (currently shown)
- [ ] Enhanced (includes more examples)
- [ ] Expert (includes full constraints and validation criteria)

### Usage Tips
- If results are too broad, add more constraints
- If results are too narrow, relax certain restrictions
- For iterative refinement, tell me the specific direction to adjust
```

**Filled Example:**
```
## Optimization Result

### Framework Selection
- Framework used: APE (Action-Purpose-Expectation)
- Reason: The user wants a single-sentence polish (Simple, 2 elements),
          so a Simple-tier framework with Basic version avoids over-engineering.
- Confidence: 9/10

### Quality Validation
- CLARITY check: 4/7 items passed
- Quality grade: Good (sufficient for Simple task; threshold ≥ 3)

### Optimized Prompt

Write a concise follow-up email to a client who has not responded
to a software demo proposal sent 10 days ago. Purpose: re-engage
their interest and schedule a 15-minute call. Tone: professional
but warm; avoid pressure tactics. Length: under 120 words.

### Version Options
- [x] Basic (currently shown)
- [ ] Enhanced (add: subject line alternatives, A/B variants)
- [ ] Expert (add: CRM integration notes, follow-up cadence)

### Usage Tips
- If the tone feels too formal, replace "professional" with "friendly-casual"
- For a different engagement hook, swap "15-minute call" for a short video link
```

---

## Core Principles

### 1. CLARITY Framework

When optimizing prompts, apply the **CLARITY** framework. See [`references/Decision_Tables.md#clarity-framework`](references/Decision_Tables.md#clarity-framework) for the full element descriptions.

### 2. Advanced Techniques

For a detailed reference of advanced prompting techniques, see [`references/Decision_Tables.md#advanced-techniques`](references/Decision_Tables.md#advanced-techniques).

---

> For a quick framework selection reference, see [`references/Quick_Reference.md`](references/Quick_Reference.md).

---

## Best Practices

1. **Be Specific**: Replace vague verbs with specific actions
   - "Improve this" → "Refactor to reduce cyclomatic complexity below 10"

2. **Provide Context**: Include relevant background for better responses
   - "Write an email" → "Write a follow-up email to a client who hasn't responded to a proposal sent 2 weeks ago"

3. **Set Constraints**: Define boundaries to focus the response
   - Word limits, format requirements, what to exclude

4. **Assign Role**: Give AI a specific expert identity
   - "You are a UX designer with 15 years of experience..."

5. **Show Examples**: For pattern-based tasks, provide input/output examples

6. **Request Structure**: Specify output format explicitly
   - Headers, sections, JSON, tables, bullet points

7. **Define Success**: State quality criteria or evaluation rubric

---

## Notes

- Always preserve the user's original intent
- **Don't over-engineer simple prompts** — match framework tier to Step 1 complexity; Simple tasks get Simple frameworks + Basic version
- Explain why each optimization was made
- Offer multiple versions when appropriate (basic, enhanced, expert)
- Encourage iterative refinement
- Handle edge cases gracefully
- Validate output quality before presenting

---

## References

Framework details can be found in:
- `frameworks/index.json` — structured metadata for all 61 frameworks (id, category, elements, domains, use cases)
- `frameworks/simple/` — Simple frameworks (≤3 elements)
- `frameworks/medium/` — Medium frameworks (4-5 elements)
- `frameworks/complex/` — Complex frameworks (6+ elements)
- `frameworks/patterns/` — Reusable patterns
- [Frameworks Summary](references/Frameworks_Summary.md) — Human-readable overview of all 61 frameworks
- [Quick Reference](references/Quick_Reference.md) — Intent-to-framework lookup table
- [Decision Tables](references/Decision_Tables.md) — Domain mapping, version characteristics, CLARITY framework, and advanced techniques reference

---

## Development & Release

Build and release scripts used during `npm version`:

| Script | Trigger | Purpose |
|--------|---------|---------|
| `scripts/postversion.js` | `npm version` → `postversion` hook | Sync version string across `VERSION`, `claude.json`, `marketplace.json`, `frameworks/index.json`, and SKILL.md frontmatter |
| `scripts/extract-changelog.js` | CI release workflow | Extract the CHANGELOG.md entry for a given version for the GitHub Release body |

These scripts are not invoked during skill runtime — they are tooling for the maintainer.

---

## Compatibility

| Requirement | Minimum |
|-------------|---------|
| Claude Code | `>= 1.0.0` |
| Runtime | Node.js 16+ (needed only for CLI / test commands; skill runtime in Claude Code requires no Node.js) |

### Progressive Disclosure

This skill is designed for **progressive disclosure** — the agent only loads what it needs for the current step:

- **Step 1–2**: No external files needed (framework selection is in-memory from frontmatter + index)
- **Step 3**: Reads individual framework files from `frameworks/` on demand (lazy load per framework)
- **Step 6**: References the CLARITY rubric inline (no external read needed)
- **References**: Pointers to `references/` are available but only consulted when the agent needs deeper detail

This means the skill adds minimal context overhead for simple tasks (polish a one-liner → only 2-3 KB of SKILL.md is meaningfully active) and scales up naturally for complex multi-framework sessions.

---

## Changelog

For the full changelog, see [`CHANGELOG.md`](CHANGELOG.md).
