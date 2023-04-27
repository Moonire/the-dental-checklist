import { getCollection } from "astro:content"
import { JSXElement, createSignal } from "solid-js"

const protocols = await getCollection("protocol")

export default function Sidebar(): JSXElement {
  const [query, setQuery] = createSignal("")
  const MAX_LENGTH = 6

  return (
    <div class="w-full h-fit px-6 py-6 flex flex-col gap-2 justify-start items-start">
      <div class="flex flex-col md:flex-row w-full items-center justify-between gap-6">
        <div class="flex gap-2 items-center">
          <img src="/logo.svg" alt="checklist" class="h-8" />
          <span class="w-fit text-base lg:text-lg align-middle text-gray-800 whitespace-nowrap">
            The Dental Checklist
          </span>
        </div>
        <input
          type="search"
          name="query"
          placeholder="Search"
          class="w-11/12 max-w-[26rem] h-8 rounded-full px-4 py-5 border-[1px] border-gray-300"
          onkeyup={(e) => {
            setQuery(e.currentTarget.value)
          }}
        />

        <div class="w-48 h-0" />
      </div>

      <span class="text-gray-600 text-sm">Top Results</span>

      <div class="flex gap-2 flex-wrap">
        {protocols
          .filter((entry) => isMatching(entry.data.title, query()))
          .slice(0, MAX_LENGTH)
          .map((entry) => {
            return (
              <a
                href={`/${entry.collection}/${entry.slug}`}
                class="flex justify-center items-center h-fit py-2 px-3 text-xs lg:text-sm hover:bg-violet-300 hover:border-violet-400 bg-white border-gray-400 cursor-pointer transition ease-in-out duration-100 rounded-lg border-[1px]">
                {entry.data.title}
              </a>
            )
          })}
      </div>
    </div>
  )
}

function isMatching(str: string, query: string): boolean {
  // make this function more resilient (ex. fuzzy search)
  return str.toLowerCase().includes(query.toLowerCase())
}
