import { SMTPClient } from "https://deno.land/x/denomailer@1.3.0/mod.ts";
import { generate } from "./generate.ts";
const client = new SMTPClient({
  connection: {
    hostname: "email-smtp.eu-central-1.amazonaws.com",
    port: 2465,
    tls: true,
    auth: {
      username: Deno.env.get("username"),
      password: await generate(Deno.env.get("password")),
    },
  },
});

await client.send({
  from: "mooxl@mediaatrium.de",
  to: "me@mooxl.de",
  subject: "example",
  content: "...",
  html: "<p>...</p>",
});

await client.close();
