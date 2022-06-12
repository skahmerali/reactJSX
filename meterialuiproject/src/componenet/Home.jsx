
import * as React from 'react';

import Items from './Items';
import Slider from "./Slider"

export default function Home() {


  return (
    <>

      <div className="containar">
        <Slider />
        <Items />
        <Items />
        <Items />
        <Items />
        <Items />

      </div>
    </>
  )
}
