---
name: prompt-optimizer
version: 2.1.2
description: Optimize and rewrite prompts using 61 frameworks (APE, RACE, CRISPE, Chain-of-Thought, etc.). Trigger on "optimize prompt", "improve this prompt", "make this prompt better", "rewrite for AI", or any vague/short instruction the user wants turned into a high-quality prompt.
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

## Trigger Scenarios

Trigger this skill when:

- User asks to optimize, improve, or enhance a prompt
- User inputs a vague or simple prompt
- User expresses dissatisfaction with AI outputs
- User asks for help writing prompts
- User wants to learn prompt engineering techniques

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

Receive the user's request, which may be:
- A raw prompt that needs optimization
- A task description or requirement
- A vague idea that needs to be turned into a prompt

**Complexity Assessment (REQUIRED before Step 2):**

Count the number of distinct task elements present in the user's input. An "element" is any of the following that the user explicitly mentions or clearly implies:

| Element | Examples |
|---------|----------|
| Role / persona | "as a lawyer", "act as a senior dev" |
| Action / task | "write", "summarize", "classify" |
| Context / background | "for a startup pitch", "the API returns 500 errors" |
| Audience | "for executives", "for beginners" |
| Output format | "in JSON", "as a table", "bullet points" |
| Constraints / limits | "under 200 words", "no jargon", "must include X" |
| Examples / references | "like this: …", "similar to Notion's" |
| Reasoning method | "step by step", "compare alternatives" |
| Quality criteria | "must be accurate", "cite sources" |

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

Identify the user's scenario and match the most suitable framework(s) based on:
- Application scenario alignment
- Task complexity (simple/medium/complex)
- Domain category (marketing, decision analysis, education, etc.)

**Framework Selection Guide by Complexity:**

| Complexity | Recommended Frameworks |
|------------|----------------------|
| Simple (≤3 elements) | APE, ERA, TAG, RTF, BAB, PEE, ELI5 |
| Medium (4-5 elements) | RACE, COAST, ROSES, Chain-of-Thought, SMART, FOCUS |
| Complex (6+ elements) | RACEF, CRISPE, RISEN |

**Framework Selection Guide by Domain:**

| Domain | Recommended Frameworks |
|--------|----------------------|
| Marketing Content | BAB, SMART, FOCUS |
| Decision Analysis | Chain-of-Thought, SMART, RACEF |
| Education & Training | ELI5, PEE |
| Product Development | SMART, FOCUS, RACEF |
| AI Dialogue/Assistant | COAST, ROSES, RACE |
| Writing & Creation | APE, ERA, TAG |
| Complex Reasoning | Chain-of-Thought, RACEF, CRISPE |

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

| Anti-pattern | Why it's wrong | What to do instead |
|--------------|---------------|-------------------|
| Picking CRISPE for a 1-sentence polish | Forces 6 elements onto a task that only needs 2–3 | Use APE or ERA for simple tasks |
| Choosing Chain-of-Thought for formatting tasks | CoT adds reasoning overhead to non-reasoning tasks | Use TAG or RTF when the task is about format, not reasoning |
| Defaulting to the most complex framework "just in case" | Over-engineering produces bloated prompts that confuse the AI | Match framework complexity to task complexity from Step 1 |
| Selecting a framework before counting elements | Skips the complexity gate, leading to mismatched selections | Always count elements first (Step 1), then pick from the matching tier |

---

### Step 3: Load Framework Details

**Lookup-first**: read `frameworks/index.json` to resolve the framework's `file`, `elements`, `domains`, and `use_cases`. The index is the source of truth — do not guess paths.

If you need the full structure / example / usage tips, load the resolved file:
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

Apply the selected framework to create the final prompt:

1. Structure the prompt according to framework components
2. Incorporate all clarified information
3. Ensure clarity and specificity
4. Include relevant examples if the framework requires
5. Add any necessary constraints or guidelines

**Multi-Version Output:**

Provide 1–3 versions based on user needs:

| Version | Use Case | Characteristics |
|---------|----------|-----------------|
| **Basic** | Quick use, simple tasks | Core elements, concise and clear |
| **Enhanced** | Regular work, team collaboration | Complete structure with examples |
| **Expert** | Complex projects, high-quality requirements | Full elements + constraints + validation criteria |

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

| Task complexity | Required score | Action on fail |
|-----------------|----------------|----------------|
| Simple          | ≥ 3 / 7        | Add the lowest-cost missing element (skip Role if task is format-only) |
| Medium          | ≥ 5 / 7        | Add the 1–2 missing elements with the highest impact |
| Complex         | ≥ 6 / 7        | Iterate until threshold met; never present below threshold |

**If validation fails:**
1. List the failing items by name
2. Generate a one-line patch for each (the exact sentence to add)
3. Re-apply and re-score

**Additional quality checks** (each is also pass/fail):

| Check | Pass criterion |
|-------|----------------|
| Clarity | No vague verbs ("improve", "optimize", "handle") used as the primary action |
| Specificity | At least one measurable metric, threshold, or named entity |
| Completeness | Every user-stated requirement appears in the output |
| Feasibility | A reasonable AI could execute the task without external tools beyond what's named |
| Safety | No harmful, illegal, or privacy-violating instructions |

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

When optimizing prompts, apply the **CLARITY** framework:

| Element | Description |
|---------|-------------|
| **C**ontext | Provide relevant background and situation |
| **L**ogic | Define the reasoning approach (step-by-step, first principles, etc.) |
| **A**ction | Specify the exact task or action to perform |
| **R**ole | Assign a specific expert role to the AI |
| **I**nput/Output | Define input format and expected output structure |
| **T**one | Specify writing style, tone, and voice |
| **Y**ardstick | Set constraints, requirements, and quality criteria |

### 2. Advanced Techniques

Apply these techniques based on task complexity:

| Technique | When to Use | Example |
|-----------|-------------|---------|
| **Role Assignment** | Always apply | "You are a senior software architect..." |
| **Chain-of-Thought** | Complex reasoning tasks | "Think step by step and show your reasoning" |
| **Few-Shot Examples** | Pattern-based tasks | Provide 2-3 input/output examples |
| **Structured Output** | Data extraction, analysis | "Output in JSON format with keys: ..." |
| **Constraint Specification** | All prompts | Word limits, format requirements, exclusions |
| **Meta-Prompting** | Self-improvement tasks | "Review and improve your answer before finalizing" |

---

## Quick Reference: Framework Selection

| User Says | Recommended Framework | Version |
|-----------|----------------------|---------|
| "Just polish this" / "Make it clearer" | APE, ERA, TAG | Basic |
| "I need a simple prompt" | APE, ERA, TAG | Basic |
| "I want to persuade/sell" | BAB | Enhanced |
| "I need to analyze/decide" | Chain-of-Thought, RACEF | Enhanced / Expert |
| "I want to teach/explain" | ELI5, PEE | Basic / Enhanced |
| "I need creative ideas" | COAST, ROSES | Enhanced |
| "I want structured writing" | APE, RACE | Enhanced |
| "I need step-by-step reasoning" | Chain-of-Thought | Enhanced |
| "I'm generating images" | Few-Shot | Basic |
| "I need a detailed plan" | RISEN, RACEF | Expert |

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

---

## Changelog

### v2.1.2
- 🔧 CI: stable OIDC publishing — Node 24 + `setup-node@v5` + `environment: release` to reliably authenticate with npm Trusted Publisher

### v2.1.1
- ✨ Step 1: added complexity assessment (element counting + Simple/Medium/Complex classification)
- ✨ Step 5: added "Simple tasks default to Basic version" constraint
- ✨ Step 2: added anti-patterns table (4 common framework-selection mistakes)
- ✨ Quick Reference: added "Just polish this" / "Make it clearer" row
- 🔧 Gotchas: upgraded "Don't over-engineer" to CRITICAL with explicit rule and rationale
- 🔧 Notes: aligned over-engineering note with Gotchas wording

### v2.1.0
- ✨ Added `frameworks/index.json` — structured metadata for all 61 frameworks (used by Step 3 lookup)
- ✨ Step 6 CLARITY rubric is now binary pass/fail with explicit criteria per letter
- ✨ Workflow now uses `TaskCreate` for progress tracking instead of a text checklist
- 🔧 Trimmed SKILL frontmatter description and added explicit trigger keywords
- 🔧 Deduplicated and renumbered `tests/test-cases.md` (29 unique cases, 8 categories)
- 📦 Added top-level `LICENSE` file (MIT)

### v2.0.0 (2024-04-20)
- ✨ Added detailed framework definition files for all frameworks
- ✨ Added Step 6: Quality Validation phase
- ✨ Added multi-version output (Basic / Enhanced / Expert)
- ✨ Added boundary case handling strategy
- ✨ Added default handling when user refuses to clarify
- ✨ Added framework selection explanation and confidence scoring
- 🔧 Refactored SKILL.md structure for a clearer workflow
- 📝 Added complete usage examples and templates

### v1.0.0
- 🎉 Initial release
- Basic CLARITY framework
- Framework list
