---
name: prompt-optimizer
version: 2.1.10
allowed-tools: "Read TodoWrite"
compatibility: skill runtime requires Claude Code >= 1.0.0; CLI / test commands require Node.js 16+
description: Optimize and rewrite prompts using 61 frameworks (APE, RACE, CRISPE, Chain-of-Thought, COAST, SMART, etc.). Trigger on "optimize prompt", "improve this prompt", "make this prompt better", "rewrite for AI", or any vague/short instruction the user wants turned into a high-quality prompt — even if the user only says "make this clearer" or "help me write this". Also trigger whenever the user pastes raw text and asks for a structured AI-ready version, or expresses dissatisfaction with AI output quality without naming a fix. 当用户输入模糊的指令、需要优化提示词、或对 AI 输出质量不满意时，务必使用本技能。
---

# Prompt Optimizer v2.1

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

Classify the input using the Boundary Handling table below before proceeding.

**Complexity Assessment (REQUIRED before Step 2):**

Must be performed before framework selection — matching a Simple task to a Complex framework produces a bloated prompt that makes AI output worse, not better (see Gotchas). See [references/Quick_Reference.md](references/Quick_Reference.md) for real-world examples.

Count the number of distinct task elements present in the user's input. See [`references/Decision_Tables.md`](references/Decision_Tables.md#element-definitions) for the full element list with examples. |

Classify complexity by element count:

| Complexity | Element count | Signal words in user input |
|------------|---------------|---------------------------|
| **Simple** | ≤ 3 | "just", "quick", "simple", "polish", single-sentence requests |
| **Medium** | 4–5 | Multi-sentence with some detail, mentions audience or format |
| **Complex** | 6+ | Detailed specs, multiple constraints, examples + role + format |

Record the complexity classification — it drives framework selection (Step 2), version default (Step 5), and CLARITY threshold (Step 6).

**Boundary Handling:**

| Situation | Criteria | Action |
|-----------|----------|--------|
| **Completely vague** | Fewer than 5 words, no clear action or subject | Offer 3 examples to guide the user |
| **Partially clear** | Has a topic but no specific requirements | Go to Step 4 and ask for key information |
| **Completely clear** | Includes task, goal, and context | Proceed directly to Step 2 |

**Example handling for completely vague input:**
```
User input: "Write something for me"

Response: "I can help you write many types of content. Please tell me:
1. What type of content do you need? (email / report / code / copy / other)
2. What is the topic or goal?
3. Any special requirements?

Or choose one of these examples:
- A: Write a business partnership email
- B: Write a Python data processing function
- C: Write a product requirements document"
```

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

Before generating the final prompt, verify with the user:

1. **Goal Clarity**: Is the intended outcome clear?
2. **Target Audience**: Who will receive the AI's response?
3. **Context Completeness**: Is sufficient background information provided?
4. **Format Requirements**: Are there specific output format needs?
5. **Constraints**: Are there any limitations or restrictions?

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

If the user refuses to answer clarifying questions:

| User Response | Action |
|---------------|--------|
| "Just generate it" / "Default" | Continue with smart defaults |
| "Stop asking" / "Do it as I said" | Politely state the defaults, then proceed |
| No response at all | Wait one round, then use defaults |

**Smart Defaults:**
- Goal: "Provide high-quality, ready-to-use content"
- Audience: "General professionals"
- Format: "Structured text with headings and bullet points"
- Constraints: "No special restrictions"

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

Validate the optimized prompt using the **CLARITY Checklist**. Each item is a binary pass/fail — apply the rubric below verbatim instead of judging by feel.

| Letter | Pass criterion (must satisfy ALL) |
|--------|-----------------------------------|
| **C**ontext | The prompt names the relevant background: domain, situation, prior state, or constraints that frame why the task exists. Generic phrases like "in a business setting" do NOT pass. |
| **L**ogic | The prompt either (a) prescribes a reasoning method ("think step by step", "first principles", "compare alternatives"), or (b) breaks the task into ordered sub-steps. |
| **A**ction | The prompt contains at least one specific imperative verb describing what to produce (write, summarize, classify, refactor, design). Vague verbs (improve, optimize, handle) do NOT pass on their own. |
| **R**ole | The prompt assigns a specific expert identity, including domain and seniority/experience. "You are an assistant" does NOT pass. |
| **I**nput/Output | The prompt names BOTH the input shape (or assumes raw user text) AND the desired output structure (headings, JSON keys, table columns, length range). |
| **T**one | The prompt names a style, register, or audience that constrains voice (formal, casual, technical, for executives, for 5-year-olds). |
| **Y**ardstick | The prompt states at least one measurable acceptance criterion or hard constraint (word count, must include X, must avoid Y, must validate Z). |

Compute the score: count items that pass.

**Validation thresholds (by task complexity):**

Simple task prompts are evaluated linearly by 3+ judges who check at most 7 questions — 3/7 ensures the prompt has the minimum viable scaffold to guide an AI without overloading it. Medium tasks need ≥5 to cover both structure and context. Complex tasks require ≥6 because one missing element (e.g., no Output spec) can cascade into an unusable result requiring multiple re-writes.

| Task complexity | Required score | Action on fail |
|-----------------|----------------|----------------|
| Simple          | ≥ 3 / 7        | Add the lowest-cost missing element (skip Role if task is format-only) |
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

---

## Core Principles

### 1. CLARITY Framework

When optimizing prompts, apply the **CLARITY** framework. See [`references/Decision_Tables.md#clarity-framework`](references/Decision_Tables.md#clarity-framework) for the full element descriptions. |

### 2. Advanced Techniques

For a detailed reference of advanced prompting techniques, see [`references/Decision_Tables.md#advanced-techniques`](references/Decision_Tables.md#advanced-techniques). |

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
