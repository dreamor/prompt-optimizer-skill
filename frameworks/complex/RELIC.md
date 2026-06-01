# RELIC Framework

## Name
Requirements-Effort-Limits-Implementation-Confirmation

## Structure
- **Requirements**: Requirements
- **Effort**: Investment / Effort
- **Limits**: Limitations
- **Implementation**: Implementation
- **Confirmation**: Confirmation

## Use Cases
- Customer feedback system optimization
- EdTech product development
- Employee training program design
- Policy implementation evaluation
- Product iteration improvement
- Service quality enhancement

## Example
**Input**: "Design a customer feedback improvement system"

**Optimized**:
```
Requirements:

Business requirements:
- Collect customer feedback (multi-channel)
- Automatically classify and prioritize
- Route to the appropriate team for handling
- Track resolution progress
- Analyze trends and patterns
- Close the feedback loop with customers

User requirements:
- Submitting feedback should be easy (< 2 minutes)
- Be able to view feedback handling status
- Receive notification of resolution results
- Evaluate the handling outcome

Technical requirements:
- Integrate with the existing CRM system
- Support mobile devices
- Real-time notifications
- Data security and privacy protection

Effort:

Personnel:
- Product Manager: 1 person × 2 weeks (requirements + acceptance)
- Designer: 1 person × 1 week (UI/UX)
- Frontend Developer: 1 person × 3 weeks
- Backend Developer: 1 person × 3 weeks
- QA: 1 person × 1 week
- Total: 8 person-weeks

Financial cost:
- Personnel: approx. 100,000 CNY
- Third-party services (SMS, email): 2,000 CNY/month
- Server resources: 1,000 CNY/month

Time investment:
- Development cycle: 6 weeks
- Testing + launch: 2 weeks
- Total: 2 months

Limits:

Technical limitations:
- Must support SSO with the existing user system
- Data storage must comply with GDPR
- Mobile must support iOS 12+ and Android 8+

Resource limitations:
- Budget cap: 150,000 CNY
- No new hires allowed
- Must go live before end of Q2

Business limitations:
- Must not disrupt existing customer service processes
- Feedback handling response time must not increase
- Customer data must remain onshore

Implementation:

Phase 1: Requirements Confirmation (Week 1)
- Confirm requirements with customer service, product, and engineering teams
- Design information architecture and process flow
- Deliver PRD and design mockups

Phase 2: Development (Weeks 2–5)
- Backend: API development, database design, integrations
- Frontend: Feedback submission page, management dashboard
- Mobile adaptation

Phase 3: Testing (Week 6)
- Functional testing
- User acceptance testing (UAT)
- Performance testing

Phase 4: Launch (Weeks 7–8)
- Canary release (10% of users)
- Monitor and fix issues
- Full rollout
- Train customer service team

Detailed feature checklist:
- [ ] Feedback submission form (Web + Mobile)
- [ ] Image/attachment upload
- [ ] Auto-classification (using NLP)
- [ ] Ticket routing system
- [ ] Progress tracking dashboard
- [ ] Customer notification system
- [ ] Data analytics reports
- [ ] Admin management dashboard

Confirmation:

Acceptance criteria:
- Customer feedback submission time < 2 minutes
- System auto-classification accuracy > 80%
- Feedback response time < 4 hours
- Customer satisfaction > 4.5/5
- System availability > 99.9%

Success metrics:
- Feedback collection volume increases 50%
- Handling efficiency improves 30%
- Customer satisfaction score improves by 0.5
- Repeat feedback reduces 20%

Validation methods:
- A/B test (new system vs. old system)
- User interviews (10 customers)
- Data analysis (compare before and after launch)
- Customer service team feedback

Continuous improvement:
- Collect improvement suggestions monthly
- Evaluate system effectiveness quarterly
- Adjust processes based on data
```

## Usage Tips
- Requirements should be comprehensive, covering all stakeholders
- Be honest about effort, including hidden costs
- Identify limitations as early as possible
- Implementation should include a detailed plan with checkpoints
- Confirmation must include measurable criteria
