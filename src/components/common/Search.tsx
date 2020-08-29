import React, { useState } from "react"
const contentful = require("contentful")

const client = contentful.createClient({
  space: process.env.GATSBY_CONTENTFUL_SPACE_ID,
  accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_KEY,
})

export const Search: React.FC = () => {
  const [result, setResult] = useState<any[]>([])

  const searchDelay = 500
  let timer: number = 0

  const onChange = (e: any) => {
    e.persist()
    incrementalSearch(e)
  }

  const incrementalSearch = (e: any) => {
    clearTimeout(timer)

    if (e.target!.value === "") {
      setResult([])
      return
    }

    timer = window.setTimeout(async () => {
      // TODO: エラーハンドリング
      const response = await client.getEntries({
        content_type: "blogPost",
        query: e.target.value,
      })
      setResult(response.items)
    }, searchDelay)
  }

  return (
    <div>
      <input onChange={onChange} type="text" />
      {result && (
        <div>
          {result.map((post, i) => (
            <div key={i}>{post.fields.title}</div>
          ))}
        </div>
      )}
    </div>
  )
}
