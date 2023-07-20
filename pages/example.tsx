// import { createCanvas } from 'canvas'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import Insight from '../containers/00_realtor_call_trend_weekly'

const Page: NextPage = () => {  


  return (
    <div>
    <h3>Example</h3>
        <Insight/>
    </div>
  )
}

export default Page
