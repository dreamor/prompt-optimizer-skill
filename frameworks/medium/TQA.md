# TQA Framework

## Name
Topic-Question-Answer

## Structure
- **Topic**: Topic
- **Question**: Question
- **Answer**: Answer

## Use Cases
- Q&A system design
- Knowledge base construction
- FAQ development
- Exam question design
- Technical documentation
- Customer support content

## Example
**Input**: "Create a product FAQ"

**Optimized**:
```
Topic: Account and Login

Question 1: How do I reset my password?
Answer:
1. Click "Forgot Password" on the login page
2. Enter your registered email address
3. Check your email and click the reset link (valid for 24 hours)
4. Set a new password (at least 8 characters, including letters and numbers)
5. Log in with your new password

If you did not receive the email:
- Check your spam/junk folder
- Confirm the email address is correct
- Wait 5 minutes and try again
- Contact support at support@example.com

Question 2: What login methods are supported?
Answer:
- Email + password
- Phone number + verification code
- WeChat QR code scan
- Enterprise WeChat (enterprise users)
- SSO single sign-on (enterprise users)

Note: One account can be linked to multiple login methods simultaneously.

Topic: Billing and Payment

Question 3: How do I upgrade my plan?
Answer:
1. Log in to your account and go to "Settings" → "Subscription Management"
2. Select the plan you want to upgrade to
3. Confirm payment (supports Alipay, WeChat Pay, bank card)
4. The upgrade takes effect immediately

Billing rules:
- Billed proportionally based on remaining days
- Example: Monthly plan at ¥100; if you upgrade after 10 days, the additional charge = (new plan price - ¥100) × 20/30

Question 4: How do I request a refund?
Answer:
Refund policy:
- Unconditional refund within 7 days
- Annual plan users can refund remaining months within 30 days

Application process:
1. Send an email to billing@example.com
2. Subject: "Refund Request - [Account Email]"
3. Content: reason for refund + registered email + payment receipt
4. Processed within 3–5 business days
5. Refunded to original payment method; arrival time depends on the bank (typically 3–7 days)

Writing Guidelines:

Question Design Principles:
1. Use the language real users would actually ask
2. Cover 80% of common questions
3. Questions should be specific; avoid being too broad
4. Group by topic for easy navigation

Answer Writing Principles:
1. Answer directly; do not beat around the bush
2. Steps should be clear and numbered
3. Cover edge cases and exceptions
4. Provide a path for further assistance
5. Include screenshots or video links where necessary

Maintenance Recommendations:
- Analyze customer service records monthly and update the FAQ
- Track FAQ page traffic data
- Collect user feedback for continuous optimization
- Update the FAQ in sync with product version releases
```

## Usage Tips
- Questions should be authentic, based on what users actually ask
- Answers should be complete, covering normal and exceptional situations
- Structure should be clear for quick lookup
- Update regularly to maintain accuracy
