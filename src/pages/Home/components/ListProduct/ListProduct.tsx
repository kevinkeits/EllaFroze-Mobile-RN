import * as React from 'react'
import { FlatList, ListRenderItemInfo, Text, View } from 'react-native'
import HomeCharts from '../HomeCharts/HomeCharts'


interface Props {
    products: Product[]
    loading?: boolean
    loadingSave?: boolean
    onConfirm?: (values: Product) => void
  }

  interface Product {
    ProductID: string;
    Product: string;
    Branch: string;
    BranchID: string;
    Discount: number;
    DiscountType: number;
    ImagePath: string;
    ItemSold: number;
    Price: number;
    Stock: number;
    Qty?: string;
    selected?:string
  }


const ListProduct = ({ loadingSave, products, loading, onConfirm}:Props) => {
  /** props destruction */
//   const { collections = [], loading = false, navigation } = props

//   const handleOnPressBook = React.useCallback(
//     (collection: ILKCCollection) => navigation.navigate('LKCDetailBook', { ...collection }),
//     [navigation]
//   )

//   const renderItem = React.useCallback(
//     ({ item, index }: ListRenderItemInfo<ILKCCollection>) => (
//       <LKCBookItem
//         item={item}
//         style={[index === 0 ? Styles.bookItemFirst : Styles.bookItem]}
//         onPress={handleOnPressBook}
//       />
//     ),
//     [handleOnPressBook]
//   )

const renderItem = ({ item, index}: any) => (
    <HomeCharts item={item} onConfirm={onConfirm} loadingSave={loadingSave} loading={loading} />
  );

//   const keyExtractor = React.useCallback((item: ILKCCollection) => item.id, [])

  return (
    // <View style={Styles.root}>
    //   <View style={Styles.container}>
    //     <Text style={Styles.title}>Binus Collection</Text>
    //   </View>
    //   {loading ? (
    //     <View style={Styles.loadingContainer}>
    //       {Array.from({ length: 4 }, (_, index) => (
    //         <LoadingBookItem
    //           key={index}
    //           height={141}
    //           width={93}
    //           style={[index === 0 ? Styles.bookItemFirst : Styles.bookItem]}
    //         />
    //       ))}
    //     </View>
    //   ) : collections.length > 0 ? (
    //     <FlatList
    //       horizontal
    //       data={collections}
    //       renderItem={renderItem}
    //       keyExtractor={keyExtractor}
    //       maxToRenderPerBatch={4}
    //       showsHorizontalScrollIndicator={false}
    //     />
    //   ) : (
    //     <View style={Styles.emptyContainer}>
    //       <NoData width={100} height={100} />
    //       <Text>No collection available</Text>
    //     </View>
    //   )}
    // </View>
    <View>
         <FlatList
         horizontal={true}
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.ProductID}
        maxToRenderPerBatch={3}
        removeClippedSubviews={true}
        initialNumToRender={3}
        />
    </View>
  )
}

export default ListProduct