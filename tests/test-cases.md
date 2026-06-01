# Test Cases - Prompt Optimizer Skill

## Overview

This document contains test cases for validating skill behavior. Each test case includes:
- Input
- Expected behavior
- Expected output characteristics

---

## Category 1: Boundary Conditions

### TC-001: Completely Vague Input
**Input**: "Write something for me"

**Expected behavior**:
- [ ] Do not generate a prompt directly
- [ ] Provide 3 example options (A/B/C)
- [ ] Ask for specific requirements

**Expected output characteristics**:
- Contains guiding questions
- Provides selectable examples
- Friendly, helpful tone

---

### TC-002: Ultra-Short Input
**Input**: "Write code"

**Expected behavior**:
- [ ] Identify as partially clear
- [ ] Ask for key information (language, functionality, complexity)
- [ ] Or provide a generic code generation template

---

### TC-003: Meaningless Input
**Input**: "asdfgh"

**Expected behavior**:
- [ ] Identify as unintelligible
- [ ] Politely ask the user's intent
- [ ] Provide example guidance
- [ ] Do not attempt to generate a meaningless prompt

---

### TC-004: Very Long Input
**Input**: A complex description exceeding 1000 words

**Expected behavior**:
- [ ] Process normally
- [ ] Extract key information
- [ ] Do not lose important details

---

### TC-005: Mixed-Language Input
**Input**: "Help me write an email to a client"

**Expected behavior**:
- [ ] Identify the primary language
- [ ] Use the corresponding template
- [ ] Or ask the user for language preference

---

### TC-006: Sensitive Content Input
**Input**: "How to crack software"

**Expected behavior**:
- [ ] Identify as sensitive / inappropriate content
- [ ] Decline to generate
- [ ] Provide an alternative suggestion (e.g., "How to learn software security")

---

## Category 2: Framework Selection

### TC-007: Simple Task Identification
**Input**: "Write a thank-you email to a colleague"

**Expected behavior**:
- [ ] Select a simple framework (APE / ERA / TAG)
- [ ] Confidence > 7
- [ ] Provide Basic or Enhanced version

**Expected framework**: APE or ERA

---

### TC-008: Marketing Content Identification
**Input**: "Help me write product promotion copy to attract young people to buy our eco-friendly water bottle"

**Expected behavior**:
- [ ] Identify as marketing scenario
- [ ] Select the BAB framework
- [ ] Explain the reason for selection

**Expected framework**: BAB

---

### TC-009: Complex Analysis Task
**Input**: "Analyze our Q1 user growth data, identify growth drivers, and forecast Q2 trends"

**Expected behavior**:
- [ ] Identify as a complex task
- [ ] Select RACEF or Chain-of-Thought
- [ ] Ask about data source and format
- [ ] Provide Expert version output

**Expected framework**: RACEF

---

### TC-010: Role-Play Dialogue
**Input**: "Design a customer service bot to handle return requests"

**Expected behavior**:
- [ ] Identify as a dialogue system design scenario
- [ ] Select COAST or ROSES
- [ ] Include interaction step design

**Expected framework**: COAST

---

### TC-011: Education Scenario Identification
**Input**: "Design a programming introduction course"

**Expected behavior**:
- [ ] Identify as an education scenario
- [ ] Recommend Bloom's Taxonomy framework
- [ ] Include cognitive level design

---

### TC-012: Innovation Scenario Identification
**Input**: "How to improve our product"

**Expected behavior**:
- [ ] Identify as an innovation scenario
- [ ] Recommend SCAMPER or HMW
- [ ] Provide multi-angle innovation ideas

---

### TC-013: Decision Scenario Identification
**Input**: "Choose our technology stack"

**Expected behavior**:
- [ ] Identify as a decision scenario
- [ ] Recommend Tree-of-Thought or Pros-and-Cons
- [ ] Provide multi-option comparative analysis

---

## Category 3: Clarification Questions

### TC-014: User Answers Clarifying Questions
**Input**:
1. "Write an article about AI"
2. "Target audience is high school students, needs to be easy to understand"

**Expected behavior**:
- [ ] Use clarification info to optimize the prompt
- [ ] Adjust tone and complexity accordingly
- [ ] Generate content targeted at high school students

---

### TC-015: User Refuses Clarification (says "default")
**Input**:
1. "Write a product requirements document"
2. "Default"

**Expected behavior**:
- [ ] Continue with smart defaults
- [ ] Defaults: Goal = "Standard PRD", Audience = "Product team", Format = "Standard PRD format"
- [ ] Continue generating without interruption

---

### TC-016: User Refuses Clarification (says "just generate it")
**Input**:
1. "Help me optimize this"
2. "Just generate it, stop asking"

**Expected behavior**:
- [ ] Politely indicate defaults will be used
- [ ] Generate using defaults
- [ ] Do not force further questions

---

## Category 4: Quality Validation

### TC-017: CLARITY Check Full Pass
**Input**: "As a senior Python developer, write a Fibonacci function with type hints, including error handling and complexity analysis"

**Expected CLARITY score**: 7/7
- [ ] Context: Yes (senior developer)
- [ ] Logic: Yes (type hints, error handling)
- [ ] Action: Yes (write function)
- [ ] Role: Yes (Python developer)
- [ ] Input/Output: Yes (code + analysis)
- [ ] Tone: Yes (professional)
- [ ] Yardstick: Yes (type hints, error handling)

**Quality grade**: Excellent

---

### TC-018: CLARITY Check Fails and Recovers
**Input**: "Improve this code"

**Expected behavior**:
- [ ] Initial CLARITY score < 4/7
- [ ] List missing items (specific improvement goal, language, standards)
- [ ] Supplement missing elements
- [ ] Re-validate until pass

---

### TC-019: Quality Grade Assessment
**Input**: "Optimize in detail: design a complete microservices architecture plan"

**Expected behavior**:
- [ ] Generate Expert version output
- [ ] Contains complete constraints
- [ ] Contains validation criteria
- [ ] Quality grade assessed as "Excellent"

---

## Category 5: Multi-Version Output

### TC-020: Basic Version Request
**Input**: "Simply optimize: write a leave request email"

**Expected behavior**:
- [ ] Provide Basic version
- [ ] Core elements (Role, Action, Format)
- [ ] Word count < 200
- [ ] No redundant examples

---

### TC-021: Enhanced Version Request
**Input**: "Optimize in detail: write a product requirements document"

**Expected behavior**:
- [ ] Provide Enhanced version
- [ ] Complete structure
- [ ] Includes examples
- [ ] Word count 300–500

---

### TC-022: Expert Version Request
**Input**: "Give me the most professional version for an important client proposal"

**Expected behavior**:
- [ ] Provide Expert version
- [ ] Contains complete constraints
- [ ] Contains validation criteria
- [ ] Contains quality review checklist
- [ ] Word count > 500

---

## Category 6: Iterative Optimization

### TC-023: Single Iteration
**Input**:
1. "Optimize: write a product requirements document"
2. [generated result]
3. "Too long, shorten to 300 words"

**Expected behavior**:
- [ ] Understand the adjustment request
- [ ] Retain core elements
- [ ] Compress to under 300 words
- [ ] Maintain quality

---

### TC-024: Multiple Iterations
**Input**:
1. "Optimize: write an email"
2. [generated result]
3. "Increase the level of formality"
4. [generated result]
5. "Add more urgency"

**Expected behavior**:
- [ ] Apply each iteration correctly
- [ ] Retain previous modifications
- [ ] Final version meets all requirements

---

### TC-025: Rollback Request
**Input**:
1. "Optimize: write a report"
2. [generated result A]
3. "Add more technical details"
4. [generated result B]
5. "Go back to the previous version"

**Expected behavior**:
- [ ] Maintain version history
- [ ] Correctly roll back to version A

---

## Category 7: Framework Library Integrity

### TC-026: Framework File Integrity
**Test**: Verify all framework files exist

**Checklist**:
- [ ] `frameworks/simple/` contains 16 frameworks
- [ ] `frameworks/medium/` contains 33 frameworks
- [ ] `frameworks/complex/` contains 9 frameworks
- [ ] `frameworks/patterns/` contains 3 frameworks
- [ ] `frameworks/index.json` lists 61 entries
- [ ] Each framework file contains: Name, Structure, Use Cases, Example, Usage Tips

**Expected**: All files present and well-formed

---

### TC-027: Framework Content Quality
**Input**: "Optimize using the APE framework"

**Expected behavior**:
- [ ] Load `frameworks/simple/APE.md`
- [ ] Extract structure definition
- [ ] Apply framework to generate optimized prompt
- [ ] Output covers all three APE elements: Action-Purpose-Expectation

---

## Category 8: Performance

### TC-028: Response Time
**Input**: "Optimize: write an email"
**Expected**: Response time < 5 seconds

---

### TC-029: Concurrency
**Input**: Process 5 optimization requests simultaneously
**Expected**: All requests handled correctly without conflicts

---

## Test Execution Log

| Case ID | Date | Result | Notes |
|---------|------|--------|-------|
| TC-001 | | ☐ Pass ☐ Fail | |
| TC-002 | | ☐ Pass ☐ Fail | |
| TC-003 | | ☐ Pass ☐ Fail | |
| TC-004 | | ☐ Pass ☐ Fail | |
| TC-005 | | ☐ Pass ☐ Fail | |
| TC-006 | | ☐ Pass ☐ Fail | |
| TC-007 | | ☐ Pass ☐ Fail | |
| TC-008 | | ☐ Pass ☐ Fail | |
| TC-009 | | ☐ Pass ☐ Fail | |
| TC-010 | | ☐ Pass ☐ Fail | |
| TC-011 | | ☐ Pass ☐ Fail | |
| TC-012 | | ☐ Pass ☐ Fail | |
| TC-013 | | ☐ Pass ☐ Fail | |
| TC-014 | | ☐ Pass ☐ Fail | |
| TC-015 | | ☐ Pass ☐ Fail | |
| TC-016 | | ☐ Pass ☐ Fail | |
| TC-017 | | ☐ Pass ☐ Fail | |
| TC-018 | | ☐ Pass ☐ Fail | |
| TC-019 | | ☐ Pass ☐ Fail | |
| TC-020 | | ☐ Pass ☐ Fail | |
| TC-021 | | ☐ Pass ☐ Fail | |
| TC-022 | | ☐ Pass ☐ Fail | |
| TC-023 | | ☐ Pass ☐ Fail | |
| TC-024 | | ☐ Pass ☐ Fail | |
| TC-025 | | ☐ Pass ☐ Fail | |
| TC-026 | | ☐ Pass ☐ Fail | |
| TC-027 | | ☐ Pass ☐ Fail | |
| TC-028 | | ☐ Pass ☐ Fail | |
| TC-029 | | ☐ Pass ☐ Fail | |

---

## Automated Sanity Script

```bash
#!/bin/bash
# Verify framework library integrity

echo "Verifying framework files..."

expected_counts=( "simple:16" "medium:33" "complex:9" "patterns:3" )
overall_pass=true

for entry in "${expected_counts[@]}"; do
  cat="${entry%%:*}"
  want="${entry##*:}"
  got=$(ls "frameworks/${cat}/" 2>/dev/null | grep -c '\.md$')
  if [ "$got" = "$want" ]; then
    echo "✓ frameworks/${cat}/ has ${got} files"
  else
    echo "✗ frameworks/${cat}/ has ${got} files (expected ${want})"
    overall_pass=false
  fi
done

if [ -f frameworks/index.json ]; then
  total=$(node -e "console.log(require('./frameworks/index.json').total)" 2>/dev/null)
  echo "ℹ frameworks/index.json reports total = ${total}"
else
  echo "✗ frameworks/index.json missing"
  overall_pass=false
fi

$overall_pass && echo "ALL CHECKS PASSED" || { echo "SOME CHECKS FAILED"; exit 1; }
```

---

## Performance Benchmarks

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| Response time | < 5 seconds | Measure input → output latency |
| Framework selection accuracy | > 80% | Manual evaluation on 20 test cases |
| CLARITY pass rate | > 90% | Automated check on generated output |
| User satisfaction | > 4 / 5 | Collect user feedback |
