import type { JSXElement } from "solid-js"

interface IDictionary {
  title: string
  steps: string[][]
  reference: { title: string; url: string }
}

export default function ProtocolChecklist({
  title,
  steps,
  reference,
}: IDictionary): JSXElement {
  return (
    <div class="w-fit mx-auto mt-10 p-6 rounded-md bg-gray-50 shadow-lg flex flex-col justify-center items-center gap-8 border-[1px] border-gray-300">
      <h1 class="font-mono text-xl">{title}</h1>

      <ul class="flex flex-col gap-1">
        {steps.map(([call, response]) => {
          return (
            <li class="block font-mono text-sm lg:text-lg whitespace-nowrap">
              {call && response ? padBetween(call, response, 70) : null}
            </li>
          )
        })}
      </ul>

      <span class="">
        (see{" "}
        <a
          class="text-violet-800"
          href={reference.url}
          target="_blank"
          rel="noopener">
          {reference.title}
        </a>
        )
      </span>
    </div>
  )
}

function padBetween(start: string, end: string, targetLength: number): string {
  const padLength = targetLength - start.length - end.length
  return start.concat(".".repeat(padLength)).concat(end)
}
