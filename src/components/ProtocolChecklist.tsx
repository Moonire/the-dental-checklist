import type { JSXElement } from "solid-js"

interface IDictionary {
  title: string
  steps: string[][]
  reference: { title: string; url: string }
}

const MIN_CONTENT_LENGTH = 43
const PADDING_SPACES = 2
const MIN_DOTS = 5

export default function ProtocolChecklist({
  title,
  steps,
  reference,
}: IDictionary): JSXElement {
  const lineLength =
    Math.max(
      ...steps.map((arr) =>
        arr.map((str) => str.length).reduce((x, y) => x + y)
      ),
      MIN_CONTENT_LENGTH
    ) + MIN_DOTS

  return (
    <div class="w-full flex justify-center mt-20 mb-10">
      <div class="mx-8 p-6 rounded-md bg-gray-50 shadow-lg flex flex-col justify-center items-center gap-8 border-[1px] border-gray-300">
        <h1 class="font-mono text-base lg:text-xl">{title}</h1>

        <ul class="flex flex-col gap-1">
          {steps.map(([call, response]) => {
            return (
              <>
                <li class="hidden md:block font-mono text-sm lg:text-lg">
                  {call && response
                    ? padBetween(call, response, lineLength)
                    : null}
                </li>

                <li class="block md:hidden mb-2 font-mono text-sm">
                  <p class="font-bold">{call}</p>
                  <p class="pl-2">⮑ {response}</p>
                </li>
              </>
            )
          })}
        </ul>

        <span class="text-xs md:text-sm max-w-[90ch]">
          see{" "}
          <a
            class="text-violet-800"
            href={reference.url}
            target="_blank"
            rel="noopener">
            {reference.title}
          </a>
        </span>
      </div>
    </div>
  )
}

function padBetween(start: string, end: string, targetLength: number): string {
  const padLength = targetLength - start.length - end.length - PADDING_SPACES
  return start.concat(" ").concat(".".repeat(padLength)).concat(" ").concat(end)
}
