# ADR 0003: Mobile app in Expo React Native

- **Status:** Accepted (2026-09-28)
- **Context:** Nigeria is Android-first; one React team must ship web + Android + iOS with shared code.
- **Decision:** Expo React Native in `apps/mobile`, consuming `@puremart/tokens`.
- **Consequences:** One team, shared design language, Expo handles builds/updates/push. A PWA of the Next.js site may serve as an early stopgap.
