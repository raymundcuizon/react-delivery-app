import { View, Text, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoryCards from './CategoryCards'
import sanityClient, { urlFor } from '../sanity'


const Categories = () => {

  const [categorries, setCategories] = useState([])

  useEffect(() => {
    sanityClient.fetch(`
      *[_type == "category"]
    `).then(data => {
      setCategories(data)
    })
  },[]);
  return (
    <ScrollView 
        contentContainerStyle={{
            paddingHorizontal: 15,
            paddingTop: 10
        }}
        horizontal 
        showsHorizontalScrollIndicator={false}>
        {
          categorries.map((category) => (
            <CategoryCards 
              key={category._id}
              id={category._id}
              imgUrl={urlFor(category.image).width(200).url()}
              title={category.name}
            />
          ))
        }
    </ScrollView>
  )
}

export default Categories