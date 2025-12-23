import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env['ARK_API_KEY'],
  baseURL: 'https://ark.cn-beijing.volces.com/api/v3',
})

async function main() {
  // Non-streaming:
  console.log('----- image input request -----')
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: {
              url: 'https://ark-project.tos-cn-beijing.ivolces.com/images/view.jpeg',
            },
          },
          { type: 'text', text: '这是哪里？' },
        ],
      },
    ],
    model: 'doubao-seed-1-6-251015',
    reasoning_effort: 'medium',
  })

  console.log((completion.choices[0]?.message as any)?.reasoning_content || '')
  console.log(completion.choices[0]?.message?.content)

  // Streaming:
  console.log('----- streaming request -----')
  const stream = await openai.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: {
              url: 'https://ark-project.tos-cn-beijing.ivolces.com/images/view.jpeg',
            },
          },
          { type: 'text', text: '这是哪里？' },
        ],
      },
    ],
    model: 'doubao-seed-1-6-251015',
    // reasoning_effort: "medium", // Type error in some SDK versions
    stream: true,
  })
  for await (const part of stream) {
    process.stdout.write((part.choices[0]?.delta as any)?.reasoning_content || '')
    process.stdout.write(part.choices[0]?.delta?.content || '')
  }
  process.stdout.write('\n')
}
