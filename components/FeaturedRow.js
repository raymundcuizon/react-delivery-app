import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import sanityClient from '../sanity';

const FeaturedRow = ({id, title, description }) => {

    const [restaurant, setRestaurant] = useState([])

    useEffect(() => {
        sanityClient.fetch(`*[_type == "featured" && _id==$id] {
            ...,
            restaurant[]->{
            ...,
            dishes[]->,
              type->{name}
            }
        }[0]`, {id}).then(data=>{
            setRestaurant(data?.restaurant)
        })
    }, [id])
  return (
    <View>
        <View className="mt-4 flex-row items-center justify-between px-4">
            <Text className="font-bold text-lg">{ title }</Text>
            <ArrowRightIcon color="#00CCBB"/>
        </View>
        <Text className="text-xs text-gray-500 px-4">{description}</Text>

        <ScrollView
            horizontal
            contentContainerStyle={{
                paddingHorizontal:15
            }}
            showsHorizontalScrollIndicator={false}
            className="pt-4"
        >  
            {
                restaurant?.map(res => (
                    <RestaurantCard 
                        id={res._id}
                        key={res._id}
                        imgUrl={res.image}
                        title={res.name}
                        rating={res.rating}
                        genre={res.type?.name}
                        address={res.address}
                        short_description={res.short_description}
                        dishes={res.dishes}
                        long={res.long}
                        lat={res.lat}
                    />
                ))
            }
        </ScrollView>
    </View>
  )
}

export default FeaturedRow