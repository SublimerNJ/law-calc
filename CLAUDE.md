# Channel reply instructions (Telegram)

When a message arrives from channel source `telegram`, treat it as chat input that requires an immediate reply.

Rules:
1. Reply immediately (1 short sentence by default).
2. Use the Telegram reply tool (`plugin:telegram:reply`) for every inbound Telegram message.
3. Pass the inbound `chat_id` exactly as provided.
4. Do not run long analysis before replying.
5. If uncertain, send a brief acknowledgment first, then follow-up.
