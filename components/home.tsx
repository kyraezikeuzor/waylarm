'use client'
import Image from "next/image";
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Heading } from '@/components/ui/heading'

export default function Home() {

  const [disasters, setDisasters] = useState([])

  useEffect(()=>{
    const getDisasters = async () => {
      try {
        // Making a GET request
        const response = await axios.get('https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries');
        setDisasters(response.data)
        console.log(response, 'sfjiodsijfosf')
        console.log('Data fetched:', response.data); // Logs the fetched data
      } catch (error:any) {
        console.error('Error fetching posts:', error.message); // Logs any error
      }
    };

    getDisasters()

  },[])


  return (
    <section className="flex flex-col lg:grid grid-cols-[1fr_1fr_1fr] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <Heading as='h2'>This week</Heading>
        {JSON.stringify(disasters)}
      </div>
      <div>
        <Heading as='h2'>This month</Heading>
      </div>
      <div>
        <Heading as='h2'>Last 6 months</Heading>
      </div>
    </section>
  );
}
