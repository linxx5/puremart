# ADR 0009: Comms — Termii/Africa's Talking, WhatsApp, ZeptoMail, Expo push

- **Status:** Accepted (2026-09-28)
- **Context:** Login codes need seconds-fast SMS; updates need cheap roads; disputes need a paper trail.
- **Decision:** Termii or Africa's Talking (SMS), WhatsApp Business API, ZeptoMail (email), Expo push, plus an in-app inbox as the record.
- **Spending rule:** Routine updates → push first, WhatsApp second, never SMS. Urgent + OTP → SMS immediately. Everything important also lands in the in-app inbox.
- **Consequences:** Fast local delivery where it matters, near-free routine alerts, no single landlord for all customer contact.
