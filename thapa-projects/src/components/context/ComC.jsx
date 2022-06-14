import React from 'react'
import { FirstName } from '../../App'
export default function comC() {
  return (
    <div>
      <FirstName.Consumer>
        {(fname) => {
          return (
            <>
              <h1>
                My Name is {fname.value}
              </h1>
            </>
          )
        }}
      </FirstName.Consumer>
    </div>
  )
}
