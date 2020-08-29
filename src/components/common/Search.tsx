import React, { useState, useCallback } from "react"
import { LoadingSpinner } from "@/components/"
import { css } from "@emotion/core"
import { Link } from "@reach/router"

const client = require("contentful").createClient({
  space: process.env.GATSBY_CONTENTFUL_SPACE_ID,
  accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_KEY,
})

export const Search: React.FC = () => {
  const [result, setResult] = useState<IResultState | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeStateOfInput, setActiveStateOfInput] = useState(false)
  const [timer, setTimer] = useState<number>(0)
  const searchDelay = 500

  const onChange = (e: any) => {
    e.persist()
    setActiveStateOfInput(true)
    incrementalSearch(e)
  }

  const incrementalSearch = (e: any) => {
    clearTimeout(timer)
    setResult(null)

    if (e.target!.value === "") {
      setActiveStateOfInput(false)
      return
    }

    setTimer(
      window.setTimeout(async () => {
        try {
          setIsLoading(true)
          const response = await client.getEntries({
            content_type: "blogPost",
            query: e.target.value,
          })
          setResult(response)
          setIsLoading(false)
          console.log(response)
        } catch (e) {
          alert("サーバーと接続ができませんでした。")
        }
      }, searchDelay)
    )
  }

  return (
    <div css={style.root}>
      <input
        css={style.input}
        onChange={onChange}
        onFocus={() => {
          setActiveStateOfInput(true)
        }}
        onBlur={() => {
          // setActiveStateOfInput(false)
        }}
        type="text"
        placeholder="検索"
      />
      {activeStateOfInput && (
        <div css={style.result}>
          {isLoading && (
            <div css={style.resultItem} style={{ textAlign: "center" }}>
              <LoadingSpinner />
            </div>
          )}
          {!isLoading && result && (
            <>
              <div css={style.resultItem}> 結果は {result.total} 件です</div>
              {result.total !== 0 &&
                result.items.map((post, i) => (
                  <div css={style.resultItem} key={i}>
                    <Link to={`/posts/${post.fields.slug}`}>
                      {post.fields.title}
                    </Link>
                  </div>
                ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}

const style = {
  root: css`
    position: relative;
  `,
  input: css`
    width: 300px;
    padding: 5px;
    height: 30px;
    font-size: 16px;
  `,
  result: css`
    width: 300px;
    background: #4e4c4c;
    position: absolute;
    top: 30px;
    left: 0;
    font-size: 13px;
  `,
  resultItem: css`
    padding: 5px 10px;
  `,
}

interface IResultState {
  items: any[]
  total: number
}
