import { SMTPClient } from "https://deno.land/x/denomailer@1.3.0/mod.ts";
import { serve } from "https://deno.land/std@0.158.0/http/server.ts";
import { generate } from "./generate.ts";

serve(async (_req: Request) => {
  const client = new SMTPClient({
    connection: {
      hostname: "email-smtp.eu-central-1.amazonaws.com",
      port: 2465,
      tls: true,
      auth: {
        username: Deno.env.get("username")!,
        password: await generate(Deno.env.get("password")!),
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
  return new Response("Hello World!", {
    headers: { "content-type": "text/plain" },
  });
});
