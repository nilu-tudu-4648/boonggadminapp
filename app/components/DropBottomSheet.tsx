import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppButton from './AppButton'
import AppText from './AppText'
import tw from '@/lib/tailwind'
import { Image } from 'react-native'

const DropBottomSheet = () => {
    return (
        // <BottomSheetModalProvider>
        //     <View style={styles.container}>
        //         <BottomSheetModal
        //             ref={bottomSheetModalRef}
        //             index={1}
        //             snapPoints={snapPoints}
        //         >
        //             <View style={styles.contentContainer}>
        //                 <TouchableOpacity onPress={() => closeSheet()}>
        //                     <AppText style={[tw`my-1`, { color: colors.purple, fontSize: 14 }]}>{`Extended Drop`}</AppText>
        //                 </TouchableOpacity>
        //                 <View style={[tw`flex-row justify-between p-1 bg-gray-200 rounded-md`, { height: SIZES.height * .1 }]}>
        //                     <View>
        //                         <AppText style={[tw``, { fontSize: 11 }]}>{_.get(selectedBikeforModify, "_webuserId.profile.name")}</AppText>
        //                         <AppText style={[tw`font-bold`, { fontSize: 13 }]}>{_.get(selectedBikeforModify, "brand")} {_.get(selectedBikeforModify, "model")}</AppText>
        //                         <AppText style={[tw``, { fontSize: 9 }]}>{_.get(selectedBikeforModify, "boonggBookingId")}</AppText>
        //                     </View>
        //                     <View>
        //                         <AppText style={[tw`self-end`, { fontSize: 7, color: colors.green }]}>{_.get(selectedBikeforModify, "bookingType")}</AppText>
        //                         <AppText style={[tw``, { fontSize: 9 }]}>{_.get(selectedBikeforModify, "_webuserId.email")}</AppText>
        //                         <AppText style={[tw`self-end`, { fontSize: 9, color: colors.purple }]}>{_.get(selectedBikeforModify, "_webuserId.profile.mobileNumber")}</AppText>
        //                     </View>
        //                 </View>
        //                 {/* timebox */}
        //                 <View style={[tw`flex-row justify-between items-center my-2`, { height: SIZES.height * .06 }]}>
        //                     <View style={tw`flex-row justify-between p-1 bg-gray-200 rounded-md w-4.7/10 `}>
        //                         <View>
        //                             <AppText style={[tw``, { fontSize: 9 }]}>From</AppText>
        //                             <AppText style={[tw``, { fontSize: 9 }]}>{moment(_.get(selectedBikeforModify, "startDate")).format('lll')}</AppText>
        //                         </View>
        //                     </View>
        //                     <View style={tw`flex-row justify-between p-1 bg-gray-200 rounded-md w-4.7/10 `}>
        //                         <View>
        //                             <AppText style={[tw``, { fontSize: 9 }]}>To</AppText>
        //                             <AppText style={[tw``, { fontSize: 9 }]}>{moment(_.get(selectedBikeforModify, "endDate")).format('lll')}</AppText>
        //                         </View>
        //                     </View>
        //                 </View>
        //                 {/* kycbox */}
        //                 <View style={[tw`bg-gray-100 rounded-lg`, { height: SIZES.height * .31 }]}>
        //                     <AppText style={[tw`ml-2 font-bold`, { fontSize: 9.5 }]}>Images</AppText>
        //                     <View style={[tw`flex-row justify-between`, {}]}>
        //                         <View style={tw`w-1/3 items-center`}>
        //                             {
        //                                 _.get(selectedBikeforModify, "checkInInfo.images.front") ?
        //                                     <TouchableOpacity style={tw`w-full items-center`} onPress={() => {
        //                                         openImageDialog(selectedBikeforModify)
        //                                     }}>
        //                                         <Image source={{ uri: _.get(selectedBikeforModify, "checkInInfo.images.front") }} style={[tw`w-9/10 rounded-md`, { height: SIZES.height * .11 }]} />
        //                                     </TouchableOpacity>
        //                                     : <View style={[tw`w-9/10 bg-gray-300 rounded-lg`, { height: SIZES.height * .11 }]} />
        //                             }
        //                             <AppText style={[tw``, { fontSize: 9, }]}>Front</AppText>
        //                         </View>
        //                         <View style={tw`w-1/3 items-center`}>
        //                             {
        //                                 _.get(selectedBikeforModify, "checkInInfo.images.back") ?
        //                                     <TouchableOpacity style={tw`w-full items-center`} onPress={() => {
        //                                         openImageDialog(selectedBikeforModify)
        //                                     }}>
        //                                         <Image source={{ uri: _.get(selectedBikeforModify, "checkInInfo.images.back") }} style={[tw`w-9/10 rounded-md`, { height: SIZES.height * .11 }]} />
        //                                     </TouchableOpacity>
        //                                     : <View style={[tw`w-9/10 bg-gray-300 rounded-lg`, { height: SIZES.height * .11 }]} />
        //                             }
        //                             <AppText style={[tw``, { fontSize: 9, }]}>Back</AppText>
        //                         </View>
        //                         <View style={tw`w-1/3 items-center`}>
        //                             {
        //                                 _.get(selectedBikeforModify, "checkInInfo.images.left") ?
        //                                     <TouchableOpacity style={tw`w-full items-center`} onPress={() => {
        //                                         openImageDialog(selectedBikeforModify)
        //                                     }}>
        //                                         <Image source={{ uri: _.get(selectedBikeforModify, "checkInInfo.images.left") }} style={[tw`w-9/10 rounded-md`, { height: SIZES.height * .11 }]} />
        //                                     </TouchableOpacity>
        //                                     : <View style={[tw`w-9/10 bg-gray-300 rounded-lg`, { height: SIZES.height * .11 }]} />
        //                             }
        //                             <AppText style={[tw``, { fontSize: 9, }]}>Left</AppText>
        //                         </View>
        //                     </View>
        //                     <View style={[tw`flex-row justify-between`, {}]}>
        //                         <View style={tw`w-1/3 items-center`}>
        //                             {
        //                                 _.get(selectedBikeforModify, "checkInInfo.images.right") ?
        //                                     <TouchableOpacity style={tw`w-full items-center`} onPress={() => {
        //                                         openImageDialog(selectedBikeforModify)
        //                                     }}>
        //                                         <Image source={{ uri: _.get(selectedBikeforModify, "checkInInfo.images.right") }} style={[tw`w-9/10 rounded-md`, { height: SIZES.height * .11 }]} />
        //                                     </TouchableOpacity>
        //                                     : <View style={[tw`w-9/10 bg-gray-300 rounded-lg`, { height: SIZES.height * .11 }]} />
        //                             }
        //                             <AppText style={[tw``, { fontSize: 9, }]}>Right</AppText>
        //                         </View>
        //                         <View style={tw`w-1/3 items-center`}>
        //                             {
        //                                 _.get(selectedBikeforModify, "checkInInfo.images.selfieWithBike") ?
        //                                     <TouchableOpacity style={tw`w-full items-center`} onPress={() => {
        //                                         openImageDialog(selectedBikeforModify)
        //                                     }}>
        //                                         <Image source={{ uri: _.get(selectedBikeforModify, "checkInInfo.images.selfieWithBike") }} style={[tw`w-9/10 rounded-md`, { height: SIZES.height * .11 }]} />
        //                                     </TouchableOpacity>
        //                                     : <View style={[tw`w-9/10 bg-gray-300 rounded-lg`, { height: SIZES.height * .11 }]} />
        //                             }
        //                             <AppText style={[tw``, { fontSize: 9, }]}>Rider</AppText>
        //                         </View>
        //                         <View style={tw`w-1/3 items-center justify-between`}>
        //                             {
        //                                 _.get(selectedBikeforModify, "_webuserId.profile.drivingLicence") ?
        //                                     <View style={tw`flex-row w-full items-center justify-around`}>
        //                                         <TouchableOpacity style={tw`w-full items-center`} onPress={() => {
        //                                             openImageDialog(selectedBikeforModify)
        //                                         }}>
        //                                             <Image source={{ uri: _.get(selectedBikeforModify, "_webuserId.profile.drivingLicence") }} style={[tw`w-4.4/10 rounded-md`, { height: 40 }]} />
        //                                         </TouchableOpacity>
        //                                         <TouchableOpacity style={tw`w-full items-center`} onPress={() => {
        //                                             openImageDialog(selectedBikeforModify)
        //                                         }}>
        //                                             <Image source={{ uri: _.get(selectedBikeforModify, "_webuserId.profile.aadhar") }} style={[tw`w-4.4/10 rounded-md`, { height: 40 }]} />
        //                                         </TouchableOpacity>
        //                                     </View>
        //                                     : <View style={tw`flex-row w-full items-center justify-around`}>
        //                                         <View style={[tw`w-4.4/10 bg-gray-300 rounded-lg`, { height: 40 }]} />
        //                                         <View style={[tw`w-4.4/10 bg-gray-300 rounded-lg`, { height: 40 }]} />
        //                                     </View>
        //                             }
        //                             {
        //                                 _.get(selectedBikeforModify, "checkInInfo.kyc.aadhar") ?
        //                                     <View style={tw`flex-row w-full items-center justify-around`}>
        //                                         <TouchableOpacity style={tw`w-full items-center`} onPress={() => {
        //                                             openImageDialog(selectedBikeforModify)
        //                                         }}>
        //                                             <Image source={{ uri: _.get(selectedBikeforModify, "checkInInfo.kyc.drivingLicence") }} style={[tw`w-4.4/10 rounded-md`, { height: 40 }]} />
        //                                         </TouchableOpacity>
        //                                         <TouchableOpacity style={tw`w-full items-center`} onPress={() => {
        //                                             openImageDialog(selectedBikeforModify)
        //                                         }}>
        //                                             <Image source={{ uri: _.get(selectedBikeforModify, "checkInInfo.kyc.aadhar") }} style={[tw`w-4.4/10 rounded-md`, { height: 40 }]} />
        //                                         </TouchableOpacity>
        //                                     </View>
        //                                     : <View style={tw`flex-row w-full items-center justify-around`}>
        //                                         <View style={[tw`w-4.4/10 bg-gray-300 rounded-lg`, { height: 40 }]} />
        //                                         <View style={[tw`w-4.4/10 bg-gray-300 rounded-lg`, { height: 40 }]} />
        //                                     </View>
        //                             }
        //                             <AppText style={[tw``, { fontSize: 9, }]}>Documents</AppText>
        //                         </View>
        //                     </View>
        //                 </View>
        //                 <AppButton
        //                     onPress={() => {
        //                         closeSheet()
        //                     }}
        //                     title="Close"
        //                     textStyle={[tw`m-0`, { color: colors.green, fontWeight: '500', fontSize: 9 }]}
        //                     style={{ borderColor: colors.green, borderWidth: 1, backgroundColor: "#fff" }} />
        //             </View>
        //         </BottomSheetModal>
        //     </View>
        // </BottomSheetModalProvider>
    )
}

export default DropBottomSheet

const styles = StyleSheet.create({})