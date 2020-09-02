import React, { useState, ChangeEvent } from "react"
import { LoadingSpinner, ScreenReaderText } from "@/components/"
import { css } from "@emotion/core"
import { Link } from "@reach/router"
import { SETTING, COLOR, MEDIA } from "@/styles"
import * as I from "@/interfaces"

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

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist()
    setActiveStateOfInput(true)
    incrementalSearch(e)
  }

  const incrementalSearch = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer)
    setResult(null)

    if (e.target.value === "") {
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
        } catch (e) {
          alert("サーバーと接続ができませんでした。")
        }
      }, searchDelay)
    )
  }

  return (
    <div css={CSS["search"]}>
      <label htmlFor="search">
        <ScreenReaderText>検索</ScreenReaderText>
        <input
          css={CSS["search-input"]}
          onChange={onChange}
          onFocus={() => {
            setActiveStateOfInput(true)
          }}
          type="text"
          placeholder="検索"
          id="search"
        />
      </label>
      {activeStateOfInput && (
        <div css={CSS["search-result"]}>
          {isLoading && (
            <div
              css={CSS["search-result-item"]}
              style={{ textAlign: "center" }}
            >
              <LoadingSpinner />
            </div>
          )}
          {!isLoading && result && (
            <>
              <div css={CSS["search-result-title"]}>
                結果は {result.total} 件です
              </div>
              {result.total !== 0 &&
                result.items.map((post, i) => (
                  <div css={CSS["search-result-item"]} key={i}>
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

const CSS = {
  search: css`
    position: relative;
    z-index: ${SETTING.LAYER.SEARCH_RESULT};
  `,
  "search-input": css`
    width: 300px;
    padding: 5px 10px;
    height: 30px;
    font-size: 16px;
    background: ${COLOR.LIGHT_GRAY};
    color: ${COLOR.WHITE};
    border: none;
    ${MEDIA.SP} {
      width: 100%;
    }
    &:focus {
      outline: 1px solid #01bcd4;
    }
  `,
  "search-result": css`
    width: 300px;
    background: ${COLOR.LIGHT_GRAY};
    position: absolute;
    top: 30px;
    left: 0;
    font-size: 13px;
    ${MEDIA.SP} {
      width: 280px;
    }
  `,
  "search-result-item": css`
    padding: 5px 10px;
  `,
  "search-result-title": css`
    padding: 5px 10px;
  `,
}

interface IResultState {
  items: I.Item[]
  total: number
}
