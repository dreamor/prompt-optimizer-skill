# Decision Tables

> Reference tables extracted from SKILL.md — consult these for framework selection decisions. For intent-to-framework lookup, see [Quick_Reference.md](Quick_Reference.md). For the full 61-framework list, see [Frameworks_Summary.md](Frameworks_Summary.md).

---

## Framework Selection Guide by Domain

| Domain | Recommended Frameworks |
|--------|----------------------|
| Marketing Content | BAB, SMART, FOCUS |
| Decision Analysis | Chain-of-Thought, SMART, RACEF |
| Education & Training | ELI5, PEE |
| Product Development | SMART, FOCUS, RACEF |
| AI Dialogue/Assistant | COAST, ROSES, RACE |
| Writing & Creation | APE, ERA, TAG |
| Complex Reasoning | Chain-of-Thought, RACEF, CRISPE |

---

## Advanced Techniques

Apply these techniques based on task complexity:

| Technique | When to Use | Example |
|-----------|-------------|---------|
| **Role Assignment** | Always apply | "You are a senior software architect..." |
| **Chain-of-Thought** | Complex reasoning tasks | "Think step by step and show your reasoning" |
| **Few-Shot Examples** | Pattern-based tasks | Provide 2–3 input/output examples |
| **Structured Output** | Data extraction, analysis | "Output in JSON format with keys: ..." |
| **Constraint Specification** | All prompts | Word limits, format requirements, exclusions |
| **Meta-Prompting** | Self-improvement tasks | "Review and improve your answer before finalizing" |

---

## Element Definitions

Used during Step 1 — Complexity Assessment.

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

---

## Version Characteristics

| Version | Use Case | Characteristics |
|---------|----------|-----------------|
| **Basic** | Quick use, simple tasks | Core elements, concise and clear |
| **Enhanced** | Regular work, team collaboration | Complete structure with examples |
| **Expert** | Complex projects, high-quality requirements | Full elements + constraints + validation criteria |

---

## CLARITY Framework

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

---

## Additional Quality Checks

Each is pass/fail.

| Check | Pass criterion |
|-------|----------------|
| Clarity | No vague verbs ("improve", "optimize", "handle") used as the primary action |
| Specificity | At least one measurable metric, threshold, or named entity |
| Completeness | Every user-stated requirement appears in the output |
| Feasibility | A reasonable AI could execute the task without external tools beyond what's named |
| Safety | No harmful, illegal, or privacy-violating instructions |

---

## Boundary Handling

Used during Step 1 — classify input clarity before proceeding.

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

## Refusal Handling

When the user declines to answer clarifying questions (Step 4):

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

## CLARITY Scoring Rubric

Full pass criteria for the CLARITY checklist used in Step 6 — Quality Validation.

| Letter | Pass criterion (must satisfy ALL) |
|--------|-----------------------------------|
| **C**ontext | The prompt names the relevant background: domain, situation, prior state, or constraints that frame why the task exists. Generic phrases like "in a business setting" do NOT pass. |
| **L**ogic | The prompt either (a) prescribes a reasoning method ("think step by step", "first principles", "compare alternatives"), or (b) breaks the task into ordered sub-steps. |
| **A**ction | The prompt contains at least one specific imperative verb describing what to produce (write, summarize, classify, refactor, design). Vague verbs (improve, optimize, handle) do NOT pass on their own. |
| **R**ole | The prompt assigns a specific expert identity, including domain and seniority/experience. "You are an assistant" does NOT pass. |
| **I**nput/Output | The prompt names BOTH the input shape (or assumes raw user text) AND the desired output structure (headings, JSON keys, table columns, length range). |
| **T**one | The prompt names a style, register, or audience that constrains voice (formal, casual, technical, for executives, for 5-year-olds). |
| **Y**ardstick | The prompt states at least one measurable acceptance criterion or hard constraint (word count, must include X, must avoid Y, must validate Z). |

**Validation thresholds (by task complexity):**

Simple task prompts are evaluated linearly — 3/7 ensures the minimum viable scaffold. Medium tasks need ≥5 to cover both structure and context. Complex tasks require ≥6 because one missing element can cascade into an unusable result.

| Task complexity | Required score | Action on fail |
|-----------------|----------------|----------------|
| Simple          | ≥ 3 / 7        | Add the lowest-cost missing element (skip Role if task is format-only) |
| Medium          | ≥ 5 / 7        | Add the 1–2 missing elements with the highest impact |
| Complex         | ≥ 6 / 7        | Iterate until threshold met; never present below threshold |

**If validation fails:**
1. List the failing items by name
2. Generate a one-line patch for each (the exact sentence to add)
3. Re-apply and re-score

---

## Anti-Patterns

| Anti-pattern | Why it's wrong | What to do instead |
|--------------|---------------|-------------------|
| Picking CRISPE for a 1-sentence polish | Forces 6 elements onto a task that only needs 2–3 | Use APE or ERA for simple tasks |
| Choosing Chain-of-Thought for formatting tasks | CoT adds reasoning overhead to non-reasoning tasks | Use TAG or RTF when the task is about format, not reasoning |
| Defaulting to the most complex framework "just in case" | Over-engineering produces bloated prompts that confuse the AI | Match framework complexity to task complexity from Step 1 |
| Selecting a framework before counting elements | Skips the complexity gate, leading to mismatched selections | Always count elements first (Step 1), then pick from the matching tier |