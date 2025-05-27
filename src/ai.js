import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const model = "deepseek/DeepSeek-V3-0324";

export async function main() {

  const client = ModelClient(
    endpoint,
    new AzureKeyCredential("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"),
  );

  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        { role:"system", content: "" },
        { role:"user", content: "What is the capital of france ?" }
      ],
      temperature: 0.8,
      top_p: 0.1,
      max_tokens: 2048,
      model: model
    }
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  console.log(response.body.choices[0].message.content);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

