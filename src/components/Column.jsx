import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPage, setSelected } from '../features/swapiSlice'

export default function Column({ type, title }) {
  const dispatch = useDispatch()
  const slice = useSelector((state) => state.swapi[type])

  return (
    <section className="column" data-type={type}>
      <h2>{title}</h2>

      <ul className={`${type}-list list-none p-0 m-0`}>
        {slice.items.map((item, idx) => (
          <li
            key={item.url || `${type}-${idx}`}
            onClick={() => dispatch(setSelected({ item, type }))}
            className="mb-2 p-3 rounded-md cursor-pointer bg-[#181818] hover:bg-[#242424] border border-transparent hover:border-[#3a3a3a] transition-transform"
          >
            {item.name || item.title}
          </li>
        ))}
      </ul>

      {slice.next ? (
        <button
          className="loadMore mt-3 w-full py-2 rounded-md"
          onClick={() => dispatch(fetchPage({ type, url: slice.next }))}
        >
          Load more
        </button>
      ) : (
        <div className="text-sm mt-3 text-gray-400">No more pages</div>
      )}

      {slice.status === 'loading' && <div className="text-sm mt-2">Loading...</div>}
      {slice.status === 'failed' && <div className="text-red-400">Error: {slice.error}</div>}
    </section>
  )
}
